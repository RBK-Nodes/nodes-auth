# nodes-auth
The authentication server for the nodes chat app, a very simple, modular authentication server.

## usage
An API that you can query through the following routes:

/signin
/signup
/logout
/refresh
/auth

and returns a JWT token and a JWT refresh token on sign in or sign up
the logout invalidates the refresh token
the refresh route returns a new token, provided your refresh token is valid
the auth route is for testing your token


## how to run
connect to a postgres DB by adding a connection string URI to an .env file with the key DATABASE_URL
add a JWT secret in the .env file with the key ACCESS_TOKEN_SECRET

run npm start

The repo is also ready to be pushed to heroku for deployment

