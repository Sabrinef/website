import React,{useState, useEffect} from 'react';
import Link from 'next/link'
import axios from 'axios';
import {useRouter} from 'next/router'

const Register = () =>{

    const [username, setUsername]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [error, setError]= useState("");
    const router  = useRouter();

    useEffect(() => {
        if(localStorage.getItem("authToken")){
           // history.push("/");
        }
    });

    const registerHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(() =>{
                setError("")
            }, 5000);
            return setError("Passwords do not match")
        }

        try {
            const {data} = await axios.post(
                "http://localhost:5000/users/register", 
                {username, email, password},
                config);
            localStorage.setItem("authToken", data.token);
            router.push("/login");
        } catch (error) {
            
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return(
            
        <div className="container">
                    <form onSubmit={registerHandler}>
                        <h1 > Register </h1>
                        
                        <div className="row">
                        <div className="col-75">
                            
                            <input type="text" placeholder="Username" id="name" required value={username} onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-75">
                            
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-75">
                           
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-75">
                            
                            <input type="password" placeholder="******" id="confpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div className="row">
                        <div className="col-75">
                            <button type="submit">
                                Register</button>
                        </div>
                        </div>
                        <span>Already have an account ? <Link href="/login">Login</Link> </span>
                    </form>


                </div>
           
    )
}

export default Register;