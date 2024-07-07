import { useState } from 'react';
import styles from './App.module.css';
import Article from './components/Article/Article';
import Button from './components/Button/Button';
import CassettesPreset from './components/CassettesPreset/CassettesPreset';
import Dropdown from './components/Dropdown/Dropdown';
import Form from './components/Form/Form';
import Input from './components/Input/Input';
import { CollectResult } from './types/collectResult';
import { Limit } from './types/limits';

function App() {
    const [cassettesSelected, setCassettesSelected] = useState('');
    const [limits, setLimits] = useState<Limit>({});
    // const [isError, setIsError] = useState(false);

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
    }

    function collectMoney(amount: number, nominals: number[]): CollectResult | undefined {
        if (amount === 0) return {};
        if (!nominals.length) return;
        const currentNominal = nominals[0];
        const availableNotes = limits[currentNominal].quantity;
        const notesNeeded = Math.floor(amount / currentNominal);
        const numberOfNotes = Math.min(notesNeeded, availableNotes);

        const res = collectMoney(amount - currentNominal * numberOfNotes, nominals.slice(1));

        if (res) {
            return numberOfNotes ? { [currentNominal]: numberOfNotes, ...res } : res;
        }
    }

    function calculateGiveMoney(e: React.FormEvent<HTMLFormElement>, limits: Limit) {
        e.preventDefault();

        const target = e.currentTarget[0] as HTMLInputElement;
        const amountReq = Number(target.value);
        const nominals = Object.keys(limits)
            .map(Number)
            .sort((a, b) => b - a);

        console.log(collectMoney(amountReq, nominals));
    }

    return (
        <div className={styles['app-wrapper']}>
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
                        <Input placeholder="Сумма..." type="number" step={1} />
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
                            setArrayFromSelected().map((el) => <CassettesPreset key={el} />)}
                        <Button>Выбрать введенные номиналы</Button>
                    </Form>
                </Article>
            </div>
        </div>
    );
}

export default App;
