

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
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price+ " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }

