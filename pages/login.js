import React,{useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import Image from 'next/image'

const Login = () =>{
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState("");
    const router  = useRouter();

    const loginHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };

        try {
            const {data} = await axios.post(
                "http://localhost:5000/users/login", 
                {email, password},
                config);
            localStorage.setItem("authToken", data.token);
            console.log("login");
            router.push("/");
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }



    return(
<>
            <div className="container"> 
                <div className="menu_register" >
                    <a href="/register">
                    <Image src="/register.png" alt="register" width={30} height={30}/>
                    <h4>Register</h4>
                    <p>Browse and find what you need.</p></a>
                </div>

                <div className="menu_login">
                <a href="/login">
                <Image src="/login.png" alt="register" width={30} height={30}/>
                    <h4>Sign in</h4>
                    <p>Already have an account, then welcome.</p></a>
                    </div>
                </div>
            
                <div className="container">
                    <form onSubmit={loginHandler} >
                        
                        <div className="col-75">
                            <input type="email" placeholder="Email*" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1} />
                        </div>
                        
                        <div className="col-75">  
                            <input type="password" placeholder="Password*" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} />
                        </div>
                        
                        {error && <span style={{color:'red'}}>{error}</span>}
                        
                        <div className="col-75">
                            <button className="submit" type="submit" tabIndex={3} > Submit</button>
                        </div>
                        
                    </form>
                </div>
     </>       
    )
}

export default Login