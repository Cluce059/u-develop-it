const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// //get route to confirm connection to express server
// app.get('/', (req, res) =>{
//     res.json ({
//         message: 'Hello World'
//     });
// });

//express middleware
app.use(express.urlencoded({ extened: false}));
app.use(express.json());
//connect to db
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Raisin13.sql!',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

////handles unsupported user reqs must be below other req routes
app.use((req, res) => {
    res.status(404).end();
});

//starts express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});