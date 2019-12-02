import React, {  Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import MomentUtils from "@date-io/moment";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "react-perfect-scrollbar/dist/css/styles.css";
import { theme } from "../theme";
import  configureStore  from "../store/configureStore";
import ScrollReset from "../utils/ScrollReset";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from '../config/firebase';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';




import ProjectDashboard from "../../features/projects/ProjectsDashboard/ProjectsDashboard";
import HomePage from "../../features/HomePage";
import NavBar from "../../features/nav/navbar/NavBar";
import NotFound from "./NotFound";
import LoginForm from "../../features/auth/Login/LoginForm";
import RegisterForm from "../../features/auth/Register/RegisterForm";

const history = createBrowserHistory();
const store = configureStore();

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};


function App() {

  return (
    <div className="App">
      <StoreProvider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>

        <ThemeProvider theme={ theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
           
            <Router history={history}>
             
              <ScrollReset />
              <ReduxToastr
              position='bottom-right'
              transitionIn='fadeIn'
              transitionOut='fadeOut'
            />
                          <Switch>
                <Route exact path='/' component={HomePage}/>
            </Switch>
            <Route
                path='/(.+)'
                render={() => (
                    <Fragment>
                        <NavBar/>
                        <div className='main'>
                            <Switch>
                                <Route exact path='/projects' component={ProjectDashboard}/>
                                <Route exact path='/signin' component={LoginForm}/>

                                <Route exact path='/register' component={RegisterForm}/>

                                <Route component={NotFound} />
                            </Switch>
                        </div>
                    </Fragment>
                )}
            />
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
        </ReactReduxFirebaseProvider>

      </StoreProvider>
    </div>
  );
}

export default App;