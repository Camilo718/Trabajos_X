function createStars() {
      const night = document.getElementById('night');
      const numStars = 150;

      // Añadir luz ambiental
      const ambientLight = document.createElement('div');
      ambientLight.className = 'ambient-light';
      night.appendChild(ambientLight);

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');

        // Tipo de estrella (diferentes colores)
        if (Math.random() < 0.15) {
          star.className = 'star yellow';
        } else if (Math.random() < 0.3) {
          star.className = 'star blue';
        } else {
          star.className = 'star';
        }

        // Tamaño aleatorio
        const size = Math.random() * 2 + 2; // Tamaño entre 2px y 4px
        star.style.width = size + 'px';
        star.style.height = size + 'px';

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
    window.addEventListener('DOMContentLoaded', createStars);

