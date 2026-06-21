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

// 🔹 debounce
function debounce(fn, delay) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// 🔹 highlight match
function highlight(text, query) {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

let currentIndex = -1;
let lastResults = [];

// 🔹 render results
function renderResults(filtered, query) {
    const results = document.getElementById("searchResults");

    if (query === "") {
        results.innerHTML = "";
        results.style.display = "none";
        return;
    }

    results.style.display = "block";

    if (filtered.length === 0) {
        results.innerHTML = `
            <div class="result-item empty">
                ვერაფერი მოიძებნა
            </div>
        `;
        return;
    }

    let html = "";

    filtered.forEach((recipe, index) => {
        html += `
            <div class="result-item" data-index="${index}">
                ${highlight(recipe.name, query)}
            </div>
        `;
    });

    results.innerHTML = html;
}

// 🔹 main search
function searchRecipe() {
    const inputEl = document.getElementById("searchInput");
    const query = inputEl.value.trim().toLowerCase();

    const filtered = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query)
    );

    lastResults = filtered;
    currentIndex = -1;

    renderResults(filtered, query);
}

// 🔹 debounce search
const debouncedSearch = debounce(searchRecipe, 300);

// 🔹 input event
document.getElementById("searchInput")
.addEventListener("input", debouncedSearch);

// 🔹 keyboard navigation
document.getElementById("searchInput")
.addEventListener("keydown", (e) => {
    const items = document.querySelectorAll(".result-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % items.length;
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    }

    if (e.key === "Enter") {
        if (items[currentIndex]) {
            document.getElementById("searchInput").value =
                items[currentIndex].innerText;

            document.getElementById("searchResults").innerHTML = "";
        }
    }

    items.forEach((item, i) => {
        item.classList.toggle("active", i === currentIndex);
    });
});

// 🔹 click select
document.getElementById("searchResults")
.addEventListener("click", (e) => {
    if (e.target.classList.contains("result-item")) {
        document.getElementById("searchInput").value =
            e.target.innerText;

        document.getElementById("searchResults").innerHTML = "";
    }
});