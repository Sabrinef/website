import NavBar from "./Navbar";
import Header from "./Header";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
const layout=({children})=>{
    return(
        <>
        <Head>

        </Head>
        <Header/>
        <NavBar />
         {children}
<footer className={styles.footer}>
<a href="#">@ All Rights</a>
</footer>
        </>
    )
}


export default layout