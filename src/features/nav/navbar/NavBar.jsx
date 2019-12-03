import React from 'react';
import {useSelector} from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import {useFirebase} from 'react-redux-firebase';
import SignedOutMenu from '../menus/SignedOut';
import SignedInMenu from '../menus/SignedIn';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: 'none',
      flexGrow: 1,
    },
      logo: {
        marginRight: theme.spacing(2),
      },

    
  }));


const NavBar = ({history,className, ...rest}) => {
    const classes = useStyles();
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth, []);

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            history.push('/');
        });

    };

    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
        <div className={classes.root}>
        <AppBar
        {...rest}
        className={clsx(classes.root, className)}
        color="white"
      >
        <Toolbar className={classes.logo} >
        <RouterLink to="/">
                    <img src='/assets/logo.png' alt='logo'/>
                    logo
                    </RouterLink>
                    
                
             

                {authenticated ? (
                    <SignedInMenu  signOut={handleLogout}/>
                ) : (
                    <SignedOutMenu/> 
                )}
            </Toolbar>
    </AppBar>
    </div>
    );
};

NavBar.propTypes = {
    className: PropTypes.string
  };

export default withRouter(NavBar);