const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const db = require("./db");
const express = require('express');
require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee_tracker'
})

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please select from the following options',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Exit' ]
  
        }])
        .then(userChoice => {
            switch (userChoice.menu) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    promptAddDepartment();
                    break;
                case 'Add a role':
                    promptAddRole();
                    break;
                case 'Add an employee':
                    promptAddEmployee();
                case 'Update an employee':
                    promptUpdateRole();
                    break;
                default:
                    process.exit();
            }
        });
};

const viewDepartments = () => {
    connection.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
};

const viewRoles = () => {
    connection.query(
        'SELECT * FROM roles;',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
};

const viewEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
}
const promptAddDepartment = () => {
    connection.query(
        'SELECT * FROM employee',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
}

promptMenu();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
