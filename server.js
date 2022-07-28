const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
require('console.table');

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

const 

