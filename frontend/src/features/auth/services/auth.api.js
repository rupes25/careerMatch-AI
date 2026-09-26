import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
});

export async function register({fName,username,email,password}) {
    try{
        await api.post('/register',{
            fName,email,username,password
        })
        
        alert("Account created successfully.")
    }
    catch(err){
        console.log(err);
    }
    
}

export async function login({usernameORemail,password}) {
    try{
        await api.post('/login',{
            usernameORemail,password
        })
        
        alert("Logged in successfully.")
    }
    catch(err){
        console.log(err);
    }
    
}


export async function logout() {
    try{
        await api.get('/logout')
        
        alert("Logout successfully.")
    }
    catch(err){
        console.log(err);
    }
    
}

