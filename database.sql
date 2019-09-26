CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (50) NULL,
    stock_quantity INTEGER (50) NULL,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ('sloth hugs', 'pets', '50', '100'),
       ('sloth kisses', 'pets', '100', '100'),
       ('mugs', 'kitchen', '10', '50'),
       ('sporks', 'kitchen', '3', '70'),
       ('insense', 'just granola things', '15', '50'),
       ('yoga mat', 'just granola things', '100', '20'),
       ('loose leaf tea', 'pantry', '8', '20'),
       ('ground coffee', 'pantry', '10', '40'),
       ('whole bean coffee', 'pantry', '18', '100'),
       ('pour over filter', 'kitchen', '6', '25');