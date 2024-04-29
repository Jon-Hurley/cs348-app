This is the codebase for my cs348 project. It was built using react for the frontend, 
express for the server, and mysql for the database.

Currently, my database is hosted locally, and the credentials are in a .gitignore.
If I need to change this, please reach out and I would be more than happy to help set up the 
database elsewhere. 

I am also happy to port forward my backend using ngrok or otherwise if the grader wants to run 
the project on my database. It should be easy to recreate the database as long as a config file 
called config.js is created in the src directory nested in the client directory. 

It should be in the format:

// config.js

const config = {
    database: {
      host: 'your host',
      port: your port,
      user: 'your user',
      password: 'your password',
      database: 'your database name'
    }
  };
  
  module.exports = config;

  // end config.js

The indexes are commented out in my code because using IF NOT EXISTS throws an error and 
my code says they are duplicates without that and stops running. Therefore, I created them the first
time I ran the program and then commented them out. If you want them, simply uncomment them on
first run. 

The dependencies are:
mysql2 
cors 
express 
body-parser 
js-sha256 
react 
axios 
react-dom 
react-router-dom
web-vitals 
node 

Starting the client: navigate to the client directory and type: npm start \\
Starting the server: navigate to the server directory and type: node index.js



