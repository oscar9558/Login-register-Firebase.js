function config() {
    var firebaseConfig = {
        apiKey: "AIzaSyCQz52gPpNmLNe_UkdnQ8ay6c2CGu2g6-g",
        authDomain: "uvolco-244821.firebaseapp.com",
        databaseURL: "https://uvolco-244821.firebaseio.com",
        projectId: "uvolco-244821",
        storageBucket: "uvolco-244821.appspot.com",
        messagingSenderId: "401244118765",
        appId: "1:401244118765:web:e3ac616fd54148ec"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
config();

function registrar() {
    console.log("se envio")
    var email = document.getElementById('email').value;
    var contrasena = document.getElementById('contrasena').value;
    // Registro de Usuario
    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
        verficar()
    })

    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
    //console.log(email);
    //console.log(contrasena);
    console.log("se registro un usuario")
}

function ingreso() {
    var email2 = document.getElementById('email').value;
    var contrasena2 = document.getElementById('contrasena').value;
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
} 

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Existe usuario activo")

            aparece(user);
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log("**************");
            console.log(user);
            console.log(emailVerified);

            // ...
        } else {
            // User is signed out.
            console.log("no existe usuario activo")
            // ...
        }
    });
}
observador();

function aparece(user) {
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
    contenido.innerHTML = `
    <br>
    <div class="text-center">
    <p> Bienvenido! </p>
   <button class="btn btn-danger" onclick="cerrar()">Cerrar Sesión</button>
   </div> 
   `;
}
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
    })
    .catch(function(error){
        console.log(error) 
    })
}

function verficar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
            // Email sent.
            console.log("Enviando correo");
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
}