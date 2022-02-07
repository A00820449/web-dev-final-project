# Final Project  
Live version: <https://todoapp.a00820449.ml/>  
Needs NodeJS, NPM, and a MongoDB database.
## Client
To deploy, make sure to have an .env file inside the /client directory with the values for `REACT_APP_API_BASE_URL` (the url used for the backend server) and `DEPLOY_PORT` (if you choose to self-host the frontend).  
Otherwise, you can just run `npm run build` inside the /client directory to generate the static files inside the /build directory.
## Server
To deploy, make sure to have an .env file inside the /server directory with the values for `MONGODB_CONNECTION_STRING` (the connection string for the MongoDB database), `PORT` (the port to use), and `JWT_SECRET` (the secret that will be used to generate/authenticate the JWTs).  
## Deployment
This project uses PM2 to daemonize the servers for the frontend and backend, be sure to install it: <https://pm2.keymetrics.io/>  
To deploy each part individually, inside the respective /client or /server directory, run `npm install` to install dependencies, then `npm run deploy` to initialize the daemon.  
If you want to deploy both of them, then you can just run `npm run deploy` inside the root directory.