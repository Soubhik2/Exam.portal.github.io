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

let PrivateBox = false, ActivateBox = false;
let PrivateValue = 'public', ActivateValue = '0';
let isButton = true;

window.onload = () =>{
    document.getElementsByClassName('form-control')[3].style.display = 'none';
}

function Private(){
    if (!PrivateBox) {
        document.getElementsByClassName('form-control')[3].style.display = 'block';
        PrivateBox = true;
        PrivateValue = 'private';
    } else {
        document.getElementsByClassName('form-control')[3].style.display = 'none';
        PrivateBox = false;
        PrivateValue = 'public';
    }
    
}

function Activate(){
    if (ActivateBox) {
        ActivateValue = '0';
        ActivateBox = false;
    } else {
        ActivateValue = '1';
        ActivateBox = true;
    }
}

firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...

        console.log(firebase.auth().currentUser.uid);
        
    } else {
        // User is signed out
        // ...
        console.log("NO acc");
        document.getElementsByClassName('loading')[0].style.display = 'none';
    }
});

function Save(){
    document.getElementsByClassName('Form')[1].innerHTML = 
    ` 
    <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `;
    let Id = auth.currentUser.uid+new Date().getTime();

    if (isButton) {
        firebase.database().ref('Qus/' + Id).set({
            id : Id,
            paper : document.getElementsByClassName('form-control')[0].value,
            teacher : document.getElementsByClassName('form-control')[1].value,
            subject : document.getElementsByClassName('form-control')[2].value,
            password : document.getElementsByClassName('form-control')[3].value,
            state : PrivateValue,
            activate : ActivateValue
        }).then(() => {
            firebase.database().ref('Users/' + auth.currentUser.uid + '/MyPaper/' + Id).set({
                id : Id,
                subject : document.getElementsByClassName('form-control')[2].value,
                activate : ActivateValue,
            }).then(() => {
                document.getElementsByClassName('Form')[1].innerHTML = 
                ` 
                <button type="button" onclick="Save()" class="btn btn-secondary">Publish</button>
                `;
                document.getElementsByClassName('btn-secondary')[0].innerHTML = 'Saved';

                setTimeout(() => {
                    window.location.href = 'MyPaper.html';
                }, 2000);
            });
        });
        isButton = false;
    } else {
        alert('Published')
    }
}

