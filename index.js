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

function click1() {
    document.getElementsByClassName('card-header-tabs')[0].innerHTML = `<li class="nav-item">
                            <a class="nav-link active" onclick="click1()" aria-current="true" href="#">New nots</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " onclick="click2()" href="#">Link1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " onclick="click3()" href="#">Link2</a>
                        </li>`;

    document.getElementsByClassName('card-body')[0].innerHTML =
        `
    <h5 class="card-title">Special title treatment1</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
    `;
}

function click2() {
    document.getElementsByClassName('card-header-tabs')[0].innerHTML = `<li class="nav-item">
                            <a class="nav-link " onclick="click1()" aria-current="true" href="#">New nots</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" onclick="click2()" href="#">Link1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " onclick="click3()" href="#">Link2</a>
                        </li>`;

    document.getElementsByClassName('card-body')[0].innerHTML =
        `
        <h5 class="card-title">Special title treatment2</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    `;
}

function click3() {
    document.getElementsByClassName('card-header-tabs')[0].innerHTML = `<li class="nav-item">
                            <a class="nav-link " onclick="click1()" aria-current="true" href="#">New nots</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " onclick="click2()" href="#">Link1</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" onclick="click3()" href="#">Link2</a>
                        </li>`;

    document.getElementsByClassName('card-body')[0].innerHTML =
        `
        <h5 class="card-title">Special title treatment3</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    `;
}