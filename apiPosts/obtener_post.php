<?php
// api/obtener_posts.php
header('Content-Type: application/json');
require_once '../config/conexion.php';

try {
    $sql = "SELECT p.id_publicacion, p.titulo, p.comentario, p.imagen_url, p.fecha, u.nombre 
            FROM publicaciones p 
            INNER JOIN usuarios u ON p.id_usuario = u.id_usuario 
            ORDER BY p.fecha DESC";
            
    $stmt = $pdo->query($sql);
    $publicaciones = $stmt->fetchAll();

    // Respondemos con formato JSON
    echo json_encode(["status" => "success", "data" => $publicaciones]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "mensaje" => $e->getMessage()]);
}