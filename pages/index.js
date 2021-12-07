import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React,{useState , useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    const [error, setError]= useState("");
    const [privateData, setPrivateData]= useState("");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            
        }

        const fetchPrivateData = async () =>{
            const config = {
                headers: {
                    "Content-Type":"appliation/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const {data} = await axios.get("http://localhost:5000/api/private",config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login")
            }
        }
        fetchPrivateData();
    });

   
  
    return error ? (
        
        <div className="container">
           <Image src="/logo.png" alt="logo" width={150} height={150}/>
           <span>{error}</span>
      
     </div>
    ) : (
        <>
       <div className="container">
           <Image src="/logo.png" alt="logo" width={150} height={150}/>
      <h1>Welcome</h1>
      
     </div>
        
        </>
    );
};

export default Home;
