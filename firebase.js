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
function ocultar(){
    document.getElementById('obj1').style.display = 'none';
    document.getElementById('obj2').style.display = 'none';
    }

function ingreso() {
    var email2 = document.getElementById('email2').value;
    var contrasena2 = document.getElementById('contrasena2').value;
    firebase.auth().signInWithEmailAndPassword(email2, contrasena2)
    .then(function(){
        location.reload();
        
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    }
    )
    ;
} 

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Existe usuario activo")
            aparece(user);
            signout();
            ocultar();
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
            contenido.innerHTML = `
            <div class="alert alert-danger" role="alert">
            No ha iniciado sesión!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </div>`;
        }
    });
}
observador();

function aparece(user) {
    var user = user;
    var contenido = document.getElementById('contenido');
    if(user.emailVerified){
    contenido.innerHTML = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Hola ${user.email}!</strong> inicio de sesión Exitoso
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
   <div class="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item sweets" data-item="sweets">
          <div class="card ">
            <div class="img-container">
              <img src="granulares.png" class="card-img-top store-img" alt="">
              <span class="store-item-icon">
                <i class="fas fa-shopping-cart"></i>
              </span>
            </div>
            <div class="card-body">
              <div class="card-text d-flex justify-content-between text-capitalize">
                <h5 id="store-item-name">Piedras y Triturados</h5>
                <h5 class="store-item-value">$ <strong id="store-item-price" class="font-weight-bold">80000</strong>
                </h5>
              </div>
            </div>
          </div>
          <!-- end of card-->
        </div>
   `;
}
}

function signout(){
    var contenido =document.getElementById('contenido2');
    contenido.innerHTML=`   <button class="btn btn-outline-danger btn-sm" onclick="cerrar()">Cerrar Sesión</button>`
}

function cerrar(){
    firebase.auth().signOut()
    .then(function(){
        console.log('Saliendo...')
        location.reload();

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
            location.reload();
            

        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
}