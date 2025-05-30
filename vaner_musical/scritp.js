// Esperar a que el contenido esté cargado (opcional, si está al final del body no hace falta)
document.addEventListener('DOMContentLoaded', () => {

  // Seleccionar todas las hojas
  const hojas = document.querySelectorAll('[class^="hoja-"]');

  // Variables para controlar la animación
  let angulo = 0;
  const amplitud = 5; // Amplitud del movimiento en grados
  const velocidad = 0.02; // Velocidad de la oscilación

  // Almacenar las transformaciones originales de cada hoja
  const transformacionesOriginales = Array.from(hojas).map(hoja => {
    const estilo = window.getComputedStyle(hoja);
    return estilo.transform !== 'none' ? estilo.transform : '';
  });

  // Función para animar las hojas
  function animarHojas() {
    // Calcular el valor de oscilación basado en seno (entre -1 y 1) * amplitud
    const oscilacion = Math.sin(angulo) * amplitud;

    // Para cada hoja, aplicar la transformación original más la oscilación
    hojas.forEach((hoja, index) => {
      const transformOriginal = transformacionesOriginales[index];
      hoja.style.transform = `${transformOriginal} rotate(${oscilacion}deg)`;
    });

    // Incrementar el ángulo para la próxima animación
    angulo += velocidad;

    // Continuar el loop de animación
    requestAnimationFrame(animarHojas);
  }

  // Iniciar la animación después de 1 segundo
  setTimeout(animarHojas, 1000);

});



// Este script se encarga de crear un fondo estrellado animado y una silueta de los Simpsons
document.addEventListener('DOMContentLoaded', function() {
    setupStarsCanvas();
    setupSimpsonSilhouette();
    setupPlayer();
    startShootingStars();
});

let canvas, ctx, stars = [];
let animationFrameId;
let canvasWidth, canvasHeight;

function setupStarsCanvas() {
    // Crear elemento canvas
    canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    
    // Estilo del canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    
    // Reemplazar el contenedor de estrellas con el canvas
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        starsContainer.parentNode.replaceChild(canvas, starsContainer);
    } else {
        document.body.appendChild(canvas);
    }
    
    // Obtener contexto 2D para dibujar
    ctx = canvas.getContext('2d');
    
    // Configurar tamaño del canvas para que coincida con la ventana
    resizeCanvas();
    
    // Escuchar eventos de cambio de tamaño
    window.addEventListener('resize', function() {
        resizeCanvas();
        createStars(); // Recrear estrellas al cambiar el tamaño
    });
    
    // Crear estrellas y empezar la animación
    createStars();
    animate();
    
    // Crear nebulosas (efectos de fondo)
    createNebulas();
}

// Ajustar el tamaño del canvas al tamaño de la ventana
function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    
    // Configurar el tamaño real del canvas (importante para evitar pixelado)
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// Crear estrellas con propiedades aleatorias - con aspecto más realista
function createStars() {
    stars = []; // Limpiar estrellas existentes
    
    // Densidad reducida para un aspecto más realista
    const starCount = Math.floor(canvasWidth * canvasHeight / 1800 * 2);
    
    // Crear estrellas normales
    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        
        // Tamaños más variados - mayoría pequeñas, pocas grandes
        let size;
        const sizeRand = Math.random();
        if (sizeRand < 0.7) {
            // 70% son estrellas pequeñas
            size = Math.random() * 1.0 + 0.3;
        } else if (sizeRand < 0.95) {
            // 25% son estrellas medianas
            size = Math.random() * 1.5 + 1.0;
        } else {
            // 5% son estrellas grandes
            size = Math.random() * 2.0 + 1.5;
        }
        
        // Colores más variados y realistas para las estrellas
        let color;
        const colorRand = Math.random();
        
        if (colorRand < 0.65) {
            // Estrellas blancas/azuladas (más comunes)
            const blue = 220 + Math.floor(Math.random() * 35);
            const green = blue - Math.floor(Math.random() * 20);
            const red = green - Math.floor(Math.random() * 20);
            color = `rgb(${red}, ${green}, ${blue})`;
        } else if (colorRand < 0.85) {
            // Estrellas amarillentas
            const red = 220 + Math.floor(Math.random() * 35);
            const green = red - Math.floor(Math.random() * 20);
            const blue = green - Math.floor(Math.random() * 40);
            color = `rgb(${red}, ${green}, ${blue})`;
        } else if (colorRand < 0.95) {
            // Estrellas rojizas
            const red = 220 + Math.floor(Math.random() * 35);
            const green = 130 + Math.floor(Math.random() * 40);
            const blue = 100 + Math.floor(Math.random() * 30);
            color = `rgb(${red}, ${green}, ${blue})`;
        } else {
            // Algunas muy brillantes (casi blancas)
            color = `rgb(255, 255, 255)`;
        }
        
        // Propiedades para la animación de parpadeo - más sutil
        const minOpacity = 0.3 + Math.random() * 0.3;
        const maxOpacity = minOpacity + Math.random() * 0.4;
        const minScale = 0.85 + Math.random() * 0.1;
        const maxScale = minScale + Math.random() * 0.2;
        
        // Velocidad de parpadeo - variada pero lenta
        const twinkleSpeed = Math.random() * 0.02 + 0.005;
        
        // Offset para que no todas las estrellas parpadeen al mismo tiempo
        const offset = Math.random() * Math.PI * 2;
        
        // Brillo (glow) - proporcional al tamaño
        const glow = size * (Math.random() * 2 + 1);
        
        stars.push({
            x,
            y,
            size,
            color,
            minOpacity,
            maxOpacity,
            minScale,
            maxScale,
            twinkleSpeed,
            offset,
            twinkleValue: offset, // Iniciar en diferentes posiciones del ciclo
            glow,
            isBright: false
        });
    }
    
    // Crear algunas estrellas brillantes - pocas pero destacadas
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const size = Math.random() * 2 + 2;
        
        // Colores variados para estrellas brillantes
        let color;
        const colorType = Math.random();
        
        if (colorType < 0.5) {
            // Blanco brillante
            color = '#ffffff';
        } else if (colorType < 0.8) {
            // Azul brillante
            color = 'rgb(200, 220, 255)';
        } else {
            // Algunas amarillentas
            color = 'rgb(255, 250, 220)';
        }
        
        stars.push({
            x,
            y,
            size,
            color: color,
            minOpacity: 0.7,
            maxOpacity: 1,
            minScale: 0.9,
            maxScale: 1.2,
            twinkleSpeed: Math.random() * 0.01 + 0.003, // Parpadeo más lento
            offset: Math.random() * Math.PI * 2,
            twinkleValue: Math.random() * Math.PI * 2,
            glow: Math.random() * 6 + 4,
            isBright: true
        });
    }
}

// Crear efecto de nebulosas en el fondo
function createNebulas() {
    const nebulaContainer = document.getElementById('galaxy');
    
    if (!nebulaContainer) return;
    
    // Limpiar cualquier nebulosa existente
    while (nebulaContainer.firstChild) {
        nebulaContainer.removeChild(nebulaContainer.firstChild);
    }
    
    // Crear varias nebulosas con diferentes características
    const nebulaCount = 8;
    
    for (let i = 0; i < nebulaCount; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        nebula.style.position = 'absolute';
        
        // Tamaños variados para las nebulosas
        const width = Math.random() * 400 + 200;
        const height = Math.random() * 300 + 150;
        nebula.style.width = `${width}px`;
        nebula.style.height = `${height}px`;
        
        // Distribuir por toda la pantalla
        nebula.style.top = `${Math.random() * 80}%`;
        nebula.style.left = `${Math.random() * 80}%`;
        
        // Colores variados para las nebulosas
        let r, g, b, opacity;
        const nebulaType = Math.random();
        
        if (nebulaType < 0.4) {
            // Nebulosas azuladas
            r = Math.floor(Math.random() * 60 + 20);
            g = Math.floor(Math.random() * 80 + 40);
            b = Math.floor(Math.random() * 120 + 100);
            opacity = 0.05;
        } else if (nebulaType < 0.7) {
            // Nebulosas rojizas/púrpura
            r = Math.floor(Math.random() * 100 + 80);
            g = Math.floor(Math.random() * 40 + 20);
            b = Math.floor(Math.random() * 100 + 80);
            opacity = 0.04;
        } else {
            // Nebulosas verdosas/turquesa
            r = Math.floor(Math.random() * 40 + 20);
            g = Math.floor(Math.random() * 100 + 60);
            b = Math.floor(Math.random() * 90 + 70);
            opacity = 0.03;
        }
        
        // Gradiente radial para un aspecto realista
        nebula.style.background = `radial-gradient(ellipse at center, 
            rgba(${r}, ${g}, ${b}, 0) 0%, 
            rgba(${r}, ${g}, ${b}, ${opacity}) 50%, 
            rgba(${r}, ${g}, ${b}, ${opacity * 0.8}) 70%, 
            rgba(${r}, ${g}, ${b}, 0) 100%)`;
        
        nebula.style.borderRadius = '50%';
        nebula.style.transform = `rotate(${Math.random() * 360}deg)`;
        nebula.style.opacity = '1';
        nebula.style.filter = 'blur(40px)';
        nebula.style.zIndex = '-1';
        
        nebulaContainer.appendChild(nebula);
    }
}

// Función principal de animación
function animate() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Actualizar y dibujar cada estrella
    stars.forEach(star => {
        // Actualizar valor de parpadeo (función seno para suavidad)
        star.twinkleValue += star.twinkleSpeed;
        
        // Calcular opacidad y escala actuales basadas en la función seno
        const sinValue = Math.sin(star.twinkleValue + star.offset);
        const normalizedSin = (sinValue + 1) / 2; // Convertir de -1,1 a 0,1
        
        const currentOpacity = star.minOpacity + normalizedSin * (star.maxOpacity - star.minOpacity);
        const currentScale = star.minScale + normalizedSin * (star.maxScale - star.minScale);
        
        // Guardar estado actual
        ctx.save();
        
        // Configurar transparencia
        ctx.globalAlpha = currentOpacity;
        
        // Diferentes estilos de dibujo según el tamaño de la estrella
        if (star.size < 1.5) {
            // Estrellas pequeñas - simplemente dibujar un punto
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * currentScale, 0, Math.PI * 2);
            ctx.fill();
            
            // Pequeño resplandor para estrellas pequeñas
            if (Math.random() > 0.8) {
                ctx.globalAlpha = currentOpacity * 0.3;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size * currentScale * 3, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Estrellas medianas y grandes - añadir resplandor
            // Dibujar el resplandor (glow)
            const glow = star.isBright ? star.glow * 0.4 : star.glow;
            
            // Gradiente para el resplandor
            const gradient = ctx.createRadialGradient(
                star.x, star.y, 0,
                star.x, star.y, glow * currentScale
            );
            
            // Diferentes colores para el resplandor según el color de la estrella
            const baseColor = star.color;
            gradient.addColorStop(0, baseColor);
            gradient.addColorStop(0.5, baseColor.replace('rgb', 'rgba').replace(')', ', 0.3)'));
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(star.x, star.y, glow * currentScale, 0, Math.PI * 2);
            ctx.fill();
            
            
            // Para estrellas muy brillantes, añadir brillo adicional
            if (star.isBright) {
                // Crear efecto de rayos para algunas estrellas brillantes
                if (Math.random() > 0.7) {
                    ctx.globalAlpha = currentOpacity * 0.4;
                    
                    // Dibujar rayos
                    const numRays = 4;
                    const rayLength = star.size * 5 * currentScale;
                    
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = 0.5;
                    
                    for (let i = 0; i < numRays; i++) {
                        const angle = (i / numRays) * Math.PI * 2;
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(
                            star.x + Math.cos(angle) * rayLength,
                            star.y + Math.sin(angle) * rayLength
                        );
                        ctx.stroke();
                    }
                }
            }
        }
        
        ctx.restore();
    });
    
    animationFrameId = requestAnimationFrame(animate);
} //---------------------------------------------------------------------noche estrellada 

// Crear plantas base
function createBasePlants() {
  const basePlants = document.getElementById('base-plants');

  for (let i = 0; i < 15; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'base-leaf';

    // Tamaño aleatorio
    const width = Math.random() * 100 + 100;
    const height = Math.random() * 50 + 50;
    leaf.style.width = width + 'px';
    leaf.style.height = height + 'px';

    // Posición aleatoria
    leaf.style.left = (Math.random() * 80 + 10) + '%';
    leaf.style.bottom = (Math.random() * 5) + '%';

    // Rotación
    const rotate = (Math.random() * 30 - 15);
    leaf.style.setProperty('--rotate', rotate + 'deg');

    // Retraso de animación
    leaf.style.animationDelay = (Math.random() * 2) + 's';

    basePlants.appendChild(leaf);
  }
}

// Crear flores
function createFlowers() {
  const flowersContainer = document.getElementById('flowers'); // Contenedor de flores

  flowerSettings.forEach(settings => { // Iterar sobre cada configuración de flor
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.style.left = settings.x + '%';

    // SVG para tallo
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // Crear SVG
    svg.setAttribute('width', '100');
    svg.setAttribute('height', settings.height); 
    svg.style.position = 'absolute';
    svg.style.bottom = '0';
    svg.style.left = '0';
    svg.style.overflow = 'visible';

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); // Crear el camino del tallo
    const controlX = settings.curve * settings.curveDirection;
    const d = `M0,${settings.height} C${controlX},${settings.height * 0.6} ${controlX/2},${settings.height * 0.3} 0,0`;
    path.setAttribute('d', d);
    path.classList.add('stem-path');

    // Animación del tallo
    const length = Math.sqrt(Math.pow(settings.height, 2) + Math.pow(controlX, 2)) * 1.2;
    path.style.setProperty('--length', length);
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.animation = `drawStem 2s ease-out ${settings.delay}s forwards`;

    svg.appendChild(path);
    flower.appendChild(svg);

    // Crear hojas en el tallo
    const numLeaves = 4;
    for (let i = 0; i < numLeaves; i++) {
      const leafPos = i / (numLeaves - 1);
      const leafY = settings.height * (1 - leafPos * 0.8);
      const leafX = Math.sin(leafPos * Math.PI) * controlX * 0.8;

      const leaf = document.createElement('div');
      leaf.className = 'leaf';
      leaf.style.width = (30 + Math.random() * 20) + 'px';
      leaf.style.height = (12 + Math.random() * 8) + 'px';
      leaf.style.bottom = leafY + 'px';
      leaf.style.left = leafX + 'px';

      const side = i % 2 === 0 ? 1 : -1;
      const angle = (side * (20 + Math.random() * 20)) + 'deg';
      leaf.style.setProperty('--angle', angle);
      leaf.style.setProperty('--origin', side > 0 ? 'left center' : 'right center');
      leaf.style.setProperty('--delay', (settings.delay + 1 + i * 0.2) + 's');

      flower.appendChild(leaf);

      // Espiral decorativa
      if (i % 2 === 0) {
        const spiral = document.createElement('div');
        spiral.className = 'spiral';
        spiral.style.bottom = (leafY - 5) + 'px';
        spiral.style.left = (leafX + (side * 15)) + 'px';
        spiral.style.setProperty('--delay', (settings.delay + 1.2 + i * 0.2) + 's');
        flower.appendChild(spiral);
      }
    }

    // Cabeza de la flor
    const flowerHead = document.createElement('div');
    flowerHead.className = 'flower-head';
    flowerHead.style.setProperty('--flower-size', settings.flowerSize + 'px');
    flowerHead.style.bottom = settings.height + 'px';
    flowerHead.style.left = '0px';
    flowerHead.style.setProperty('--delay', (settings.delay + 2) + 's');

    // Brillo de la flor
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.style.setProperty('--delay', (settings.delay + 2.5) + 's');
    flowerHead.appendChild(glow);

    // Pétalos
    const petals = document.createElement('div');
    petals.className = 'petals';

    for (let i = 0; i < settings.petals; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      const angle = i * (360 / settings.petals);
      petal.style.transform = `rotate(${angle}deg) translate(50%, 0)`;

      petals.appendChild(petal);
    }

    flowerHead.appendChild(petals);
    flower.appendChild(flowerHead);
    flowersContainer.appendChild(flower);
  });
}


// Crear una estrella fugaz
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Posición inicial (parte superior de la pantalla)
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 3);
    
    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;
    
    // Calcular posición final (en diagonal hacia abajo)
    const angle = 30;
    const distance = Math.random() * 300 + 200;
    const endX = startX + distance * Math.sin(angle * Math.PI / 180);
    const endY = startY + distance * Math.cos(angle * Math.PI / 180);
    
    // Estilo
    shootingStar.style.width = '3px';
    shootingStar.style.height = '3px';
    shootingStar.style.backgroundColor = 'white';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.boxShadow = '0 0 20px 1px white';
    shootingStar.style.opacity = '0';
    shootingStar.style.zIndex = '1';
    shootingStar.style.position = 'absolute';
    
    document.body.appendChild(shootingStar);
    
    // Animación
    const keyframes = [
        { left: `${startX}px`, top: `${startY}px`, opacity: 0, boxShadow: '0 0 1px 1px white', offset: 0 },
        { opacity: 1, boxShadow: '0 0 2px 1px white, 0 0 40px 7px rgba(255, 255, 255, 0.7)', offset: 0.1 },
        { left: `${endX}px`, top: `${endY}px`, opacity: 0, boxShadow: '0 0 1px 1px white', offset: 1 }
    ];
    
    const timing = {
        duration: Math.random() * 1000 + 1000,
        iterations: 1,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    };
    
    shootingStar.animate(keyframes, timing);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (document.body.contains(shootingStar)) {
            document.body.removeChild(shootingStar);
        }
    }, timing.duration);
}

// Iniciar las estrellas fugaces
function startShootingStars() {
    // Crear estrellas fugaces aleatorias - menos frecuentes
    setInterval(() => {
        if (Math.random() > 0.7) {
            createShootingStar();
        }
    }, 200);
}

// Configurar la silueta
function setupSimpsonSilhouette() {
    const silhouette = document.querySelector('.simpson-silhouette');
    if (silhouette) {
        silhouette.style.backgroundSize = "contain";
        silhouette.style.backgroundPosition = "center bottom";
        silhouette.style.backgroundRepeat = "no-repeat";
        silhouette.style.backgroundImage = "url('./Img/part.png')";
    }
}

// Variables globales para el reproductor de audio
let audioPlayer, audioContext, analyser, dataArray;
let audioSource, canvasContext, visualizerCanvas;
let isPlaying = false;
let progressInterval;

// Configurar el reproductor
function setupPlayer() {
    // Crear elemento de audio
    audioPlayer = new Audio('close_to_you.mp3');
    
    // Configuración de la Web Audio API para la visualización
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    
    // Configurar el analizador
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    // Crear un canvas para el visualizador de audio
    createVisualizer();
    
    // Botón de reproducción
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }
    
    // Funcionalidad de barra de progreso
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', setProgress);
    }
    
    // Actualizar los tiempos cuando se carga los metadatos de audio
    audioPlayer.addEventListener('loadedmetadata', () => {
        document.querySelector('.time-info').lastElementChild.textContent = formatTime(audioPlayer.duration);
        updateProgress();
    });
    
    // Actualizar barra de progreso mientras se reproduce
    audioPlayer.addEventListener('timeupdate', updateProgress);
    
    // Cuando termina la canción
    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.textContent = '▶';
        cancelAnimationFrame(animationFrameId);
        
        // Opcional: reiniciar la visualización
        resetVisualizer();
    });
    
    // Botones de anterior y siguiente (no funcionales en este ejemplo)
    const prevBtn = document.querySelector('.controls').firstElementChild;
    const nextBtn = document.querySelector('.controls').lastElementChild;
    
    if (prevBtn) prevBtn.addEventListener('click', () => alert('Función no implementada: Canción anterior'));
    if (nextBtn) nextBtn.addEventListener('click', () => alert('Función no implementada: Siguiente canción'));
}

// Crear y configurar el visualizador de audio
function createVisualizer() {
    // Crear canvas para el visualizador
    visualizerCanvas = document.createElement('canvas');
    visualizerCanvas.className = 'audio-visualizer';
    
    // Obtener las dimensiones del album-art para ajustar el tamaño del visualizador
    const albumArt = document.querySelector('.album-art');
    
    // Ajustar dimensiones al tamaño del álbum
    visualizerCanvas.width = albumArt ? albumArt.offsetWidth * 0.8 : 200;
    visualizerCanvas.height = albumArt ? albumArt.offsetHeight * 0.3 : 60;
    
    // Posicionar el visualizador dentro del album-art en la parte inferior
    visualizerCanvas.style.position = 'absolute';
    visualizerCanvas.style.bottom = '20px';
    visualizerCanvas.style.left = '50%';
    visualizerCanvas.style.transform = 'translateX(-50%)';
    visualizerCanvas.style.borderRadius = '3px';
    visualizerCanvas.style.opacity = '1';
    visualizerCanvas.style.zIndex = '10';
    
    // Agregar canvas dentro del elemento album-art
    if (albumArt) {
        albumArt.appendChild(visualizerCanvas);
    } else {
        // Fallback si no se encuentra album-art
        const playerContainer = document.querySelector('.player-container');
        if (playerContainer) {
            playerContainer.appendChild(visualizerCanvas);
        }
    }
    
    // Obtener contexto del canvas
    canvasContext = visualizerCanvas.getContext('2d');
}

// Resetear el visualizador
function resetVisualizer() {
    if (canvasContext && visualizerCanvas) {
        canvasContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    }
}

// Función para alternar entre play y pause
function togglePlay() {
    const playBtn = document.querySelector('.play-btn');
    
    if (!audioContext || audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    if (isPlaying) {
        // Pausar
        audioPlayer.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
        cancelAnimationFrame(visualizerAnimationId);
    } else {
        // Reproducir
        audioPlayer.play().then(() => {
            playBtn.textContent = '⏸';
            isPlaying = true;
            
            // Conectar el audio al analizador si no está conectado
            if (!audioSource) {
                audioSource = audioContext.createMediaElementSource(audioPlayer);
                audioSource.connect(analyser);
                analyser.connect(audioContext.destination);
            }
            
            // Iniciar visualización
            visualize();
        }).catch(error => {
            console.error('Error al reproducir el audio:', error);
        });
    }
}

// Función para formatear el tiempo (segundos -> mm:ss)
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

// Actualizar la barra de progreso
function updateProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeElement = document.querySelector('.time-info').firstElementChild;
    
    if (progressBar && currentTimeElement && audioPlayer) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration || 1; // Evitar división por cero
        
        // Actualizar la barra de progreso
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Actualizar el tiempo actual
        currentTimeElement.textContent = formatTime(currentTime);
    }
}

// Cambiar la posición de reproducción al hacer clic en la barra de progreso
function setProgress(e) {
    const progressContainer = document.querySelector('.progress-container');
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    
    if (audioPlayer && audioPlayer.duration) {
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }
}

// Visualizar el audio con barras
let visualizerAnimationId;
function visualize() {
    // Obtener datos de frecuencia
    analyser.getByteFrequencyData(dataArray); // data es un array de 256 elementos
    
    // Limpiar canvas
    canvasContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    
    // Configurar estilo de las barras
    const barCount = 16; // Número de barras
    const barWidth = visualizerCanvas.width / barCount - 1; // Ancho para ocupar todo el espacio
    const barSpacing = 1;
    const barHeightFactor = visualizerCanvas.height / 255;
    
    // Dibujar las barras
    for (let i = 0; i < barCount; i++) {
        // Distribución más equilibrada de frecuencias:
        // - Usar una parte más ancha del espectro (entre 10% y 70%)
        // - Evitar frecuencias muy altas que casi no se mueven
        const frequencyRange = dataArray.length * 0.6; // Usar 60% del espectro
        const startOffset = dataArray.length * 0.1; // Empezar desde 10% del espectro
        
        // Calcular índice de frecuencia más distribuido
        const index = Math.floor(startOffset + (i / barCount) * frequencyRange);
        
        // Aplicar una pequeña amplificación a frecuencias medias y altas
        let value = dataArray[index];
        
        // Si son las barras de la derecha (frecuencias más altas), amplificarlas un poco
        if (i > barCount / 2) {
            value = Math.min(255, value * 1.4); // Amplificar hasta 40%
        }
        
        // Altura de la barra según el valor de frecuencia
        const barHeight = Math.max(4, value * barHeightFactor); // Mínimo 4px de altura para barras visibles
        
        // Color azul uniforme
        canvasContext.fillStyle = '#FFFFFF';
        
        // Posición x de la barra
        const x = i * (barWidth + barSpacing);
        
        // Dibujar la barra desde abajo
        canvasContext.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
    }
    
    // Continuar la animación si se está reproduciendo
    if (isPlaying) {
        visualizerAnimationId = requestAnimationFrame(visualize);
    }
}

// Limpiar recursos al cerrar
window.addEventListener('beforeunload', function() {
    // Detener el bucle de animación
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
});



