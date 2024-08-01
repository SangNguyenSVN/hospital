import { Button } from '@/components/ui/button';
import Image from "next/legacy/image";
import React from 'react';
import styles from '../../styles/mainfooter.module.scss';

const Footer = () => {
  const itemFooter = [
    {
      id: 1,
      name: 'Home',
      path: '/',
      subItem: [
        { id: 1, name: 'SubHome1', path: '/' },
        { id: 2, name: 'SubHome2', path: '/' },
      ]
    },
    {
      id: 2,
      name: 'Doctor',
      path: '/',
      subItem: [
        { id: 1.1, name: 'SubHome1', path: '/' },
        { id: 1.2, name: 'SubHome2', path: '/' },
      ]
    },
    {
      id: 3,
      name: 'Appointment',
      path: '/',
      subItem: [
        { id: 1.1, name: 'SubHome1', path: '/' },
        { id: 1.2, name: 'SubHome2', path: '/' },
      ]
    },
  ];
  return (
    <div className={styles.contaner}>
      <div className={styles.main_footer}>
        <div className={styles.logo}>
          <Image alt="logo" width={50} height={50} src="/logo.svg" />
        </div>
        <div className={styles.left_content}>text</div>
        <div className={styles.nav}>
          <ul className={styles.main_footer_list}>
            {itemFooter.map((item) => (
              <li key={item.id}>
                <p className={styles.main_footer_list_name}>{item.name}</p>
                {item.subItem && (
                  <ul className={styles.main_footer_list_item}> 
                    {item.subItem.map((subItem) => (
                      <li key={subItem.id} >
                        <a className={styles.main_footer_list_item_name} href={subItem.path}>{subItem.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div >
    </div >
  )
}

export default Footer