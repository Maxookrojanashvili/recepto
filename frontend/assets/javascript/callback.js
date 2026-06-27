const clientId = "YOUR_GOOGLE_CLIENT_ID";
const tokenEndpoint = "https://oauth2.googleapis.com/token";
const redirectUri = "http://localhost:5500/callback.html";

async function exchangeToken() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const codeVerifier = sessionStorage.getItem("code_verifier");

    if (!code) {
        document.body.innerHTML = "<h2>Error: No authorization code</h2>";
        return;
    }

    const body = new URLSearchParams({
        client_id: clientId,
        code,
        code_verifier: codeVerifier,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
    });

    try {
        const res = await fetch(tokenEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body
        });

        const data = await res.json();

        if (data.error) {
            document.body.innerHTML = `<h2>Error: ${data.error}</h2>`;
            return;
        }

        console.log("ACCESS TOKEN:", data.access_token);

        localStorage.setItem("access_token", data.access_token);

        document.body.innerHTML = "<h2>Login successful ✅</h2>";

        // სურვილის შემთხვევაში redirect
        // window.location.href = "/dashboard.html";

    } catch (err) {
        console.error(err);
        document.body.innerHTML = "<h2>Network error</h2>";
    }
}

exchangeToken();