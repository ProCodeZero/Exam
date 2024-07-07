import styles from './Form.module.css';

import React from 'react';

type Props = { children: React.ReactNode; submit?: (e: React.FormEvent<HTMLFormElement>) => void };

export default function Form({ children, submit }: Props) {
    return (
        <form onSubmit={submit} id="set-nominal-form" className={styles.form}>
            {children}
        </form>
    );
}
