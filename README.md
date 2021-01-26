
# Pagina Web de Zapatos y Zapatillas
Desarrollo de una Pagina Web en Node JS de subida de imagenes de Zapato unida con la base de datos MySQL 

------------

HERRAMIENTAS :
- Base de Datos: MySQL.
- Estilos: CSS3 y Bootstrap 4.
- Entorno : NODE JS - Version:14.15.3.

## Arquitectura MVC
1. MODELO: representación de los datos que maneja el sistema, su lógica de negocio, y sus mecanismos de persistencia.
2. VISTA: Información que se envía al cliente y los mecanismos interacción con éste.
3. CONTROLADOR: intermediario entre el Modelo y la Vista, gestionando el flujo de información entre ellos y las transformaciones para adaptar los datos a las necesidades de cada uno.

## Imagenes
VISTA CLIENTE:
- 1
![header](https://user-images.githubusercontent.com/68178186/105248348-3d57cc80-5b44-11eb-83b3-f1c4600cfe3b.PNG)
- 2
![grid-zapatos](https://user-images.githubusercontent.com/68178186/105248418-5ceef500-5b44-11eb-8236-23884543aa0e.PNG)
- 3
![garleria](https://user-images.githubusercontent.com/68178186/105248447-68dab700-5b44-11eb-9e17-5df9b63ab7a0.PNG)
- 4
![garleria-content](https://user-images.githubusercontent.com/68178186/105248466-72641f00-5b44-11eb-8ff0-8b72253dd56f.PNG)
- 5
![mapa](https://user-images.githubusercontent.com/68178186/105249268-daffcb80-5b45-11eb-81c4-d7fb1e2e6de8.PNG)
- 6
![zaptosVistaCliente](https://user-images.githubusercontent.com/68178186/105248702-da1a6a00-5b44-11eb-9e6b-9fe4a0bb9dd3.PNG)
- 7
![view-shoe-cliente](https://user-images.githubusercontent.com/68178186/105251261-28316c80-5b49-11eb-8a08-8eccfa941649.PNG)
- 8
![usuarios](https://user-images.githubusercontent.com/68178186/105248684-d2f35c00-5b44-11eb-9441-8831e36853e6.PNG)
- 9
![registro](https://user-images.githubusercontent.com/68178186/105248649-c242e600-5b44-11eb-88e7-21df851506ba.PNG)




VISTA USUARIO:
- 1
![login-into](https://user-images.githubusercontent.com/68178186/105248760-f7e7cf00-5b44-11eb-8042-4fccf3f90367.PNG)
- 2
![login-into-delete](https://user-images.githubusercontent.com/68178186/105249383-084c7980-5b46-11eb-8524-c33187924450.PNG)
- 3
![login-into-registro](https://user-images.githubusercontent.com/68178186/105248801-0f26bc80-5b45-11eb-9729-8d8096d0195a.PNG)
- 4
![login-into-registro-shoe](https://user-images.githubusercontent.com/68178186/105249127-996f2080-5b45-11eb-895a-6ad9a71a64fd.PNG)







### SCRIPT DE LA BASE DE DATOS
```sql
CREATE DATABASE Zapatos DEFAULT CHARACTER SET UTF8;
SET default_storage_engine = INNODB;

USE Zapatos;

#TABLE USUARIOS 
create table dboUsuarios(
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40) not NULL,
    email VARCHAR(200) not NULL,
    pass VARCHAR(255) not null
)ENGINE=InnoDB default charset=UTF8MB4;


#TABLE TALLA
create table dbotalla(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    talla VARCHAR(45)not null
)ENGINE=InnoDB default charset=utf8mb4;


#TABLE STYLES
create table dboestilo(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estilo VARCHAR(45) not null
)ENGINE=InnoDB default charset=utf8mb4;


#TABLE GENERO
create table dbogenero(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(45) not null
)ENGINE=InnoDB default charset=utf8mb4;


create table dbozapato(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(50) NOT NULL, #originalname
    mimetype VARCHAR(100) NOT NULL,
    filename VARCHAR(100)NOT NULL,
    path  VARCHAR(250) NOT NULL,
    size INT,
    precio DOUBLE not null,
    color VARCHAR(45) not null,
    cantidad INT not NULL, 
    user_id INT(11), #foreing key dboUsuarios
  
   created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
   dboestilo_id INT not null, #foreign key tables
   dbotalla_id INT not null, #foreign key tables
   dbogenero_id INT not null #foreign key tables
)ENGINE=InnoDB default charset=utf8mb4;


INSERT INTO dbozapato(foto,mimetype,filename,path,size,precio,color,cantidad,user_id,dboestilo_id,dbotalla_id,dbogenero_id) 
VALUES('foto','foto','fot','fot',100,34,'rojo',10,1,1,1,1);


#----------------------------------------------------------------------
#LLAVES UNICAS
#----------------------------------------------------------------------
ALTER TABLE dboUsuarios
ADD CONSTRAINT UK_idUsuario UNIQUE KEY(id);

ALTER TABLE dbotalla
ADD CONSTRAINT UK_idtalla UNIQUE KEY(id);

ALTER TABLE dboestilo
ADD CONSTRAINT UK_idestilo UNIQUE KEY(id);

ALTER TABLE dbogenero
ADD CONSTRAINT UK_idgenero UNIQUE KEY(id);

ALTER TABLE dbozapato
ADD CONSTRAINT UK_id_zapato UNIQUE KEY(id);



#----------------------------------------------------------------------
#LLAVES FORANEAS
#----------------------------------------------------------------------
 ALTER TABLE dbozapato
 ADD CONSTRAINT FK_dboestilo_idestilo FOREIGN KEY (dboestilo_id) 
 REFERENCES `dboestilo`(id);

 ALTER TABLE dbozapato
 ADD CONSTRAINT FK_dbotalla_idtalla FOREIGN KEY (dbotalla_id) 
 REFERENCES `dbotalla`(id);

 ALTER TABLE dbozapato
 ADD CONSTRAINT FK_dbogenero_idgenero FOREIGN KEY (dbogenero_id)
 REFERENCES `dbogenero`(id);

 ALTER TABLE dbozapato
 ADD CONSTRAINT FK_idUser FOREIGN KEY (user_id)
 REFERENCES `dboUsuarios`(id);
#----------------------------------------------------------------------



						
#----------------------------------------------------------------------
#INSERT TABLES
#----------------------------------------------------------------------
INSERT INTO dbotalla(talla) VALUES('45');
INSERT INTO dbotalla(talla) VALUES('44');
INSERT INTO dbotalla(talla) VALUES('43');
INSERT INTO dbotalla(talla) VALUES('42');
INSERT INTO dbotalla(talla) VALUES('41');
INSERT INTO dbotalla(talla) VALUES('40');
INSERT INTO dbotalla(talla) VALUES('39');
INSERT INTO dboestilo(estilo) VALUES('Zapatilla');
INSERT INTO dboestilo(estilo) VALUES('Zapato');
INSERT INTO dbogenero(genero) VALUES('FEMENINO');
INSERT INTO dbogenero(genero) VALUES('MASCULINO');
#----------------------------------------------------------------------




#----------------------------------------------------------------------
#SELECT TABLES
#----------------------------------------------------------------------
SELECT * FROM dbotalla;
SELECT * FROM dboestilo;
SELECT * FROM dbogenero;
SELECT * FROM dbozapato;
SELECT * FROM dboUsuarios;
TRUNCATE TABLE dboUsuarios;
SELECT email, pass FROM dboUsuarios WHERE email = 'eduardo@gmail.com' and pass ='anthony123';

SELECT * FROM dboUsuarios WHERE id =1;
SELECT * FROM dboUsuarios WHERE email = '111@gmail.com'
SELECT path FROM dbozapato WHERE id =  1;
#----------------------------------------------------------------------


#----------------------------------------------------------------------
#DELETE TABLES
#----------------------------------------------------------------------
DELETE FROM dbozapato WHERE id = '4';
DELETE FROM dboUsuarios WHERE id = '2';
#----------------------------------------------------------------------



#----------------------------------------------------------------------
#PROCEDIMIENTOS ALMACENADOS
#----------------------------------------------------------------------
DELIMITER $$
CREATE PROCEDURE obtenerZapatosPorId(IN pro_id INT)
BEGIN
    SELECT * 
    FROM dbozapato
    WHERE id = pro_id;
END
$$

CALL obtenerZapatosPorId(1);
#----------------------------------------------------------------------
```

