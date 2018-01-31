

/////////Amazon-like CLI Application using Node.js and MySQL///////////////////

var mysql = require("mysql");
var inquirer = require("inquirer");
var { table } = require('table');

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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the ????? function after the connection is made to prompt the user
    queryAllProducts();
});

/////Create a start function the shows all of the products with associated information in the command line//////
function queryAllProducts() {
    connection.query("SELECT * FROM products", function (err, res, data) {
        if (err) throw err;
        var data =[["Id", "Product", "Department", "Price", "Stock"]];
        for (var i = 0; i < res.length; i++) {
                data.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
            }
            console.log("-----------------------------------");
            console.log(table(data));
            // promptCustomer();
            //   console.table([shirt]);
        
    });
};

/////Next, create an inquirer prompt that asks the user two questions////
////First question is what item would they like to purchase////
///Then, based on their answer ask them home many of the item they would like to purchase///////

var promptCustomer = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        ///use inquirer prompt to ask the user what product do they want to buy///
        ///Create variable for the user response that will be used in promptQuantity///

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
                    name: "purchaseQuantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === true) {
                            return value;
                            console.log("this is working line 70")
                        }
                        return false;
                        console.log("you cheap bastard.  Buy more!")
                    }
                },
            ])
            .then(function (answer) {
                //
                var chosenItem;
                console.log("This is working - Line 83");
            });
    })
}
promptCustomer();

////Once the user inputs the number of items they want, then we need to run a function that first checks...////
////...to see if there are enough products on hand.  ////
////IF NOT, then return "I'm sorry, there are not enough ${product_name} in stock to fill your order"///

var promptQuantity = function () {
    ///use inquirer prompt to ask the user how many products they want///
    ///use variable created in promptCustomer to pass into function parameter//

}

var checkQuantity = function () {
    ///run a function that checks the stock_quantity is greater than the promptQuantity amount///
    ///takes in two parameters, item_id, stock_quantity///
}


///If there ARE enough of the item, then run a function productPurchase() that will subtract the purchase number 
///...from the stock_quantity///

var productPurchase = function () {
    ///Connect to the database and update database with total stock_quantity.  
    ///Will need to subtract//
}

////And return a grand total for the purchase. This would be a function grandTotal() that multiplies the..///
///...price by stock_quantity/////

var grandTotal = function () {
    ///return grand total of purchase by multiplying price by stock_quantity
    /// console log the grand total///
}

///End of Customer Application/////

