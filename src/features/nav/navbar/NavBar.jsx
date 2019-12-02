import React from 'react';
import {useSelector} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import {useFirebase} from 'react-redux-firebase';
import SignedOutMenu from '../menus/SignedOut';
import SignedInMenu from '../menus/SignedIn';

const NavBar = ({history}) => {
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth, []);

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/');
        });

    };

    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
        <div>
            <div>
                <button as={Link} to='/' header>
                    <img src='/assets/logo.png' alt='logo'/>
                    logo
                </button>
                
             

                {authenticated ? (
                    <SignedInMenu signOut={handleLogout}/>
                ) : (
                    <SignedOutMenu/>
                )}
            </div>
        </div>
    );
};

export default withRouter(NavBar);