import React from 'react';
import styles from './Icon.module.css';

export default function (props) {
  return (
    <div className={[styles.iconWrapper, styles[props.size]].join(' ') + ' ' + (props.className || '')}>
      <img src={props.img} alt=""/>
    </div>
  );
}
