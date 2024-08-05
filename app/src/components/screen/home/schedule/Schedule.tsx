"use client";
import React from 'react'
import Link from '@/node_modules/next/link'
import styles from './Schedule.module.scss'

const Schedule = () => {
    const data = [
        {
            id: 1,
            name: "John Doe",
            header: "Something",
            title: "Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.",
            href: "../"
        },
        {
            id: 2,
            name: "John Doe",
            header: "Something",
            title: "Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.",
            href: "../"
        },
        {
            id: 3,
            name: "John Doe",
            header: "Something",
            title: "Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.",
            href: "../"
        }
    ]


    return (
        <div className={styles.container}>
            <div className={styles.schedule_inner}>

                {data.map((item) => (
                    <div className={styles.item} key={item.id}>

                        <div className={styles.item_inner} >
                            <span className={styles.name}>{item.name}</span>
                            <h4 className={styles.header}>{item.header}</h4>
                            <p className={styles.title}>{item.title}</p>
                            <Link className={styles.href} href={item.href}>
                                <p className={styles.show}></p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Schedule