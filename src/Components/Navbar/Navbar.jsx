// imports 
import styles from './Navbar.module.css'
import {styled} from 'styled-components';
import myImage from '../../images/album.png';

// creating styled component for enclosing the navbar 
const Nav = styled.div`
    background-color: #258EA6;
    height: 50px;
`
const Navbar = ()=>{
    return(
        <>
        <Nav>
            <ul className={styles.navList}>
                <li className={styles.items}>
                    <img src={myImage} alt="" />
                </li>
                <li className={styles.items}>
                    <span>photoFolio</span>
                </li>
            </ul>  
        </Nav>
        </>
    )
}

export default Navbar;