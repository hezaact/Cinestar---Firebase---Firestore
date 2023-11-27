document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDPVlUHjEWrF5KWg6PyLRTyWKvNJvRk8tc",
        authDomain: "cinestar-firebase-f3da9.firebaseapp.com",
        projectId: "cinestar-firebase-f3da9",
        storageBucket: "cinestar-firebase-f3da9.appspot.com",
        messagingSenderId: "937583021872",
        appId: "1:937583021872:web:313e7869da3f304a79c2f5"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore().collection('pelicula');

    const pelis = () => {
        const id = (new URLSearchParams(window.location.search)).get('id');
        return id ? `pelicula${id}` : null;
    };

    const getPelicula = async () => {
        const fullId = pelis();
        console.log('ID de la película:', fullId);

        try {
            const peliculas = await db.doc(fullId).get().catch(error => console.error('Error en la consulta:', error));

            console.log('Datos de la película:', peliculas.data());

            if (peliculas.exists) {
                const pelicula = peliculas.data();
                console.log('Datos de la película:', pelicula);

                let html = `
          <br/><h1>Detalles de la Película</h1><br/>
          <div class="contenido-pelicula">
            <div class="datos-pelicula">
              <h2>${pelicula.Titulo}</h2>
              <p>${pelicula.Sinopsis}</p>
              <br/>
              <div class="tabla">
                <div class="fila">
                  <div class="celda-titulo">Título Original :</div>
                  <div class="celda">${pelicula.Titulo}</div>
                </div>
                <div class="fila">
                  <div class="celda-titulo">Estreno :</div>
                  <div class="celda">${pelicula.FechaEstreno}</div>
                </div>
                <div class="fila">
                  <div class="celda-titulo">Género :</div>
                  <div class="celda">${pelicula.Geneross}</div>
                </div>
                <div class="fila">
                  <div class="celda-titulo">Director :</div>
                  <div class="celda">${pelicula.Director}</div>
                </div>
                <div class="fila">
                  <div class="celda-titulo">Reparto :</div>
                  <div class="celda">${pelicula.Reparto}</div>
                </div>
              </div>
            </div>
            <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
          </div>
          <div class="pelicula-video">
            <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
          </div>
        `;

                document.getElementById('contenido-interno').innerHTML = html;
            }
        } finally {
            console.log("Se ha terminado de obtener los datos");
        }
    };

    getPelicula();
});