// Obtener el ID de usuario de la URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// Hacer una solicitud a la ruta /userInfo/:userId para obtener la información del usuario
fetch('http://localhost:3000/userInfo/' + userId)
 .then(response => {
 return response.json();
 })
 .then(data => {
 // Actualizar el contenido del elemento h5 con el nombre del usuario
 const nameParts = data.nombre.split(' ');
 document.querySelector('.profile h5').textContent = nameParts[0];
 document.querySelector('.profile-photo img').src = data.profileImage;
 });

// Agregar el ID del usuario como un parámetro de consulta a cada enlace en la página
const links = document.querySelectorAll('a');
links.forEach(link => {
  // Verificar si el enlace ya contiene un parámetro userId
  const linkUrlParams = new URLSearchParams(link.search);
  if (!linkUrlParams.has('userId')) {
    // Si el enlace no contiene un parámetro userId, agregar uno
    if (link.href.indexOf('?') === -1) {
      link.href = link.href + '?userId=' + userId;
    } else {
      link.href = link.href + '&userId=' + userId;
    }
  }
});

// Obtener todos los enlaces <a> en la barra lateral
const sidebarLinks = document.querySelectorAll('.sidebar a');

// Obtener el elemento con la clase "middle"
const middleElement = document.querySelector('.middle');
const secondOperationElement = document.querySelector('.second_operation');
const scheduleElement = document.querySelector('.schedule')

//Al iniciar la pagina los estilos de todos son bloqueados menos el middleElement
middleElement.style.display = 'block';
secondOperationElement.style.display = 'none';
scheduleElement.style.display = 'none';

// show or hide sidebar
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sidebar = document.querySelector('aside');

menuBtn.addEventListener('click', () => {
    sidebar.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';
})

// change theme
const themeBtn = document.querySelector('.theme-btn');
// Obtener el elemento <img> del logotipo
const logoImg = document.querySelector('.logo');

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    themeBtn.querySelector('span:first-child').classList.toggle('active');
    themeBtn.querySelector('span:last-child').classList.toggle('active');

    // Verificar si el cuerpo del documento tiene la clase "dark-theme"
    if (document.body.classList.contains('dark-theme')) {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema oscuro
      logoImg.src = './images/logo2.png';
    } else {
      // Cambiar el atributo src del elemento <img> del logotipo a la imagen del tema claro
      logoImg.src = './images/logo.png';
    }
})

let cambiosGuardados = true;

const enlaces = document.querySelectorAll('a');

let enlaceSeleccionado = null;

enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (event) => {
      if (!cambiosGuardados) {
        event.preventDefault();
        enlaceSeleccionado = event.currentTarget;
        Swal.fire({
          title: '¿Estás seguro que quieres salir?',
          text: "Los cambios no se guardarán",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, salir'
        }).then((result) => {
          if (result.isConfirmed) {
            let formularioActivo = null;
            if (secondOperationElement.style.display === 'block') {
              formularioActivo = document.querySelector('#simulator-form');
            }
            
            // Restablecer los campos del formulario activo
            if (formularioActivo) {
              formularioActivo.reset();
            }
            
            cambiosGuardados = true;
            enlaceSeleccionado.click();
          }
        })
      } else {
        // Eliminar la clase "active" del enlace <a> actualmente activo
        document.querySelector('.sidebar a.active').classList.remove('active');
        // Agregar la clase "active" al enlace <a> que se hizo clic
        event.currentTarget.classList.add('active');
  
        // Verificar si se hizo clic en el enlace "Informations"
        if (event.currentTarget.querySelector('h4').textContent === 'Information') {
          // Mostrar el elemento con la clase "middle"
          middleElement.style.display = 'block';
          secondOperationElement.style.display = 'none';
          scheduleElement.style.display = 'none';
        }
  
        // Verificar si se hizo clic en el enlace "Simulator"
        if (event.currentTarget.querySelector('h4').textContent === 'Schedule') {
          // Mostrar el elemento con la clase "middle"
          middleElement.style.display = 'none';
          secondOperationElement.style.display = 'none'; 
          scheduleElement.style.display =' block';
        }
      }
    });
  });
  

const inputs = document.querySelectorAll('input, select');
inputs.forEach((input) => {
  input.addEventListener('change', () => {
    cambiosGuardados = false;
  });
});


// Objeto que contiene información sobre todas las autos
const autos = {
  1: {
      nombre: 'BMW X1',
      descripcion: 'El nuevo BMW X1 convence por su versatilidad y funcionalidad: Lenguaje de diseño claramente estructurado en el exterior para una presencia segura y deportiva. El moderno interior está equipado con materiales exclusivos e innovaciones como el BMW Curved Display X1 sDrive18i: Consumo de combustible en l/100 km (promedio, WLTP): 6.5* Emisiones de CO2 en g/km (primedio, WLTP): 148* *Los datos son provisionales',
      puertas: 4,
      kilometraje: 0,
      combustible: 'Gasolina',
      transmision: 'Automática',
      estado: 'Nuevo',
      anio_modelo: 2024,
      precio: 339900,
      imagenes: [
        '/auto_simulator/images/autos/auto1/auto1_1.jpg',
        '/auto_simulator/images/autos/auto1/auto1_2.jpg',
        '/auto_simulator/images/autos/auto1/auto1_3.jpg',
        '/auto_simulator/images/autos/auto1/auto1_4.jpg',
        '/auto_simulator/images/autos/auto1/auto1_5.jpg',
        '/auto_simulator/images/autos/auto1/auto1_6.jpg',
        '/auto_simulator/images/autos/auto1/auto1_7.jpg',
        '/auto_simulator/images/autos/auto1/auto1_8.jpg',
        '/auto_simulator/images/autos/auto1/auto1_9.jpg',
        '/auto_simulator/images/autos/auto1/auto1_10.jpg',
        '/auto_simulator/images/autos/auto1/auto1_11.jpg',
        '/auto_simulator/images/autos/auto1/auto1_12.jpg'
      ]
  },
  2: {
    nombre: 'BMW iX1 2024',
    descripcion: 'El primer BMW iX1 totalmente eléctrico destaca por su funcionalidad y versatilidad, en la vida diaria: Exterior llamativo gracias a su nuevo diseño.  Máximo confort en el interior gracias a los asientos activos con función de masaje lumbar para disfrutar y evitar el cansancio. Puesto de conducción multimedia moderno gracias al innovador BMW Curved Display con concepto de manejo táctil y por voz. Su autonomía de hasta 438 km ofrece total flexibilidad. BMW iX1 xDrive30: Consumo eléctrico en kWh/100 km (promedio, WLTP): 18.4 – 17.3* Autonomía eléctrica en km (WLTP): 413 – 438* * Valores provisionales; los datos que faltan no estaban aún disponibles al cierre de la edición.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 291500,
    imagenes: [
      '/auto_simulator/images/autos/auto2/auto2_1.jpg',
      '/auto_simulator/images/autos/auto2/auto2_2.jpg',
      '/auto_simulator/images/autos/auto2/auto2_3.jpg',
      '/auto_simulator/images/autos/auto2/auto2_4.jpg',
      '/auto_simulator/images/autos/auto2/auto2_5.jpg',
      '/auto_simulator/images/autos/auto2/auto2_6.jpg',
      '/auto_simulator/images/autos/auto2/auto2_7.jpg',
      '/auto_simulator/images/autos/auto2/auto2_8.jpg'
    ]
  },
  3: {
    nombre: 'BMW X2',
    descripcion: 'Absolutamente único y extraordinario. El BMW X2 es un modelo deportivo y atlético que ofrece unas prestaciones dinámicas y ágiles insuperables en esta categoría. Con un interior exclusivo y tecnologías innovadoras, es el protagonista de una nueva época. ¿Estás preparado? Su diseño extrovertido, carácter de coupé y los exclusivos elementos de diseño de Edition M Mesh, hacen que sea un modelo especialmente deportivo. Partiendo de la impresionante parrilla BMW de rejilla en negro brillo, el diseño estético del exterior se extiende, a través de las láminas del BMW X2 en el capó y los laterales del vehículo, hasta las imponentes llantas aerodinámicas M. El interior del BMW X2 destaca por su deportividad y elegancia: exclusivos detalles de diseño, como las exclusivas molduras de entrada con anagrama "Edition" o los asientos M Sport en combinación de cuero "Dakota" y Alcantara.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 293695,
    imagenes: [
      '/auto_simulator/images/autos/auto3/auto3_1.jpg',
      '/auto_simulator/images/autos/auto3/auto3_2.jpg',
      '/auto_simulator/images/autos/auto3/auto3_3.jpg',
      '/auto_simulator/images/autos/auto3/auto3_4.jpg',
      '/auto_simulator/images/autos/auto3/auto3_5.jpg',
      '/auto_simulator/images/autos/auto3/auto3_6.jpg',
      '/auto_simulator/images/autos/auto3/auto3_7.jpg',
      '/auto_simulator/images/autos/auto3/auto3_8.jpg'
    ]
  },
  4: {
    nombre: 'BMW X4 M 2024',
    descripcion: 'Una rebeldía inspiradora: la gama de autos deportivos  BMW X4 M combina el potencial de alto rendimiento y la exclusividad de un modelo M con el concepto avanzado de un BMW X4. Elige entre cuatro excepcionales Sports Activity Coupés (SAC): el BMW X4 M viene equipado con ADN de competición y ofrece un dinamismo de conducción del más alto nivel; estas características se refuerzan aún más en el BMW X4 M Competition, que ofrece las máximas prestaciones y un equipamiento exclusivo en autos de lujo para disfrutar de un placer de conducir apasionante hasta el límite. El BMW X4 M40i se presentan en plena forma en cualquier trayecto e impresionan con una inteligente simbiosis de rendimiento, confort y eficiencia.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 343000,
    imagenes: [
      '/auto_simulator/images/autos/auto4/auto4_1.jpg',
      '/auto_simulator/images/autos/auto4/auto4_2.jpg',
      '/auto_simulator/images/autos/auto4/auto4_3.jpg',
      '/auto_simulator/images/autos/auto4/auto4_4.jpg',
      '/auto_simulator/images/autos/auto4/auto4_5.jpg',
      '/auto_simulator/images/autos/auto4/auto4_6.jpg',
      '/auto_simulator/images/autos/auto4/auto4_7.jpg',
      '/auto_simulator/images/autos/auto4/auto4_8.jpg'
    ]
  },
  5: {
    nombre: 'BMW M440i xDrive Gran Coupé',
    descripcion: 'Poder, precisión y pura estética. El corazón del nuevo BMW M440i xDrive Gran Coupé es un motor de gasolina de 6 cilindros en línea BMW M TwinPower Turbo con 387 HP. Junto con los componentes del suspensión específicos de M perfectamente coordinados, genera un dinamismo de conducción deportivo que convierte al BMW M440i xDrive Gran Coupé también en referencia visual: tanto con su exterior de diseño progresivo con elementos de diseño M como su interior deportivo, moderno y amplio. En general, el Gran Coupé de 5 puertas ofrece una fascinante fusión de rendimiento, confort y una gran aptitud para la vida diaria.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 244200,
    imagenes: [
      '/auto_simulator/images/autos/auto5/auto5_1.jpg',
      '/auto_simulator/images/autos/auto5/auto5_2.jpg',
      '/auto_simulator/images/autos/auto5/auto5_3.jpg',
      '/auto_simulator/images/autos/auto5/auto5_4.jpg',
      '/auto_simulator/images/autos/auto5/auto5_5.jpg',
      '/auto_simulator/images/autos/auto5/auto5_6.jpg',
      '/auto_simulator/images/autos/auto5/auto5_7.jpg',
      '/auto_simulator/images/autos/auto5/auto5_8.jpg',
      '/auto_simulator/images/autos/auto5/auto5_9.jpg',
      '/auto_simulator/images/autos/auto5/auto5_10.jpg',
      '/auto_simulator/images/autos/auto5/auto5_11.jpg'
    ]
  },
  6: {
    nombre: 'BMW M2 Coupé',
    descripcion: 'Un vehículo deportivo de alto rendimiento que combina una potencia impresionante con una maniobrabilidad excepcional. Su diseño aerodinámico y su motor turboalimentado hacen del M2 Coupé una elección emocionante para los entusiastas de la conducción.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 140417,
    imagenes: [
      '/auto_simulator/images/autos/auto6/auto6_1.jpg',
      '/auto_simulator/images/autos/auto6/auto6_2.jpg',
      '/auto_simulator/images/autos/auto6/auto6_3.jpg',
      '/auto_simulator/images/autos/auto6/auto6_4.jpg',
      '/auto_simulator/images/autos/auto6/auto6_5.jpg',
      '/auto_simulator/images/autos/auto6/auto6_6.jpg',
      '/auto_simulator/images/autos/auto6/auto6_7.jpg'
    ]
  },
  7: {
    nombre: 'BMW Z4 M40i',
    descripcion: 'Este roadster de lujo ofrece una combinación perfecta de rendimiento y refinamiento. Con su motor de seis cilindros y su suspensión deportiva, el Z4 M40i está diseñado para ofrecer una experiencia de conducción emocionante.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 291211,
    imagenes: [
      '/auto_simulator/images/autos/auto7/auto7_1.jpg',
      '/auto_simulator/images/autos/auto7/auto7_2.jpg',
      '/auto_simulator/images/autos/auto7/auto7_3.jpg',
      '/auto_simulator/images/autos/auto7/auto7_4.jpg',
      '/auto_simulator/images/autos/auto7/auto7_5.jpg'
    ]
  },
  8: {
    nombre: 'BMW Z4 Roadster',
    descripcion: 'Un coche deportivo elegante y sofisticado, perfecto para los días soleados. Con su techo descapotable y su diseño elegante, el Z4 Roadster es un coche que siempre querrás conducir.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 291107,
    imagenes: [
      '/auto_simulator/images/autos/auto8/auto8_1.jpg',
      '/auto_simulator/images/autos/auto8/auto8_2.jpg',
      '/auto_simulator/images/autos/auto8/auto8_3.jpg',
      '/auto_simulator/images/autos/auto8/auto8_4.jpg',
      '/auto_simulator/images/autos/auto8/auto8_5.jpg',
      '/auto_simulator/images/autos/auto8/auto8_6.jpg',
      '/auto_simulator/images/autos/auto8/auto8_7.jpg'
    ]
  },
  9: {
    nombre: 'BMW Serie 1',
    descripcion: 'Un hatchback compacto que ofrece una conducción dinámica y un interior de alta calidad. Ideal para la ciudad, pero con la potencia y el rendimiento para emocionar en carretera abierta.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 333306,
    imagenes: [
      '/auto_simulator/images/autos/auto9/auto9_1.jpg',
      '/auto_simulator/images/autos/auto9/auto9_2.jpg',
      '/auto_simulator/images/autos/auto9/auto9_3.jpg',
      '/auto_simulator/images/autos/auto9/auto9_4.jpg',
      '/auto_simulator/images/autos/auto9/auto9_5.jpg',
      '/auto_simulator/images/autos/auto9/auto9_6.jpg',
      '/auto_simulator/images/autos/auto9/auto9_7.jpg',
      '/auto_simulator/images/autos/auto9/auto9_8.jpg'
    ]
  },
  10: {
    nombre: 'BMW Serie 2 Convertible',
    descripcion: 'Disfruta del aire libre con este elegante convertible. Con su techo retráctil y su lujoso interior, el Serie 2 Convertible es perfecto para los días de verano.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 266715,
    imagenes: [
      '/auto_simulator/images/autos/auto10/auto10_1.jpg',
      '/auto_simulator/images/autos/auto10/auto10_2.jpg',
      '/auto_simulator/images/autos/auto10/auto10_3.jpg',
      '/auto_simulator/images/autos/auto10/auto10_4.jpg',
      '/auto_simulator/images/autos/auto10/auto10_5.jpg'
    ]
  },
  11: {
    nombre: 'BMW Serie 2 Coupé',
    descripcion: 'Un coupé deportivo que ofrece una conducción emocionante y un diseño elegante. Con su potente motor y su manejo ágil, el Serie 2 Coupé es un verdadero placer de conducir.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 288000,
    imagenes: [
      '/auto_simulator/images/autos/auto11/auto11_1.jpg',
      '/auto_simulator/images/autos/auto11/auto11_2.jpg',
      '/auto_simulator/images/autos/auto11/auto11_3.jpg',
      '/auto_simulator/images/autos/auto11/auto11_4.jpg',
      '/auto_simulator/images/autos/auto11/auto11_5.jpg',
      '/auto_simulator/images/autos/auto11/auto11_6.jpg',
      '/auto_simulator/images/autos/auto11/auto11_7.jpg'
    ]
  },
  12: {
    nombre: 'BMW M3 Sedán',
    descripcion: 'Un sedán deportivo de alto rendimiento con un potente motor y una dinámica de conducción excepcional. El M3 Sedán combina la practicidad de un sedán con el rendimiento de un coche deportivo.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 341000,
    imagenes: [
      '/auto_simulator/images/autos/auto12/auto12_1.jpg',
      '/auto_simulator/images/autos/auto12/auto12_2.jpg',
      '/auto_simulator/images/autos/auto12/auto12_3.jpg',
      '/auto_simulator/images/autos/auto12/auto12_4.jpg',
      '/auto_simulator/images/autos/auto12/auto12_5.jpg',
      '/auto_simulator/images/autos/auto12/auto12_6.jpg'
    ]
  },
  13: {
    nombre: 'BMW i4 2024',
    descripcion: 'Un coche eléctrico de lujo que combina un rendimiento impresionante con una eficiencia excepcional. El i4 2024 representa el futuro de la movilidad eléctrica.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 199246,
    imagenes: [
      '/auto_simulator/images/autos/auto13/auto13_1.jpg',
      '/auto_simulator/images/autos/auto13/auto13_2.jpg',
      '/auto_simulator/images/autos/auto13/auto13_3.jpg',
      '/auto_simulator/images/autos/auto13/auto13_4.jpg',
      '/auto_simulator/images/autos/auto13/auto13_5.jpg',
      '/auto_simulator/images/autos/auto13/auto13_6.jpg',
      '/auto_simulator/images/autos/auto13/auto13_7.jpg',
      '/auto_simulator/images/autos/auto13/auto13_8.jpg',
      '/auto_simulator/images/autos/auto13/auto13_9.jpg',
      '/auto_simulator/images/autos/auto13/auto13_10.jpg'
    ]
  },
  14: {
    nombre: 'BMW M5 Sedán 2023',
    descripcion: 'Un sedán de lujo con un rendimiento de superdeportivo. Con su potente motor y su lujoso interior, el M5 Sedán 2023 ofrece una experiencia de conducción inigualable.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 221404,
    imagenes: [
      '/auto_simulator/images/autos/auto14/auto14_1.jpg',
      '/auto_simulator/images/autos/auto14/auto14_2.jpg',
      '/auto_simulator/images/autos/auto14/auto14_3.jpg',
      '/auto_simulator/images/autos/auto14/auto14_4.jpg',
      '/auto_simulator/images/autos/auto14/auto14_5.jpg',
      '/auto_simulator/images/autos/auto14/auto14_6.jpg',
      '/auto_simulator/images/autos/auto14/auto14_7.jpg'
    ]
  },
  15: {
    nombre: 'BMW Serie 5 Híbrido Enchufable',
    descripcion: 'Combina lo mejor de los mundos de gasolina y eléctrico. Con su motor híbrido enchufable, el Serie 5 ofrece una eficiencia impresionante sin comprometer el rendimiento.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 290696,
    imagenes: [
      '/auto_simulator/images/autos/auto15/auto15_1.jpeg',
      '/auto_simulator/images/autos/auto15/auto15_2.jpg',
      '/auto_simulator/images/autos/auto15/auto15_3.jpg',
      '/auto_simulator/images/autos/auto15/auto15_4.jpg',
      '/auto_simulator/images/autos/auto15/auto15_5.jpg',
      '/auto_simulator/images/autos/auto15/auto15_6.jpeg'
    ]
  },
  16: {
    nombre: 'BMW Serie 8 Gran Coupé',
    descripcion: 'Un coupé de lujo con un diseño impresionante y un rendimiento excepcional. El Serie 8 Gran Coupé es un coche que siempre deja una impresión duradera.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 290000,
    imagenes: [
      '/auto_simulator/images/autos/auto16/auto16_1.jpg',
      '/auto_simulator/images/autos/auto16/auto16_2.jpg',
      '/auto_simulator/images/autos/auto16/auto16_3.jpg',
      '/auto_simulator/images/autos/auto16/auto16_4.jpg',
      '/auto_simulator/images/autos/auto16/auto16_5.jpg',
      '/auto_simulator/images/autos/auto16/auto16_6.jpg',
      '/auto_simulator/images/autos/auto16/auto16_7.jpg',
      '/auto_simulator/images/autos/auto16/auto16_8.jpeg'
    ]
  },
  17: {
    nombre: 'BMW M235i xDrive Gran Coupé',
    descripcion: 'Un coupé deportivo con un rendimiento impresionante y una tracción en todas las ruedas. El M235i xDrive Gran Coupé ofrece una experiencia de conducción emocionante en cualquier condición.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 168500,
    imagenes: [
      '/auto_simulator/images/autos/auto17/auto17_1.jpg',
      '/auto_simulator/images/autos/auto17/auto17_2.jpg',
      '/auto_simulator/images/autos/auto17/auto17_3.jpg',
      '/auto_simulator/images/autos/auto17/auto17_4.jpg',
      '/auto_simulator/images/autos/auto17/auto17_5.jpg',
      '/auto_simulator/images/autos/auto17/auto17_6.jpg'
    ]
  },
  18: {
    nombre: 'BMW X7 M850i',
    descripcion: 'Un SUV de lujo con un rendimiento impresionante y un interior espacioso. El X7 M850i combina la versatilidad de un SUV con el lujo y el rendimiento de un coche deportivo.',
    puertas: 4,
    kilometraje: 0,
    combustible: 'Gasolina',
    transmision: 'Automática',
    estado: 'Nuevo',
    anio_modelo: 2024,
    precio: 235284,
    imagenes: [
      '/auto_simulator/images/autos/auto18/auto18_1.jpg',
      '/auto_simulator/images/autos/auto18/auto18_2.jpg',
      '/auto_simulator/images/autos/auto18/auto18_3.jpg'
    ]
  }
};

// Obtener el valor del parámetro auto_id de la URL
const autoId = urlParams.get('auto_id');
window.addEventListener('load', () => {
  generarSugerencias();
 });
 
// Obtener información sobre la auto seleccionada
const auto = autos[autoId]; 

// Actualizar el contenido del div con la clase project
document.querySelector('.project .header h2').textContent = auto.nombre;
document.querySelector('.project .description p').textContent = auto.descripcion;
document.getElementById('num-puertas').innerHTML = `<span class="icon-1"></span>N.º Puertas: ${auto.puertas} puertas`;
document.getElementById('num-kilometraje').innerHTML = `<span class="icon-2"></span>Kilometraje: ${auto.kilometraje} km`;
document.getElementById('combustible').innerHTML = `<span class="icon-1"></span>${auto.combustible}`;
document.getElementById('transmision').innerHTML = `<span class="icon-2"></span>${auto.transmision}`;
document.getElementById('estado').innerHTML = `<span class="icon"></span>${auto.estado}`;
document.getElementById('anio_modelo').innerHTML = `<span class="icon"></span>${auto.anio_modelo}`;
const precioFormateado = auto.precio.toLocaleString('es-PE', {minimumFractionDigits: 0});
document.getElementById('price_t').innerHTML = `<span class="icon"></span>${precioFormateado} soles`;
  
// Obtener el div con la clase slide
const slideDiv = document.querySelector('.slide');

// Eliminar todos los div con la clase st
const stDivs = document.querySelectorAll('.st');
stDivs.forEach(stDiv => stDiv.remove());

// Eliminar todos los input type radio y sus etiquetas

const radioInputs = document.querySelectorAll('input[type="radio"]');
radioInputs.forEach(radioInput => radioInput.remove());
const radioLabels = document.querySelectorAll('.m-btn');
radioLabels.forEach(radioLabel => radioLabel.remove());
// Eliminar todos los div con las clases a-b1 hasta a-b12
for (let i = 1; i <= 12; i++) {
    const div = document.querySelector(`.a-b${i}`);
    if (div) {
        div.remove();
    }
}

// Agregar nuevos input type radio y sus etiquetas
const navMDiv = document.querySelector('.nav-m');
auto.imagenes.forEach((imagen, index) => {
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.name = 'radio-btn';
    radioInput.id = `radio${index + 1}`;
    if (index === 0) {
        radioInput.checked = true;
    }
    slideDiv.insertBefore(radioInput, slideDiv.firstChild);

    const radioLabel = document.createElement('label');
    radioLabel.htmlFor = `radio${index + 1}`;
    radioLabel.classList.add('m-btn');
    navMDiv.appendChild(radioLabel);
});

// Agregar nuevos div con las clases a-b1 hasta a-bN (donde N es el número de imágenes)
const navAutoDiv = document.querySelector('.nav-auto');
auto.imagenes.forEach((imagen, index) => {
    const div = document.createElement('div');
    div.classList.add(`a-b${index + 1}`);
    navAutoDiv.appendChild(div);
});

// Agregar nuevos div con la clase st y agregar imágenes desde el objeto autos
auto.imagenes.forEach((imagen, index) => {
      const stDiv = document.createElement('div');
      stDiv.classList.add('st');
      if (index === 0) {
          stDiv.classList.add('first');
      }
      const img = document.createElement('img');
      img.src = imagen;
      stDiv.appendChild(img);
      slideDiv.appendChild(stDiv);
  });

// Generar dinámicamente reglas CSS para cambiar el margen izquierdo del div con la clase first
const style = document.createElement('style');
let css = '';
auto.imagenes.forEach((imagen, index) => {
    css += `#radio${index + 1}:checked ~ .first { margin-left: -${800 * index}px; }\n`;
});
style.textContent = css;
document.head.appendChild(style);

// Actualizar el código para el contador para que funcione con un número variable de imágenes
let counter = 2;

const numImages = auto.imagenes.length;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > numImages) {
        counter = 1;
    }
}, 3500);

function generarSugerencias() {
  const idActual = urlParams.get('auto_id');
  const idsDisponibles = Object.keys(autos)
  .filter(id => id !== idActual && id <= 18);
  const idsSeleccionados = [];
  for (let i = 0; i < 6; i++) {
  const indiceAleatorio = Math.floor(Math.random() * idsDisponibles.length);
  const idSeleccionado = idsDisponibles.splice(indiceAleatorio, 1)[0];
  idsSeleccionados.push(idSeleccionado);
  }
  const autosSugeridas = idsSeleccionados.map(id => autos[id]);
  
  let html = '';
  autosSugeridas.forEach((auto, index) => {
  html += `
  <div class="investment" data-id="${idsSeleccionados[index]}">
  <img src="${auto.imagenes[0]}">
  <div class="investment-info">
  <h4>${auto.nombre}</h4>
  <p>${auto.descripcion.slice(0, 50)}...</p>
  <div class="amount">
  <h4>S/.${auto.precio}</h4>
  </div>
  </div>
  </div>
  `;
  });
  const investmentsDiv = document.querySelector('.investments');
  investmentsDiv.innerHTML = investmentsDiv.querySelector('.header').outerHTML + html;
  
  document.querySelectorAll('.investment[data-id]').forEach(auto => {
  auto.addEventListener('click', () => {
  const id = auto.dataset.id;
  window.location.href = `/auto_simulator/auto_simulator.html?auto_id=${id}&userId=${userId}`;
  });
  }); 
 }

 function validarCuota(input) {
  // Obtener el valor ingresado
  var valorTasa = input.value;

  // Validar si la longitud es mayor a 2
  if (valorTasa.length > 2) {
    // Mostrar un mensaje de error
    document.getElementById('error-cuota').innerHTML = 'No puedes ingresar más de dos cifras.';
    // Limpiar el valor ingresado
    input.value = valorTasa.slice(0, 2);
  } else {
    // Limpiar el mensaje de error si la entrada es válida
    document.getElementById('error-cuota').innerHTML = '';
  }
}
 
 const buttonCotizar = document.querySelector('#cotizar_top');

 buttonCotizar.addEventListener('click', () => {
  // Obtener los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);

  // Obtener el ID de la auto seleccionada a partir de los parámetros de la URL
  const autoId = urlParams.get('auto_id');

  // Obtener el precio de la auto seleccionada
  const precioauto = autos[autoId].precio;

  // Crear una copia del contenido HTML de la sección "second_operation"
  let secondOperationContent = document.querySelector('.second_operation').innerHTML;

  // Reemplazar los valores de los campos "Valor de auto" y "Cuota inicial" en la copia del contenido
  secondOperationContent = secondOperationContent.replace(
    'id="home-value" name="home-value">',
    `id="home-value" name="home-value" value="${precioauto}">`
  );

  Swal.fire({
    title: 'Simulador',
    html: secondOperationContent,
    showCancelButton: true,
    confirmButtonText: 'Simular'
  }).then((result) => {
    if (result.isConfirmed) {
      // Convertir los valores de porcentaje a decimales
      const seguroDesgravamenMensual = parseFloat(Swal.getPopup().querySelector('#monthly-debt-insurance').value) / 100;
      const seguroRiesgoMensual = parseFloat(Swal.getPopup().querySelector('#mensual-riesgo').value) / 100;
      const valorTasa = parseFloat(Swal.getPopup().querySelector('#value-tasa').value) / 100;
  
      // Obtener los valores de los campos del formulario
      const numeroAnios = parseInt(Swal.getPopup().querySelector('#numero-anios').value);
      const frecuenciaPagoDias = parseInt(Swal.getPopup().querySelector('#frecuencia-pago-dias').value);
  
      // Calcular el número de cuotas por año y el total de períodos
      const numeroCuotasPorAnio = 360 / frecuenciaPagoDias;
      const totalPeriodos = numeroCuotasPorAnio * numeroAnios;
  
      // Calcular la tasa efectiva mensual (TEM)
      let tem;
      if (Swal.getPopup().querySelector('#type-tasa').value === 'tna') {
        tem = Math.pow(1 + valorTasa / 360, 30) - 1;
      } else {
        tem = Math.pow(1 + valorTasa, 1 / 12) - 1;
      }
  
      // Inicializar variables para el cálculo de la tabla
      let saldoInicial = parseFloat(Swal.getPopup().querySelector('#financing-amount').value);
      let periodo = 1;
  
      // Obtener una referencia al cuerpo de la tabla
      const tableBody = document.querySelector('.schedule.first_operation tbody');
  
      // Obtener los valores de plazo de gracia total y parcial
      const plazoGraciaTotal = parseInt(Swal.getPopup().querySelector('#total-plazo-gracia-total').value);
      const plazoGraciaParcial = parseInt(Swal.getPopup().querySelector('#total-plazo-gracia-parcial').value);
  
      // Iterar sobre cada período para calcular los valores de la tabla y agregar nuevas filas
      while (periodo <= totalPeriodos) {
        // Calcular los valores para el período actual
        const interes = -(tem * saldoInicial);
        let cuota =
          -(saldoInicial * (tem + seguroDesgravamenMensual)) /
          (1 - Math.pow(1 + tem + seguroDesgravamenMensual, -(totalPeriodos - periodo + 1)));
        const seguroDesgravamen = -(saldoInicial * seguroDesgravamenMensual);
        let amortizacion = cuota - interes - seguroDesgravamen;
        const seguroRiesgo = precioauto * seguroRiesgoMensual;
        let saldoFinal = saldoInicial + amortizacion;
        let flujo = -(Math.abs(cuota) + Math.abs(seguroRiesgo));

        // Determinar el valor del plazo de gracia para el período actual
        let plazoGracia;
        if (periodo <= plazoGraciaTotal) {
          plazoGracia = 'T';
          amortizacion = 0;
          cuota = 0;
          saldoFinal = (saldoInicial + amortizacion) - interes;
          flujo = -(Math.abs(cuota) + Math.abs(seguroDesgravamen) + Math.abs(seguroRiesgo));
        } else if (periodo <= plazoGraciaTotal + plazoGraciaParcial) {
          plazoGracia = 'P';
          amortizacion = 0;
          cuota = interes;
          saldoFinal = saldoInicial + amortizacion;
          flujo = -(Math.abs(cuota) + Math.abs(seguroDesgravamen) + Math.abs(seguroRiesgo));
        } else {
          plazoGracia = 'S';
        }

        // Crear una nueva fila y celdas para el período actual
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${periodo}</td>
          <td>${(tem * 100).toFixed(2)}%</td>
          <td>${plazoGracia}</td>
          <td>${saldoInicial.toFixed(2)}</td>
          <td>${interes.toFixed(2)}</td>
          <td>${cuota.toFixed(2)}</td>
          <td>${amortizacion.toFixed(2)}</td>
          <td>${seguroDesgravamen.toFixed(2)}</td>
          <td>${seguroRiesgo.toFixed(2)}</td>
          <td>${saldoFinal.toFixed(2)}</td>
          <td>${flujo.toFixed(2)}</td>
        `;
  
        // Agregar la nueva fila a la tabla
        tableBody.appendChild(newRow);
  
        // Actualizar el saldo inicial para el siguiente período
        saldoInicial = saldoFinal;
  
        // Incrementar el contador de períodos
        periodo++;
      }

      const cok = parseFloat(Swal.getPopup().querySelector('#tasa-costo-efectiva').value) / 100;

      let van = 0;
      
      for (let i = 0; i < tableBody.rows.length; i++) {
        const periodo = parseInt(tableBody.rows[i].cells[0].textContent);
        const flujo = parseFloat(tableBody.rows[i].cells[10].textContent);
      
        van += flujo / Math.pow(1 + cok, periodo);
      }
      
      let tir = 0;
      let vanSum = -Infinity;
      const financingAmount = parseFloat(Swal.getPopup().querySelector('#financing-amount').value);
      let iterations = 0;
      
      while (Math.abs(vanSum - financingAmount) > 0.01 && iterations < 1000) {
        vanSum = 0;
      
        for (let i = 0; i < tableBody.rows.length; i++) {
          const periodo = parseInt(tableBody.rows[i].cells[0].textContent);
          const flujo = parseFloat(tableBody.rows[i].cells[10].textContent);
      
          vanSum += flujo / Math.pow(1 + tir, periodo);
        }
      
        if (vanSum < financingAmount) {
          tir += 0.0001;
        } else {
          tir -= 0.0001;
        }
      
        iterations++;
      }      
      
      // Agregar el VAN y la TIR a la tabla
      const vanTirTableBody = document.querySelector('#van-tir tbody');
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${van.toFixed(2)}</td>
        <td>${tir.toFixed(4)}</td>
      `;
      vanTirTableBody.appendChild(newRow);      
    }
  });
});
const valueTasaInput = Swal.getPopup().querySelector('#value-tasa');

valueTasaInput.addEventListener('input', () => {
  const inputValue = valueTasaInput.value;
  const maxValue = 99;

  if (inputValue.length > 2) {
    valueTasaInput.value = inputValue.slice(0, 2);
  }

  if (parseFloat(inputValue) > maxValue) {
    valueTasaInput.value = maxValue;
  }
});



 