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

document.getElementsByClassName('passwordRoom')[0].style.display = 'none';

// document.getElementsByClassName('AlertRoom')[0].innerHTML = 
//                 `
//                 <div class="alert alert-warning  d-flex align-items-center" role="alert">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
//                     <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
//                     </svg>
//                     <div>
//                         An example alert with an icon
//                     </div>
//                 </div>
//                 <hr>`;

let isPublic = false;
let activate, password,PaperName;

firebase.database().ref('Qus/' + localStorage.getItem('Key')).on("value", function(snapshot) {
    activate = snapshot.val().activate;
    let id = "";
    id = snapshot.val().id;
    let paper = snapshot.val().paper;
    password = snapshot.val().password;
    let state = snapshot.val().state;
    let subject = snapshot.val().subject;
    let teacher = snapshot.val().teacher;
    PaperName = paper;

    document.getElementsByTagName('h4')[0].innerHTML = 'Paper : ' + paper;
    document.getElementsByTagName('p')[0].innerHTML = 'Subject : ' + subject;
    document.getElementsByTagName('p')[1].innerHTML = 'Id : ' + id.slice(0,30)+ '\n' + id.slice(30);
    document.getElementsByTagName('p')[2].innerHTML = 'State : ' + state;
    document.getElementsByTagName('p')[3].innerHTML = 'Examiner name : ' + teacher;

    if (state == 'public') {
        document.getElementsByTagName('p')[4].innerHTML = 'Verify Successful !';
        isPublic = true;
    } else {
        document.getElementsByClassName('passwordRoom')[0].style.display = 'block';
        isPublic = false;
    }
});

function StartExam(){

    document.getElementsByClassName('buttonRoom')[0].innerHTML = 
    `
    <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    `;

    if (isPublic) {
        if (activate == '1') {
            document.getElementsByClassName('AlertRoom')[0].innerHTML = 
                    `
                    <div class="alert alert-success d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </svg>
                        <div>
                            Successfuly Enter !
                        </div>
                    </div>
                    <hr>
                    `;
            setTimeout(() => {
                localStorage.setItem('PaperName', PaperName);
                window.location.href = 'Ouestion page.html';
            }, 3000);
        } else {


            document.getElementsByClassName('buttonRoom')[0].innerHTML = 
            `
            <button type="button" onclick="StartExam()" class="btn btn-success">Start Exam</button>
            `;

            document.getElementsByClassName('AlertRoom')[0].innerHTML = 
                `
                <div class="alert alert-warning  d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>
                        Examiner is not start this exam.
                    </div>
                </div>
                <hr>`;
        }
        
    } else {
        if (activate == '1') {
            if (password == document.getElementsByTagName('input')[0].value) {
                document.getElementsByClassName('AlertRoom')[0].innerHTML = 
                        `
                        <div class="alert alert-success d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            <div>
                                Successfuly Enter !
                            </div>
                        </div>
                        <hr>
                        `;

                document.getElementsByTagName('p')[4].innerHTML = 'Verify Successful !';
                setTimeout(() => {
                    localStorage.setItem('PaperName', PaperName);
                    window.location.href = 'Ouestion page.html';
                }, 3000);
            } else {

                document.getElementsByClassName('buttonRoom')[0].innerHTML = 
                `
                <button type="button" onclick="StartExam()" class="btn btn-success">Start Exam</button>
                `;

                document.getElementsByClassName('AlertRoom')[0].innerHTML = 
                `
                <div class="alert alert-warning  d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>
                        Password is not correct.
                    </div>
                </div>
                <hr>`;
            }
        } else {

            document.getElementsByClassName('buttonRoom')[0].innerHTML = 
            `
            <button type="button" onclick="StartExam()" class="btn btn-success">Start Exam</button>
            `;

            document.getElementsByClassName('AlertRoom')[0].innerHTML = 
                `
                <div class="alert alert-warning  d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div>
                        Examiner is not start this exam.
                    </div>
                </div>
                <hr>`;
        }
    }
}