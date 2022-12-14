import * as model from './model';
import recipeView from './views/recipeView';
import '../sass/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import { forEach } from 'core-js/core/array';

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    //1. Loading recipe

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //2. Rendering recipe
    // const recipe = model.state.recipe;

    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

// showRecipe();

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipe)
);
