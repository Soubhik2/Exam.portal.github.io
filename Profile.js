// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2W6M_Ii147vX2r455ZwpQCMK2YDdfEbM",
    authDomain: "online-exam-a5473.firebaseapp.com",
    databaseURL: "https://online-exam-a5473-default-rtdb.firebaseio.com",
    projectId: "online-exam-a5473",
    storageBucket: "online-exam-a5473.appspot.com",
    messagingSenderId: "668850944087",
    appId: "1:668850944087:web:fb5cbf9d37b3c6a1b9cb12",
    measurementId: "G-121Y97CZSS"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

var files = [],
    reader;

var imageUrl, phoneNumber, userId, userName;

window.onload = () => {
    document.getElementsByClassName('field')[0].style.display = 'none';
    document.getElementsByClassName('spinner-border')[0].style.display = 'none';
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        console.log(auth.currentUser.uid);

        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on("value", function(snapshot) {
            imageUrl = snapshot.val().imageUrl;
            phoneNumber = snapshot.val().phoneNumber;
            userId = snapshot.val().userId;
            userName = snapshot.val().userName;

            document.getElementsByTagName('img')[1].src = imageUrl;
            document.getElementsByClassName('name')[0].innerHTML = userName;
            document.getElementsByClassName('about')[0].innerHTML = phoneNumber;
            document.getElementsByTagName('input')[0].value = userName;
        });

    } else {
        // User is signed out
        // ...
        console.log("NO account found");
        window.location.href = 'SignIn.html';
    }
});

function Update() {
    document.getElementsByClassName('name')[0].style.display = 'none';
    document.getElementsByClassName('field')[0].style.display = 'block';
    document.getElementsByClassName('buttons')[0].innerHTML = `<button onclick="Upload()">Upload</button>`;
}

function Upload() {

    firebase.database().ref('Users/' + userId).update({
        userName: document.getElementsByTagName('input')[0].value,
    }).then(() => {

    });
    document.getElementsByClassName('name')[0].style.display = 'block';
    document.getElementsByClassName('field')[0].style.display = 'none';
    document.getElementsByClassName('buttons')[0].innerHTML =
        `<button onclick="Update()">Update</button>
     <button onclick="Logout()">Logout</button>`;
}

function Logout() {

    document.getElementsByTagName('button')[2].innerHTML = `<div class="spinner-border text-secondary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        window.location.href = 'SignIn.html';
        // console.log('Uid 3' + firebase.auth().currentUser.uid);
    }).catch((error) => {
        // An error happened.
        console.log(error.message);

    });
}

document.getElementById('myimg').onclick = function(e) {
    document.getElementsByClassName('spinner-border')[0].style.display = 'block';
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();

        reader.onload = function() {
            document.getElementById('myimg').src = reader.result;

            var uploadTask = firebase.storage().ref('image/' + firebase.auth().currentUser.uid + '.png').put(files[0]);
            uploadTask.on('state_changed', function(snapshot) {},

                function(error) {
                    console.log(error.message);
                },

                function() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                        imageUrl = url;
                        console.log('url ' + url);
                    }).then(() => {
                        console.log('image ' + imageUrl);

                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).set({
                            userName: userName,
                            userId: userId,
                            phoneNumber: phoneNumber,
                            imageUrl: imageUrl,
                        }).then(() => {
                            document.getElementsByClassName('spinner-border')[0].style.display = 'none';
                        });
                    });
                });
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();


}