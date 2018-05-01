# Bamazon_CLI

## Overview
`Bamazon` is a command line interface app that allows either a customer or a manager to interact with a database of commercial items.

The `Customer View` is for customers to order items from the available inventory. Users are shown the entire list of items available for purchase upon startup, along with their relative prices and ID numbers. 

The `Manager View` is for managers of the inventory database to perform a number of functions to manipulate the available inventory. The Manager can perform as many functions as they need before completing their session. Everything is immediately updated in the database for the `Customer` to access. 

## Instructions

First select either the `Customer` or `Manager` View to operate in.

`Customer View` - The customer can then select the `ID` and `Quantity` of the item they would like to purchase. If there is enough of the item in stock, the order is completed and the user is shown their order total. If there is not enough in stock, the user must redo their order with a different quantity.

`Manager View` - Managers can:
* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product
* Delete an Item

#### Managed by Kristian Fidrych @ kristianfidrych@gmail.com