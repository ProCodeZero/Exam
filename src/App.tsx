import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Article from './components/Article/Article';
import Button from './components/Button/Button';
import Dropdown from './components/Dropdown/Dropdown';
import Form from './components/Form/Form';
import Input from './components/Input/Input';

function App() {
    const [selected, setSelected] = useState('');
    useEffect(() => {
        console.log(selected);
    }, [selected]);
    return (
        <div className={styles['app-wrapper']}>
            <div className={styles['article-wrapper']}>
                {/* <!-- Количество номиналов --> */}
                <Article>
                    <h3>Выберите количество кассет</h3>
                    {/* <select
                        className="form-select nominals-select"
                        name="select"
                        id="nominal-selector"
                    >
                        <option value="">--Выберите количество кассет--</option>
                        <option value="1">1</option>
                        <option value="2" selected>
                            2
                        </option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select> */}
                    <Dropdown selected={selected} setSelected={setSelected} />
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
                    <h3>Введите номинал для каждой кассеты</h3>
                    <Form>
                        <Input placeholder="Номинал..." type="number" />
                        <Input placeholder="Номинал..." type="number" />
                        <Button>Выбрать введенные номиналы</Button>
                    </Form>
                </Article>
            </div>
        </div>
    );
}

export default App;
