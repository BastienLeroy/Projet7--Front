// == Import : npm
import React from 'react';
import { Link } from 'react-router-dom';

// == Import : local
import './style.scss';

const Footer = () => {
    return (
        <div className="Footer">
            <div className="FooterContainer">
                <div className='FooterContainerAbout'>
                    <h3>Contact</h3>
                </div>
                <div className='FooterContainerAbout'>
                    <h3>Entreprise</h3>
                </div>

            </div>
        </div>
    );
};

export default Footer;