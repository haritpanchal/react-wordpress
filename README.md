This repository shows integration of React with WordPress

# Installation Steps

1. Clone this repo in your system.
2. Change directory `cd/react-wordpress`.
3. Run `npm install`.
4. Move `react-wordpress-theme` to your WordPress setup `/wp-content/themes/` and **Activate** the theme.
5. Change **WP_URL** to your WordPress url to src/WPConfig.js.
6. Run `npm start` at your repo location (react-wordpress).
7. Voila! 

# How it works:

1. REST endpoints created using WordPress REST API.
2. APIs are used in React JS framework to handle data.

# API Endpoints:

1. /auth/login
2. /auth/register
3. /auth/getAllUsers
4. /user/getDetails
5. /user/deleteUser
6. /user/updateDetails
7. /user/forgotPassword
8. /user/changePassword
9. /user/confirmOTP
10. /user/resetPassword

# Dependancies used for React JS

1. [Material UI](https://mui.com)
2. [React Router](https://reactrouter.com/en/main)

# WordPress plugins used
1. WP Mail SMTP
