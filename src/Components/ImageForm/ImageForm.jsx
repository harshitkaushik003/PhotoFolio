import styles from './ImageForm.module.css'
import Button from '../Button/Button'
import { useRef } from 'react';
export default function ImageForm({addImage}){
    const nameRef = useRef();
    const urlRef = useRef();
    function handleSubmit(e){
        e.preventDefault();
        console.log("Submit clicked")
        let name = nameRef.current.value;
        let url = urlRef.current.value;
        addImage(name, url);
        nameRef.current.value = "";
        urlRef.current.value = "";

    }
    return(
        <>
            <form action="" className={styles.imageForm} onSubmit={handleSubmit}>
                <h2>Add an Image here</h2>
                <div className={styles.inputs}>
                    <input ref={nameRef} type="text" className={`${styles.name} ${styles.inputBox}`} placeholder='enter name here'/>
                    <input ref={urlRef} type="text" className={`${styles.url} ${styles.inputBox}`} placeholder='enter url here'/>
                </div>
                <div className={styles.btns}>
                    <Button type='button' text="clear" color="#E2B1B1"/>
                    <Button type='submit' text="create" color="#549F93"/> 
                </div>
            </form>
        </>
    )
}