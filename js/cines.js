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

    const getCines = async () => {
        try {
            const querySnapshot = await db.collection("cines").get();
            let html = `<br/><h1>Nuestros Cines</h1><br/>`;

            querySnapshot.forEach((doc) => {
                const cine = doc.data();
                const idParaUrl = `cines-${cine.id}`;

                html += `
            <div class="contenido-cine">
              <img src="img/cine/${cine.id}.1.jpg" width="227" height="170"/>
              <div class="datos-cine">
                <h4>${cine.RazonSocial}</h4><br/>
                <span>${cine.Direccion} - ${cine.Detalle}<br/><br/>Teléfono: ${cine.Telefonos}</span>
              </div>
              <br/>
              <!-- Usar el ID modificado en la URL del enlace -->
              <a href="cine.html?id=${idParaUrl}">
                <img src="img/varios/ico-info2.png" width="150" height="40"/>
              </a>
            </div>`;
            });

            document.getElementById("contenido-interno").innerHTML = html;
        } finally {
            console.log("Se ha terminado de obtener los datos");
        }
    };

    getCines();
});