import styles from '../styles/Home.module.css'
import React, {useState , useEffect} from 'react';

const Header = () =>{
    const [test, setTest]= useState(true);

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            setTest(false);
        }else{
            setTest(true);
        }
    });

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        
    };

    return test ? (
        <div className={styles.auth}>
            <a href="" onClick={logoutHandler}>Logout </a>
        </div>
    ) : (
        <div>
            
        <div className={styles.auth}>
        <a href="/login">Sign in</a>
        <a href="/register">Register</a>
        </div>
        </div>
    );
}

export default Header