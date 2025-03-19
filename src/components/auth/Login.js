import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router";
import { ArrowLeft } from 'lucide-react';
import { apiRequest } from '../helpers/helper';
import { BASE_URL } from '../helpers/Contants';

const Login = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent form submission

        if (!email || !password) {
            setError("Email and Password are required!");
            return;
        }

        try{
          
            const data = await apiRequest(BASE_URL + `users/login?email=${email}&password=${password}`, "POST");

            if(data?.status == 200 && data?.data?.email){
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userDetails', JSON.stringify(data?.data));
                // alert(data?.message)

                navigate("/dashboard", { state: { isMoveFromLogin: true } });
            }else{
                //console.log('elele')
                // alert(data?.message)
            }
          
          }catch(e){
            alert('Invalid Credentials !!')
            console.log('Blog error: ', e)
          }

        // Clear error and simulate login
        setError('');
        
    }

    const handleMoveToHome = () => {
        navigate('/dashboard');
    }

    const handleRegister = () => [
        navigate('/register')
    ]

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <button className="btn btn-light me-3 back-btn" onClick={handleMoveToHome}>
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                    <h3 className="text-center mb-3">Sign in</h3>
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-primary me-2" style={{ width: '45%' }}>Facebook</button>
                        <button className="btn btn-info" style={{ width: '45%' }}>Twitter</button>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email / Login</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                        {error && <div className="alert alert-danger py-1 text-center">{error}</div>}
                        <button type="submit" className="btn btn-dark w-100">Login</button>
                    </form>
                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none">Forgot your password?</a>
                    </div>
                    <button className="btn btn-warning w-100 mt-3" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </>
    );
};

export default Login;
