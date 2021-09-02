const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// //get route to confirm connection to express server
app.get('/api/candidates', (req, res) =>{
  const sql = `SELECT * FROM candidates`;
  db.query(sql, (err, rows) => {
    if(err){
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

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

  //runs query and executes callback with results
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });
//get candidate by id
// db.query(`SELECT * FROM candidates WHERE id=1`, (err, row) => {
//   if(err){
//     console.log(err);
//   }
//   console.log(row);
// });

//ability to deleted candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//   if(err){
//     console.log(err);
//   }
//   console.log(result);
// });

//ability to create candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
VALUES(?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//   if(err){
//     console.log(err);
//   }
//   console.log(result);
// });
////handles unsupported user reqs must be below other req routes
app.use((req, res) => {
    res.status(404).end();
});

//starts express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});