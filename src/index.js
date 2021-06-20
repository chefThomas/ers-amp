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
      bucket: 'ersampe5419e149b2540d1aa2cb979543e173f142011-dev',
      region: 'us-west-2'
    }
  }
} )

ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);