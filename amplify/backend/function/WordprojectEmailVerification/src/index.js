/* Amplify Params - DO NOT EDIT
	AUTH_WORDPROJECT3F2910198_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
const { CognitoIdentityServiceProvider } = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

const COGNITO_USERPOOL_ID = process.env.AUTH_WORDPROJECT3F2910198_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
}

exports.handler = async (event) => {
  const params = {
    UserPoolId: COGNITO_USERPOOL_ID,
    Username: event.identity.claims.username,
  };
  try {
    const user = await cognitoIdentityServiceProvider.adminGetUser(params).promise();
    let email_verified;
    for (let i = 0; i < user.UserAttributes.length; i++) {
      if (user.UserAttributes[i].Name === 'email_verified') {
        email_verified = user.UserAttributes[i].Value
      }
    }
    if (email_verified === 'true') email_verified = true;
    else if (email_verified === 'false') email_verified = false;
    else throw new Error(`'email_verified' is not found!`);
    return email_verified;
  } catch (e) {
    throw new Error(`ERR`);
  }
};