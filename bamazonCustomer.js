

/////////Amazon-like CLI Application using Node.js and MySQL///////////////////

var mysql = require("mysql");
var inquirer = require("inquirer");

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
  connection.connect(function(err) {
    if (err) throw err;
    // run the ????? function after the connection is made to prompt the user
    queryAllProducts();
  });

/////Create a start function the shows all of the products with associated information in the command line//////
  function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price+ " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

/////Next, create an inquirer prompt that asks the user two questions////
////First question is what item would they like to purchase////
///Then, based on their answer ask them home many of the item they would like to purchase///////


////Once the user inputs the number of items they want, then we need to run a function that first checks...////
////...to see if there are enough products on hand.  ////
////IF NOT, then return "I'm sorry, there are not enough ${product_name} in stock to fill your order"///

///If there ARE enough of the item, then run a function productPurchase() that will subtract the purchase number 
///...from the stock_quantity///

////And return a grand total for the purchase. This would be a function grandTotal() that multiplies the..///
///...price by stock_quantity/////

///End of Customer Application/////

