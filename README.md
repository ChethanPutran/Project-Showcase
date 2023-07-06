# Getting Started with ProfileShowCase App --By CHETHAN

-->> Create google oauth credentials and use http://localhost:{PORT}:/users/auth/google/verify as callback url

->> Install mongodb and create .env file in the backend directory and add the following:

#########################################

# PORT=3004

# DB_URL="mongodb://localhost:27017/Project"

# SESSION_KEY={ANY STRING OF YOUR CHOICE}

# SESSION_SCRT={ANY STRING OF YOUR CHOICE}

# GOOGLE_OAUTH2_CLIENT_ID={YOUR_GOOGLE_OAUTH_ID}

# GOOGLE_OAUTH2_CLIENT_SECRET={YOUR_GOOGLE_OAUTH_SECRET}

###########################################

-->>Navigate to "backend" directory and run the following command to start backend-server
npm install
npm start or npm run dev

-->>Navigate to "frontend" directory and run the following command to start frontend-server
npm install
npm start

-->> Headover to http://localhost:3000 and login with your google account to enjoy the app
