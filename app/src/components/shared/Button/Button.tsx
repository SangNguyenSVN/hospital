import Link from '@/node_modules/next/link'
import React from 'react'
import styles from '../Button/Button.module.scss'
const Button = ({ title }: any) => {
    return (
        <div className={styles.button}>
            <section className={styles.button_text}>{title}</section>
        </div>
    )
}

export default Button