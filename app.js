const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const app = express.Router();

const Employee = require('./models/employee.model.js').Employee;

app.use(bodyParser.json());

// app.get('/list', (req, res) => {
//     Employee.find()
//     .then((employees) => res.status(200).send(employees))
//     .catch((err) => res.status(400).send(err));
// });

app.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    }).lean(); // It is prevent the warning when trying to display records;
});

// app.post('/employees', (req, res) => {
//   const body = req.body;
//   const note = new Note({
//     fullName: body.name,
//     text: body.text
//   });
//   note.save(note)
//     .then((note) => res.status(201).send(note))
//     .catch((err) => res.status(400).send(err));
// });

module.exports = app;