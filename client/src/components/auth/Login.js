import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
    const alertContext=useContext(AlertContext);
    const authContext=useContext(AuthContext);
    useEffect(()=>{
        if(authContext.isAuthenticated){
            props.history.push('/');
        }
        if(authContext.error==='Invalid credentials!'){
            alertContext.setAlert(authContext.error,'danger');
            authContext.clearErrors();
        }
        //eslint-disable-next-line
    },[authContext.error,authContext.isAuthenticated,props])
    const [user,setUser]=useState({
        email:'',
        password:''
    });
    const {email,password}=user;
    const onChange=e=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const onSubmit=e=>{
        e.preventDefault();
        if(email===''||password===''){
            alertContext.setAlert('Please fill in all fields!','danger');
        }
        else{
            authContext.login({email,password});
        }
        
    }
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={onChange} required></input>
                </div>
                <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} onChange={onChange} required></input>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"></input>
            </form>
        </div>
    )
}

export default Login
