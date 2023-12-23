import { useState } from "react"
import ImageForm from "../ImageForm/ImageForm"
import styles from './ImageList.module.css'
import { db } from "../../FirebaseInit";
import { doc, setDoc } from "firebase/firestore";
import Image from "../Image/Image";
function ImageList({openedAlbum}){
    const [showForm, setShowForm] = useState(false);
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
    return(
        <>
            <h1><span>{openedAlbum.name}</span></h1>
            {showForm ? <ImageForm addImage={addImage} /> : ""}
            <input type="button" value={showForm ? "Cancel" : "Add Image"} className={styles.btn} onClick={() => setShowForm(!showForm)} />
            <div className={styles.imageList}>
                {openedAlbum.images.map((image, index)=>(
                    <Image index={index} image={image}/>
                ))}
            </div>
        </>
    )
}

export default ImageList