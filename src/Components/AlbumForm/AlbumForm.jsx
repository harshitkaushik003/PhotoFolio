import { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import styles from './AlbumForm.module.css';


const AlbumForm = ({ addAlbum, albumToEdit, handleEdit, notifyAdd }) => {

    const nameRef = useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        // checking if editing or creating
        if(!albumToEdit){
            addAlbum(nameRef.current.value);
            nameRef.current.value = "";
        }else{
            const album = {
                id : albumToEdit.id,
                name: nameRef.current.value,
                images: albumToEdit.images
            };
            handleEdit(albumToEdit.id, album); 
        }
        notifyAdd("Albums");
        
    }

    function handleClear() {
        console.log("Clear clicked");
        nameRef.current.value = "";
    }

    // if editing, the form should autofill
    useEffect(()=>{
        if(albumToEdit){
            nameRef.current.value = albumToEdit.name;
            
        }
    }, [albumToEdit])

    return (
        <>
            <form action="" className={styles.albumForm} onSubmit={handleSubmit}>
                <h2>{albumToEdit ? "Edit Album" : "Create an Album"}</h2>
                <input ref={nameRef}  type="text" className={styles.name} placeholder='Enter Name of the album' />
                <div className={styles.btn}>
                    <Button type="button" color={"#E2B1B1 "} text={"clear"} onclick={handleClear} />
                    <Button type="submit" color={"#549F93"} text={albumToEdit ? "Edit" : "Create"} />
                </div>
            </form>
        </>
    );
}

export default AlbumForm;
