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

var MaskCount = 0;
let QusCounter = 0;
let index = 1;
var View;

var Uid;

firebase.auth().onAuthStateChanged((user) => {

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
        Uid = firebase.auth().currentUser.uid;
        console.log(firebase.auth().currentUser.uid);
        firebase.database().ref('Result/' + auth.currentUser.uid + '/' + localStorage.getItem('Key_P') + '/' + "myans").once('value', (snapshot) => {

            snapshot.forEach(
                function(Childsnapshot) {
                    let ans = Childsnapshot.val().ans;
                    let myAns = Childsnapshot.val().myAns;
                    let result = Childsnapshot.val().result;
                    let key = Childsnapshot.key;

                    QusCounter++;

                    if (result == "1") {
                        View = 'success';
                        MaskCount++;
                    } else {
                        View = 'danger';
                    }

                    let Qns = document.getElementsByClassName('Qus');
                    let createElement = document.createElement('li');
                    createElement.className = 'li-none-style';
                    createElement.innerHTML =
                        `
                <div class="card-foot">
                <span class="font1">` + index + `. </span>
                <font class="font1">` + key + `</font>
                
                <div class="alert alert-` + View + `" role="alert">
                ` + myAns + `
                </div>

            </div>
            `;

                    Qns[0].appendChild(createElement);
                    index++;
                });
            document.getElementsByClassName('spinner-border')[0].style.display = 'none';
            
            MaskStr = 'Total Mask is = '+ MaskCount;


            Per = (MaskCount/QusCounter)*100;
            // Per = 23

            if (Per >= 90) {
                document.getElementsByClassName('card-title')[0].innerHTML ='Excellent your mask is ' + Per + '%';
            } else if (Per >= 80){
                document.getElementsByClassName('card-title')[0].innerHTML ='Very Good your mask is ' + Per + '%';
            } else if (Per >= 50) {
                document.getElementsByClassName('card-title')[0].innerHTML ='Good your mask is ' + Per + '%';
            } else if (Per >= 30) {
                document.getElementsByClassName('card-title')[0].innerHTML ='Ok your mask is ' + Per + '%';
            } else if (Per > 0) {
                document.getElementsByClassName('card-title')[0].innerHTML ='Not Good your mask is ' + Per + '%';
            }

            // switch ((MaskCount/QusCounter)*100) {
            //     case 100:
            //         document.getElementsByClassName('card-title')[0].innerHTML ='Excellent your mask is' + (MaskCount/QusCounter)*100 + '%';
            //         break;
            //     case 80:
            //         document.getElementsByClassName('card-title')[0].innerHTML ='Very Good your mask is' + (MaskCount/QusCounter)*100 + '%';
            //         break;
                
            //     case 
            
            //     default:
            //         break;
            // }

            document.getElementsByClassName('card-text')[0].innerHTML = MaskStr.toUpperCase();
            document.getElementsByClassName('card-header')[0].innerHTML = localStorage.getItem('Key_P').toUpperCase();
           
            
        });
    } else {
        // User is signed out
        // ...
        console.log("NO acc");

    }
});

