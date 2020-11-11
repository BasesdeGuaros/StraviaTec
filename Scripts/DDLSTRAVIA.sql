-- Database: Stravia

-- DROP DATABASE "Stravia";

/*CREATE DATABASE "Stravia"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE "Stravia"
    IS 'Base de datos para proyecto stravia tec';
	*/
	
CREATE TABLE USUARIO(
	Cedula INT NOT NULL,
	Nombre VARCHAR(10) NOT NULL,
	Apellido VARCHAR(20) NOT NULL,
	Nombre_Usuario VARCHAR(10) NOT NULL,
	Contraseña VARCHAR(16) NOT NULL,
	Nacionalidad VARCHAR(16) NOT NULL,
	Fecha_Nacimiento DATE NOT NULL,
	Foto bytea
);

CREATE TABLE ROL(
	Id INT NOT NULL,
	Nombre VARCHAR(20)
);

CREATE TABLE GRUPO(
	Id INT NOT NULL,
	Nombre VARCHAR(15) UNIQUE
);

/*
Tablas de relacion usuario-seguidor
*/
CREATE TABLE USUARIO_SIGUE_USUARIO(
	Id_Seguidor INT NOT NULL,
	Id_Seguido INT NOT NULL
);

CREATE TABLE USUARIO_ROL(
	Id_Usuario INT NOT NULL,
	Id_Rol INT NOT NULL
);

/*
Tablas de relacion Participacion de usuario en grupos
*/

CREATE TABLE PARTICIPACION_USUARIO_GRUPO(
	Id_Grupo INT NOT NULL,
	Id_Usuario INT NOT NULL,
	Rol INT NOT NULL
);

CREATE TABLE EVENTO(
	Id INT NOT NULL,
	Nombre VARCHAR(15) NOT NULL,
	Fecha DATE DEFAULT CURRENT_DATE,
	Id_Admin INT NOT NULL,
	Recorrido VARCHAR(100),
	Cuenta VARCHAR(50),
	Categoria INT NOT NULL,
	Costo INT,
	Privado INT DEFAULT 0,
	Id_Deporte INT NOT NULL,
	Kilometraje DECIMAL DEFAULT 1.1,
	Elevación INT DEFAULT 0,
	Fecha_Inicial DATE,
	Fecha_Final DATE,
	Fondo_altitud INT,
	Foto bytea
);

CREATE TABLE TIPO_EVENTO(
	Id INT NOT NULL,
	Nombre VARCHAR(25) NOT NULL
);

CREATE TABLE CATEGORIA(
	Id INT NOT NULL,
	Nombre VARCHAR(16) NOT NULL,
	Descripción VARCHAR(100)
);

CREATE TABLE PATROCINADOR(
	Id INT NOT NULL,
	Logo bytea,
	Nombre VARCHAR(15) NOT NULL,
	Numero INT NOT NULL,
	Representante VARCHAR(20) NOT NULL
);

CREATE TABLE SUBSCRIPCIONES(
	Id_Usuario INT NOT NULL,
	Id_Evento INT NOT NULL,
	Aceptado INT NOT NULL
);


/*
Tablas de relacion Evento_Patrocinado_Patrocinador
*/

CREATE TABLE EVENTO_PATROCINADO_PATROCINADOR(
	Id_Evento INT NOT NULL,
	Id_Patrocinador INT NOT NULL
);

CREATE TABLE ACTIVIDAD_PERTENECE_EVENTO(
	Id_Actividad INT NOT NULL,
	Id_Evento INT NOT NULL
);

/*
Tablas de relacion Evento_Tiene_Tipo
*/

CREATE TABLE EVENTO_TIENE_TIPO(
	Id_Evento INT NOT NULL,
	Id_Tipo_Evento INT NOT NULL
);


CREATE TABLE ACTIVIDAD(
	Id INT NOT NULL,
	Id_Usuario INT NOT NULL,
	Fecha DATE DEFAULT CURRENT_DATE,
	Hora_Inicial TIME WITH TIME ZONE DEFAULT CURRENT_TIME,
	Recorrido VARCHAR(100),
	Kilometraje DECIMAL DEFAULT 1.1,
	Completitud INT DEFAULT 1
);

CREATE TABLE DEPORTE(
	Id INT NOT NULL,
	Nombre VARCHAR(15) NOT NULL
);

/*
Tablas de relacion Actividad_Clasifica_Deporte
*/

CREATE TABLE ACTIVIDAD_CLASIFICA_DEPORTE(
	Id_Actividad INT NOT NULL,
	Id_Deporte INT NOT NULL
);

ALTER TABLE USUARIO
ADD CONSTRAINT USUARIO_PK PRIMARY KEY(Cedula);

ALTER TABLE ROL
ADD CONSTRAINT ROL_PK PRIMARY KEY(Id);

ALTER TABLE GRUPO
ADD CONSTRAINT GRUPO_PK PRIMARY KEY(Id);

ALTER TABLE USUARIO_SIGUE_USUARIO
ADD CONSTRAINT USUARIO_SIGUE_USUARIO_PK PRIMARY KEY(Id_Seguidor,Id_Seguido);

ALTER TABLE PARTICIPACION_USUARIO_GRUPO
ADD CONSTRAINT PARTICIPACION_USUARIO_GRUPO_PK PRIMARY KEY(Id_Grupo,Id_Usuario);

ALTER TABLE EVENTO
ADD CONSTRAINT EVENTO_PK PRIMARY KEY(Id);

ALTER TABLE TIPO_EVENTO
ADD CONSTRAINT TIPO_EVENTO_PK PRIMARY KEY(Id);

ALTER TABLE CATEGORIA
ADD CONSTRAINT CATEGORIA_PK PRIMARY KEY(Id);

ALTER TABLE PATROCINADOR
ADD CONSTRAINT PATROCINADOR_PK PRIMARY KEY(Id);

ALTER TABLE SUBSCRIPCIONES
ADD CONSTRAINT SUBSCRIPCIONES_PK PRIMARY KEY(Id_Usuario,Id_Evento);

ALTER TABLE EVENTO_PATROCINADO_PATROCINADOR
ADD CONSTRAINT EVENTO_PATROCINADO_PATROCINADOR_PK PRIMARY KEY(Id_Evento,Id_Patrocinador);

ALTER TABLE EVENTO_TIENE_TIPO
ADD CONSTRAINT EVENTO_TIENE_TIPO_PK PRIMARY KEY(Id_Evento,Id_Tipo_Evento);

ALTER TABLE ACTIVIDAD
ADD CONSTRAINT ACTIVIDAD_PK PRIMARY KEY(Id);

ALTER TABLE DEPORTE
ADD CONSTRAINT DEPORTE_PK PRIMARY KEY(Id);

ALTER TABLE ACTIVIDAD_CLASIFICA_DEPORTE
ADD CONSTRAINT ACTIVIDAD_CLASIFICA_DEPORTE_PK PRIMARY KEY(Id_Actividad,Id_Deporte);

ALTER TABLE USUARIO_ROL
ADD CONSTRAINT USUARIO_ROL_PK PRIMARY KEY(Id_Usuario,Id_Rol);

ALTER TABLE USUARIO_SIGUE_USUARIO
ADD CONSTRAINT USUARIO_SIGUE_FK FOREIGN KEY(Id_Seguido)
REFERENCES USUARIO(Cedula);

ALTER TABLE USUARIO_SIGUE_USUARIO
ADD CONSTRAINT SIGUE_USUARIO_FK FOREIGN KEY(Id_Seguidor)
REFERENCES USUARIO(Cedula);

ALTER TABLE USUARIO_ROL
ADD CONSTRAINT ROL_USUARIO_FK FOREIGN KEY(Id_Usuario)
REFERENCES USUARIO(Cedula);

ALTER TABLE USUARIO_ROL
ADD CONSTRAINT USUARIO_ROL_FK FOREIGN KEY(Id_Rol)
REFERENCES ROL(Id);

ALTER TABLE PARTICIPACION_USUARIO_GRUPO
ADD CONSTRAINT PARTICIPACION_GRUPO_FK FOREIGN KEY(Id_Grupo)
REFERENCES GRUPO(Id);

ALTER TABLE PARTICIPACION_USUARIO_GRUPO
ADD CONSTRAINT PARTICIPACION_USUARIO_FK FOREIGN KEY(Id_Usuario)
REFERENCES USUARIO(Cedula);

ALTER TABLE ACTIVIDAD_PERTENECE_EVENTO
ADD CONSTRAINT PERTENECE_EVENTO_FK FOREIGN KEY(Id_Evento)
REFERENCES EVENTO(Id);

ALTER TABLE ACTIVIDAD_PERTENECE_EVENTO
ADD CONSTRAINT PERTENECE_ACTIVIDAD_FK FOREIGN KEY(Id_Actividad)
REFERENCES ACTIVIDAD(Id);

ALTER TABLE EVENTO
ADD CONSTRAINT EVENTO_ADMIN_FK FOREIGN KEY(Id_Admin)
REFERENCES USUARIO(Cedula);

ALTER TABLE EVENTO
ADD CONSTRAINT EVENTO_CATEGORIA_FK FOREIGN KEY(Categoria)
REFERENCES CATEGORIA(Id);

ALTER TABLE EVENTO
ADD CONSTRAINT EVENTO_DEPORTE_FK FOREIGN KEY(Id_Deporte)
REFERENCES DEPORTE(Id);

ALTER TABLE ACTIVIDAD
ADD CONSTRAINT ACTIVIDAD_USUARIO_FK FOREIGN KEY(Id_Usuario)
REFERENCES USUARIO(Cedula);

ALTER TABLE EVENTO_PATROCINADO_PATROCINADOR
ADD CONSTRAINT PATROCINADO_EVENTO_FK FOREIGN KEY(Id_Evento)
REFERENCES EVENTO(Id);

ALTER TABLE EVENTO_PATROCINADO_PATROCINADOR
ADD CONSTRAINT PATROCINADO_PATROCINADOR_FK FOREIGN KEY(Id_Patrocinador)
REFERENCES PATROCINADOR(Id);

ALTER TABLE SUBSCRIPCIONES
ADD CONSTRAINT SUBSCRIPCION_USUARIO_FK FOREIGN KEY(Id_Usuario)
REFERENCES USUARIO(Cedula);

ALTER TABLE SUBSCRIPCIONES
ADD CONSTRAINT SUBSCRIPCION_EVENTO_FK FOREIGN KEY(Id_Evento)
REFERENCES EVENTO(Id);

ALTER TABLE EVENTO_TIENE_TIPO
ADD CONSTRAINT TIENE_TIPO_FK FOREIGN KEY(Id_Tipo_Evento)
REFERENCES TIPO_EVENTO(Id);

ALTER TABLE EVENTO_TIENE_TIPO
ADD CONSTRAINT TIENE_EVENTO_FK FOREIGN KEY(Id_Evento)
REFERENCES EVENTO(Id);

ALTER TABLE ACTIVIDAD_CLASIFICA_DEPORTE
ADD CONSTRAINT CLASIFICA_ACTIVIDAD_FK FOREIGN KEY(Id_Actividad)
REFERENCES ACTIVIDAD(Id);

ALTER TABLE ACTIVIDAD_CLASIFICA_DEPORTE
ADD CONSTRAINT CLASIFICA_DEPORTE_FK FOREIGN KEY(Id_Deporte)
REFERENCES DEPORTE(Id);












	
	
