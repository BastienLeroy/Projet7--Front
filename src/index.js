// == Import : npm
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// == Import : components
import App from './components/App/app';

// == Import : local
import './styles/index.scss';
import { UserContextProvider } from './context/userContext';
import * as serviceWorker from './serviceWorker';

const rootReactElement = (
    <React.StrictMode>
        <Router>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </Router>
    </React.StrictMode>
);
const target = document.getElementById('root');

render(rootReactElement, target);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();