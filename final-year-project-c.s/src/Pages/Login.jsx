import React from 'react'
import { auth } from '../Firebase.js';

function Login() {
  return (
    
    <div>
      {/* // Should log the auth instance if Firebase is set up correctly */}
      console.log(auth); 
      Firebase Setup Complete!
    </div>
  )
}

export default Login