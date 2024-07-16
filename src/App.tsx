import { useState } from 'react';
import styles from './App.module.css';
import Article from './components/Article/Article';
import Button from './components/Button/Button';
import CassettesPreset from './components/CassettesPreset/CassettesPreset';
import Dropdown from './components/Dropdown/Dropdown';
import Form from './components/Form/Form';
import Input from './components/Input/Input';
import Result from './components/Result/Result';
import { CollectResult } from './types/collectResult';
import { Limit } from './types/limits';

function App() {
  const [cassettesSelected, setCassettesSelected] = useState('');
  const [limits, setLimits] = useState<Limit>({});
  const [result, setResult] = useState<CollectResult | undefined>({});
  const [timeDelta, setTimeDelta] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);

  function setArrayFromSelected() {
    const arr: number[] = [];
    for (let i = 0; i < Number(cassettesSelected); i++) arr.push(i + 1);
    return arr;
  }

  function getCassettesSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    const obj: Limit = {};
    for (let i = 0; i < target.length; i += 3) {
      if (i !== target.length - 1) {
        const curNominal = target[i] as HTMLInputElement;
        const curNumber = target[i + 1] as HTMLInputElement;
        const curIsWorking = target[i + 2] as HTMLInputElement;
        const key = curNominal.value;
        if (curIsWorking.checked) {
          if (obj[key]) obj[key].quantity += Number(curNumber.value);
          else
            obj[key] = {
              quantity: Number(curNumber.value),
              isWorking: curIsWorking.checked,
            };
        }
      }
    }
    setLimits(obj);
    alert('Данные по кассетам успешно записаны!');
  }

  function collectMoney(
    amount: number,
    nominals: number[],
  ): CollectResult | undefined {
    const dp: number[][] = Array.from(Array(amount + 1), () =>
      Array(nominals.length + 1).fill(Infinity),
    );
    dp[0] = Array(nominals.length + 1).fill(0);

    for (let i = 1; i <= nominals.length; i++) {
      for (let j = 0; j <= amount; j++) {
        if (nominals[i - 1] <= j) {
          dp[j][i] = Math.min(dp[j][i - 1], 1 + dp[j - nominals[i - 1]][i]);
        } else {
          dp[j][i] = dp[j][i - 1];
        }
      }
    }

    if (dp[amount][nominals.length] === Infinity) return undefined;

    const result: CollectResult = {};
    let remainingAmount = amount;
    for (let i = nominals.length; i > 0 && remainingAmount > 0; i--) {
      while (
        remainingAmount >= nominals[i - 1] &&
        dp[remainingAmount][i] === 1 + dp[remainingAmount - nominals[i - 1]][i]
      ) {
        result[nominals[i - 1]] = (result[nominals[i - 1]] || 0) + 1;
        remainingAmount -= nominals[i - 1];
      }
    }

    return result;
  }

  function calculateGiveMoney(
    e: React.FormEvent<HTMLFormElement>,
    limits: Limit,
  ) {
    const startTime = performance.now();
    e.preventDefault();

    const target = e.currentTarget[0] as HTMLInputElement;
    const amountReq = Number(target.value);
    const nominals = Object.keys(limits)
      .map(Number)
      .sort((a, b) => b - a);

    const allMoney = nominals.reduce(
      (acc, el) => (acc += el * limits[el].quantity),
      0,
    );

    if (amountReq === 0) {
      alert('Вы запросили 0, к сожалению у нас нет так много)');
      return;
    }
    if (amountReq > allMoney) {
      alert('В банкомате недостаточно средств для выдачи данной суммы');
      return;
    }

    setResult(collectMoney(amountReq, nominals));
    const endTime = performance.now();
    setTimeDelta(endTime - startTime);
    setIsShowResult(true);
  }

  return (
    <div className={styles['app-wrapper']}>
      {isShowResult && (
        <Result
          result={result}
          setClose={setIsShowResult}
          timeDelta={timeDelta}
        />
      )}

      <>
        <div className={styles['article-wrapper']}>
          {/* <!-- Количество номиналов --> */}
          <Article>
            <h3>Выберите количество кассет</h3>
            <Dropdown
              selected={cassettesSelected}
              setSelected={setCassettesSelected}
              options={[1, 2, 3, 4, 5, 6, 7, 8]}
            />
          </Article>
          <Article>
            <h3>Укажите сумму для получения</h3>
            <Form submit={(e) => calculateGiveMoney(e, limits)}>
              <Input placeholder='Сумма...' type='number' step={1} />
              <Button>Получить средства</Button>
            </Form>
          </Article>
        </div>
        <div className={styles['article-wrapper']}>
          <Article>
            {/* <!-- Номинал для каждой кассеты + количество оставшихся купюр --> */}
            <h3>Введите данные для каждой кассеты</h3>
            <Form submit={(e) => getCassettesSettings(e)}>
              {!cassettesSelected && (
                <p className={styles.warning}>Выберите количество кассет!</p>
              )}
              {!!cassettesSelected &&
                setArrayFromSelected().map((el) => (
                  <CassettesPreset key={el} />
                ))}
              <Button>Выбрать введенные номиналы</Button>
            </Form>
          </Article>
        </div>
      </>
    </div>
  );
}

export default App;
