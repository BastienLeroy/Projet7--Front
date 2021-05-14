// == Import : npm
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';

// == Import : local
import './style.scss';
import { UserContext } from '../../context/userContext';

const Auth = () => {
    const [userState, userDispatch] = useContext(UserContext);
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formName = e.currentTarget.id;

        switch(formName) {
            case 'signin':
                const dataSignin = {
                    email,
                    password
                };

                const responseSignin = await axios.post(
                    'http://localhost:5000/api/auth/signin',
                    dataSignin,
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                if (responseSignin.status === 200) {
                    userDispatch({
                        type: 'SETVALUES',
                        isLogged: true,
                        id: responseSignin.data.id,
                        imageUrl: responseSignin.data.image_url,
                        isMod: responseSignin.data.isMod,
                        email: responseSignin.data.email,
                        firstname: responseSignin.data.firstname,
                        name: responseSignin.data.name
                    })
                    history.push('/home');
                }
                break;

            case 'signup':
                const dataSignup = {
                    email: emailSignup,
                    password: passwordSignup
                };

                const responseSignup = await axios.post(
                    'http://localhost:5000/api/auth/signup',
                    dataSignup,
                    {
                        'withCredentials': true,
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                if (responseSignup.status === 201) {
                    console.log(responseSignup);

                    const response = await axios.post(
                        'http://localhost:5000/api/auth/signin',
                        dataSignup,
                        {
                            'withCredentials': true,
                            headers: { 'Content-Type': 'application/json' }
                        }
                    );

                    if (response.status === 200) {
                        userDispatch({
                            type: 'SETVALUES',
                            isLogged: true,
                            id: response.data.id,
                            imageUrl: response.data.image_url,
                            isMod: response.data.isMod,
                            email: response.data.email,
                            firstname: response.data.firstname,
                            name: response.data.name
                        })
                        history.push('/profile');
                    }
                }
                break;
            default: break;
        }
    };

    return (
        <div className="Auth">
            <div className="Auth_Log">
                <h2 className="Auth_Log_Title">Se Connecter</h2>
                <div className="Auth_Log_Container">
                    <form className="Auth_Log_Container_Form">
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='password'>Password</label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={e => setPassword(e.currentTarget.value)}
                            />
                        </div>
                        <button
                            id="signin"
                            className="Auth_Log_Container_Form_Button"
                            type='submit'
                            onClick={handleOnSubmit}
                        >
                            Valider
                        </button>
                    </form>
                </div>
            </div>
            <div className="Auth_Log">
                <h2 className="Auth_Log_Title">Créer un compte</h2>
                <div className="Auth_Log_Container">
                    <form className="Auth_Log_Container_Form">
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='emailSignUp'>Email</label>
                            <input
                                id='emailSignUp'
                                name='email'
                                type='email'
                                value={emailSignup}
                                onChange={e => setEmailSignup(e.currentTarget.value)}
                            />
                        </div>
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='passwordSignUp'>Password</label>
                            <input
                                id='passwordSignUp'
                                name='password'
                                type='password'
                                value={passwordSignup}
                                onChange={e => setPasswordSignup(e.currentTarget.value)}
                            />
                        </div>
                        <button
                            id="signup"
                            className="Auth_Log_Container_Form_Button"
                            type='submit'
                            onClick={handleOnSubmit}
                        >
                            Valider
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;