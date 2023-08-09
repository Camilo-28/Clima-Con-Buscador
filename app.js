console.log("conectado")

const contenedor = document.querySelector(".contenedor");

const buscar = document.querySelector(".buscar-box button");

const climaBox = document.querySelector(".clima-box");

const climaInfo = document.querySelector(".clima-info");

const error404 = document.querySelector(".no-encontrado");

buscar.addEventListener('click', () => {
    const API_KEY = 'fb8dfbfec5a79a44561fdc36fafc4167'
    const ciudad = document.querySelector(".buscar-box input").value;

    if (ciudad === '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${API_KEY}&lang=sp`).then(response => response.json()).then
        (json => {

            if (json.cod === '404') {
                contenedor.style.height = '400px';
                climaBox.style.display = 'none';
                climaInfo.style.display = 'none';
                
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }
            error404.style.display = 'none';
            error404.classList.remove('fadeIn')

            const imagen = document.querySelector('.clima-box img');

            const temperatura = document.querySelector('.clima-box .temperatura');

            const descripcion = document.querySelector('.clima-box .descripcion');

            const humedad = document.querySelector('.clima-info .humedad span');

            const viento = document.querySelector('.clima-info .viento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    imagen.src = 'clear.png';
                    break;
                case 'Cloud':
                    imagen.src = 'cloud.png';
                    break;
                case 'Haze':
                    imagen.src = 'mist.png';
                    break;
                case 'Rain':
                    imagen.src = 'rain.png';
                    break;
                case 'Snow':
                    imagen.src = 'snow.png';
                    break;
                default:
                    imagen.src = '';

            }
            temperatura.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`
            descripcion.innerHTML=`${json.weather[0].description}`
            humedad.innerHTML=`${json.main.humidity}%`
            viento.innerHTML=`${parseInt(json.wind.speed)}Km/H`

            climaBox.style.display='';
            climaInfo.style.display='';
            climaBox.classList.add('fadeIn');
            climaInfo.classList.add('fadeIn');
            contenedor.style.height='590px';



        })


})