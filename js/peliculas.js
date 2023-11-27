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
    const getPeliculas = async () => {
        const idxParam = (new URLSearchParams(window.location.search)).get('idx');
        try {
            const querySnapshot = await db.collection('peliculas').get();
            let html = `<br/><h1>${idxParam === 'cartelera' ? 'Cartelera' : 'Próximos Estrenos'}</h1><br/>`;
            querySnapshot.forEach((doc) => {
                let pelicula = doc.data();

                if ((idxParam === 'cartelera' || idxParam === 'estreno') && pelicula.Categoria === idxParam) {
                    html += `
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${pelicula.Titulo}</h2><br/>
                            <p>${pelicula.Sinopsis}</p>
                            <br/>
                            <div class="boton-pelicula">
                                <a href="pelicula.html?id=${doc.id}" >
                                    <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                </a>
                            </div>
                            <div class="boton-pelicula">
                                <a href="https://www.youtube.com/v/${pelicula.Link}" target="_blank" onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                    <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                </a>
                            </div>
                        </div>
                        <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
                    </div>
                `;
                } else if (pelicula && doc.id.toLowerCase().includes(idxParam.toLowerCase())) {
                    html += `
                    <div class="contenido-pelicula">
                        <div class="datos-pelicula">
                            <h2>${pelicula.Titulo}</h2><br/>
                            <p>${pelicula.Sinopsis}</p>
                            <br/>
                            <div class="boton-pelicula">
                                <a href="pelicula.html?id=${pelicula.id}" >
                                    <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                                </a>
                            </div>
                            <div class="boton-pelicula">
                                <a href="https://www.youtube.com/v/${pelicula.Link}" target="_blank" onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                                    <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                                </a>
                            </div>
                        </div>
                        <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
                    </div>
                `;
                }
            });
            document.getElementById('contenido-interno').innerHTML = html;
        } finally {
            console.log("Se ha terminado de obtener los datos");
        }
    };

    getPeliculas();


});