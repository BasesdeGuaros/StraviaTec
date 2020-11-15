INSERT INTO USUARIO(Cedula,Nombre,Apellido,Nombre_Usuario,Contraseña,Nacionalidad,Fecha_Nacimiento,Foto) 
VALUES(117460001,'Daniel','Garcia Fallas','garza','hola1234','Costarricense','1999-06-11',
       pg_read_binary_file('C:\Users\garza\Desktop\IIS2020\Bases de Datos\Proyecto1\Code\StraviaTec\Resources\default_profile.bin'));

INSERT INTO USUARIO(Cedula,Nombre,Apellido,Nombre_Usuario,Contraseña,Nacionalidad,Fecha_Nacimiento,Foto) 
VALUES(305130462,'Elias','Arce Mendez','delias','12345678','Costarricense','1998-10-27',
       pg_read_binary_file('C:\Users\garza\Desktop\IIS2020\Bases de Datos\Proyecto1\Code\StraviaTec\Resources\default_profile.bin'));
	  
INSERT INTO ROL(Id, Nombre)
VALUES (1,'Deportista');

INSERT INTO ROL(Id, Nombre)
VALUES (2,'Administrador');

INSERT INTO USUARIO_ROL(Id_Usuario,Id_Rol)
VALUES (305130462,1);

INSERT INTO USUARIO_ROL(Id_Usuario,Id_Rol)
VALUES (117460001,1);

INSERT INTO USUARIO_ROL(Id_Usuario,Id_Rol)
VALUES (305130462,2);

INSERT INTO USUARIO_ROL(Id_Usuario,Id_Rol)
VALUES (117460001,2);

INSERT INTO USUARIO_SIGUE_USUARIO(Id_Seguidor,Id_Seguido)
VALUES(305130462,117360001);

INSERT INTO USUARIO_SIGUE_USUARIO(Id_Seguidor,Id_Seguido)
VALUES(117460001,305130462);

INSERT INTO GRUPO(Id,Nombre)
VALUES(1,'Correcaminos');

INSERT INTO GRUPO(Id,Nombre)
VALUES(2,'Cleteadores');

INSERT INTO GRUPO(Id,Nombre)
VALUES(3,'EL TEAM');

INSERT INTO GRUPO(Id,Nombre)
VALUES(4,'PaJET');

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(4,305130462, 1);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(4,117360001, 1);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(1,305130462, 1);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(2,117460001, 1);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(3,305130462, 1);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(1,305130462, 0);

INSERT INTO PARTICIPACION_USUARIO_GRUPO(Id_Grupo,Id_Usuario,Rol)
VALUES(2,117460001, 0);


INSERT INTO PATROCINADOR(Id,Logo,Nombre,Numero,Representante) 
VALUES(1,
pg_read_binary_file('C:\Users\garza\Desktop\IIS2020\Bases de Datos\Proyecto1\Code\StraviaTec\Resources\default_profile.bin'),
'Cacique',88568822,'Daniel Sing');


INSERT INTO TIPO_EVENTO(Id,Nombre)
VALUES(1,'Carrera');

INSERT INTO TIPO_EVENTO(Id,Nombre)
VALUES(2,'Reto');

INSERT INTO TIPO_EVENTO(Id,Nombre)
VALUES(3,'Entrenamiento');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(1,'Junior', 'menos de 15 años');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(2,'Sub-23', 'de 16 a 23 años');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(3,'Open', 'de 24 a 30 años');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(4,'Elite', 'Cualquiera puede inscribirse');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(5,'Master A', 'de 30 a 40 años');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(6,'Master B', 'de 41 a 50 años');

INSERT INTO CATEGORIA(Id,Nombre,Descripción)
VALUES(7,'Master C', 'más de 51 años');

INSERT INTO DEPORTE(Id,Nombre) VALUES(1,'Atletismo');
INSERT INTO DEPORTE(Id,Nombre) VALUES(2,'Natacion');
INSERT INTO DEPORTE(Id,Nombre) VALUES(3,'Ciclismo');
INSERT INTO DEPORTE(Id,Nombre) VALUES(4,'Senderismo');
INSERT INTO DEPORTE(Id,Nombre) VALUES(5,'Kayak');
INSERT INTO DEPORTE(Id,Nombre) VALUES(6,'Caminata');

INSERT INTO EVENTO(Id,Nombre,Id_Admin,Recorrido,Cuenta,Categoria,Costo,Privado,Id_Deporte,Fecha_Inicial,Fecha_Final)
VALUES(1,'Super Maratón',305130462,'.gpx','1-xxxx-0000-9999',4,20000,1,2,'2020-12-12','2020-12-23');

INSERT INTO EVENTO(Id,Nombre,Fecha,Id_Admin,Recorrido,Cuenta,Categoria,Costo,Privado,Id_Deporte,Kilometraje,
				  Elevación,Fecha_Inicial,Fecha_Final,Fondo_altitud,Foto) 
VALUES(2,'Reto CE','2020-11-11',117460001,'recorrido1','0',1,0,0,1,1,5,'2020-11-11','2020-11-11',1,
	  pg_read_binary_file('C:\Users\garza\Desktop\IIS2020\Bases de Datos\Proyecto1\Code\StraviaTec\Resources\default_profile.bin'));

INSERT INTO EVENTO_PATROCINADO_PATROCINADOR(Id_Evento,Id_Patrocinador)
VALUES(1,1);

INSERT INTO EVENTO_PATROCINADO_PATROCINADOR(Id_Evento,Id_Patrocinador)
VALUES(2,1);

INSERT INTO SUBSCRIPCIONES(Id_Usuario,Id_Evento,Aceptado)
VALUES(305130462,1,1);

INSERT INTO SUBSCRIPCIONES(Id_Usuario,Id_Evento,Aceptado)
VALUES(117460001,1,1);

INSERT INTO SUBSCRIPCIONES(Id_Usuario,Id_Evento,Aceptado)
VALUES(305130462,2,1);

INSERT INTO SUBSCRIPCIONES(Id_Usuario,Id_Evento,Aceptado)
VALUES(117460001,2,1);

INSERT INTO EVENTO_TIENE_TIPO(Id_Evento,Id_Tipo_Evento)
VALUES(1,1);

INSERT INTO EVENTO_TIENE_TIPO(Id_Evento,Id_Tipo_Evento)
VALUES(2,2);

INSERT INTO ACTIVIDAD(Id,Id_Usuario,Recorrido)
VALUES(1,305130462,'.gpx');

INSERT INTO ACTIVIDAD_PERTENECE_EVENTO(Id_Actividad,Id_Evento) VALUES(1,1);

INSERT INTO ACTIVIDAD_CLASIFICA_DEPORTE(Id_Actividad,Id_Deporte) VALUES(1,1);

GRANT SELECT ON USUARIO TO PUBLIC;
GRANT SELECT ON PATROCINADOR TO PUBLIC;
GRANT SELECT ON EVENTO TO PUBLIC;