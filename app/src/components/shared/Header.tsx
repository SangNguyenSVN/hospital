
import Image from 'next/image';
import React from 'react';
import styles from '../../styles/mainheader.module.scss';
import Button from './Button/Button';

const Header = () => {
  const itemHeader = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Doctor',
      path: '/',
    },
    {
      id: 3,
      name: 'Appointment',
      path: '/',
    },
    {
      id: 4,
      name: 'About',
      path: '/',
    },
  ];

  return (
    <div className={styles.container} >
      <div className={styles.main_header}>
        <div className={styles.logo}>
          <Image alt="logo" width={50} height={50} src="/logo.svg" />
        </div>
        <div className={styles.nav}>
          <ul className={styles.main_header_list}>
            {itemHeader.map((item) => (
              <li key={item.id} className={styles.main_header_list_name}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <Button title={'Get Stated'}/>
      </div>
    </div>
  );
};

export default Header;
