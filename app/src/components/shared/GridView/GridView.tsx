"use client";
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import img from '../../../../../public/logo.svg'
import styles from './GridView.module.scss'
import Button from '../Button/Button';
import angle_down from './angle-down.svg'
import angle_up from './angle-up.svg'

const GridView = ({ imageUrl, title, data1 }: any) => {
    const [active, setActive] = useState<any>(false);
    const [itemsToShow, setItemsToShow] = useState<number>(4);
    const [transitioning, setTransitioning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = () => {
        intervalRef.current = setInterval(active, 800);
    };

    const onClick = () => {
        setActive(!active)
        startInterval()
    }

    useEffect(() => {
        const updateItemsToShow = () => {
            if (window.innerWidth <= 480) {
                setItemsToShow(2);
            } else if (window.innerWidth <= 864) {
                setItemsToShow(2);
            } else if (window.innerWidth <= 1024) {
                setItemsToShow(3);
            } else {
                setItemsToShow(4)
            }
        };

        updateItemsToShow();
        window.addEventListener('resize', updateItemsToShow);

        return () => {
            window.removeEventListener('resize', updateItemsToShow);
        };
    }, []);
    useEffect(() => {
        if (transitioning) {
            const timer = setTimeout(() => {
                setTransitioning(false);
            }, 800); // Match the duration of the CSS transition
            return () => clearTimeout(timer);
        }
    }, [transitioning]);
    const data = [
        {
            id: 1,
            imageUrl: img,
            title: 'Item 1'
        },
        {
            id: 2,
            imageUrl: img,
            title: 'Item 2'
        },
        {
            id: 3,
            imageUrl: img,
            title: 'Item 2'
        },
        {
            id: 4,
            imageUrl: img,
            title: 'Item 2'
        }, {
            id: 5,
            imageUrl: img,
            title: 'Item 2'
        },

    ]
    return (
        <div className={styles.cotainer}>
            <div>
                <div className={styles.item_box}>
                    <ul className={styles.list}>
                        {data.map((item, index) => (index < itemsToShow || active) && (

                            <li
                                key={item.id}
                                className=
                                {`${styles.container_item_card} 
                                ${index < itemsToShow  ? styles.container_item_card : styles.hidden}
                                ${!active ? '': styles.show}`}
                            >
                                <div className={styles.view_img}>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                    />
                                </div>
                                <div className={styles.view_txt}>
                                    <div className="">{item.title}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.button_container}>
                <button onClick={onClick} className={styles.btn}>
                    {active
                        ? <div className={styles.title_button}><Image src={angle_up} alt="Show less" /></div>
                        : <div className={styles.title_button}><Image src={angle_down} alt="Show more" /></div>}
                </button>
            </div>
        </div>


    )
}

export default GridView