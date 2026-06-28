const CLIENT_ID = "YOUR_REAL_GOOGLE_CLIENT_ID";

const REDIRECT_URI =
    "http://localhost:5501/login.html";

const AUTH_URL =
    "https://accounts.google.com/o/oauth2/v2/auth";

const TOKEN_URL =
    "https://oauth2.googleapis.com/token";

const SCOPE =
    "openid email profile";

export async function googleLogin() {

    const verifier = generate();

    localStorage.setItem("pkce", verifier);

    const challenge = await sha256(verifier);

    const url = AUTH_URL + "?" + new URLSearchParams({
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: SCOPE,
        code_challenge: challenge,
        code_challenge_method: "S256",
        access_type: "offline",
        prompt: "consent"
    });

    window.location.href = url;
}

// handle redirect
window.addEventListener("load", async () => {

    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) return;

    const verifier = localStorage.getItem("pkce");

    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            grant_type: "authorization_code",
            code,
            redirect_uri: REDIRECT_URI,
            code_verifier: verifier
        })
    });

    const token = await res.json();

    console.log(token);

    if (token.access_token) {
        localStorage.setItem("access_token", token.access_token);
        window.location.href = "../dashboard.html";
    }
});

// helpers
function generate() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let str = "";
    const arr = new Uint8Array(64);
    crypto.getRandomValues(arr);

    arr.forEach(x => str += chars[x % chars.length]);

    return str;
}

async function sha256(v) {
    const data = new TextEncoder().encode(v);
    const hash = await crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}