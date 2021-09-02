const mysql = require('mysql2');
const express = require('express');
const inputCheck = require('./utils/inputCheck');

const PORT = process.env.PORT || 3001;
const app = express();

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

// //get route to confirm connection to express server
app.get('/api/candidates', (req, res) =>{
  const sql = `SELECT candidates.*, parties.name 
                AS party_name 
                FROM candidates 
                LEFT JOIN parties 
                ON candidates.party_id = parties.id`;
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

// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT candidates.*, parties.name 
              AS party_name 
              FROM candidates 
              LEFT JOIN parties 
              ON candidates.party_id = parties.id 
              WHERE candidates.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

//api route to update candidate party
app.put('/api/candidate/:id', (req, res) => {
  //forces each put req to inlcude a party_id property
  const errors = inputCheck(req.body, 'party_id');

  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE candidates SET party_id = ?
                WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if(err){
      res.status(400).json({ error: err.message });
      //check if record is found
    } else if (!result.affectedRows){
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

//delete route CRUD
app.delete('/api/party/:id', (req, res) => {
  const sql = `DELETE FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if(err){
      res.status(400).json({ error: res.message });
      //checks if something was deledted
    } else if (!result.affectedRows){
      res.json({
        message: 'Party not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

//route to parties endpoint
app.get('/api/parties', (req, res) => {
  const sql = `SELECT * FROM parties`;
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

//id route for single party
app.get('/api/party/:id', (req, res) =>{
  const sql = `SELECT * FROM parties WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, row) => {
    if(err){
      res.status(400).json({ error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});

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