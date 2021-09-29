# Getting Started with Todo App --By CHETHAN

-->> Create google oauth credentials and use http://localhost:{PORT}:/users/auth/google/verify as callback url

->> Install mongodb and create .env file in the backend directory and add the following:

#########################################

PORT=3004\n
DB_URL="mongodb://localhost:27017/Todo"\n
SESSION_KEY={ANY STRING OF YOUR CHOICE}\n
SESSION_SCRT={ANY STRING OF YOUR CHOICE}\n
GOOGLE_OAUTH2_CLIENT_ID={YOUR_GOOGLE_OAUTH_ID}\n
GOOGLE_OAUTH2_CLIENT_SECRET={YOUR_GOOGLE_OAUTH_SECRET}\n
###########################################

-->>Navigate to "backend" directory and run the following command to start backend-server
npm install
npm start or npm run dev

-->>Navigate to "frontend" directory and run the following command to start frontend-server
npm install
npm start

-->> Headover to http://localhost:3000 and login with your google account to enjoy the app
