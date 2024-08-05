import React from 'react';
import styles from './ScrollUp.module.scss';

interface MyComponentProps {
    show: boolean;
}

const ScrollUp: React.FC<MyComponentProps> = ({ show = true }) => {
    return (
        !show
            ? null
            : (
                <div className={styles.scrollView}>
                    <a id="scrollUp" href="#top">
                        <span>
                            <i>up</i>
                        </span>
                    </a>
                </div>
            )
    );
}

export default ScrollUp;
