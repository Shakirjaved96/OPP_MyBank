#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
console.log(chalk.yellow("Welcome TO My Bank"));
// Bank Account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);
    }
    // Check balance
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
// Customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Create bank accounts
const accounts = [
    new BankAccount(101, 500),
    new BankAccount(102, 1000),
    new BankAccount(103, 2000)
];
// Create customers
const customers = [
    new Customer("Shakir", "Hussain", "Male", 20, 1211, accounts[0]),
    new Customer("Aliza", "Aliza", "Female", 18, 5315, accounts[1]),
    new Customer("Javed", "Memon", "Male", 57, 1021, accounts[2])
];
// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Desposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.red("Exiting bank program..."));
                    console.log(chalk.yellowBright("\n Thank you for using our bank services. Have a great day!"));
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
