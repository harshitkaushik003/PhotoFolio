import { useState } from "react"
import ImageForm from "../ImageForm/ImageForm"
import styles from './ImageList.module.css'
import { db } from "../../FirebaseInit";
import { doc, setDoc } from "firebase/firestore";
import Image from "../Image/Image";
import ControlledCarousel from "../Caraousel/Caraousel";

function ImageList({openedAlbum, handleBack, notifyAdd}){
    const [showForm, setShowForm] = useState(false);
    const [imageToEdit, setImageToEdit] = useState(null);
    const [cIndex, setcIndex] = useState(-1);
    function setIndex(index){
        setcIndex(index);
    }
    async function addImage(name, url){
        openedAlbum.images.push({
            name: name,
            url: url
        });

        await setDoc(doc(db, "albums", openedAlbum.id), {
            id: openedAlbum.id,
            name: openedAlbum.name,
            images: openedAlbum.images
        })
        
    }
    async function handleEdit(index, name, url){
        if(index > -1 && index < openedAlbum.images.length){
            openedAlbum.images[index] = {
                name: name,
                url: url
            }
        }
        await setDoc(doc(db, "albums", openedAlbum.id), openedAlbum);
        setShowForm(false);
        setImageToEdit(null);
    }

    function setEdit(index){
        setImageToEdit({
            image: openedAlbum.images[index],
            index: index
        });
        setShowForm(true);
    }
    async function handleDelete(index){
        if(index > -1 && index < openedAlbum.images.length){
            openedAlbum.images.splice(index, 1);
        }
        await setDoc(doc(db, "albums", openedAlbum.id), openedAlbum);
    }
    
    return(
        <>
            <div className={styles.icon} onClick={handleBack}></div>
            <h1><span>{openedAlbum.name}</span></h1>
            {showForm ? <ImageForm addImage={addImage} imageToEdit={imageToEdit} handleEdit={handleEdit} notifyAdd = {notifyAdd} /> : ""}
            <input type="button" value={showForm ? "Cancel" : "Add Image"} className={styles.btn} onClick={() => setShowForm(!showForm)} />
            <h1 className={styles.msg}><span>{openedAlbum.images.length ? "" : "No image to display"}</span></h1>
            <div className={styles.imageList}>
                {openedAlbum.images.map((image, index)=>(
                    <Image index={index} image={image} handleDelete={handleDelete } setEdit={setEdit} setIndex={setIndex}/>
                ))}
            </div>
            {cIndex!==-1 ? (
                <div className={styles.carouselDiv}>
                    <div className={styles.close} onClick={() => setIndex(-1)}></div>
                    <ControlledCarousel images={openedAlbum.images} index={cIndex} setIndex={setIndex}/>
                </div>
            ) : ""}
            
        </>
    )
}

export default ImageList