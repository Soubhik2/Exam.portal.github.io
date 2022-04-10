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

let Id = localStorage.getItem('paper_id');

function Save(){
    document.getElementsByClassName('buttons')[0].innerHTML = 
    ` 
    <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `;

    firebase.database().ref('Qus/' + Id + '/MCQ/' + document.getElementsByClassName('form-control')[0].value).set({
        A: document.getElementsByClassName('form-control')[1].value,
        B: document.getElementsByClassName('form-control')[2].value,
        C: document.getElementsByClassName('form-control')[3].value,
        D: document.getElementsByClassName('form-control')[4].value,
        Ans: document.getElementsByClassName('form-control')[5].value,
    }).then(() => {
        var toastLiveExample = document.getElementById('liveToast')
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show();

        document.getElementsByClassName('buttons')[0].innerHTML = 
        ` 
        <button type="button" onclick="Save()" class="btn btn-primary">Save</button>
        `;
    });
}