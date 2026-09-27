import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials:true
});

export async function register({fName,username,email,password}) {
    const response = await api.post('/register', {
        fName, email, username, password
    });
    return response.data;
}

export async function login({usernameOrEmail,password}) {
    const response = await api.post('/login', {
        usernameOrEmail, password
    });
    return response.data;
}


export async function logout() {
    const response = await api.get('/logout');
    return response.data;
}

export async function currentUser(){
    const response = await api.get('/currentUser');
    return response.data;
}