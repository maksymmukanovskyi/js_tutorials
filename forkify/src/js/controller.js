import * as model from './model';
import RecipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import recipeView from './views/recipeView';
// if (module && module.hot) module.hot.accept();

// import { forEach } from 'core-js/core/array';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // 0.  Update results view to mark selected search result.
    resultsView.update(model.getSearchResultsPage());
    //1. Loading recipe

    RecipeView.renderSpinner();

    await model.loadRecipe(id);

    //2. Rendering recipe
    // const recipe = model.state.recipe;

    RecipeView.render(model.state.recipe);
  } catch (error) {
    RecipeView.renderError();
  }
};

const ctrlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1.get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2. Load search results
    await model.loadSearchResult(query);

    //3. Render results
    resultsView.render(model.getSearchResultsPage());

    //4. render initital pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const ctrlPagination = function (goToPage) {
  //1. Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2. render NEW pagination buttons
  paginationView.render(model.state.search);
};

const ctrlServings = function (newServings) {
  // Update recipe servings (in state)
  model.updateServings(newServings);
  // Updating recipe view
  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
};

const init = function () {
  paginationView.addHandlerClick(ctrlPagination);
  RecipeView.addHandlerRednder(controlRecipe);
  RecipeView.addHandlerUpdateServings(ctrlServings);
  searchView.addHandlerSearch(ctrlSearchResults);
};
init();
