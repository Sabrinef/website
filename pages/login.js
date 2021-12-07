import React,{useState , useEffect} from 'react';
import Link from 'next/link'
import axios from 'axios';
import {useRouter} from 'next/router'

const Login = () =>{
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState("");
    const router  = useRouter();


    useEffect(() => {
        if(localStorage.getItem("authToken")){
           // router.push("/");
           console.log("hello");
        }
    });

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

            
                <div className="container">
                    <form onSubmit={loginHandler} >
                        <h1> Login </h1>
                        <div className="row">
                        <div className="col-75">
                            
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1} />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-75">
                           
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} />
                        </div>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div className="row">
                        <div className="col-75">
                            <button type="submit" tabIndex={3} >
                                Login</button>
                        </div>
                        </div>
                        <span>Don't have an account ? <Link href="/register">Register</Link> </span>
                    </form>
                </div>
            
    )
}

export default Login