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
    const db = firebase.firestore();

    const getCine = async () => {
        const id = (new URLSearchParams(window.location.search)).get('id');

        try {
            const cines = await db.collection('cines').doc(id).get();
            const tarifasQuerySnapshot = await db.collection('cines').doc(id).collection('tarifas').get();
            const peliculasQuerySnapshot = await db.collection('cines').doc(id).collection('peliculas').get();

            if (cines.exists) {
                const cine = cines.data();
                const tarifas = tarifasQuerySnapshot.docs.map(doc => doc.data());
                const peliculas = peliculasQuerySnapshot.docs.map(doc => doc.data());

                let html = `
        <h2>${cine.RazonSocial}</h2>
        <div class="cine-info">
          <div class="cine-info datos">
            <p>${cine.Direccion} - ${cine.Detalle}</p>
            <p>Teléfono: ${cine.Telefonos}</p>
            <br/>
      `;

                tarifas.forEach(tarifa => {
                    html += `
          <div class="tabla-cine">
            <div class="fila-par">
              <div class="celda-titulo">${tarifa.DiasSemana}</div>
              <div class="celda">${tarifa.Precio}</div>
            </div>
          </div>
        `;
                });

                html += `
          <div class="aviso">
            <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
          </div>
        </div>
        <img src="img/cine/${cine.id}.2.jpg"/>
        <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
        <div class="cine-info peliculas">
          <div class="tabla">
            <div class="fila">
              <div class="celda-cabecera">Películas</div>
              <div class="celda-cabecera">Horarios</div>
            </div>
      `;

                peliculas.forEach(pelicula => {
                    html += `
          <div class="fila-impar">
            <div class="celda-titulo">${pelicula.Titulo}</div>
            <div class="celda">${pelicula.Horarios}</div>
          </div>
        `;
                });

                html += `
            </div>
          </div>
        </div>
        <div>
          <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
          <span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
            Horario de atención de juegos es de 12:00 m hasta las 10:30 pm.
            <br/><br/>
            Visitános y diviértete con nosotros.
            <br/><br/>
            <b>CINESTAR</b>, siempre pensando en tí.
          </span>
        </div>
      `;

                document.getElementById('contenido-interno').innerHTML = html;
            } else {
                console.error('No se encontró el cine');
            }
        } finally {
            console.log("Se ha terminado de obtener los datos");
        }
    };

    getCine();
});