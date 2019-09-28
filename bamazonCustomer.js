
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Edsheeran1//",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    // runSearch();
    start()
  });

function start(){
  let query = "SELECT * FROM products";

  connection.query(query, function (err,results){
    if(err) return console.log(err);
    console.table(results);
    ask();
  })
}

function ask(){
  inquirer
      .prompt([
        {
          type: "number",
          name: "id",
          message: "what's the id of the item you want to purchase?"
        },
        {
          type: "number",
          name: "quantity",
          message: "how many of them do you want?"
        }
      ])
      .then(function(val) {
        let query = `SELECT stock_quantity FROM products WHERE id = ${val.id}`;

        connection.query(query, function (err,results){
          if(err) return console.log(err);
          //console.log("results: ",results);
          let quantity = results[0].stock_quantity;
          if(quantity >= val.quantity){
            purchase(quantity, val.quantity, val.id)
          }
          else{
            console.log("there's not enough sry")
            connection.end();
          }
        })
      });
}

function purchase(currentQuantity, requestedQuantity, id){
    let stockQuery = `UPDATE products SET stock_quantity = ${currentQuantity - requestedQuantity} WHERE id = ${id}`;
    connection.query(stockQuery, function (err,results){
    if(err) return console.log(err);
    anotherId();
  })
}

function anotherId(){
    inquirer
    .prompt([
      {
        type: "confirm",
        name: "anotherPurchase",
        message: "Would you like to buy another item (Y/N)?"
      }
    ])
    .then(function(val){
        console.log(val);
        if(val.anotherPurchase = true){
            start();
        }
    })
}


