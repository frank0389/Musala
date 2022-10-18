DROP DATABASE IF EXISTS test_db;
CREATE DATABASE test_db;
GRANT ALL ON test_db.* TO 'test'@'%' IDENTIFIED BY 'gateway*2022';

USE test_db;

-- Start of IDENTITY Tables (USER MANAGER MODULE) --
CREATE TABLE IF NOT EXISTS um_user (
  ID INTEGER NOT NULL AUTO_INCREMENT,
	user_name VARCHAR (50) NOT NULL,
	password_hash VARCHAR (60) NOT NULL,
	first_name VARCHAR (50),
	last_name VARCHAR (50),
	lang_key VARCHAR (50),
	PRIMARY KEY (ID),
	CONSTRAINT user_name_constraint UNIQUE (user_name)
)ENGINE INNODB;

CREATE TABLE IF NOT EXISTS um_role (
  ID INTEGER NOT NULL AUTO_INCREMENT,
	NAME VARCHAR (50) NOT NULL,
	PRIMARY KEY (id),
	CONSTRAINT role_name_constraint UNIQUE (NAME)
)ENGINE INNODB;


CREATE TABLE  IF NOT EXISTS um_user_role (
	ID INTEGER NOT NULL AUTO_INCREMENT,
	role_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	CONSTRAINT role_name_constraint UNIQUE (user_id, role_id),
	FOREIGN KEY (role_id) REFERENCES um_role (ID) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES um_user (ID) ON DELETE CASCADE,
	PRIMARY KEY (ID)
)ENGINE INNODB;


-- Start of BUSINESS ENTITIES tables (ENTITY MANAGER MODULE) --
CREATE TABLE  IF NOT EXISTS em_gateway (
	ID INTEGER NOT NULL AUTO_INCREMENT,
	serial_number VARCHAR (255) NOT NULL,
  human_readable_name VARCHAR (255) NOT NULL,
	ip_v4 VARCHAR (255) NOT NULL,
	PRIMARY KEY (ID)
)ENGINE INNODB;

-- INSERT INTO `db`.`em_device` (`ID`, `vendor`, `date`, `STATUS`,`gateway_id`) VALUES ('1', 'frank corp', '2022-10-30 08:37:55', '1', '1'); --
CREATE TABLE  IF NOT EXISTS em_device (
	ID INTEGER NOT NULL AUTO_INCREMENT,
	vendor VARCHAR (255) NOT NULL,
  date VARCHAR (255) NOT NULL,
	STATUS BOOLEAN,
  gateway_id  INTEGER NOT NULL,
  FOREIGN KEY (gateway_id) REFERENCES em_gateway (ID) ON DELETE CASCADE,
	PRIMARY KEY (ID)
)ENGINE INNODB;


-- INSERT SENTENCES  create admin user and  admin role -----
INSERT INTO um_role (ID, NAME)
VALUES
	('1','admin');

INSERT INTO um_role (ID, NAME)
VALUES
	('2','user');


INSERT INTO um_user (
  ID,
	user_name,
	password_hash,
	first_name,
	last_name,
	lang_key
)
VALUES
	(
    '1',
		'admin',
		'$2a$10$1/JdRHTul6zI77NjNrmR1.hPP0UhslRg0MLHYeCbJ1JMWqpoSOvv2',
		'Frank Enrique',
		'Nicolau',
		'es'
	);

INSERT INTO um_user_role (ID,role_id, user_id)
VALUES
	('1','1', '1');

INSERT INTO um_user_role (ID, role_id, user_id)
VALUES
	( '2','2', '1');