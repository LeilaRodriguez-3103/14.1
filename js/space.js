document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            const contenedor = document.getElementById('contenedor');
            contenedor.innerHTML = ''; // Limpiar resultados anteriores

            if (data.collection.items.length === 0) {
                contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
                return;
            }

            data.collection.items.forEach(item => {
                const { href: imageUrl, title, description, date_created } = item.links[0]; // Suponiendo que el primer enlace es la imagen
                const imageElement = `
                    <div class="card my-3">
                        <img src="${imageUrl}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${description || 'Sin descripción disponible.'}</p>
                            <p class="card-text"><small class="text-muted">Fecha: ${date_created || 'Sin fecha disponible.'}</small></p>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += imageElement; // Añadir cada imagen al contenedor
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('contenedor').innerHTML = '<p>Error al cargar los resultados.</p>';
        });
});
