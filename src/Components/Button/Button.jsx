import React from 'react'
import styles from './Button.module.css';

const Button = ({type="button", color, text, onclick }) => {
  return (
    <>
        <button type={type} className={styles.btn} style={{backgroundColor: color}} onClick={onclick}>
            <span>{text}</span>
        </button>
    </>
  )
}

export default Button;
