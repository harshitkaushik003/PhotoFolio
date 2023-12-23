import { useEffect, useState } from "react";
import { db } from "../../FirebaseInit";
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import styles from './AlbumList.module.css';
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc} from "firebase/firestore";
import ImageList from "../ImageList/ImageList";

const AlbumList = () => {

    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [albumToEdit, setAlbumToEdit] = useState(null);
    const [showImage, setShowImage] = useState(null);
    async function addAlbum(name){ 
        await addDoc(collection(db, "albums"), {
            name: name,
            images: []
        })
    }

    async function handleDelete(id){
        const docRef = doc(db, "albums", id);
        await deleteDoc(docRef);
    }
    
    async function setEdit(id){
        
        const index = albums.findIndex(album => album.id === id);
        setAlbumToEdit(albums[index]);
        setShowForm(true);
    }

    async function handleEdit(id, album){
        await setDoc(doc(db, "albums", id), album);
        setShowForm(false);
    }

    function handleShowImage(id){
        const index = albums.findIndex(album => album.id === id);
        setShowImage(albums[index]);
    }

    useEffect(()=>{
        const unsub = onSnapshot(collection(db, "albums"), (snapShot)=>{
            const albums = snapShot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data()
            }))
            setAlbums(albums);
        });
    }, []);

    return(
        <>
        {!showImage?(
            <>
            {showForm ? <AlbumForm addAlbum={addAlbum} albumToEdit={albumToEdit} handleEdit={handleEdit}/> : ""}
            <input type="button" value={showForm ? "Cancel" : "Add Album"} className={styles.btn} onClick={() => setShowForm(!showForm)}/>
            <div className={styles.albumListDiv}>
                {albums.map((album) => (
                    <Album name={album.name} id={album.id} handleDelete={handleDelete} setEdit={setEdit} handleShowImage={handleShowImage}/>
                ))}
            </div>
            </>
        ) : <ImageList openedAlbum={showImage} />}
        
        </> 
    )
}

export default AlbumList;