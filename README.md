


## 1. Resumen del Proyecto

**learnyounats** será una herramienta de aprendizaje interactiva en la línea de comandos, diseñada como un fork de `learnyounode`. El objetivo es enseñar a los desarrolladores de Node.js a utilizar el sistema de mensajería NATS, cubriendo desde los conceptos básicos de Publish/Subscribe hasta funcionalidades avanzadas de persistencia con NATS JetStream.

## 2. Nombre de la Aplicación

- **Nombre:** `learnyounode-nats`
- **Comando principal:** `learnyounode-nats`

## 3. Inspiración y Mecánica Principal

La aplicación replicará la experiencia de usuario de `learnyounode`:

1.  **Instalación global:** A través de npm (`npm install -g learnyounats`).
2.  **Menú interactivo:** El comando `learnyounats` mostrará una lista de ejercicios disponibles.
3.  **Selección de ejercicio:** El usuario elige un ejercicio y la aplicación muestra las instrucciones y requisitos en la terminal.
4.  **Resolución:** El usuario escribe el código de la solución en un archivo (ej: `solucion.js`).
5.  **Verificación:** El usuario verifica su solución con el comando `learnyounats verify solucion.js`. El sistema ejecutará el script del usuario y un proceso de validación para comprobar si la solución es correcta.

## 4. Requisitos Técnicos Previos

Para completar los ejercicios, el usuario necesitará:

1.  **Node.js** y **npm** instalados.
2.  Un **servidor NATS** en ejecución y accesible. Las instrucciones recomendarán iniciarlo fácilmente con Docker, incluyendo el soporte para JetStream:
    ```bash
    docker run --rm -p 4222:4222 -p 8222:8222 nats:latest -js
    ```

## 5. Estructura de los Ejercicios Propuestos

Los ejercicios tendrán una progresión lógica, comenzando con NATS Core y avanzando hacia JetStream.

Lecciones empaquetadas - cada lección incluye:
- instrucciones.md (enunciado claro)
- template/program.js (archivo base)
- verify.js (script que valida la solución)
- fixtures (archivos de apoyo si aplica)

### Parte 1: Fundamentos de NATS Core

1.  **HOLA NATS**
    -   **Objetivo:** Conectarse a un servidor NATS y cerrar la conexión correctamente.
    -   **Verificación:** El script debe ejecutarse sin errores e imprimir en consola un mensaje de conexión exitosa.

2.  **PUBLICANDO TU PRIMER MENSAJE**
    -   **Objetivo:** Publicar un mensaje simple en un *subject* específico.
    -   **Verificación:** El verificador se suscribirá a ese *subject* y comprobará que el mensaje recibido es el correcto.

3.  **SUSCRIBIÉNDOTE A MENSAJES**
    -   **Objetivo:** Crear una suscripción a un *subject* y mostrar en consola el mensaje recibido.
    -   **Verificación:** El verificador publicará un mensaje en el *subject* y comprobará que el script del usuario lo imprime en `stdout`.

4.  **RESPUESTA A PETICIONES (REQUEST-REPLY)**
    -   **Objetivo:** Crear un servicio que escuche peticiones en un *subject* y devuelva una respuesta.
    -   **Verificación:** El verificador enviará una petición (`request`) y validará que recibe la respuesta esperada.

5.  **SUSCRIPCIONES CON COMODINES**
    -   **Objetivo:** Suscribirse a un patrón de *subjects* (ej: `eventos.*`) y procesar los mensajes.
    -   **Verificación:** El verificador publicará en varios *subjects* que coincidan con el patrón (`eventos.creado`, `eventos.actualizado`) y comprobará que el script los procesa todos.

### Parte 2: Persistencia con NATS JetStream

6.  **INTRO A JETSTREAM**
    -   **Objetivo:** Ejercicio teórico. Explicar qué es JetStream, los conceptos de *Stream* y *Consumer*.
    -   **Verificación:** No requiere código, se marca como completado al seleccionarlo.

7.  **CREANDO UN STREAM**
    -   **Objetivo:** Conectarse al gestor de JetStream y crear un *Stream* para almacenar mensajes de ciertos *subjects*.
    -   **Verificación:** El verificador usará la API de JetStream para comprobar que el *Stream* fue creado con la configuración correcta.

8.  **PUBLICADOR PERSISTENTE**
    -   **Objetivo:** Publicar un mensaje en un *subject* gestionado por un *Stream* de JetStream.
    -   **Verificación:** El verificador publicará el mensaje y luego comprobará que el mensaje existe dentro del *Stream*.

9.  **CONSUMIDOR DE UN STREAM**
    -   **Objetivo:** Obtener y procesar un mensaje de un *Stream*.
    -   **Verificación:** El verificador añadirá un mensaje al *Stream* y comprobará que el script del usuario lo consume y lo imprime en consola.

10. **CONFIRMANDO MENSAJES (ACK)**
    -   **Objetivo:** Consumir un mensaje y enviarle una confirmación (`ack`) a JetStream para que no lo vuelva a enviar.
    -   **Verificación:** El verificador comprobará que, después de que el script del usuario se ejecute, el mensaje ha sido eliminado de la cola del consumidor.

11. **CREANDO UN CONSUMIDOR DURABLE**
    -   **Objetivo:** Crear un consumidor durable que mantenga su estado entre ejecuciones.
    -   **Verificación:** El verificador comprobará que el consumidor durable ha sido creado correctamente en el servidor.

## 6. Flujo de Verificación

A diferencia de `learnyounode` (que a menudo solo revisa `stdout`), el verificador de `learnyounats` será más complejo:

-   Actuará como un cliente NATS independiente.
-   Para ejercicios de publicación, se suscribirá para recibir los mensajes del usuario.
-   Para ejercicios de suscripción, publicará mensajes para el script del usuario.
-   Para ejercicios de JetStream, usará las APIs de `JetStreamManager` y `JetStreamClient` para inspeccionar el estado del servidor (streams, consumidores, mensajes) antes y después de la ejecución del script del usuario.

## 7. Interfaz de Usuario

-   Se mantendrá la interfaz de texto minimalista y basada en menús de `learnyounode`, probablemente usando librerías como `terminal-menu` o similar.
-   Los colores y el estilo buscarán emular la sensación retro/didáctica del original.
