import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure( config )
Amplify.configure( {
  Storage: {
    AWSS3: {
      bucket: 'ersimages3bucket205343-dev',
      region: 'us-west-2'
    }
  }
} )

ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);