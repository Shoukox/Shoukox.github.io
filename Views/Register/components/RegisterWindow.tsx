import React, { useRef } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { BsKey } from 'react-icons/bs'
import {  Link, NavigateFunction} from 'react-router-dom';
import { savedUsers } from '../../../Database/users';
import { User } from '../../../Models/UserModel';

interface Properties {
    user: User;
    setUser: (user: User) => void;
    navigate: NavigateFunction;
}

const RegisterWindow: React.FC<Properties> = ({ user, setUser, navigate }: Properties) => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const name = userRef.current?.value as string;
        const password = passwordRef.current?.value as string;

        const user = {name: name, password: password} as User;

        if(savedUsers.filter(m => m == user).length !== 1){
            alert("Login or password is incorrect ");
            return;
        }
        setUser(user);
        alert("You are logged in!");
        return navigate("/");
    };
    const userRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <form className="login">
                <div className="login_inputs">
                    <div className="login_input login_user">
                        <input className="login_input__box" placeholder="Login..." ref={userRef}/>
                        <span className="login_input__icon"><AiOutlineUser /></span>
                    </div>
                    <div className="login_input login_password">
                        <input type="password" className="login_input__box" placeholder="Password..." ref={passwordRef}/>
                        <span className="login_input__icon"><BsKey /></span>
                    </div>
                </div>
                <button className="login_input__submit_button" type="submit" onClick={handleLogin}>Login</button>
                <span>
                    No Account? <Link to="/register">Register</Link>
                </span>
            </form>
        </>
    )
}

export default RegisterWindow