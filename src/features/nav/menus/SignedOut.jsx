import React from 'react';
//import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

const SignedOutMenu = () => {
   // const dispatch = useDispatch();
  return (
   <div>
       <Link to="/signin">
       <button>
          Sign in
          </button>
       </Link>
       <Link to="/signout">
       <button>
         signout
          </button>
       </Link>
   </div>
  );
};

export default SignedOutMenu;