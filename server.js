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
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
};

const viewEmployees = () => {
    connection.query(
        'SELECT E.id, E.first_name, R.title, D.name AS department, R.salary, CONCAT(M.first_name, " ", M.last_name) AS manager FROM employee E JOIN role R ON E.role_id = R.id JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;',
        (err, results) => {
            console.table(results);
            promptMenu();
        });
};