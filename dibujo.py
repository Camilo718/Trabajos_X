### Codigo Para una Sorpresa en Python ###

import numpy as np
import time
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Configuración de la figura
fig, ax = plt.subplots()
ax.set_aspect('equal')
ax.axis('off')  # Ocultar los ejes
line, = ax.plot([], [], color='red', linewidth=2)  # Línea para el corazón

# Generar los puntos del corazón
t = np.linspace(0, 2 * np.pi, 100)
x = 16 * np.sin(t) ** 3
y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)

# Configurar límites del gráfico
ax.set_xlim(-20, 20)
ax.set_ylim(-25, 15)

# Función de inicialización
def init():
    line.set_data([], [])
    return line,

# Función de animación
def animate(i):
    line.set_data(x[:i], y[:i])  # Actualizar la línea hasta el punto i
    if i == len(t) - 1:  # Mostrar el mensaje al final de la animación
        plt.text(0, -20, "¡T'Amoooo ♡!", fontsize=18, color='purple', ha='center')
        plt.pause(3)  # Pausa de 3 segundos    
    return line,

# Crear la animación
ani = FuncAnimation(fig, animate, frames=len(t), init_func=init, blit=True, interval=50)

# Mostrar la animación
plt.show()