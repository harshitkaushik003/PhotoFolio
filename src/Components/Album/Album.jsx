import styles from './Album.module.css'

function Album({name, id, handleDelete, setEdit, handleShowImage}){

    return(
        <>
            <div className={styles.albumCard}>
                <div className={`${styles.icon} ${styles.editIcon}`} onClick={()=> setEdit(id)}></div>
                <div className={`${styles.icon} ${styles.deleteIcon}`} onClick={()=>handleDelete(id)}></div>
                <div className={styles.albumImage} onClick={()=> handleShowImage(id)}></div>
                <div className={styles.albumName} onClick={()=> handleShowImage(id)}>
                    <span>{name}</span>
                </div>
            </div>
        </>
    )
}

export default Album;