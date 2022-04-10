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

window.onload = () => {

}

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        Uid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser.uid);
    } else {
        // User is signed out
        // ...
        console.log("NO acc");

    }
});

firebase.database().ref('Qus').once('value', (snapshot) => {

    snapshot.forEach(
        function(Childsnapshot) {
            let id = Childsnapshot.val().id;
            let paper = Childsnapshot.val().paper;
            // let state = Childsnapshot.val().state;
            let subject = Childsnapshot.val().subject;
            let key = Childsnapshot.key;

            let div_page = document.getElementsByClassName('papers');
            let createElement = document.createElement('p');
            createElement.innerHTML =
                `
        <div class="card">
            <h5 class="card-header">Paper: ` + paper + `</h5>
            <div class="card-body">
                <h5 class="card-title">Subject: ` + subject + `</h5>
                <p class="card-text">Id of paper: [` + id + `].</p>
                <a href="#" onclick="Click('` + key + `')" class="btn btn-primary">View Exam</a>
            </div>
        </div>
            `;

            div_page[0].appendChild(createElement);
        });
    document.getElementsByClassName('spinner-border')[0].style.display = 'none';
});


function Click(key) {
    var result;

    console.log('1 uid ' + auth.currentUser.uid);

    firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('PaperName') + '/submit').on("value", function(snapshot) {

        if (snapshot.exists()) {
            result = snapshot.val().result;

        }

        if (result == undefined) {

            localStorage.setItem('Key', key);
            console.log("0 a");

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    var uid = user.uid;
                    // ...
                    window.location.href = 'Exam_verify.html';
                    console.log(firebase.auth().currentUser.uid);
                } else {
                    // User is signed out
                    // ...
                    console.log("NO acc");
                    window.location.href = 'SignIn.html';
                }
            });
        } else {
            if (result == "0") {
                console.log("1 a");
                localStorage.setItem('Key', key);

                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        var uid = user.uid;
                        // ...
                        window.location.href = 'Exam_verify.html';
                        console.log(firebase.auth().currentUser.uid);
                    } else {
                        // User is signed out
                        // ...
                        console.log("NO acc");
                        window.location.href = 'SignIn.html';
                    }
                });
            } else {
                console.log("submited");
                alert('submited allready');
            }
        }
    });
}