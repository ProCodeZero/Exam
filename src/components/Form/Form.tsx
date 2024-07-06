import styles from './Form.module.css';

import React from 'react';

type Props = { children: React.ReactNode };

export default function Form({ children }: Props) {
    return (
        <form id="set-nominal-form" className={styles.form}>
            {children}
        </form>
    );
}
