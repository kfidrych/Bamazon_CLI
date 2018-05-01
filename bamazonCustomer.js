var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "tottis12",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("\nWelcome to Bamazon!\nHere is what we have in stock!\n")
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + results[i].product_name + " | Price: $" + results[i].price);
        }
        purchaseItem();
    })
}

function purchaseItem() {
    inquirer.prompt([
        {
            type: "input",
            name: "idChoice",
            message: "Please enter the ID of the item you would like to purchase: "
        },
        {
            type: "input",
            name: "quantityChoice",
            message: "Please enter quantity of item you would like to purchase: "
        }
    ]).then(function (response) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: response.idChoice }, function (err, results) {
            if (err) throw err;
            var userChoice = parseInt(response.quantityChoice);
            var itemStock = parseInt(results[0].stock_quantity);
            var itemPrice = parseFloat(results[0].price);
            var orderTotal = itemPrice * userChoice;
            if (userChoice <= itemStock) {
                console.log("We have that in stock!");
                var newQuantity = itemStock - userChoice;
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        { stock_quantity: newQuantity },
                        { item_id: response.idChoice }
                    ]), function(err, result) {
                        if (err) throw err;
                    };
                console.log("Order placed!");
                console.log("Your total is: $" + orderTotal);
                connection.end();
            } else {
                console.log("INSUFFICIENT QUANTITY\nPlease try your order again with a different quantity.\n");
                purchaseItem();
            }
        })
    })
}