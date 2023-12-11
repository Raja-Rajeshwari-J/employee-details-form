const db = require("../database");

module.exports = {
    putEmp: (data, callBack) => {
        db.query(
            `insert into employee_details(Emp_ID,Emp_Name,ph_num,designation,dept,date_of_birth,age,experience,salary)
                        values(?,?,?,?,?,?,?,?,?)`,
            [
                data.empId,
                data.name,
                data.phNum,
                data.designation,
                data.dept,
                data.dob,
                data.age,
                data.experience,
                data.salary,
            ],
            (error, results) => {
            if (error) {
                return callBack(error);
                }
            return callBack(null, results);
            }
        );
    },
    
    getEmp: (data, callBack) => {
        db.query(
            `select * from employee_details order by Emp_ID`,
            [],
            (error, results) => {
            if (error) {
                return callBack(error);
                }
            return callBack(null, results);
            }
        );
    },

    deleteEmp: (id, callBack) => {
        db.query(
            `delete from employee_details where Emp_ID = ?`,
            [id],
            (error, results) => {
            if (error) {
                return callBack(error);
                }
            return callBack(null, results);
            }
        );
    }
};