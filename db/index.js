const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findDepartments() {     
        return this.connection.promise().query(
            "SELECT * FROM department"

       );
    }

    findRoles() {     
        return this.connection.promise().query(
            "SELECT * FROM roles"

       );
    }
    
    findEmployees() {     
        return this.connection.promise().query(
            "SELECT * FROM EMPLOYEE"

       );
    }

    addDepartment () {

    }

    addRole () {
        
    }

    addEmployee () {
        
    }

    updateRole () {
        
    }
}

    module.exports = new DB(connection);

    // const viewEmployees = () => {
    //     connection.query(
    //         'SELECT * FROM employee',
    //         (err, results) => {
    //             console.table(results);
    //             promptMenu();
    //         });