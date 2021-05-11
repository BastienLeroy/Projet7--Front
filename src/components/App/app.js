// == Import : npm
import { Switch, Route } from 'react-router-dom';

// == Import : components
import Header from '../Header/header';
import Auth from '../Auth/auth';
import Home from '../Home/home';
import Profile from '../Profile/profile';
import Footer from '../Footer/footer';

// == Import : local
import './style.scss';


const App = () => {
    return (
        <div className="App">
            <Header />
            <div className="Container">
                <Switch>
                    <Route path={'/'} component={Auth} exact />
                    <Route path={'/home'} component={Home} exact />
                    <Route path={'/profile'} component={Profile} exact />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
