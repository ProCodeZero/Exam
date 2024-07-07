import Input from '../Input/Input';
import styles from './CassettesPreset.module.css';

export default function CassettesPreset() {
    return (
        <div className={styles['cassettes-setting']}>
            <Input placeholder="Номинал..." type="number" step={1} />
            <Input placeholder="Количество купюр..." type="number" step={1} />
            <label className={styles['checkbox-label']}>
                Исправность
                <Input placeholder="Статус..." type="checkbox" />
            </label>
        </div>
    );
}
