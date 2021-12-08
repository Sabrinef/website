import NavBar from "./Navbar";
import Header from "./Header";
import styles from '../styles/Home.module.css'
const layout=({children})=>{
    return(
        <>
        <Header/>
        <NavBar />
         {children}
<footer className={styles.footer}>

    <div className="logo">
        <div className="thing">
        </div>
    </div>    
</footer>
        </>
    )
}


export default layout