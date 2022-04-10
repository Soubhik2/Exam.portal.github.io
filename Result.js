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

        firebase.database().ref('Result/' + auth.currentUser.uid).once('value', (snapshot) => {

            snapshot.forEach(
                function(Childsnapshot) {
                    // let ans = Childsnapshot.val().ans;
                    // let myAns = Childsnapshot.val().myAns;
                    // let result = Childsnapshot.val().result;
                    let key = Childsnapshot.key;
                    let result = Childsnapshot.child('submit').val().result;
                    console.log('re', result);


                    let div_page = document.getElementsByClassName('papers');
                    let createElement = document.createElement('p');
                    createElement.innerHTML =
                        `
                        <a href="#"><div onclick="Click('` + key + `','` + result + `')" class="alert alert-dark" role="alert">
                        ` + key + `
                      </div></a>
            `;

                    div_page[0].appendChild(createElement);
                });
            document.getElementsByClassName('spinner-border')[0].style.display = 'none';
        });

    } else {
        // User is signed out
        // ...
        console.log("NO acc");

    }
});




function Click(key,result) {
    // console.log(key);

    if (result == '1') {
        localStorage.setItem('Key_P', key);
        window.location.href = 'ResultPage.html';
    } else {
        alert('This exam is not submit by candidate !')
    }
    
}