const express = require('express');
const inquirer = require('inquire');
const input = require('input');
const consTbl = require('console.table');
const mysql = require('mysql2');
const { query } = require('express');

const opts1 = [ 'View', 'Add', 'Update Employee Role' ];
const opts2 = [ 'Employee', 'Role', 'Department'];

var newDpt = [];
var newRle = [];
var newEmp = [];

var dptCounter = 0;
var rleCounter = 0;
var empCounter = 0;

var done = false;

const editDb = async (edit = []) => {
    
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

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
        console.log(`Connected to the employer_db database.`)
    );
    

}

const addDpt = async () => {

    const dptName = await input.text('What is your name?', { default: 'newDepartmetn' })

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

    const do1st = input.select('Would you like to see or edit a data.?', opts1, {
        validate(taskOrView) {

            switch (taskOrView) {
              case 'View':

                const seeWhat = input.select('Select a task or display.', opts2, {
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
                })

              break;
              case 'Add':

                const addwhat = input.select('Select a task or display.', opts2, {
                    validate(add) {

                        switch (add) {
                            case 'Employee':
            
                            break;
                            case 'Role':
            
                            break;
                            case 'Department':
            
                            break;
                            default: 'Employee'
                        }
                    }
                })

              break;
              case 'Update Employee Role':

                const name = input.text('What is your name?', { default: 'New Role' });

              break;
              default: 'View'
            }
            return `You have chosen only ${answer.length} animals! Keep trying!`;
        }
    })
}

if(done == true){
showTrackerOptions();
};

app.listen(process.env.PORT || 3001)