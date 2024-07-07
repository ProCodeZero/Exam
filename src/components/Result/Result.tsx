import { CollectResult } from '../../types/collectResult';
import Button from '../Button/Button';
import styles from './Result.module.css';

type Props = {
    result: CollectResult | undefined;
    timeDelta: number;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Result({ result, timeDelta, setClose }: Props) {
    const summarize = [];
    for (const i in result) {
        summarize.push([i, result[i]]);
    }
    return (
        <div className={styles.result}>
            <h3>Всего было затрачено:</h3>
            <ul className={styles.list}>
                {summarize.map((el, index) => (
                    <li key={index}>
                        Купюр номиналом <span className={styles.span}>{el[0]}</span> в количестве{' '}
                        <span className={styles.span}>{el[1]}</span>
                    </li>
                ))}
            </ul>
            <p>Затраченное время: {timeDelta}ms</p>
            <Button click={() => setClose(false)}>Вернуться на главную</Button>
        </div>
    );
}
