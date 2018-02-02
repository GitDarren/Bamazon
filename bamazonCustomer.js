



/////////Amazon-like CLI Application using Node.js and MySQL///////////////////

var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require('table');
var chalk = require('chalk');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "Bamazon"
});

//////Creating console prompt to users/////////
console.log(chalk.red(
    " ----------------------------------------\n" +
    " Welcome to the Bamazon App. \n" +
    "   Where deals are just okay!                \n" +
    " ----------------------------------------\n") +
    " Want to Shop?\n" +
    " 1. The App will display a list of available itemst\n" +
    " 2. Along with pricing and current stock availability\n" +
    " 5. Select the item you want and the amount you wish to purchase\n" +
    " 6. If there is sufficient stock, you get a grand total\n" +
    " 7. If not, you will be told that and asked what else you would like to purchase\n" +
    " 10. That's it.");

////////Setting up the start of the game, asking users to decide if they wish to play the game//////
////////Users an inquirer prompt to give the user the ability to say yes or no to playing////////
var startShopping = function () {
    inquirer.prompt([
        {
            type: "text",
            name: "choice",
            message: chalk.blue("Would you like to start shopping for deals (y/N)?"),
            validate: function (str) {
                /* regular expression to accept only characters and that to of length 1 */
                var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                return regEx.test(str);
            },
        }
    ]).then(function (answer) {////////Basically checks to see if the user types y/Y and starts the game, otherwise asks again///
        var choice = answer.choice;
        if (choice === "y" || choice === "Y") {
            startApp();
        } else {
            startshopping();
        }
    });
};






var startApp = function () {
    // connect to the mysql server and sql database
    connection.connect(function (err) {
        if (err) throw err;
        queryAllProducts();
        promptCustomer();
    });
}

/////Create a start function the shows all of the products with associated information in the command line//////
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res, data) {
        if (err) throw err;
        var data = [["Id", "Product", "Department", "Price", "Stock"]];
        for (var i = 0; i < res.length; i++) {
            data.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table(data));
        // promptCustomer();
    });
};

/////Next, create an inquirer prompt that asks the user two questions////
////First question is what item would they like to purchase////
///Then, based on their answer ask them home many of the item they would like to purchase///////

var promptCustomer = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        ///use inquirer prompt to ask the user what product do they want to buy///
        ///Create variable for the user response that will be used in promptquantity///
        inquirer
            .prompt([
                {
                    name: "productSelection",
                    type: "list",
                    choices: function () {
                        var productArray = [];
                        for (var i = 0; i < res.length; i++) {
                            productArray.push(res[i].product_name);
                        }
                        return productArray;
                        console.log("this is working - line 60");
                    },
                    message: "What is the item you would like to purchase?",
                },
                {
                    name: "purchasequantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        console.log("\nPlease input a number!\n")
                        return false;
                    }
                },
            ])
            .then(function (answers) {
                console.log(`The customer wants to buy ${answers.purchasequantity} ${answers.productSelection}`);
                connection.query("SELECT * FROM products WHERE ?",
                    { product_name: answers.productSelection }, function (err, res) {
                        if (err) {

                            console.log("This function is not working");
                        };
                        // console.log(res);
                        var customerquantity = answers.purchasequantity;
                        var stockquantity = res[0].stock_quantity;
                        var productSelection = answers.productSelection;
                        var price = res[0].price;

                        if (customerquantity > stockquantity) {
                            console.log("---------------------------------\n");
                            console.log('We do not have enough of that item to complete your order.\n');
                            console.log('Please select another item!');
                            console.log("---------------------------------\n")
                            promptCustomer();
                            return (false);

                        } else {
                            var query = "UPDATE products SET ? WHERE ?";
                            connection.query(query, [
                                { stock_quantity: stockquantity - customerquantity },
                                { product_name: answers.productSelection }
                            ], function (err, res) {
                                console.log(chalk.yellow(`Your Order of ${customerquantity} ${productSelection} has been made`));
                                console.log(chalk.green(`new Quantity is ${stockquantity - customerquantity}`));
                                console.log(chalk.blue.bold(`Your Grand Total is $${price * customerquantity} for ${customerquantity} of ${productSelection}`));
                                keepShopping();

                            },
                            )
                        }
                    })
            });
    })
}


var keepShopping = function () {
    inquirer
        .prompt([
            {
                name: "continue",
                type: "confirm",
                message: "Would you like to keep shopping?"
            }
        ])
        .then(function (answer) {
            if (answer.continue) {
                queryAllProducts();
                promptCustomer();
            } else {
                connection.end();
                console.log("---------------------------------\n")
                console.log("Thank you for shopping at Bamazon");
            };

        })
};

startShopping();

////Once the user inputs the number of items they want, then we need to run a function that first checks...////
////...to see if there are enough products on hand.  ////
////IF NOT, then return "I'm sorry, there are not enough ${product_name} in stock to fill your order"///


    ///use inquirer prompt to ask the user how many products they want///
    ///use variable created in promptCustomer to pass into function parameter//




    ///run a function that checks the stock_quantity is greater than the promptquantity amount///
    ///takes in two parameters, item_id, stock_quantity///



///If there ARE enough of the item, then run a function productPurchase() that will subtract the purchase number 
///...from the stock_quantity///


    ///Connect to the database and update database with total stock_quantity.  
    ///Will need to subtract//


////And return a grand total for the purchase. This would be a function grandTotal() that multiplies the..///
///...price by stock_quantity/////



///End of Customer Application/////

