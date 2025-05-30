function createStars() { // Función para crear estrellas
      const night = document.getElementById('night'); // Obtener el contenedor de la noche
      const numStars = 150; // Número de estrellas a crear

      // Añadir luz ambiental
      const ambientLight = document.createElement('div');
      ambientLight.className = 'ambient-light';
      night.appendChild(ambientLight);

      for (let i = 0; i < numStars; i++) { // Bucle para crear estrellas  
        const star = document.createElement('div'); // Crear una estrella

        // Tipo de estrella (diferentes colores)
        if (Math.random() < 0.15) {
          star.className = 'star yellow'; // Estrella amarilla
        } else if (Math.random() < 0.3) {
          star.className = 'star blue'; // Estrella azul
        } else {
          star.className = 'star'; // Estrella blanca por defecto
        }

        // Tamaño aleatorio
        const size = Math.random() * 2 + 2; // Tamaño entre 2px y 4px
        star.style.width = size + 'px'; // Ancho
        star.style.height = size + 'px';  // Alto

        // Posición aleatoria
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Brillo parpadeante
        star.style.animation = `twinkle ${Math.random() * 7 + 3}s ease-in-out infinite alternate`; // Duración aleatoria
        star.style.opacity = Math.random() * 1 + 1.3; // Opacidad aleatoria

        night.appendChild(star); // Añadir estrella al contenedor
      }
    }

    // Llamar a la función al cargar la página
    window.addEventListener('DOMContentLoaded', createStars); // Llamar a la función al cargar la página

