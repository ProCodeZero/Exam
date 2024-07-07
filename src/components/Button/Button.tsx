import styles from './Button.module.css';
type Props = { click?: React.MouseEventHandler<HTMLButtonElement>; children: React.ReactNode };

export default function Button({ children, click }: Props) {
    return (
        <button onClick={click} className={styles.button}>
            {children}
        </button>
    );
}
