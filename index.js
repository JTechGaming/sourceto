// Your web app's Firebase configuration

var selectedLogin = false;

var firebaseConfig = {
    apiKey: "AIzaSyCFKmH8kY2b1ZugBawQZRFRHET8k0Nuc-k",
    authDomain: "kwiznet-e9154.firebaseapp.com",
    databaseURL: "https://kwiznet-e9154-default-rtdb.firebaseio.com",
    projectId: "kwiznet-e9154",
    storageBucket: "kwiznet-e9154.appspot.com",
    messagingSenderId: "723089599401",
    appId: "1:723089599401:web:0b4ad2bc6e56f165d1b2b8",
    measurementId: "G-QCFNR19M5B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if (validate_field(full_name) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // Done
      //alert('User Logged In!!')

      sessionStorage.setItem("key", user.email);
      location.href = '/home.html';
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

  function select_login() {

    document.getElementById("full_name").style.display = "none";
    
    var input = document.getElementById ("password");
    input.placeholder = "Password";

    document.getElementById("selectbutton").setAttribute( "onClick", "javascript: login();" );
    document.getElementById("selectbutton").innerHTML = "Login";

    document.getElementById("form_header").innerHTML = "Kwiznet Login";

    selectedLogin = true;

  }

  function select_register() {

    document.getElementById("full_name").style.display = "flex";
    
    var input = document.getElementById ("password");
    input.placeholder = "New Password";

    document.getElementById("selectbutton").setAttribute( "onClick", "javascript: register();" );
    document.getElementById("selectbutton").innerHTML = "Register";

    document.getElementById("form_header").innerHTML = "Kwiznet Register";

    selectedLogin = false;

  }

  document.addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      if(selectedLogin) {
        login();
      } else {
        register();
      }
    }
  });