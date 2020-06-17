
# Weather App

Aplicación que muestra gráficos, estilo dashboard con información obtenido de la API  de [Open Weather](https://openweathermap.org/api) .

[Demo de la aplicación](https://weather-data-app.vercel.app/)

Para verlo en local, primero clonar o descargar el repositorio.

    git clone https://github.com/sonidiaz/Country-Weather-Data.git

Después

    cd Country-Weather-Data
    npm install

Es necesario agregar las Api key tanto de [Open Weather](https://openweathermap.org/api)  y la de Google Maps.  La lógica apunta a un archivo llamado apikey.js con el siguiente código.

    export  const  API_KEY = '<API_KEY>';
    export  const  API_GOOGLE = '<API_KEY>';

Una vez realizado esto levantamos el proyecto en modo desarrollo con el siguiente comando

    npm start

Para hacer el build 
    
    npm run build

`