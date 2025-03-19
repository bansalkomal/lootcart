import React, { useState } from 'react';
import { useNavigate } from "react-router";
import { ArrowLeft } from 'lucide-react';
import { apiRequest } from '../helpers/helper';
import { BASE_URL } from '../helpers/Contants';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [gender, setGender] = useState('female');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

 
  
      const payload = {
          username: username,
          email: email,
          mobileNumber: mobileNumber,
          gender: gender,
          role: role,
          password: password
      };

        try{
          
          const data = await apiRequest(BASE_URL+ `users/register`, "POST", payload);
          alert("Successfully signed up!");

          navigate('/')

          // if(data?.status == 200 && data?.data?.email){
          //     localStorage.setItem('isLoggedIn', true);
          //     localStorage.setItem('userDetails', JSON.stringify(data?.data));
          //     alert(data?.message)

          //     navigate("/dashboard", { state: { isMoveFromLogin: true } });
          // }else{
          //     //console.log('elele')
          //     alert(data?.message)
          // }
        
        }catch(e){
          alert('Failed !!')
          console.log('Blog error: ', e)
        }
        setError('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {/* <button className="btn btn-light me-3 back-btn" onClick={handleBack}>
                <ArrowLeft size={20} /> Back
            </button> */}
            <div className="card p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Username:</label>
                        </div>
                        <div className="col-8">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Email:</label>
                        </div>
                        <div className="col-8">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Mobile:</label>
                        </div>
                        <div className="col-8">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your mobile number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Gender:</label>
                        </div>
                        <div className="col-8">
                            <select
                                className="form-select"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Role:</label>
                        </div>
                        <div className="col-8">
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Password:</label>
                        </div>
                        <div className="col-8">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mb-3 align-items-center">
                        <div className="col-4 text-end">
                            <label className="col-form-label">Confirm:</label>
                        </div>
                        <div className="col-8">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <div className="alert alert-danger py-1 text-center">{error}</div>}
                    <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                </form>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-warning w-100"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
