import React from 'react'
import styles from './Image.module.css';

const Image = ({index, image, handleDelete, setEdit}) => {
  return (
    <>
        <div className={styles.imageCard}>
          <div className={`${styles.icon} ${styles.editIcon}`} onClick={()=> setEdit(index)}></div>
          <div className={`${styles.icon} ${styles.deleteIcon}`} onClick={()=>handleDelete(index)}></div>
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
