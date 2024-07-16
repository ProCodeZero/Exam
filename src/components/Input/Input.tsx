import styles from './Input.module.css';

type Props = { placeholder: string; type: string; step?: number };

export default function Input({ placeholder, type, step }: Props) {
  return (
    <input
      className={styles.input}
      type={type}
      step={step}
      placeholder={placeholder}
    />
  );
}
