// =========================
// PASSWORD TOGGLE
// =========================
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");

toggle.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";

        eyeIcon.innerHTML = `
        <path d="M2 2l20 20M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58"/>
        `;
    } else {
        password.type = "password";

        eyeIcon.innerHTML = `
        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
        `;
    }
});


// =========================
// TABS
// =========================
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

    loginForm.style.display = "none";
    registerForm.style.display = "block";
});


// =========================
// GOOGLE OAUTH CONFIG
// =========================
const clientId = "YOUR_GOOGLE_CLIENT_ID";
const redirectUri = "http://localhost:5500/callback.html";
const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";

const googleBtn = document.getElementById("googleLoginBtn");


// =========================
// PKCE HELPERS
// =========================
function generateRandomString(length = 64) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < array.length; i++) {
        result += chars[array[i] % chars.length];
    }

    return result;
}

async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function generatePKCE() {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64urlencode(hashed);

    return { codeVerifier, codeChallenge };
}


// =========================
// GOOGLE LOGIN
// =========================
googleBtn.addEventListener("click", async () => {
    const { codeVerifier, codeChallenge } = await generatePKCE();

    sessionStorage.setItem("code_verifier", codeVerifier);

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        code_challenge: codeChallenge,
        code_challenge_method: "S256"
    });

    window.location = `${authEndpoint}?${params.toString()}`;
});