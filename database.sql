CREATE DATABASE IF NOT EXISTS ejemplo_proyecto;

USE ejemplo_proyecto;

CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(200),
    password_hash VARCHAR(255),
    puntaje INT,
    estado ENUM(
    'activo',
    'suspendido'
    )DEFAULT 'activo'

);

CREATE TABLE IF NOT EXISTS publicaciones(
    id_publicacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    titulo VARCHAR(200),
    comentario TEXT,
    imagen_url VARCHAR(255),
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_usuario)
    REFERENCES usuarios(id_usuario)

);

CREATE TABLE IF NOT EXISTS juegos(
    id_juego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200),
    puntos_por_completar INT
);

CREATE TABLE IF NOT EXISTS progreso (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    puntaje_mas_alto DECIMAL(5,2),
    completado BOOLEAN,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_juego)
        REFERENCES juegos(id_juego)
);

INSERT INTO usuarios (nombre, correo) VALUES ('Alumno Demo', 'demo@escuela.edu');

