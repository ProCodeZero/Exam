import styles from './Input.module.css';

type Props = { placeholder: string; type: string };

export default function Input({ placeholder, type }: Props) {
    return <input className={styles.input} type={type} placeholder={placeholder} />;
}
