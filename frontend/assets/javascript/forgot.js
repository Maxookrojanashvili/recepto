const btn = document.getElementById("resetBtn");
const email = document.getElementById("email");
const message = document.getElementById("message");

btn.addEventListener("click", () => {
  const value = email.value.trim();

  if (!value) {
    message.style.color = "red";
    message.textContent = "გთხოვ ჩაწერე მეილი";
    return;
  }

  if (!value.includes("@")) {
    message.style.color = "red";
    message.textContent = "არასწორი მეილის ფორმატი";
    return;
  }

  message.style.color = "green";
  message.textContent = "აღდგენის ლინკი გაიგზავნა მეილზე";
});