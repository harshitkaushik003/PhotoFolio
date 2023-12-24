// importing hooks
import { useEffect, useState } from "react";

// importing firebase elements 
import { db } from "../../FirebaseInit";
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc} from "firebase/firestore";

// importing components and styles
import AlbumForm from "../AlbumForm/AlbumForm";
import Album from "../Album/Album";
import styles from './AlbumList.module.css';
import ImageList from "../ImageList/ImageList";

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AlbumList = () => {
    // function for notification 
    const notifyAdd = (text) =>{
        if(!albumToEdit){
            toast("Added " + text);
        }else{
            toast("Edited " + text);
        }
        
    }
    // state for showing the form 
    const [showForm, setShowForm] = useState(false);
    const [albums, setAlbums] = useState([]); //for setting the albums from firebase 
    const [albumToEdit, setAlbumToEdit] = useState(null); //for editing
    const [showImage, setShowImage] = useState(null); //for rendering imageList
    
    //function for adding album
    async function addAlbum(name){ 

        await addDoc(collection(db, "albums"), {
            name: name,
            images: []
        })
    }

    //deleting an album
    async function handleDelete(id){
        setAlbumToEdit(null);
        const docRef = doc(db, "albums", id);
        await deleteDoc(docRef);
        
    }
    
    //setting the album to edit 
    async function setEdit(id){
        
        const index = albums.findIndex(album => album.id === id);
        setAlbumToEdit(albums[index]); //state used here
        setShowForm(true);
    }

    //editing the album
    async function handleEdit(id, album){
        await setDoc(doc(db, "albums", id), album);
        setShowForm(false);
    }

    // opening an album 
    function handleShowImage(id){
        const index = albums.findIndex(album => album.id === id);
        setShowImage(albums[index]);
    }

    //back button
    function handleBack(){
        setShowImage(null);
    }

    //hook for rendering all the albums from database to the app 
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
        {/* rendering albums and images conditionally  */}
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