-- Active: 1718652169461@@127.0.0.1@3306
CREATE DATABASE examen_backend;

USE examen_backend;

CREATE TABLE productos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    precio DECIMAL NOT NULL,
    cantidad INT,
    categoria VARCHAR(20)
);

SELECT * FROM productos;
