import React, { Component } from "react";
import { Ui } from "../Ui-Components/Ui-Components";
import classes from "./All-Recipes.module.scss";
import { AllRecipesSidebar } from "./All-Recipes-Sidebar/All-Recipes-Sidebar";
import { RecipeDescription } from "./Recipe-Description/Recipe-Description";
import { withAlert } from "react-alert";

import PropTypes from "prop-types";

class AllRecipes extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    showTime: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showWrapper: false,
      backgroundImage: {
        name: "wallcraftAll",
        url:
          "https://images.wallpaperscraft.com/image/food_pepper_herbs_sauce_84898_1280x720.jpg",
        cssStyles: {},
      },
      recipeInfo: [],
      activeRecipeId: null,
    };
  }
  changeActiveWindow(e, windowName = "Main") {
    e.preventDefault();
    this.props.navigateTo(windowName);
  }
  showWrapper() {
    this.setState({ showWrapper: true });
  }
  deleteRecipe = (id, e) => {
    e.preventDefault();
    const { recipeInfo } = this.state;
    const updatedRecipe = {
      recipeInfo: recipeInfo.filter((recipe) => recipe.id !== id),
      activeRecipeId: recipeInfo.length > 1 ? recipeInfo[0].id : null,
    };
    this.setState(updatedRecipe);
    localStorage.setItem("recipe-webapp-data", JSON.stringify(updatedRecipe));
    this.props.alert.info("Recipe Deleted!");
  };

  componentDidMount() {
    const recipeWebappData = JSON.parse(
      localStorage.getItem("recipe-webapp-data")
    );
    if (
      recipeWebappData &&
      recipeWebappData.recipeInfo &&
      recipeWebappData.recipeInfo.length > 0
    ) {
      this.setState({
        showWrapper: true,
        recipeInfo: recipeWebappData.recipeInfo,
        activeRecipeId: recipeWebappData.recipeInfo[0].id,
      });
    }
    setTimeout(() => {
      this.showWrapper();
      document.title = "Recipe App | All Recipes";
    }, this.props.showTime);
  }
  render() {
    const { recipeInfo, activeRecipeId } = this.state;
    const allRecipeTitles = recipeInfo.map((recipe) => [
      recipe.id,
      recipe.title,
    ]);
    const activeRecipe = recipeInfo.find(
      (recipe) => recipe.id === activeRecipeId
    );
    const wrapperStyles = {
      height: this.state.showWrapper ? "70%" : "0%",
      width: "70%",
      padding: "2% 3%",
      flexWrap: "wrap",
      alignItems: "center",
    };
    return (
      <div className={classes.all_recipes}>
        <Ui.BackgroundImage
          url={this.state.backgroundImage.url}
          name={this.state.backgroundImage.name}
          cssStyles={this.state.backgroundImage.cssStyles}
        />
        <Ui.Overlay />
        <Ui.Wrapper wrapperStyles={wrapperStyles}>
          <div className={classes.navigation}>
            <div className={classes["page__name"]}>All Recipes</div>
            <Ui.Button
              button__Type="dark__button"
              handleOnClick={this.changeActiveWindow.bind(this)}
            >
              Main <i className="far fa-compass" />
            </Ui.Button>
          </div>
          <div className={classes["all-recipes__wrapper"]}>
            <AllRecipesSidebar
              allRecipeTitles={allRecipeTitles}
              deleteRecipe={this.deleteRecipe}
              activeRecipeId={activeRecipeId}
              describeRecipe={(id, e) => {
                e.preventDefault();
                this.setState({
                  activeRecipeId: id,
                });
              }}
            />
            <RecipeDescription activeRecipe={activeRecipe} />
          </div>
        </Ui.Wrapper>
      </div>
    );
  }
}

export default withAlert(AllRecipes);
