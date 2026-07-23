// public/js/publicaciones.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-publicacion');
    const contenedorPosts = document.getElementById('contenedor-posts');

    // 1. Cargar las publicaciones al abrir la página
    cargarPublicaciones();

    // 2. Escuchar el evento submit del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evitamos que la página se recargue

        const nuevoPost = {
            titulo: document.getElementById('titulo').value,
            comentario: document.getElementById('comentario').value,
            imagen_url: document.getElementById('imagen_url').value,
            id_usuario: 1 // Usuario por defecto para la prueba
        };

        try {
            const respuesta = await fetch('..//apiPosts/crear_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoPost)
            });

            const resultado = await respuesta.json();

            if (resultado.status === 'success') {
                form.reset(); // Limpiar el formulario
                cargarPublicaciones(); // Recargar el muro dinámicamente
            } else {
                alert('Error: ' + resultado.mensaje);
            }
        } catch (error) {
            console.error('Error al guardar:', error);
        }
    });

    // Función para obtener y renderizar los posts
    async function cargarPublicaciones() {
        try {
            const respuesta = await fetch('..//apiPosts/obtener_post.php');
            const resultado = await respuesta.json();

            if (resultado.status === 'success') {
                renderizarPosts(resultado.data);
            }
        } catch (error) {
            console.error('Error al cargar publicaciones:', error);
        }
    }

    // Dibujar en el HTML las publicaciones recibidas
    function renderizarPosts(posts) {
        contenedorPosts.innerHTML = ''; // Limpiamos el contenedor

        if (posts.length === 0) {
            contenedorPosts.innerHTML = '<p class="text-center text-muted">Aún no hay publicaciones.</p>';
            return;
        }

        posts.forEach(post => {
            const col = document.createElement('div');
            col.className = 'col-md-6';
            
            const imgHtml = post.imagen_url 
                ? `<img src="${post.imagen_url}" class="card-img-top" style="max-height: 200px; object-fit: cover;" alt="Imagen">` 
                : '';

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    ${imgHtml}
                    <div class="card-body">
                        <h5 class="card-title">${post.titulo}</h5>
                        <p class="card-text">${post.comentario}</p>
                    </div>
                    <div class="card-footer text-muted d-flex justify-content-between align-items-center">
                        <small>Por: <strong>${post.nombre}</strong></small>
                        <small>${new Date(post.fecha).toLocaleDateString()}</small>
                    </div>
                </div>
            `;
            contenedorPosts.appendChild(col);
        });
    }
});