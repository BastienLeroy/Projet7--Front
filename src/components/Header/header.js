// == Import : npm
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';


// == Import : local
import logo from '../../assets/images/icon-left-font-monochrome-blalklklklck.png';
import { UserContext } from '../../context/userContext';
import './style.scss';


const Header = () => {
    const history = useHistory();
    const [userState, userDispatch] = useContext(UserContext);
    const { isLogged } = userState;

    const handleOnClickDisconnectButton = async () => {
        const response = await axios.get(
            'http://localhost:5000/api/auth/disconnect',
            {
                'withCredentials': true
            }
        );
        console.log(response);
        if (response.status === 200) {
            userDispatch({ type: 'RESETVALUES' });
            history.push('/');
        }
    };

    return (
        <div className="Header">
            <div className="Header-ImgDiv">
                <Link to="/home">
                    <img src={logo} />
                </Link>
            </div>
            <div className="Header_Icons">
                {isLogged &&
                    <>
                        <Link to="/profile">
                        <p>Profil</p>
                            <FontAwesomeIcon icon={faUserCircle} className="Header-ProfileIcon" />
                        </Link>
                        
                        <button
                            className="Header_Icons_Disconnect"
                            onClick={handleOnClickDisconnectButton}
                        >
                            <p>Se déconnecter</p>
                            <FontAwesomeIcon icon={faUserSlash} className="Header-ProfileIcon" />
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;