// == Import : npm
import React, { useContext, useState } from 'react';
import axios from 'axios';

// == Import : local
import './style.scss';
import { UserContext } from '../../context/userContext';

const Profile = () => {
    const [userState, userDispatch] = useContext(UserContext);

    const [email, setEmail] = useState(userState.email);
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState(userState.firstname);
    const [name, setName] = useState(userState.name);
    const [file, setFile] = useState([]);

    const handleOnClickSubmitButton = async (e) => {
        e.preventDefault();

        const dataInput = {
            id: userState.id,
            email,
            firstname,
            name
        };
        
        if (password !== '') {
            dataInput.password = password;
        }
    
        const formData = new FormData();
        formData.append('dataInput', JSON.stringify(dataInput));
        file.forEach(file => {
            formData.append("image", file);
        })

        const response = await axios.post(
            'http://localhost:5000/api/user/update',
            formData,
            {
                'withCredentials': true,
                headers: {'content-type': 'multipart/form-data'}
            }
        );
    };

    const handleOnClickDeletetButton = async (e) => {
        const response = await axios.delete(
            'http://localhost:5000/api/user/delete',
            {
                'withCredentials': true,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    id: userState.id
                }
            }
        );
    };

    return (
        <div className="Profile">
            <div className="Profile_Title">
                <h2>Mes Informations personnelles</h2>
            </div>
            <form className ="Profile_Form">
                <div className ="Profile_Input">
                    <div className="Profile_InputContainer">
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            id='firstname'
                            name='firstname'
                            type='text'
                            value={firstname}
                            onChange={e => setFirstname(e.currentTarget.value)}
                        />
                    </div>
                    <div className="Profile_InputContainer">
                        <label htmlFor="name">Nom</label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.currentTarget.value)}
                        />
                    </div>
                    <div className="Profile_InputContainer">
                        <label htmlFor="email">Email</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div className="Profile_InputContainer">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div className="Profile_InputContainer">
                        <img className="Profile_InputContainer_Img" src={userState.image_url} />
                        <label htmlFor="image">Photo de profil</label>
                        <input
                            id='image'
                            name='image'
                            type='file'
                            onChange={e => setFile(Array.from(e.target.files))}
                        />
                    </div>
                </div>
                <div className="Profile_Container_Button">
                    <button
                        className ="Profile_Container_Button_Delete"
                        type="button"
                        onClick={handleOnClickDeletetButton}
                    >
                        Supprimer le profil
                    </button>
                    <button
                        className ="Profile_Container_Button_Submit"
                        type="submit"
                        onClick={handleOnClickSubmitButton}
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;