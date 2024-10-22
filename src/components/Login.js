import { useRef, useState,useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';
import Alert from './Alert';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [user, resetUser, userAttribs] = useInput("user", '');
    const [pwd, setPwd] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);
    const [errMsg, setErrMsg] = useState('');
    const [type, setType] = useState('');
    const [isMounted, setIsMounted] = useState(true);
    const [showPwd, setShowPwd] = useState('password');
    const handleShowPwd = () => {
        setShowPwd(prevPwd => (prevPwd === 'password' ? 'text' : 'password'));
    }
    const divShowPwd = (
        <div className='relative -top-6 float-right px-2'>
            {showPwd !== "password" ? <FaEyeSlash role='button' tabIndex="0" onClick={handleShowPwd} /> :
                <FaEye role='button' tabIndex="0" onClick={handleShowPwd} />}
        </div>
    )
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const id = response?.data?.id;
            setAuth({ user, id, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
            setType('success');
            setErrMsg('Success');
        } catch (err) {
            if (isMounted) {
                // Only update state if the component is still mounted
                if (!err?.response) {
                    setType('error');
                    setErrMsg('No Server Response');
                } else if (err.response?.status === 400) {
                    setType('error');
                    setErrMsg('Missing Username or Password');
                } else if (err.response?.status === 401) {
                    setType('error');
                    setErrMsg('Unauthorized');
                } else {
                    setType('error');
                    setErrMsg('Login Failed');
                }
            }
        }
    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="min-w-full flex justify-center">
                <div ref={errRef} className={errMsg ? "absolute top-2 " : "hidden"} aria-live="assertive">
                    <Alert type={type} message={errMsg} />
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit} autoComplete='off'>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                                type="text" id="username" autoComplete="off" {...userAttribs} required />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input type={showPwd} id="password" onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                autoComplete='off'
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:bg-gray-300 sm:text-sm sm:leading-6" />
                            {divShowPwd}
                        </div>
                    </div>

                    <div>
                        <div className="persistCheck align-middle p-1">
                            <input type="checkbox" className='h-4 w-4 rounded border-2 border-black text-gray-200 focus:ring-black' id="persist" onChange={toggleCheck} checked={check} />
                            <label htmlFor="persist" className='inline-block h-4 p-2 text-black' >Trust This Device</label>
                        </div>
                        <button
                            className="flex w-full justify-center rounded-md bg-[#b2b2c8] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#9696ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-300">Sign
                            in</button>
                    </div>
                </form>

                <p>
                    Need an Account?<br />
                    <span className="font-semibold leading-6 text-black hover:text-[#b2b2c8]">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login


