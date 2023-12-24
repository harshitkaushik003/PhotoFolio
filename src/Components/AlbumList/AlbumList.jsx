import { useEffect, useState } from "react";
import { db } from "../../FirebaseInit";
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import styles from './AlbumList.module.css';
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc} from "firebase/firestore";
import ImageList from "../ImageList/ImageList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AlbumList = () => {
    const notifyAdd = (text) =>{
        if(!albumToEdit){
            toast("Added " + text);
        }else{
            toast("Edited " + text);
        }
        
    }
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
        setAlbumToEdit(null);
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

    function handleBack(){
        setShowImage(null);
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
        <ToastContainer/>
        {!showImage?(
            <>
            {showForm ? <AlbumForm addAlbum={addAlbum} albumToEdit={albumToEdit} handleEdit={handleEdit} notifyAdd={notifyAdd}/> : ""}
            <input type="button" value={showForm ? "Cancel" : "Add Album"} className={styles.btn} onClick={() => setShowForm(!showForm)}/>
            <div className={styles.albumListDiv}>
                {albums.map((album) => (
                    <Album name={album.name} id={album.id} handleDelete={handleDelete} setEdit={setEdit} handleShowImage={handleShowImage}/>
                ))}
            </div>
            </>
        ) : <ImageList openedAlbum={showImage} handleBack={handleBack} notifyAdd = {notifyAdd} />}
        
        </> 
    )
}

export default AlbumList;