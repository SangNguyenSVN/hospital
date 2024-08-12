"use client"
import Link from '@/node_modules/next/link';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import styles from '../../styles/mainheader.module.scss';
import Global_API from '../../Server/Global_API';

const Header = () => {
  const [data, setDta] = useState()

  useEffect(()=>{
    
  },[])

  const itemHeader = [
    {
      id: 1,
      name: 'Home',
      path: '/page/home',
    },
    {
      id: 2,
      name: 'Doctor',
      path: '/page/doctor',
    },
    {
      id: 3,
      name: 'Appointment',
      path: '/page/appointment',
    },
    {
      id: 4,
      name: 'About',
      path: '/page/about',
    },
  ];

  return (
    <div className={styles.container} >
      <div className={styles.main_header}>
        <div className={styles.logo}>
          <Link className={styles.none} href={'../'}>
            <Image
              alt="logo"
              width={50}
              height={50}
              src="/logo.svg"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
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

        <Link className={styles.button} href="/page/login">
          <p className={styles.button_text}>Get Start</p>
        </Link>
      </div>
    </div>

  );
};

export default Header;
