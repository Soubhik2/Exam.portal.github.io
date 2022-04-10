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

firebase.database().ref('Qus/' + localStorage.getItem('ViewIdKey') + '/MCQ').on('value', (snapshot) => {
    document.getElementsByClassName('list')[0].innerHTML = '';

    snapshot.forEach(
        function(Childsnapshot) {
            let A = Childsnapshot.val().A;
            let B = Childsnapshot.val().B;
            let C = Childsnapshot.val().C;
            let D = Childsnapshot.val().D;
            let Ans = Childsnapshot.val().Ans;
            let key = Childsnapshot.key;

            let div1 = document.getElementsByClassName('list');
            let createElement = document.createElement('p');
            createElement.innerHTML = 
            `
            <div class="myQ">
                <font class="Qns">`+key+`</font>
                
                <div class="ViewOP">
                    <font class="OP">A. `+A+`</font><br>
                    <font class="OP">B. `+B+`</font><br>
                    <font class="OP">C. `+C+`</font><br>
                    <font class="OP">D. `+D+`</font><br>
                    <font class="OP">Ans. `+Ans+`</font><br>
                </div>
                <div class="bt">
                    <button type="button" onclick="Click('`+key+`')" class="btn btn-danger">Delete</button>
                </div>
            </div>
            `;

            div1[0].appendChild(createElement);
        });
        document.getElementsByClassName('spinner-border')[0].style.display = 'none';
});

function Click(key){
    console.log('Key',key)
    var adaRef = firebase.database().ref('Qus/' + localStorage.getItem('ViewIdKey') + '/MCQ/' + key);

    adaRef.remove()
    .then(function() {
        console.log("Remove succeeded.")
    })
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
}