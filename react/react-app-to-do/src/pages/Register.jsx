import React, { useState } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import { server } from '../main';
import toast from "react-hot-toast";


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log(name, email, password)
        try {
            const {data} = await axios.post('https://to-do-app-qb0k.onrender.com/users/new', {name, email, password}, {headers: {"Content-Type": "application/json"}, withCredentials: true});
            if (data) {
                toast.success(data.message);
            } else {
                toast.error("Empty response received");}
        } catch (error) {
            toast.error("Some Error") 
            console.log(error)
        }
    }
  return (
    <div className='login'>
        <section>
            <form onSubmit={submitHandler}>
                <input 
                type="text" 
                required
                value={name} 
                onChange={(e)=> setName(e.target.value)} 
                placeholder='Name' 
                />
                <input 
                type="email" 
                required
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                placeholder='Email' 
                />
                <input 
                type="password" 
                required
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                placeholder='Password' 
                />
                <button type='submit'>Sign Up</button>
                <h4>Or</h4>
                <Link to= "/login">Log In</Link>
            </form>
        </section>
    </div>
  )
}

export default Register