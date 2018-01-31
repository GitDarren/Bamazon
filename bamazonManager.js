


///Challenge Two: Manager View//////


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
connection.connect(function (err) {
    if (err) throw err;
    // run the ????? function after the connection is made to prompt the user
    // function();
});


  /////Psuedocoding this shit//////

  ///First present the manager with four options using inquirer///
       ///View Products for Sale
      ///View Low Inventory  
      ///Add to Inventory
      ///Add New Product
  /// Try to set an inquirer prompt that allows the user via CLI to click up or down to select their choice//

  ///If a manager selects View Products for Sale...///
  ///...then run the function queryAllProducts (just like in Customer app).../// 
  ///...the app should list every available item: the item IDs, names, prices, and quantities.///

  ///If a manager selects View Low Inventory/// 
  ///then the app should run a function lowInv() that will display a list.../// 
  ///...of all items with an inventory count lower than five.

  ///If a manager selects Add to Inventory///
  ///Using inquirer, display a prompt that asks the manager to input the number of addition items they want to add//
  ///then run the function addInv() that adds the additional items to the stock_quantity and returns...///
  ///... The update stock_quantity to the manager///

  ///If a manager selects Add New Product///
  ///Using Inquirer, prompt the user to add the product to the store///
  ///I need to see if this is a single prompt/response or if I can have all four descriptions pop up at once///
  ///And maybe just run the queryAllSongs again to show the updated product list with the new product added///


