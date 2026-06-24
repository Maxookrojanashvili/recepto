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

const recipes = [
    {
        id: 1,
        title: "დუბაის შოკოლადი",
        category: "ტკბილი",
        time: "30 წუთი",
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80",
        description: "პისტას კრემითა და შოკოლადით მომზადებული პოპულარული დესერტი."
    },

    {
        id: 2,
        title: "მექსიკური ნაჩოსი",
        category: "მლაშე",
        time: "15 წუთი",
        image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80",
        description: "ხრაშუნა ნაჩოსი ყველით, სოუსით და ბოსტნეულით."
    },

    {
        id: 3,
        title: "სამმაგი ბურგერი",
        category: "მლაშე",
        time: "40 წუთი",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        description: "წვნიანი ბურგერი სამმაგი კატლეტით და ყველით."
    },

    {
        id: 4,
        title: "ჩიზქეიქი",
        category: "ტკბილი",
        time: "50 წუთი",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
        description: "ნაზი და არომატული კლასიკური ჩიზქეიქი."
    },

    {
        id: 5,
        title: "ცეზარის სალათი",
        category: "მჟავე",
        time: "20 წუთი",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
        description: "მსუბუქი სალათი ქათმითა და სპეციალური სოუსით."
    },

    {
        id: 6,
        title: "ცხარე ტაკო",
        category: "ცხარე",
        time: "25 წუთი",
        image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=800&q=80",
        description: "მექსიკური ტაკო ცხარე ხორცით და სოუსით."
    }
];

const container = document.getElementById("recipesContainer");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");

function renderRecipes(data){

    container.innerHTML = "";

    if(data.length === 0){
        container.innerHTML =
        `
        <h2 style="text-align:center;grid-column:1/-1;">
            რეცეპტი ვერ მოიძებნა
        </h2>
        `;
        return;
    }

    data.forEach(recipe => {

        container.innerHTML +=
        `
        <article class="recipe-card">

            <img
                src="${recipe.image}"
                alt="${recipe.title}"
            >

            <div class="recipe-content">

                <span class="recipe-category">
                    ${recipe.category}
                </span>

                <h2>${recipe.title}</h2>

                <p>
                    ${recipe.description}
                </p>

                <div class="recipe-footer">

                    <span class="time">
                        ⏱ ${recipe.time}
                    </span>

                    <button
                        class="view-btn"
                        onclick="openRecipe(${recipe.id})">
                        ნახვა
                    </button>

                </div>

            </div>

        </article>
        `;
    });

}

function openRecipe(id){
    window.location.href =
    `recipe-details.html?id=${id}`;
}

renderRecipes(recipes);

searchInput.addEventListener("input", function(){

    const value =
        this.value.toLowerCase();

    const filtered =
        recipes.filter(recipe =>
            recipe.title
            .toLowerCase()
            .includes(value)
        );

    renderRecipes(filtered);

});

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
            button.dataset.category;

        if(category === "all"){
            renderRecipes(recipes);
            return;
        }

        const filtered =
            recipes.filter(recipe =>
                recipe.category === category
            );

        renderRecipes(filtered);

    });

});