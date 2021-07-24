-- DROP database ebarrotes;
CREATE DATABASE  IF NOT EXISTS `ebarrotes`;

USE `ebarrotes`;

-- database user

-- CREATE USER ebarrotes_user IDENTIFIED WITH mysql_native_password BY "C0ntr4ebarrotes$";

--
-- Host: localhost    Database: customer-service
-- ------------------------------------------------------
-- Server version	8.0.19

--
-- Table structure for table `comprador`
--


DROP TABLE IF EXISTS `comprador`;

CREATE TABLE comprador (
	username varchar(20) NOT NULL,
	correo varchar(100) NOT NULL,
	telefono varchar(15) NOT NULL,
	contrasenia varchar(200) NOT NULL,
	CONSTRAINT Comprador_PK PRIMARY KEY (username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `vendedor`
--

DROP TABLE IF EXISTS `vendedor`;
 
CREATE TABLE vendedor (
	username varchar(20) NOT NULL,
	correo varchar(100) NOT NULL,
	telefono varchar(15) NOT NULL,
	contrasenia varchar(200) NOT NULL,
	CONSTRAINT Vendedor_PK PRIMARY KEY (username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;



--
-- Table structure for table `datos_de_envio`
--

DROP TABLE IF EXISTS `datos_de_envio`;

CREATE TABLE datos_de_envio (
	id_datos_envio INT auto_increment NOT NULL,
	estado varchar(10) NOT NULL,
	cp varchar(10) NOT NULL,
	direccion varchar(30) NOT NULL,
	entre_calles varchar(30) NOT NULL,
	CONSTRAINT datos_de_envio_PK PRIMARY KEY (id_datos_envio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS orden;

CREATE TABLE orden (
	id_orden INT auto_increment NOT NULL,
	username varchar(20) NOT NULL,
	id_datos_envio INT NOT NULL,
	total FLOAT NOT NULL,
	CONSTRAINT orden_PK PRIMARY KEY (id_orden),
	CONSTRAINT orden_FK FOREIGN KEY (username) REFERENCES comprador(username),
	CONSTRAINT orden_FK_1 FOREIGN KEY (id_datos_envio) REFERENCES  datos_de_envio(id_datos_envio)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS producto;


CREATE TABLE producto (
	id_producto INT auto_increment NOT NULL,
	username varchar(20) NOT NULL,
	nombre varchar(20) NOT NULL,
	descripcion TEXT NOT NULL,
	precio FLOAT NOT NULL,
	calificacion INT NOT NULL,
	stock INT NOT NULL,
	foto varchar(100) NOT NULL,
	CONSTRAINT producto_PK PRIMARY KEY (id_producto),
	CONSTRAINT producto_FK FOREIGN KEY (username) REFERENCES vendedor(username)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `compra_producto`
--

DROP TABLE IF EXISTS compra_producto;


CREATE TABLE compra_producto (
	id_orden INT NOT NULL,
	id_producto INT NOT NULL,
	cantidad INT NOT NULL,
	CONSTRAINT compra_producto_PK PRIMARY KEY (id_orden,id_producto),
	CONSTRAINT compra_producto_FK FOREIGN KEY (id_orden) REFERENCES orden(id_orden),
	CONSTRAINT compra_producto_FK_1 FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `opinion`
--

DROP TABLE IF EXISTS opinion;


CREATE TABLE opinion (
	id_opinion INT auto_increment NOT NULL,
	username varchar(20) NOT NULL,
	id_producto INT NOT NULL,
	valoracion INT NOT NULL,
	contenido TEXT NOT NULL,
	fecha DATE NOT NULL,
	CONSTRAINT opinion_PK PRIMARY KEY (id_opinion),
	CONSTRAINT opinion_FK FOREIGN KEY (username) REFERENCES comprador(username),
	CONSTRAINT opinion_FK_1 FOREIGN KEY (id_producto) REFERENCES  producto(id_producto)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;




