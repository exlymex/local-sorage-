const inputName = document.getElementById('input__name'),
    inputSurname = document.getElementById('input__surname'),
    inputPassword = document.getElementById('input__password'),
    inputEmail = document.getElementById('input__address'),
    form = document.getElementById('input__form'),
    mistakeName = document.getElementById('mistake_name'),
    mistakeSurname = document.getElementById('mistake_surname'),
    mistakeEmail = document.getElementById('mistake_email'),
    mistakePassword = document.getElementById('mistake_password'),
    signIn = document.getElementById('sign__in'),
    signUp = document.getElementById('sign__up'),
    wrapper = document.querySelector('.wrapper'),
    container = document.querySelector('.container'),
    account = document.querySelector('.account'),
    signInMistake = document.querySelector('#signIn__mistake'),
    signInForm = document.getElementById('autorization'),
    signInAddress = document.getElementById('signIn__email'),
    nameBox = document.querySelector('.name__box'),
    emailBox = document.querySelector('.email__box'),
    goBackSign = document.getElementById('signUp__button')
    signInPassword = document.getElementById('signIn__password'),
    regex = /^[a-zA-Z0-9_-]{2,15}$/,
    testEmail = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    testPass = /^[a-zA-Z0-9_-]{6,15}$/;

let user
let localUser = []
let array 
let i
!localStorage.user ? user = [] : user = JSON.parse(localStorage.getItem('user'))
function Users(name, surname, password, email) {
    this.name = name
    this.surname = surname
    this.password = password
    this.email = email
}

form.onsubmit = function (event) {
    checkEmail(inputEmail.value)
    if (validateName(inputName.value) && valideteSurname(inputSurname.value) && validateEmail(inputEmail.value) && validatePassword(inputPassword.value) && i) {
        user.push(new Users(inputName.value, inputSurname.value, inputPassword.value, inputEmail.value))
        updateLocalStorage()
    }
    else {
        event.preventDefault();
        if (!validateName(inputName.value)) {
            inputName.classList.add('error')
            mistakeName.style.display = 'block'
        } else {
            inputName.classList.remove('error')
            mistakeName.style.display = 'none'
        }
        if (!valideteSurname(inputSurname.value)) {
            inputSurname.classList.add('error')
            mistakeSurname.style.display = 'block'
        }
        else {
            inputSurname.classList.remove('error')
            mistakeSurname.style.display = 'none'
        }
        if (!validateEmail(inputEmail.value)) {
            mistakeEmail.style.display = 'block'
            inputEmail.classList.add('error')
            checkEmail(inputEmail.value)
        } else {
            mistakeEmail.style.display = 'none'
            inputEmail.classList.remove('error')
        }
        if (!validatePassword(inputPassword.value)) {
            mistakePassword.style.display = 'block'
            inputPassword.classList.add('error')
        } else {
            mistakePassword.style.display = 'none'
            inputPassword.classList.remove('error')
        }
        if (!i) {
            mistakeEmail.style.display = 'block'
            inputEmail.classList.add('error')
            mistakeEmail.innerHTML = 'This email already exist'
        } 
    }
}
const updateLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify(user))
}

const validateName = (checkName) => {
    return regex.test(checkName)
}
const valideteSurname = (checkSurname) => {
    return regex.test(checkSurname)
}
const validateEmail = (checkEmail) => {
    return testEmail.test(checkEmail)
}
const validatePassword = (checkPassword) => {
    return testPass.test(checkPassword)
}
// Провірка емейлу
function checkEmail(emailValue) {
    if (user.length > 0) {
        for (let j = 0; j < user.length; j++) {
            user[j].email == emailValue ? i = false : i = true
        }
    } else {
        i = true
    }
}

function UsersSign(email, password) {
    this.email = email
    this.password = password
}

// перехід на SignIn
signIn.onclick = function () {
    wrapper.style.display = 'block'
    container.style.display = 'none'
}
signUp.onclick = function () {
    wrapper.style.display = 'none'
    container.style.display = 'block'
}
const checkLocal = () => {
    if (user.length == 0) {
        signInMistake.style.display = 'block'
        signInMistake.innerHTML = 'localStorage is empty'
        return false
    } else {
        return true
    }
}
signInForm.onsubmit = function (event) {
    !checkLocal() ? event.preventDefault() : compareLocal(event)
}
const compareLocal = (event) => {
    if (validateEmail(signInAddress.value) && validatePassword(signInPassword.value)) {
        localUser.push(new UsersSign(signInAddress.value, signInPassword.value))
        checkMass(localUser, user) ? showAccount(event) : showMistake(event)
    } else {
        showMistake(event)
    }
}
const checkMass = (localUser, user) => {
    for (let j = 0; j < user.length; j++) {
        for (let g = 0; g < localUser.length; g++) {
            if (user[j].email == localUser[g].email && user[j].password == localUser[g].password) {
                array = user[j]
                return true
            }
        }
    }
    return false
}
const showMistake = (event) => {
    event.preventDefault()
    signInMistake.style.display = 'block'
}
const showAccount = (event) => {
    event.preventDefault()
    wrapper.style.display = 'none'
    account.style.display = 'flex'
    nameBox.innerHTML = ` ${array.name} ${array.surname}`
    emailBox.innerHTML = ` ${array.email}`
}
goBackSign.addEventListener('click',()=> {
    wrapper.style.display = 'none'
    container.style.display = 'block'
    account.style.display = 'none'
})