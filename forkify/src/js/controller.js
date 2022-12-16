import * as model from './model';
import RecipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// import { forEach } from 'core-js/core/array';

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

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
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  RecipeView.addHandlerRednder(controlRecipe);
  searchView.addHandlerSearch(ctrlSearchResults);
};
init();