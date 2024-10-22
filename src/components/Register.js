import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from '../api/axios';
import Alert from "./Alert";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';
const message = [
    <p>4 to 24 characters.Must begin with a letter. <br /> Letters, numbers, underscores, hyphens allowed.</p>,
    <p>8 to 24 characters.<br />
        Must include uppercase and lowercase letters, a number and a special character.<br />
        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span></p>,
    <p> Must match the first password input field.</p>
]

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [type, setType] = useState('')
    const [errMsg, setErrMsg] = useState('');
    const [showPwd, setShowPwd] = useState('password');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleShowPwd = () => {
        setShowPwd(prevPwd => (prevPwd === 'password' ? 'text' : 'password'));
    }
    const divShowPwd = (
        <div className='relative -top-6 float-right px-2'>
            {showPwd !== "password" ? <FaEyeSlash role='button' tabIndex="0" onClick={handleShowPwd} /> :
                <FaEye role='button' tabIndex="0" onClick={handleShowPwd} />}
        </div>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setPwd('');
            setMatchPwd('');
            setUser('');
            setType('success');
            setErrMsg("Success");
        } catch (err) {
            if (!err?.response) {
                setType('error');
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setType('error');
                setErrMsg('Username Taken');
            } else {
                setType('error');
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="min-w-full flex justify-center">
                    <div ref={errRef} className={errMsg ? "absolute top-2 " : "hidden"} aria-live="assertive">
                        <Alert type={type} message={errMsg} />
                    </div>
                    <h2 className="mt-14 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                            <div className="mt-2">
                                <input
                                    className={`block w-full rounded-md outline-none border-0 p-1.5 text-gray-900 shadow-sm
                                        ${validName ? "ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-300" : "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300"}
                                        ${validName || !user ? "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300" : "ring-1 ring-inset ring-rose-300 focus:ring-2 focus:ring-inset focus:ring-rose-300"}`}
                                    type="text" id="username" autoComplete="off" onChange={(e) => setUser(e.target.value)}
                                    ref={userRef}
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)} aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    required />
                            </div>
                            <div className="min-w-screen flex justify-center">
                                <div id="uidnote" className={userFocus && user && !validName ? "absolute top-2" : "hidden"}>
                                    <Alert type={type} message={message[0]} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input type={showPwd}
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    required
                                    className={`block w-full rounded-md outline-none border-0 p-1.5 text-gray-900 shadow-sm
                                        ${validPwd ? "ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-300" : "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300"}
                                        ${validPwd || !pwd ? "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300" : "ring-1 ring-inset ring-rose-300 focus:ring-2 focus:ring-inset focus:ring-rose-300"}`} />
                                {divShowPwd}
                            </div>
                            <div className="min-w-screen flex justify-center">
                                <div id="uidnote" className={pwdFocus && !validPwd ? "absolute top-2" : "hidden"}>
                                    <Alert type={type} message={message[1]} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="currentpassword"
                                    className="block text-sm font-medium leading-6 text-gray-900">Current Password</label>
                            </div>
                            <div className="mt-2">
                                <input type={showPwd}
                                    id="currentpassword"
                                    autoComplete="off"
                                    required
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className={`block w-full rounded-md outline-none border-0 p-1.5 text-gray-900 shadow-sm
                                        ${validMatch && matchPwd ? "ring-1 ring-inset ring-blue-300 focus:ring-2 focus:ring-inset focus:ring-blue-300" : "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300"}
                                        ${validMatch || !matchPwd ? "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300" : "ring-1 ring-inset ring-rose-300 focus:ring-2 focus:ring-inset focus:ring-rose-300"}`} />
                                {divShowPwd}
                            </div>
                            <div className="min-w-screen flex justify-center">
                                <div id="uidnote" className={matchFocus && !validMatch ? "absolute top-2" : "hidden"}>
                                    <Alert type={type} message={message[2]} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                                className="flex w-full justify-center rounded-md bg-[#b2b2c8] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#9696ea] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-gray-300">Sign
                                Up</button>
                        </div>
                    </form>

                    <p>
                        Already registered?<br />
                        <span className="font-semibold leading-6 text-black hover:text-[#b2b2c8]">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Register
