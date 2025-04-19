# Twitter-Like React Application

This is a Twitter-like platform built with React.js. The application includes features such as user authentication, data visualizations, and routing between different pages. The app is designed to simulate a simple social media platform where users can see tweets, view profiles, and see various charts and statistics based on the data.

## Features:
- **Authentication**: A fake authentication system is used where users can log in with predefined credentials.
- **Charts**: Data visualizations using Chart.js to display insights like tweet frequency, word usage, and demographic distribution.
- **Routing**: React Router is used for navigation, enabling users to switch between the login page, dashboard, tweets, and user profiles.
- **Data Fetching**: Uses json-server to simulate an API for fetching user and tweet data.

## Setup Instructions:

1. **Run json-server**:
   - First, make sure you have json-server installed. If not, you can install it globally via npm:
     ```bash
     npm install -g json-server
     ```
   - Once installed, navigate to the project folder and run:
     ```bash
     json-server --watch db.json --port 3000
     ```
   - This command will start the fake API on `localhost:3000`. You can refer to [json-server documentation](https://github.com/typicode/json-server) for more details.

2. **Run the Application**:
   - In a new terminal, run the React application on a different port (e.g., 3001):
     ```bash
     npm start
     ```
   - This will launch the app on `localhost:3001` (or another available port).

3. **Login Credentials**:
   - To access the application, use the following credentials on the login page:
     - **Username**: `kullanici`
     - **Password**: `12345678`

4. **Explore the App**:
   - After logging in, you'll be able to explore the dashboard, view tweets, and check out user profiles.
   - The dashboard includes various charts that display user demographics and tweet statistics.
   
## Libraries Used:
- **React.js**: JavaScript library for building user interfaces.
- **Chart.js**: A charting library for creating data visualizations.
- **React Router DOM**: Used for handling routing and page transitions.
- **json-server**: A simple fake REST API for development.
