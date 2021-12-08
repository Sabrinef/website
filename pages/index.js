import React,{useState , useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    const [error, setError]= useState("");
    const [privateData, setPrivateData]= useState("");

    useEffect(() => {

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
                setError("You are not authorized please login !!")
            }
        }
        fetchPrivateData();
    });

   
  
    return error ? (
        <>
        <div className="box1">
         <span>{error}</span> 
     </div>
    
     </>
    ) : (
        <>
        <div className="box1">
        <div className="logo"><div className="thing"></div></div>         
     </div>
        
        </>
    );
};

export default Home;
