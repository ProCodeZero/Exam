import { Dispatch, SetStateAction, useState } from 'react';
import styles from './Dropdown.module.css';

type Props = {
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
};

export default function Dropdown({ selected, setSelected }: Props) {
    const [isActive, setIsActive] = useState(false);
    const options = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className={styles.dropdown}>
            <div
                onClick={() => {
                    setIsActive(!isActive);
                }}
                className={styles['dropdown-btn']}
            >
                {selected || '--Выберите количество кассет--'}
            </div>
            {isActive && (
                <ul className={styles['dropdown-content']}>
                    {options.map((el) => (
                        <li
                            key={el}
                            className={styles['dropdown-item']}
                            onClick={(e) => {
                                const target = e.target as HTMLLIElement;
                                setSelected(target.textContent ?? '');
                                setIsActive(false);
                            }}
                        >
                            {el}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
