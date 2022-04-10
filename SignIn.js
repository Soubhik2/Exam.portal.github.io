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

var count = false;

window.onload = () => {

    document.getElementsByClassName('field')[1].style.display = 'none';
    document.getElementsByClassName('field')[2].style.display = 'none';
    document.getElementsByClassName('sign-Button')[1].style.display = 'none';
    document.getElementsByClassName('sign-Button')[2].style.display = 'none';
    document.getElementsByClassName('img-area')[0].style.display = 'none';
    render();
}

function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); // create <div class= "recaptcha-container"></div>

    recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
        // document.getElementsByClassName('recaptchaBox')[2].style.display = 'block';
    });
}

function SendOtp() {
    if (document.getElementsByTagName('input')[0].value.length == 10) {

        // document.getElementsByClassName('forgot-pass')[0].style.display = 'none';

        document.getElementsByClassName('sign-Button')[0].innerHTML =
            `<div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;

        var phoneNumber = "+91" + document.getElementsByTagName('input')[0].value;
        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
                document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>OTP sent successful</center>';
                document.getElementById('recaptcha-container').style.display = 'none';
                console.log('Message sent');

                document.getElementsByClassName('text')[0].innerHTML = '+91' + document.getElementsByTagName('input')[0].value;
                document.getElementsByClassName('field')[1].style.display = 'block';
                document.getElementsByClassName('field')[0].style.display = 'none';
                document.getElementsByClassName('sign-Button')[0].style.display = 'none';
                document.getElementsByClassName('sign-Button')[1].style.display = 'block';

                // document.getElementsByClassName('recaptchaBox')[3].style.display = 'block';
                // document.getElementsByClassName('recaptchaBox')[4].style.display = 'block';
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error.message);
                document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>' + error.message + '</center>';
            });

        // document.getElementsByClassName('sign-Button')[0].innerHTML = 
        // `<div class="spinner-border text-secondary" role="status">
        // <span class="visually-hidden">Loading...</span>
        // </div>`;

    } else {
        document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>Number is not valid</center>'
    }
}

function Verify() {

    document.getElementsByClassName('sign-Button')[1].innerHTML =
        `<div class="spinner-border text-secondary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;

    var code = document.getElementsByTagName('input')[1].value;

    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log(user);
        document.getElementsByClassName('sign-Button')[1].innerHTML = `Verify`;
        console.log("SucReg");
        document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>OTP Verifyed successful</center>';
        console.log('Uid ' + firebase.auth().currentUser.uid);

        document.getElementsByClassName('text')[0].innerHTML = 'Create An Account ';
        document.getElementsByClassName('field')[2].style.display = 'block';
        document.getElementsByClassName('field')[1].style.display = 'none';
        document.getElementsByClassName('sign-Button')[1].style.display = 'none';
        document.getElementsByClassName('sign-Button')[2].style.display = 'block';
        document.getElementsByClassName('img-area')[0].style.display = 'block';


    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error.message);
        document.getElementsByClassName('sign-Button')[1].innerHTML = `Verify`;
        document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>' + error.message + '</center>'
    });
}

function Save() {

    document.getElementsByClassName('sign-Button')[2].innerHTML =
        `<div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
                </div>`;

    var imageUrl = "https://firebasestorage.googleapis.com/v0/b/online-exam-a5473.appspot.com/o/User.png?alt=media&token=19a07d55-37cb-44c8-8549-94ce60da2151";
    // var imageUrl;

    if (count) {
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
                        userName: document.getElementsByTagName('input')[2].value,
                        userId: firebase.auth().currentUser.uid,
                        phoneNumber: document.getElementsByTagName('input')[0].value,
                        imageUrl: imageUrl,
                    }).then(() => {


                        document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>OTP Verifyed  and account create successful</center>'

                        setTimeout(() => {
                            window.location.href = "Profile.html";
                        }, 3000);

                    });
                });



            }
        );
    } else {
        firebase.database().ref('Users/' + firebase.auth().currentUser.uid).set({
            userName: document.getElementsByTagName('input')[2].value,
            userId: firebase.auth().currentUser.uid,
            phoneNumber: document.getElementsByTagName('input')[0].value,
            imageUrl: imageUrl,
        }).then(() => {


            document.getElementsByClassName('forgot-pass')[0].innerHTML = '<center>OTP Verifyed  and account create successful</center>'

            setTimeout(() => {
                window.location.href = "Profile.html";
            }, 3000);

        });
    }





}

document.getElementById('myimg').onclick = function(e) {
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();

        reader.onload = function() {
            document.getElementById('myimg').src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
    count = true;
}