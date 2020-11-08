import { elements } from "./base";

const renderRecipe = (recipe) => {
  const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
  `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
  //   console.log(recipe);
};
// for preparin UI
export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, recPerPage = 10) => {
  //хайлтын үр дүнг хуудаслаж үзүүлэх
  //page = 2,  start = 10, end = 20
  const start = (currentPage - 1) * recPerPage;
  const end = currentPage * recPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  //Хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / recPerPage);
  renderButtons(currentPage, totalPages);
};

const createButton = (
  currentPage,
  type,
  dir
) => `<button class="btn-inline results__btn--${type}" data-goto=${currentPage}>
   <span>Хуудас ${currentPage}</span>
   <svg class="search__icon">
     <use href="img/icons.svg#icon-triangle-${dir}"></use>
   </svg>
  </button>`;

const renderButtons = (currentPage, totalPages) => {
  let buttonHtml;

  if (currentPage === 1 && totalPages > 1) {
    // 1-р хуудасан дээр байна, 2р хуудас гэдэг товчийг гарга
    buttonHtml = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    //Өмнөх  болон дараачийн хуудас руу шилжих товчуудыг үзүүл
    buttonHtml = createButton(currentPage - 1, "prew", "left");
    buttonHtml += createButton(currentPage + 1, "next", "right");
  } else if (currentPage === totalPages) {
    // Хамгийн сүүлийн хуудас дээр байна. Өмнөх хуудас руу шилжих  товчийг л үзүүлэнэ.
    buttonHtml = createButton(currentPage - 1, "prew", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", buttonHtml);
};
