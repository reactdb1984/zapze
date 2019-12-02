import React from 'react';
import {useSelector} from 'react-redux';

const SignedInMenu = ({signOut}) => {
    const profile = useSelector(state => state.firebase.profile, []);
   // const auth = useSelector(state => state.firebase.auth, []);
    return (
      <div>
            <img  spaced='right' alt="profile pic"src={profile.photoURL || '/assets/user.png'}/>
           <p>text={profile.displayName}</p> 
 
                    <button onClick={signOut}  >sign out</button>
                    </div>
    );
};

export default SignedInMenu;