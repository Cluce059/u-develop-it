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

////handles unsupported user reqs must be below other req routes
app.use((req, res) => {
    res.status(404).end();
});

//starts express server on port 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});