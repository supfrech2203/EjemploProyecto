<?php
// api/crear_post.php
header('Content-Type: application/json');
require_once '../config/conexion.php';

// CORRECCIÓN: Agregar la 's' al final de file_get_contents
$input = json_decode(file_get_contents('php://input'), true);

$titulo = $input['titulo'] ?? '';
$comentario = $input['comentario'] ?? '';
$imagen_url = $input['imagen_url'] ?? '';
$id_usuario = $input['id_usuario'] ?? 1;

if (empty($titulo) || empty($comentario)) {
    echo json_encode(["status" => "error", "mensaje" => "Título y comentario son obligatorios"]);
    exit;
}

try {
    $sql = "INSERT INTO publicaciones (id_usuario, titulo, comentario, imagen_url) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id_usuario, $titulo, $comentario, $imagen_url]);

    echo json_encode(["status" => "success", "mensaje" => "Publicación creada con éxito"]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "mensaje" => $e->getMessage()]);
}