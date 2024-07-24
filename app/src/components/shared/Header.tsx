import Link from '@/node_modules/next/link';
import Image from 'next/image';
import React from 'react';
import styles from '../../styles/mainheader.module.scss';
import Button from './Button/Button';
const Header = () => {
  const itemHeader = [
    {
      id: 1,
      name: 'Home',
      path: '/home',
    },
    {
      id: 2,
      name: 'Doctor',
      path: '/doctor',
    },
    {
      id: 3,
      name: 'Appointment',
      path: '/appointment',
    },
    {
      id: 4,
      name: 'About',
      path: '/about',
    },
  ];

  return (
    <div className={styles.container} >
      <div className={styles.main_header}>
        <div className={styles.logo}>
          <Link className={styles.none} href={'./'}>
            <Image alt="logo" width={50} height={50} src="/logo.svg" />
          </Link>
        </div>
        <div className={styles.nav}>
          <ul className={styles.main_header_list}>
            {itemHeader.map((item) => (
              <li key={item.id} className={styles.main_header_list_name}>
                <Link className={styles.none} href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Button title={'Get Start'} />
      </div>
    </div>
  );
};

export default Header;
