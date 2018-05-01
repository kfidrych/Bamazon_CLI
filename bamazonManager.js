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
    console.log("\nWelcome to Bamazon Manager!\n");
    inquirer.prompt({
        type: "list",
        name: "function",
        message: "Please select a function to perform: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (response) {
        switch (response.function) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
        };
    });
};

function newFunction() {
    console.log("");
    inquirer.prompt({
        type: "confirm",
        name: "progression",
        message: "Would you like to perform another function?"
    }).then(function (response) {
        if (response.progression === true) {
            start();
        } else {
            connection.end();
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + results[i].product_name + " | Price: $" + results[i].price +
                " | In Stock: " + results[i].stock_quantity);
        }
        newFunction();
    })
};

function viewLowInventory() {
    console.log("Here are all items with inventory < 5:\n")
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        for (var i = 0; i < results.length; i++) {
            console.log("ID: " + results[i].item_id + " | " + results[i].product_name + " | Price: $" + results[i].price +
                " | In Stock: " + results[i].stock_quantity);
        }
        newFunction();
    })
}