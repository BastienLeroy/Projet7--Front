// == Import : npm
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// == Import : local
import './style.scss';
import { UserContext } from '../../context/userContext';


const Profile = () => {
    const [userState, userDispatch] = useContext(UserContext);
    const [isEdit, setIsEdit] = useState(false);

    const { firstname, name, email, password, image_url} = userState;

    useEffect(() => {
        console.log("Profile userState :", userState);
    }, [userState]);

    return (
        <div className="Profile">
            <div className="Profile_Title">
                <h2>Mes Infos</h2>
            </div>
            <div className ="Profile_Input">
                <div className="Profile_InputContainer">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        id='firstname'
                        name='firstname'
                        type='text'
                        value={firstname}
                    />
                </div>
                <div className="Profile_InputContainer">
                    <label htmlFor="name">Nom</label>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        value={name}
                    />
                </div>
                <div className="Profile_InputContainer">
                    <label htmlFor="email">Email</label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={email}
                    />
                </div>
                <div className="Profile_InputContainer">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                    />
                </div>
                <div className="Profile_InputContainer">
                    <label htmlFor="image">Photo de profil</label>
                    <input
                        id='image'
                        name='image'
                        type='file'
                    />
                </div>
            </div>
            <div className="Profile_Container_Button">
                <button className ="Profile_Container_Button_Submit" type="submit">
                    Valider
                </button>
            </div>
        </div>
    );
};

export default Profile;