const recipes = [
  { name: "ქათმის სალათა", category: "salad" },
  { name: "შემწვარი ქათამი", category: "main" },
  { name: "ხაჭაპური", category: "bakery" },
  { name: "Chicken Soup", category: "soup" },
  { name: "Pasta", category: "fastfood" }
];

const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  if (query.length < 2) {
    results.innerHTML = "";
    return;
  }

  const filtered = recipes.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    results.innerHTML = "<p>არაფერი მოიძებნა</p>";
    return;
  }

  results.innerHTML = filtered
    .map(item => `<p>${item.name}</p>`)
    .join("");
});