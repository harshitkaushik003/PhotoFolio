import { useEffect, useState } from "react";
import { db } from "../../FirebaseInit";
import AlbumForm from "../AlbumForm/AlbumForm";
import styles from './AlbumList.module.css';
import { addDoc, collection, onSnapshot, setDoc } from "firebase/firestore";

const AlbumList = () => {

    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState();
    async function addAlbum(name){
        const albRef = await addDoc(collection(db, "albums"), {
            name: name,
            images: []
        })
    }

    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "albums"), (snapShot)=>{
            const albums = snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setAlbums(albums);
            console.log("onEffect", albums);
        });
    }, []);

    return(
        <>
        {showForm ? <AlbumForm addAlbum={addAlbum}/> : ""}
        <input type="button" value={showForm ? "Cancel" : "Add Album"} className={styles.btn} onClick={() => setShowForm(!showForm)}/>
        </>
    )
}

export default AlbumList;