const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const db = require("./db");
const express = require('express');
const QueryString = require('qs');
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
    db.findDepartments()
        .then(([results]) => {let departments=results;
            console.table(departments);
        })
        .then(() => promptMenu())
    };

const viewRoles = () => {
    db.findRoles()
    .then(([results]) => {let roles=results;
        console.table(roles);
    })
    .then(() => promptMenu())
}   ;

const viewEmployees = () => {
    db.findEmployees()
        .then(([results]) => { let employees=results;
            console.table(employees);
        })
        .then(() => promptMenu())
    };

function promptAddDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What department would you like to add?'
        }])
        .then(function(answer) {
            console.log(answer);
            connection.query("INSERT INTO department SET?", {
                name:answer.name   
            }, function(error) {
                if (error) throw error;
                console.log("added department");
                
            })
            promptMenu();
        })

    };

function promptAddRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        }])
        .then(function(answer) {
            console.log(answer);
            connection.query("INSERT INTO roles SET?", {
            title:answer.title  
            }, function(error) {
                if (error) throw error;
                console.log("added role");
                    
            })
            promptMenu();
        })
    
    }; 
    
function promptAddEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?'
        }])
        .then(function(answer) {
            console.log(answer);
            connection.query("INSERT INTO employee SET?", {
            name:answer.name   
            }, function(error) {
                if (error) throw error;
                console.log("added employee");
                        
            })
            promptMenu();
        })
        
    }; 

function promptUpdateRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What role would you like to update?'
        }])
        .then(function(answer) {
            console.log(answer);
            connection.query("INSERT INTO roles SET?", {
                name:answer.name  
            }, function(error) {
                if (error) throw error;
                console.log("updated role");
                            
            })
            promptMenu();

        })
            
    }; 
        
        // .then(([answers]) => {let addDepartment=answers;
        //     console.table(addDepartment);
        // })
        // .then(() => promptMenu())
    
    // db.addepartment()
    //     .then(([results]) => {let departments=results;
    //         console.table(departments);
    //     })
    //     .then(() => promptMenu())


promptMenu();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });