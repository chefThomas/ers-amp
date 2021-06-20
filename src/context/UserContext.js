import React, { useState, useEffect, createContext, useContext } from 'react';
import { Auth, API } from 'aws-amplify';

import { MessageContext } from './MessageContext'

import { createUser } from '../graphql/mutations'

export const UserContext = createContext();

const UserContextProvider = ( props ) => {
  const { handleSetMessage } = useContext( MessageContext )
  const [ user, setUser ] = useState( {} );

  useEffect( () => {
    // check for user with Auth
    checkForLoggedInUser()
  }, [] )

  async function checkForLoggedInUser() {

    try {
      const result = await Auth.currentAuthenticatedUser()
      // get attributes
      const { username, attributes: { sub }, signInUserSession: { idToken: { payload } } } = result
      setUser( { username, id: sub, type: payload[ 'cognito:groups' ][ 0 ] === 'managers' ? 'MANAGER' : 'EMPLOYEE' } )
    } catch ( error ) {
      console.log( error )
    }
  }



  async function login( { username, password } ) {
    try {
      const user = await Auth.signIn( username, password );

      const userInfo = { username: user.username, id: user.attributes.sub };
      if ( user.signInUserSession.accessToken.payload[ 'cognito:groups' ][ 0 ] === 'managers' ) {
        userInfo.type = 'MANAGER';
        // route to manager page
      } else {
        // route to employee's page
        userInfo.type = 'EMPLOYEE';
      }

      setUser( userInfo );
      return userInfo
    } catch ( error ) {
      handleSetMessage( 'error', error.message )
    }
  }

  async function logout() {
    try {
      await Auth.signOut()
      setUser( {} )
    } catch ( error ) {
      console.log( 'Error signing out' )
    }
  }


  async function signup( { firstName, lastName, email, username, password } ) {
    try {
      const result = await Auth.signUp( {
        username,
        password,
        attributes: { email, family_name: lastName, given_name: firstName },
      } );

      // add new user to db
      await API.graphql( { query: createUser, variables: { input: { id: result.userSub, firstName, lastName, email, username, type: "EMPLOYEE" } } } )


      return result
    } catch ( error ) {
      console.log( 'Error signing up: ', error );
      // TODO message 
      handleSetMessage( 'error', error.message )
    }
  }

  async function confirm( username, { confirmationCode } ) {
    try {
      const result = await Auth.confirmSignUp( username, confirmationCode );
      console.log( result )
      return result
    } catch ( error ) {
      console.log( 'Error confirming signup: ', error.message );
      // TODO display error message in error.message
      handleSetMessage( 'error', error.message )
    }

  }

  return (
    <UserContext.Provider value={{ user, login, logout, signup, confirm }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
