require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";

const state = {};
const controlSearch = async () => {
  //1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();

  if (query) {
    //2) Шинээр хайлтын обектийг үүсгэж өгнө.
    state.search = new Search(query);

    // 3) Хайлт хийхэд зориулсан хайлтын UI бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    // 4) Хайлтыг гүйцэтгэнэ.
    await state.search.doSearch();

    // 5) Хайлтын үр дүнг дэлгэцэнд үзүүлэнэ.
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
    //console.log(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const goToPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goToPageNumber);
  }
});
const r = new Recipe(47746);
r.getRecipe();
