// == Import : npm
import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { Link, useHistory } from 'react-router-dom';

// == Import : local
import './style.scss';
import { UserContext } from '../../context/userContext';

const Auth = () => {

    const [userState, userDispatch] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        console.log(userState);
    }, [userState]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const formName = e.currentTarget.id;

        switch(formName) {
            case 'signin':
                const dataSignin = {
                    email: 'bastien.leroy31@gmail.com',
                    password: '31Bastien31'
                };

                const response = await axios.post(
                    'http://localhost:5000/api/auth/signin',
                    dataSignin,
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
                        isMod: response.data.isMod,
                        email: response.data.email,
                        firstname: response.data.firstname,
                        name: response.data.name
                    })
                    history.push('/home');
                }
                break;

            case 'signup':
                console.log("2")

                break;
            default: break;
        }
    };

    return (
        <div className="Auth">
            <div className="Auth_Log">
                <h2 className="Auth_Log_Title">Se Connecter</h2>
                <div className="Auth_Log_Container">
                    <form
                        id="signin"
                        className="Auth_Log_Container_Form"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='email'>Email</label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                            />
                        </div>
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='password'>Password</label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                            />
                        </div>
                        <button
                            className="Auth_Log_Container_Form_Button"
                            type='submit'
                        >
                            Valider
                        </button>
                    </form>
                </div>
            </div>
            <div className="Auth_Log">
                <h2 className="Auth_Log_Title">Créer un compte</h2>
                <div className="Auth_Log_Container">
                    <form
                        id="signup"
                        className="Auth_Log_Container_Form"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='emailSignUp'>Email</label>
                            <input
                                id='emailSignUp'
                                name='email'
                                type='email'
                            />
                        </div>
                        <div className="Auth_Log_Container_Form_InputContainer">
                            <label htmlFor='passwordSignUp'>Password</label>
                            <input
                                id='passwordSignUp'
                                name='password'
                                type='password'
                            />
                        </div>
                        <button
                            className="Auth_Log_Container_Form_Button"
                            type='submit'
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