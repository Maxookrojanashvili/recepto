const isInTemplates = window.location.pathname.includes("/templates");
const navLinks = [
{ name: "მთავარი", url: isInTemplates ? "../index.html" : "index.html" },
{ name: "რეცეპტები", url: isInTemplates ? "recipe.html" : "templates/recipe.html" },
{ name: "ინგრედიენტები", url: isInTemplates ? "ingredients.html" : "templates/ingredients.html" },
{ name: "დღის გეგმა", url: isInTemplates ? "plan.html" : "templates/plan.html" }
];

const currentPage = window.location.pathname.split("/").pop();

const navContainer = document.getElementById("navLinks");

navLinks.forEach(link => {
  const li = document.createElement("li");

  const a = document.createElement("a");
  a.href = link.url;
  a.textContent = link.name;

  // active class ავტომატურად
  if (link.url === currentPage || (currentPage === "" && link.url === "index.html")) {
    a.classList.add("active");
  }

  li.appendChild(a);
  navContainer.appendChild(li);
});
const isLoggedIn = false; // ეს იქნება მომავალში რეალური ლოგიკა

const authContainer = document.getElementById("authButtons");

if (isLoggedIn) {
  authContainer.innerHTML = `
    <a href="profile.html" class="btn">პროფილი</a>
    <a href="logout.html" class="btn">გასვლა</a>
  `;
} else {
  authContainer.innerHTML = `
    <a href="templates/login.html" class="btn">ავტორიზაცია</a>
    <a href="templates/register.html" class="btn">რეგისტრაცია</a>
  `;
}
const recipes = [
    { name: "მწვადი" },
    { name: "ხინკალი" },
    { name: "აჭარული ხაჭაპური" },
    { name: "ჩაქაფული" }
];

function searchRecipe() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const results = document.getElementById("searchResults");

    results.innerHTML = "";

    if (input === "") {
        return;
    }

    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(input)
    );

    if (filtered.length === 0) {
        results.innerHTML = `
            <div class="result-item">
                ვერაფერი მოიძებნა
            </div>
        `;
        return;
    }

    filtered.forEach(recipe => {
        results.innerHTML += `
            <div class="result-item">
                ${recipe.name}
            </div>
        `;
    });

}