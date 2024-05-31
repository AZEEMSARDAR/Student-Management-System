#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Enum to define tuition fees for each subject.
var Course;
(function (Course) {
    Course[Course["HTML"] = 2200] = "HTML";
    Course[Course["CSS"] = 3000] = "CSS";
    Course[Course["JavaScript"] = 4000] = "JavaScript";
    Course[Course["TypeScript"] = 5000] = "TypeScript";
})(Course || (Course = {}));
// Function to calculate tuition fee based on the subject name.
function tuitionfee(subjectName) {
    return Course[subjectName];
}
async function main() {
    console.log(chalk.yellow("            WELCOME TO THE STUDENT MANAGEMENT SYSTEM            "));
    const studentID = Math.floor(6000 + Math.random() * 7000);
    let mybalance = 10000;
    const answers = await inquirer.prompt([
        {
            name: "studentName",
            type: "input",
            message: "Enter student name?",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter valid student name";
            }
        },
        {
            name: "subjectname",
            type: "list",
            message: "In which course would you like to enroll?",
            choices: ["HTML", "CSS", "JavaScript", "TypeScript"]
        }
    ]);
    console.log(chalk.bgGreen.black(`\nYour Tuition Fee for the Selected Course is: ${tuitionfee(answers.subjectname)}/-`));
    console.log(chalk.bgBlue.white("Enter Your Payment Method\n"));
    const paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select payment type: ",
            choices: ["Bank Transfer", "EasyPaisa", "Jazz Cash"]
        },
        {
            name: "amount",
            type: "input",
            message: "Enter your course fees amount: ",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter your amount";
            }
        }
    ]);
    console.log(chalk.bgRed.white(`\nYour Current Balance is ${mybalance}`));
    console.log(chalk.bgBlue.white(`You have selected the payment method: ${paymentType.payment}`));
    const payment1 = parseInt(paymentType.amount);
    const tuitionfees = tuitionfee(answers.subjectname);
    if (payment1 >= tuitionfees) {
        console.log(chalk.bgGreen.black(`Congratulations! Your fees have been Paid You have Successfully enrolled in: ${answers.subjectname} Course`));
        console.log(chalk.white("------------------------------------------------------------------------------------------------------------------"));
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["View Status", "Exit"]
            }
        ]);
        if (ans.select === "View Status") {
            console.log(chalk.bgYellow.black("\n**********Status**********"));
            console.log(chalk.white("-------------------------------------------"));
            console.log(`Student Name: ${answers.studentName}`);
            console.log(`Student ID: ${studentID}`);
            console.log(`Course Name: ${answers.subjectname}`);
            console.log(`Tuition Fees Paid: ${payment1}`);
            console.log(`Balance: ${mybalance -= payment1}`);
        }
        else {
            console.log(chalk.yellow(`\nExiting Student Management System`));
        }
    }
    else {
        console.log(chalk.red(`\nInvalid amount! Payment should be equal to or greater than the tuition fee`));
    }
}
// Call the main function to start the program
main();
