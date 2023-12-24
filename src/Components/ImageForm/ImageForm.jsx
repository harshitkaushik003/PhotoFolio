import styles from './ImageForm.module.css'
import Button from '../Button/Button'
import { useEffect, useRef } from 'react';
export default function ImageForm({addImage, imageToEdit, handleEdit, notifyAdd}){
    const nameRef = useRef();
    const urlRef = useRef();
    function handleSubmit(e){
        e.preventDefault();
        if(!imageToEdit){
            let name = nameRef.current.value;
            let url = urlRef.current.value;
            addImage(name, url);
            nameRef.current.value = "";
            urlRef.current.value = "";
        }else{
            let name = nameRef.current.value;
            let url = urlRef.current.value;
            handleEdit(imageToEdit.index, name, url);
        }
        notifyAdd("Image");
    }

    useEffect(()=>{
        if(imageToEdit){
            nameRef.current.value = imageToEdit.image.name;
            urlRef.current.value = imageToEdit.image.url;

        }
    }, [imageToEdit])
    return(
        <>
            <form action="" className={styles.imageForm} onSubmit={handleSubmit}>
                <h2>{imageToEdit ? "Edit Image" : "Add new Image"}</h2>
                <div className={styles.inputs}>
                    <input ref={nameRef} type="text" className={`${styles.name} ${styles.inputBox}`} placeholder='enter name here'/>
                    <input ref={urlRef} type="text" className={`${styles.url} ${styles.inputBox}`} placeholder='enter url here'/>
                </div>
                <div className={styles.btns}>
                    <Button type='button' text="clear" color="#E2B1B1"/>
                    <Button type='submit' text={imageToEdit ? "edit" : "create"} color="#549F93"/> 
                </div>
            </form>
        </>
    )
}