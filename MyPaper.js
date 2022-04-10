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

let Id, activateCounter = false;
let idCountValue = '', Uid;

firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        Uid = firebase.auth().currentUser.uid;
        firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/MyPaper').on('value', (snapshot) => {
        document.getElementsByClassName('my-list')[0].innerHTML = '';
        snapshot.forEach(
            function(Childsnapshot) {
                let id = Childsnapshot.val().id;
                let subject = Childsnapshot.val().subject;
                let activate = Childsnapshot.val().activate;
                // idCountValue = id;

                let buttonView, buttonText;

                if (activate == '0') {
                    buttonText = 'Activate Now';
                    buttonView = 'warning';
                    // activateCounter = false;
                } else {
                    buttonText = 'Activated';
                    buttonView = 'success';
                    // activateCounter = true;
                }

                let div1 = document.getElementsByClassName('my-list');
                let createElement = document.createElement('p');

                createElement.innerHTML = 
                `
                <div class="card-foot">
                    <font class="font-title">Subject ` + subject + `</font>

                    <div class="btn-style">
                        <button type="button" onclick="AddQus('`+ id + `','` + activate +`')" class="btn btn-primary">AddQus</button>
                        <button type="button" onclick="View('`+ id + `','` + activate +`')" class="btn btn-primary">View</button>
                        <button type="button" onclick="Activate('`+ id + `','` + activate +`')" class="btn btn-`+buttonView+`">`+buttonText+`</button>
                        <button type="button" onclick="Delete('`+ id + `','` + activate +`')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    </div>
                </div>
                `;

                div1[0].appendChild(createElement);
            });
            document.getElementsByClassName('spinner-border')[0].style.display = 'none';
    });
        console.log(firebase.auth().currentUser.uid);
    } else {
        // User is signed out
        // ...
        console.log("NO acc");
    }
});

function AddQus(id){
    // console.log('Detail ',id);
    localStorage.setItem('paper_id', id);
    window.location.href = 'AddQus.html';
}

function Activate(id, activate){
    // console.log('Activate ',id);
    
    if (activate == '1') {
        firebase.database().ref('Qus/' + id).update({
            activate : "0",
        }).then(() => {
            firebase.database().ref('Users/' + auth.currentUser.uid + '/MyPaper/' + id).update({
                activate : "0",
            }).then(() => {
            });
        });
    } else {
        firebase.database().ref('Qus/' + id).update({
            activate : "1",
        }).then(() => {
            firebase.database().ref('Users/' + auth.currentUser.uid + '/MyPaper/' + id).update({
                activate : "1",
            }).then(() => {
            });
        });
    }

    
}

function Delete(id){
    // console.log('Delete ',id);
    idCountValue = id;
}

function DeleteSus(){
    // console.log(idCountValue);
    var RefDel1 = firebase.database().ref('Qus/' + idCountValue);
    var RefDel2 = firebase.database().ref('Users/' + Uid + '/MyPaper/' + idCountValue);

    RefDel1.remove()
      .then(function() { 
        RefDel2.remove().then(function(){
            console.log("Remove succeeded.");
        }).catch(function(error){
            console.log("Remove failed: " + error.message);
        });
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
}

function View(id){
    // console.log(id);
    localStorage.setItem('ViewIdKey', id);
    window.location.href = 'ViewQ.html';
}