// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// == Import : local
import logo from '../../assets/images/icon-left-font-monochrome-blalklklklck.png';
import './style.scss';


const Header = () => {
    return (
        <div className="Header">
            <div className="Header-ImgDiv">
                <Link to="/">
                    <img src={logo} />
                </Link>
            </div>
            <div >
                <Link to="/profile">
                    <FontAwesomeIcon icon={faUserCircle} className="Header-ProfileIcon" />
                </Link>
            </div>
        </div>
    );
};

export default Header;