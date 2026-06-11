const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");

toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";

        // დახუჭული თვალი
        eyeIcon.innerHTML = `
        <path d="M2 2l20 20M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58M6.53 6.53C4.55 8.04 3 10.5 2 12c0 0 3 7 10 7 2.06 0 3.87-.5 5.41-1.32M9.88 4.24A9.94 9.94 0 0 1 12 5c7 0 10 7 10 7a18.5 18.5 0 0 1-3.17 4.69"/>
        `;
    } else {
        password.type = "password";

        // გახსნილი თვალი
        eyeIcon.innerHTML = `
        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
        `;
    }
});
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");

    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");

    registerForm.style.display = "block";
    loginForm.style.display = "none";
});