import React from 'react'
import styles from './Image.module.css';

const Image = ({index, image, handleDelete, setEdit, setIndex}) => {
  return (
    <>
        <div className={styles.imageCard}>
          <div className={`${styles.icon} ${styles.editIcon}`} onClick={()=> setEdit(index)}></div>
          <div className={`${styles.icon} ${styles.deleteIcon}`} onClick={()=>handleDelete(index)}></div>
          <div className={styles.imageContainer} onClick={() => setIndex(index)}>
              <img src={image.url} alt="" />
          </div>
          <div className={styles.imageName} onClick={() => setIndex(index)}>
              <span>{image.name}</span>
          </div>
        </div>
    </>
  )
}

export default Image
