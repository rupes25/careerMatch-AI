import {Route,Routes} from 'react-router-dom';
import Landing from '../features/auth/pages/Landing';
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";

const AuthRoutes = ()=>{
    return(
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>

    );
};

export default AuthRoutes