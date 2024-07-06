import React from 'react';
import styles from './Article.module.css';

type Props = { children: React.ReactNode };

export default function Article({ children }: Props) {
    return <article className={styles['article-block']}> {children}</article>;
}
