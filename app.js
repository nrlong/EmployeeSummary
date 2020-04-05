const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = [];

console.log("We will be building your team now.  Please complete the follwing fields")


const managerQuestions =[
    {
        type: "input",
        message: "Manager's name.",
        name: "name"
    },{
        type: "input",
        message: "Please enter manager ID number.",
        name: "id"
    },{
        type: "input",
        message: "Please enter manager's email Address.",
        name: "email"
    },{
        type: "input",
        message: "Please enter manager's office phone number.",
        name: "office"
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "Please enter engineer's name.",
        name: "engineerName"
    },{
        type: "input",
        message: "Please enter engineer's ID number.",
        name: "engineerID"
    },{
        type: "input",
        message: "Please enter engineer's email address.",
        name: "engineerEmail"
    },{
        type: "input",
        message: "Please enter engineer's GitHub username.",
        name: "engineerGithub"
    }
];

const internQuestions = [
    {
       type: "input",
       message: "Please enter intern's name.",
       name: "internName" 
    },{
        type: "input",
        message: "Please enter intern's ID number.",
        name: "internID"
    },{
       type: "input",
       message: "Please enter intern's email address.",
       name: "internEmail" 
    },{
        type: "input",
        message: "Please enter inter's school attended.",
        name: "internSchool"
    }
];

const employeeType = {
    type: "list",
    choices: [
        "Manager",
        "Engineer",
        "Intern",
        "--Quit--"
    ],
    message: "What type of Team Member would you like to add?",
    name: "employeeChoice"  
}

function generateTeam(){
    inquirer.prompt(employeeType).then(function(answers){
        if(answers.employeeChoice === "Engineer"){
            inquirer.prompt(engineerQuestions).then(function(answers){
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            employees.push(engineer);
            console.log(engineer);
            generateTeam();
        });
        }else if (answers.employeeChoice === "Intern"){
            inquirer.prompt(internQuestions).then(function(answers){
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            employees.push(intern);
            console.log(intern);
            generateTeam();
        });
        }else if (answers.employeeChoice === "Manager"){
            inquirer.prompt(managerQuestions).then(function(answers){
            const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
            employees.push(manager);
            console.log(manager)
            generateTeam();  
        })
        }else{
            writeToHtml();
        }
    })
};


generateTeam();

function writeToHtml(){
    fs.writeFileSync(outputPath, render(employees), "utf-8"),
    function (err){
        if (err){
            throw err
        }
    };
    console.log("Operation complete.  Your team is ready to be viewed!");
}