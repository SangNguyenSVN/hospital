"use client";
import React, { useState, useRef, useEffect } from 'react';
import img from '../../../../../public/logo.svg'
import styles from './Slider.module.scss'
import Image from 'next/image'

const Slider = ({ data1, dot }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLUListElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        resetInterval();
    };
    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        startInterval();
    };
    const startInterval = () => {
        intervalRef.current = setInterval(nextSlide, 3500);
    };
    const nextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : 0));
        resetInterval();
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : data.length - 1));
        resetInterval();
    };

    useEffect(() => {
        startInterval();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.clientWidth;
            sliderRef.current.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    }, [currentIndex]);

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
        }
    ];

    return (
        <div className={styles.slider_container}>
            <button onClick={prevSlide} className={styles.nav_button} disabled={currentIndex === 0}>
                &lt;
            </button>
            <div className={styles.slider_window}>
                <ul ref={sliderRef} className={styles.slider_list}>
                    {data.map((item) => (
                        <li key={item.id} className={styles.slide}>
                            <div className={styles.container_item_card}>
                                <div className={styles.view_img}>
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        layout="fill"
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={nextSlide} className={styles.nav_button} disabled={currentIndex === data.length - 1}>
                &gt;
            </button>
            {
                dot ?
                    <div className={styles.dot_container}>
                        {data.map((_, index) => (
                            <span
                                key={index}
                                className={`${styles.dot} ${currentIndex === index ? styles.active_dot : ''}`}
                                onClick={() => handleDotClick(index)}
                            />
                        ))}
                    </div> : <></>
            }
        </div>
    );
}

export default Slider;
