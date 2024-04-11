const togglePassword = document.getElementById("togglePassword");
const inputPassword = document.getElementById("password");
const inputUsername = document.getElementById("username");
const iconLoading = document.getElementById("loading");

const onToggleTypePassword = () => {
    togglePassword.classList.toggle("fa-eye-slash");

    if (inputPassword.type === "password") {
        inputPassword.type = "text";
    } else {
        inputPassword.type = "password";
    }
};

togglePassword.addEventListener("click", onToggleTypePassword);

// VALIDATION FORM LOGIN
const checkUsername = (username) => {
    if (!username) return "Hãy nhập Username !";
    else if (username.length < 5)
        return "Username cần chứa tối thiểu 5 kí tự !";
    else return true;
};
const checkPassword = (password) => {
    if (!password) return "Hãy nhập Password !";
    else if (password.length < 5)
        return "Password cần chứa tối thiểu 5 kí tự !";
    else return true;
};
const showError = (element, message) => {
    element.style.display = "block";
    element.innerHTML = message;
    element.className = "message__error";
};

const hideError = (element) => {
    element.style.display = "none";
};
const validation = (username, password) => {
    const errorUsername = document.getElementById("errorUsername");
    const errorPassword = document.getElementById("errorPassword");

    // validation username;
    let messageErrorUsername = checkUsername(username);
    if (typeof messageErrorUsername === "string") {
        showError(errorUsername, messageErrorUsername);
    } else {
        hideError(errorUsername);
    }

    // validation password;
    let messageErrorPassword = checkPassword(password);
    if (typeof messageErrorPassword === "string") {
        showError(errorPassword, messageErrorPassword);
    } else {
        hideError(errorPassword);
    }

    if (messageErrorUsername === true && messageErrorPassword === true) {
        return true;
    }
    return false;
};
const login = (username, password) => {
    if (username === "admin" && password === "admin") {
        window.location.assign("TrangChu.html");
        return true;
    }
    return false;
};

const showLoading = () => {
    iconLoading.style.display = "flex";
};
const hideLoading = () => {
    iconLoading.style.display = "none";
};
const onSubmitForm = (form) => {
    const username = form.username.value;
    const password = form.password.value;
    const checkValidation = validation(username, password);
    if (checkValidation === true) {
        showLoading();
        setTimeout(() => {
            const checkLogin = login(username, password);
            if (checkLogin === false) {
                swal(
                    "",
                    "Tên đăng nhập hoặc mật khẩu không chính xác !",
                    "error"
                );
            }
            hideLoading();
        }, 1000);
    }
};
