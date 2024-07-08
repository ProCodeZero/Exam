import Input from '../Input/Input';
import Select from '../Select/Select';
import styles from './CassettesPreset.module.css';

export default function CassettesPreset() {
    const options = [100, 200, 500, 1000, 2000, 5000];
    return (
        <div className={styles['cassettes-setting']}>
            {/* <Input placeholder="Номинал..." type="number" step={1} /> */}
            <Select options={options} />
            <Input placeholder="Количество купюр..." type="number" step={1} />
            <label className={styles['checkbox-label']}>
                Исправность
                <Input placeholder="Статус..." type="checkbox" />
            </label>
        </div>
    );
}
