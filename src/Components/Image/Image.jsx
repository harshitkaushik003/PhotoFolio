import React from 'react'
import styles from './Image.module.css';

const Image = ({index, image}) => {
  return (
    <>
        <div className={styles.imageCard}>
            <div className={styles.imageContainer}>
                <img src={image.url} alt="" />
            </div>
            <div className={styles.imageName}>
                <span>{image.name}</span>
            </div>
        </div>
    </>
  )
}

export default Image
