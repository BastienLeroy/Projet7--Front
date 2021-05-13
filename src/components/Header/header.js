// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';


// == Import : local
import logo from '../../assets/images/icon-left-font-monochrome-blalklklklck.png';
import './style.scss';


const Header = () => {
    return (
        <div className="Header">
            <div className="Header-ImgDiv">
                <Link to="/home">
                    <img src={logo} />
                </Link>
            </div>
            <div className="Header_Icons">
                <Link to="/profile">
                <p>Profil</p>
                    <FontAwesomeIcon icon={faUserCircle} className="Header-ProfileIcon" />
                </Link>
                
                <button className="Header_Icons_Disconnect">
                    <p>Se déconnecter</p>
                    <FontAwesomeIcon icon={faUserSlash} className="Header-ProfileIcon" />
                </button>
            </div>
        </div>
    );
};

export default Header;