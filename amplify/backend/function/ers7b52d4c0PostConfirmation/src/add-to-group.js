/* eslint-disable-line */ const aws = require( 'aws-sdk' );

exports.handler = async ( event, context, callback ) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider( { apiVersion: '2016-04-18' } );


  let isManager = false

  const managerEmails = [ 'thomcdixon@gmail.com' ]

  if ( managerEmails.includes( event.request.userAttributes.email ) ) {
    console.log( "USER IS MANAGER" )
    isManager = true
  }

  const groupParams = {
    UserPoolId: event.userPoolId,
    GroupName: isManager ? 'managers' : 'employees'
  };

  const addUserParams = {
    GroupName: isManager ? 'managers' : 'employees',
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  try {
    await cognitoidentityserviceprovider.getGroup( groupParams ).promise();
  } catch ( e ) {
    await cognitoidentityserviceprovider.createGroup( groupParams ).promise();
  }

  try {
    await cognitoidentityserviceprovider.adminAddUserToGroup( addUserParams ).promise();
    callback( null, event );
  } catch ( e ) {
    callback( e );
  }
};
