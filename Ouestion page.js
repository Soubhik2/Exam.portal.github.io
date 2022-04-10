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

let index = 1;

var Uid;

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        Uid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser.uid);
        firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('Key') + '/submit').on("value", function(snapshot) {

            if (snapshot.exists()) {
                result = snapshot.val().result;

            }

            if (result == undefined) {

                localStorage.setItem('Key', key);
                console.log("0 a");
            } else {
                if (result == "0") {
                    console.log("1 a");
                } else {
                    console.log("submited");
                    window.location.href = 'index.html';
                }
            }
        });
    } else {
        // User is signed out
        // ...
        console.log("NO acc");

    }
});



firebase.database().ref('Qus/' + localStorage.getItem('Key') + '/MCQ').once('value', (snapshot) => {

    snapshot.forEach(
        function(Childsnapshot) {
            let A = Childsnapshot.val().A;
            let B = Childsnapshot.val().B;
            let C = Childsnapshot.val().C;
            let D = Childsnapshot.val().D;
            let Ans = Childsnapshot.val().Ans;
            let key = Childsnapshot.key;

            let Qns = document.getElementsByClassName('Qus');
            let createElement = document.createElement('li');
            createElement.className = 'li-none-style';
            createElement.innerHTML =
                `
                <div class="card-foot">
                <span class="font1">` + index + `. </span>
                <font class="font1">` + key + `</font>
                <ul>

                <div class="form-check">
                <input onclick="ClickF('` + key + `','` + Ans + `','` + A + `')" class="form-check-input" type="radio" name="flexRadioDefault` + key + `" id="flexRadioDefault1` + key + `">
                <label class="form-check-label" for="flexRadioDefault1` + key + `">
                    ` + A + `
                </label>
                </div>

                <div class="form-check">
                <input onclick="ClickF('` + key + `','` + Ans + `','` + B + `')" class="form-check-input" type="radio" name="flexRadioDefault` + key + `" id="flexRadioDefault2` + key + `">
                <label class="form-check-label" for="flexRadioDefault2` + key + `">
                    ` + B + `
                </label>
                </div>

                <div class="form-check">
                <input onclick="ClickF('` + key + `','` + Ans + `','` + C + `')" class="form-check-input" type="radio" name="flexRadioDefault` + key + `" id="flexRadioDefault3` + key + `">
                <label class="form-check-label" for="flexRadioDefault3` + key + `">
                    ` + C + `
                </label>
                </div>

                <div class="form-check">
                <input onclick="ClickF('` + key + `','` + Ans + `','` + D + `')" class="form-check-input" type="radio" name="flexRadioDefault` + key + `" id="flexRadioDefault4` + key + `">
                <label class="form-check-label" for="flexRadioDefault4` + key + `">
                    ` + D + `
                </label>
                </div>
                </ul>
            </div>
            `;

            Qns[0].appendChild(createElement);
            index++;
        });
    document.getElementsByClassName('spinner-border')[0].style.display = 'none';
});

function ClickF(Qns, Ans, MyAns) {

    firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('PaperName') + '/submit').set({
        result: "0",
    });

    if (Ans == MyAns) {
        // console.log("ok");

        firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('PaperName') + '/' + "myans" + '/' + Qns).set({
            myAns: MyAns,
            ans: Ans,
            result: "1",
        });

    } else {
        firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('PaperName') + '/' + "myans" + '/' + Qns).set({
            myAns: MyAns,
            ans: Ans,
            result: "0",
        });

        // console.log("no");
    }
}

function submit() {
    document.getElementsByClassName('modal-footer')[0].innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;

    firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('PaperName') + '/submit').set({
        result: "1",
    }).then(() => {
        window.location.href = 'index.html';
    });
}