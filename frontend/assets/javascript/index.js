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