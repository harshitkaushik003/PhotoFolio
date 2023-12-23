import { useRef } from 'react';
import Button from '../Button/Button';
import styles from './AlbumForm.module.css';

const AlbumForm = ({ addAlbum }) => {
    const nameRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("create clicked");

        addAlbum(nameRef.current.value);
        nameRef.current.value = "";
    }

    function handleClear() {
        console.log("Clear clicked");
        nameRef.current.value = "";
    }

    return (
        <>
            <form action="" className={styles.albumForm} onSubmit={handleSubmit}>
                <h2>Create an Album</h2>
                <input ref={nameRef} type="text" className={styles.name} placeholder='Enter Name of the album' />
                <div className={styles.btn}>
                    <Button type="button" color={"#E2B1B1 "} text={"clear"} onclick={handleClear} />
                    <Button type="submit" color={"#549F93"} text={"create"} />
                </div>
            </form>
        </>
    );
}

export default AlbumForm;
