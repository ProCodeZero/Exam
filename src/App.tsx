import { useState } from 'react';
import styles from './App.module.css';
import Article from './components/Article/Article';
import Button from './components/Button/Button';
import CassettesPreset from './components/CassettesPreset/CassettesPreset';
import Dropdown from './components/Dropdown/Dropdown';
import Form from './components/Form/Form';
import Input from './components/Input/Input';

function App() {
    // current value of cassettes
    const [cassettesSelected, setCassettesSelected] = useState('');

    function setArrayFromSelected() {
        const arr: number[] = [];
        for (let i = 0; i < Number(cassettesSelected); i++) arr.push(i + 1);
        return arr;
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
                    <Form>
                        <Input placeholder="Сумма..." type="number" />
                        <Button>Получить средства</Button>
                    </Form>
                </Article>
            </div>
            <div className={styles['article-wrapper']}>
                <Article>
                    {/* <!-- Номинал для каждой кассеты + количество оставшихся купюр --> */}
                    <h3>Введите данные для каждой кассеты</h3>
                    <Form
                        submit={(e) => {
                            e.preventDefault();
                            const target = e.currentTarget;
                            let res = {};
                            for (let i = 0; i < target.length; i += 3) {
                                if (i !== target.length - 1) {
                                    const curNominal = target[i] as HTMLInputElement;
                                    const curNumber = target[i + 1] as HTMLInputElement;
                                    const curIsWorking = target[i + 2] as HTMLInputElement;
                                    res = {
                                        ...res,
                                        nominal: curNominal.value,
                                        details: {
                                            quantity: curNumber.value,
                                            isWorking: curIsWorking.checked,
                                        },
                                    };
                                }
                                console.log(res);
                            }
                            // const arr = [];
                            // for (let i = 0; i < target.length; i++) {
                            //     const curTg = target[i] as HTMLInputElement;
                            //     if (curTg.type === 'checkbox') arr.push(curTg.checked);
                            //     else arr.push(curTg.value);
                            // }
                            // console.log(arr);
                        }}
                    >
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
