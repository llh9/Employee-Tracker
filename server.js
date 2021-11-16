const express = require('express');
const inquirer = require('inquire');
const input = require('input');
//const consTbl = require('console.table');
const mysql = require('mysql2');
const { query, response } = require('express');
const cTable = require('console.table');
//const router = express.Router();
require('dotenv').config();


const opts1 = [ 'View', 'Add', 'Update Employee Role' ];
const opts2 = [ 'Employee', 'Role', 'Department'];

var newDpt = [''];
var newRle = ['','','',''];
var newEmp = ['','','','',''];

var dptCounter = 0;
var rleCounter = 0;
var empCounter = 0;

var taskNum = 0;
var done = false;
 
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(router);

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'onelovefamily',
        database: 'employer_db',
        multipleStatements: true
    },
    console.log(`Connected to the employer_db database...`)
);

const pool = mysql.createPool(
    {
      host: process.env.DB_HOST, 
      user: process.env.DB_USER, 
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
    }
);


const init  = async () =>{
    if(employer_db){
        pool.execute('source db/schema.sql; source db/seeds.sql; SELECT * FROM employer_db', function(err, result) {

            if(err) throw err;
            /*console.log(result);*/
            result.forEach((res) => {
                let table = cTable.getTable(res);
                console.log(table);
            })
            input.confirm('Would you like to complete another task?').then((response) => {
                console.log(response);
            })
        
        });
    }else{
        
    }
}



const editDb = (taskNum, []) => { 
    
    switch (taskNum) {
        case 1:
            //show departments 
            db.query('SHOW FULL TABLE IN employer_db LIKE departments', function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            });

        break;
        case 2:
            //show roles 
            db.query('SHOW FULL TABLE IN employer_db LIKE departments', function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            }); 
        break;
        case 3:
            //show employees
            db.query('SHOW FULL TABLE IN employer_db LIKE departments', function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            });  
        break;
        case "4":
            //add departments
            let sql = 'SELECT * FROM employee;';
            pool.execute(sql, function(err, result) {

                if(err) throw err;
                /*console.log(result);*/
                result.forEach((res) => {
                    let table = cTable.getTable(res);
                    console.log(table);
                })
                input.confirm('Would you like to complete another task?').then((response) => {
                    console.log(response);
                    response == false ? done = true : run();
                })
                
            });
            break;
        case 5:
            //add roles
            db.query(`INSERT INTO role (id, name) (${newRle[0]}, ${newRle[1]}, ${newRle[2]}, ${newRle[3]});`, function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            });
        break;
        case 6:
            //add employees
            db.query(`INSERT INTO employee (id, name) (${newDpt[0]}, ${newDpt[1]}`, function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            });
        break; 
        case 7:
            //update employees
            db.query('UPDATE `employee` SET ? = ? WHERE `first_name` = ? AND `last_name` = ?;',[role, value], function (err, results) {
                console.log(`\nThis is from console log: \n${results}`);
            });
        break;
        default: console.info(`Case statements no match`);

        
    }
    
}

const addDpt = async () => {

    taskNum = "4";
    input.text('What is the new department'+"'"+'s name?', { default: 'newDepartmetn' })
    .then(async (response) => {
        
        newDpt = await response.toString();
        console.info(`new dpt array[${newDpt}] and the Task Num:"${taskNum}"`);
        console.info(`Respoonse: [${response}]`);
    })
    .then((response) =>{
        console.info(`new dpt array[${newDpt}] and the Task Num:"${taskNum}"`);
        editDb(taskNum, newDpt);
    })
}

const addRle =  () => {

    inquirer.prompt([
        {
            type: 'input', 
            name: 'jobTitle', 
            message: 'Enter the job title.', 
            default: `role${dptcounter}`
        },
        {
            type: 'number', 
            name: 'jobSalary', 
            message: 'Enter the job title.', 
            default: '100000'
        },
        {
            type: 'input', 
            name: 'jobDepartment', 
            message: 'Enter the job department name.', 
            default: `department${dptcounter}`
        }

    ])
    .then((answers) => {

        newRle = [ answers.jobTitle, answers.jobSalary, answers.jobDepartment ]

    })
    .catch((error) => {

        if (error.isTtyError) {

            console.log("Prompt couldn't be rendered in the current environment");

        } else {

            console.log("something else went wrong");
        }

    });
}

const addEmp = () => {
    inquirer.prompt([
        {
            type: 'input', 
            name: 'firstName', 
            message: 'Enter the first name.', 
            default: 'Employee'
        },
        {
            type: 'input', 
            name: 'lastName', 
            message: 'Enter the last name.', 
            default: `${empCounter}`
        },
        {
            type: 'input', 
            name: 'role', 
            message: 'Enter the job title for this employee.', 
            default: `jobNumber${rleCounter}`
        },
        {
            type: 'number', 
            name: 'empSalary', 
            message: 'Enter the yearly salary of this employee.', 
            default: `department${dptcounter}`
        }

    ])
    .then((answers) => {

        newEmp = [ answers.firstName, answers.lastName, answers.role, answers.empSalary ]

    })
    .catch((error) => {

        if (error.isTtyError) {

            console.log("Prompt couldn't be rendered in the current environment");

        } else {

            console.log("something else went wrong");
        }

    });
}

async function showTrackerOptions() {

    input.select('Would you like to see or edit a data.?', opts1, { 

        validate(answer) {
            console.log(answer);
        }
    })
    .then((response) => {
        switch (response) {
            case 'View':

            input.select('Select a task or display.', opts2, {
                validate(display) {

                    switch (display) {
                        case 'Employee':
        
                        break;
                        case 'Role':
        
                        break;
                        case 'Department':
        
                        break;
                        default: 'Employee'
                    }
                }
            });

            break;
            case 'Add':

            input.select('What would you like to add', opts2, {
                validate(answer) {
                    console.log(answer)
                }
            })
            .then((response) => {

                switch (response) {
                    case 'Employee':
    
                    break;
                    case 'Role':
    
                    break;
                    case 'Department':
                        addDpt();
                    break;
                    default: 'Employee'
                }
            })

            break;
            case 'Update Employee Role':

            const name = input.text('What is your name?', { default: 'New Role' });

            break;
            default: 'View'
        }
    });   //return `You have chosen only ${answer.length} animals! Keep trying!`;
        
}

const run = () => { 
    if(done == false) { 
        showTrackerOptions();
        return;
    }
    console.log('press [control]+[c]');
}

if(done == false){
    console.log(done);
    
    showTrackerOptions();
}else{
    done = true;
    console.log('reset');
    return;
}

app.listen(process.env.PORT || 3001)