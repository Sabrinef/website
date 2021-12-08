import React,{useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router'
import Image from 'next/image'

const Register = () =>{

    const [firstname, setFirstname]= useState("");
    const [lastname, setLastname]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [error, setError]= useState("");
    const router  = useRouter();

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
                {firstname, lastname, email, password},
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
                    <form onSubmit={registerHandler}>
                        <div className="row">
                        <div className="col-75">
                            <input type="text" placeholder="First Name*" id="firstname" required value={firstname} onChange={(e) => setFirstname(e.target.value)} 
                            />    
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Last Name*" id="lastname" required value={lastname} onChange={(e) => setLastname(e.target.value)} 
                            />
                        </div>
                        </div>
                        
                        <div className="col-75">  
                            <input type="email" placeholder="Email*" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        
                        <div className="col-75">
                            <input type="password" placeholder="Password*" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        
                        <div className="col-75">
                            <input type="password" placeholder="Repeat Password*" id="confpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        
                        <div className="col-75">
                            <button className="submit" type="submit"> Register</button>
                        </div>
                    </form>


                </div>
           </>
    )
}

export default Register;