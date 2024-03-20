
    // Configuración del juego
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const bikeWidth = 130;
    const bikeHeight = 150;
    const groundHeight = 1;
    const roadWidth = canvas.width;
    const roadHeight = canvas.height;

    let bikeX = canvas.width / 1.4 - bikeWidth / 2;
    let bikeY = canvas.height - groundHeight - bikeHeight;
    let bikeSpeedX = 0;
    let bikeSpeedY = 0;
    let acceleration = 0.4;
    let rotationSpeed = 0.08; // Velocidad de rotación de la moto

    // Declaración de una nueva variable para cargar la imagen de la moto
    let bikeImage = new Image();
    bikeImage.src = 'img/duke.png';

    // Declaración de una nueva variable para cargar la imagen de la carretera
    let roadImage = new Image();
    roadImage.src = 'img/carretera.jpg';

    // Variables para el velocímetro
    const speedometerX = 20;
    const speedometerY = 20;
    const speedometerWidth = 120;
    const speedometerHeight = 60;

    // Función para dibujar la carretera de fondo
    function drawRoad() {
      ctx.drawImage(roadImage, 0, 0, roadWidth, roadHeight);
    }

    // Función para dibujar la moto
    function drawBike() {
      ctx.save(); // Guardar el estado del contexto
      ctx.translate(bikeX + bikeWidth / 2, bikeY + bikeHeight / 2); // Mover al centro de la moto
      ctx.rotate(bikeSpeedX * rotationSpeed); // Rotar la moto según la velocidad horizontal
      ctx.drawImage(bikeImage, -bikeWidth / 2, -bikeHeight / 2, bikeWidth, bikeHeight); // Dibujar la moto
      ctx.restore(); // Restaurar el estado del contexto
    }

    // Función para dibujar el velocímetro
    function drawSpeedometer() {
      // Dibujar el marco del velocímetro
      ctx.fillStyle = 'green';
      ctx.fillRect(speedometerX, speedometerY, speedometerWidth, speedometerHeight);

      // Mostrar la velocidad actual en kilómetros por hora
      const maxSpeed = 10; // Velocidad máxima del juego (ajusta según sea necesario)
      const currentSpeed = Math.sqrt(bikeSpeedX ** 2 + bikeSpeedY ** 2);
      const speedKPH = currentSpeed * 11; // Suponiendo una escala para convertir a KPH

      // Configurar el estilo de la velocidad
      ctx.font = '1.5rem Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(speedKPH.toFixed(0) + ' Km/h', speedometerX + speedometerWidth / 2, speedometerY + speedometerHeight / 2 + 10);
    }

    // Función para actualizar la posición de la moto
    function update() {
      bikeX += bikeSpeedX;
      bikeY += bikeSpeedY;
      // Aplicar fricción
      bikeSpeedX *= 0.99;
      bikeSpeedY *= 0.99;
      // Mantener la moto en el lienzo
      if (bikeX < 0) {
        bikeX = 0;
        bikeSpeedX = 0;
      } else if (bikeX + bikeWidth > canvas.width) {
        bikeX = canvas.width - bikeWidth;
        bikeSpeedX = 0;
      }
      if (bikeY < 0) {
        bikeY = 0;
        bikeSpeedY = 0;
      } else if (bikeY + bikeHeight > canvas.height - groundHeight) {
        bikeY = canvas.height - groundHeight - bikeHeight;
        bikeSpeedY = 0;
      }
    }

    // Función para manejar la entrada del usuario
    function handleInput(event) {
      if (event.key === 'ArrowLeft') {
        bikeSpeedX -= acceleration;
      } else if (event.key === 'ArrowRight') {
        bikeSpeedX += acceleration;
      } else if (event.key === 'ArrowUp') {
        bikeSpeedY -= acceleration;
      } else if (event.key === 'ArrowDown') {
        bikeSpeedY += acceleration;
      }
    }

    // Bucle del juego
    function gameLoop() {
      update();
      drawRoad(); // Dibujar la carretera de fondo
      drawBike(); // Dibujar la moto
      drawSpeedometer(); // Dibujar el velocímetro
      requestAnimationFrame(gameLoop);
    }

    // Escuchar eventos de teclado
    window.addEventListener('keydown', handleInput);

    // Comenzar el bucle del juego
    bikeImage.onload = function () {
      roadImage.onload = function () {
        gameLoop();
      };
    };