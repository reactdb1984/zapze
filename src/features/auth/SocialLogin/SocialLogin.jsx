import React from 'react';


const SocialLogin = ({socialLogin}) => {
    return (
        <div>
        

            <button onClick={() => socialLogin('google')} type='button' fluid color='google plus'>
               
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;
