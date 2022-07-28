const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    // findAllEmployees() {
    //     //for us, we can jsut select all from employee table and log it out. below is the bonus. 
    //     return this.connection.promise().query(
    //         "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last name) AS mananger FROM employee LEFT JOIN role on employee. role_id = role.id LEFT JOIN department on role.department_id = department. id LEFT JOIN employee manager on manager.id = employee.manager_id; "
    //     );
    }
}