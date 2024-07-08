import styles from './Select.module.css';

type Props = { options: number[] };

export default function Select({ options }: Props) {
    return (
        <select className={styles.select}>
            <option className={styles.option} value="">
                Выберите номинал купюры
            </option>
            {options.map((el, index) => (
                <option key={index} className={styles.option} value={el}>
                    {el}
                </option>
            ))}
        </select>
    );
}
