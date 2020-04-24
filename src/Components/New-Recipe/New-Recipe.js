import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./New-Recipe.module.scss";
import { Ui } from "../Ui-Components/Ui-Components";
import BasicInfo from "./Basic-Info/Basic-Info";
import Ingredients from "./Ingredients/Ingredients";
import Directions from "./Directions/Directions";

export class NewRecipe extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    showTime: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      showWrapper: false,
      backgroundImage: {
        name: "fruits",
        url:
          "https://images.wallpaperscraft.com/image/raspberry_berry_bowl_sweet_ripe_65754_1280x720.jpg",
        cssStyles: {},
      },
      recipeInfo: {
        title: "",
        writer: "",
        tags: [],
        ingredients: [],
        directions: [],
      },
      currentTab: "Basic Info",
    };
  }

  clearRecipeInfo = () => {
    this.setState({
      recipeInfo: {
        title: "",
        writer: "",
        tags: [],
        ingredients: [],
        directions: [],
      },
      currentTab: "Basic Info",
    });
  };

  changeActiveWindow(e, windowName = "Main") {
    e.preventDefault();
    this.props.navigateTo(windowName);
  }
  changeActiveTab(tabName = "Basic Info") {
    this.setState({ currentTab: tabName });
  }
  addIngredient = (ingredient) => {
    this.setState((prevState) => {
      return {
        recipeInfo: {
          ...prevState.recipeInfo,
          ingredients: [...prevState.recipeInfo.ingredients, ingredient],
        },
      };
    });
  };
  removeIngredient = (ingredientName) => {
    this.setState((prevState) => {
      return {
        recipeInfo: {
          ...prevState.recipeInfo,
          ingredients: [
            ...prevState.recipeInfo.ingredients.filter(
              (ingredient) => ingredient.name !== ingredientName
            ),
          ],
        },
      };
    });
  };
  setRecipeInfo = (inputType, inputValue) => {
    this.setState((prevState) => {
      return {
        recipeInfo: { ...prevState.recipeInfo, [inputType]: inputValue },
      };
    });
  };
  setTagsForRecipe = (tag) => {
    if (tag.trim() && !this.state.recipeInfo.tags.includes(tag)) {
      this.setState((prevState) => {
        return {
          recipeInfo: {
            ...prevState.recipeInfo,
            tags: [...prevState.recipeInfo.tags, tag],
          },
        };
      });
    }
  };
  removeTag = (tag) => {
    this.setState((prevState) => {
      return {
        recipeInfo: {
          ...prevState.recipeInfo,
          tags: prevState.recipeInfo.tags.filter((t) => t !== tag),
        },
      };
    });
  };
  showWrapper() {
    this.setState({ showWrapper: true });
  }
  setDirections = (directions) => {
    const savedDirections = [...directions];
    this.setState((prevState) => {
      return {
        recipeInfo: { ...prevState.recipeInfo, directions: savedDirections },
      };
    });
  };
  componentDidMount() {
    setTimeout(() => {
      this.showWrapper();
      document.title = "Recipe App | New Recipe";
    }, this.props.showTime);
  }
  render() {
    const wrapperStyles = {
      height: this.state.showWrapper ? "70%" : "0%",
      width: "70%",
      padding: "2% 3%",
      flexWrap: "wrap",
      alignItems: "center",
    };
    let currentTabJsx = null;

    switch (this.state.currentTab) {
      case "Basic Info":
        currentTabJsx = (
          <BasicInfo
            recipeInfo={this.state.recipeInfo}
            setRecipeInfo={this.setRecipeInfo}
            setTagsForRecipe={this.setTagsForRecipe}
            removeTag={this.removeTag}
            changeActiveTab={this.changeActiveTab.bind(this)}
          />
        );
        break;
      case "Ingredients":
        currentTabJsx = (
          <Ingredients
            addIngredient={this.addIngredient}
            removeIngredient={this.removeIngredient}
            ingredients={[...this.state.recipeInfo.ingredients]}
            changeActiveTab={this.changeActiveTab.bind(this)}
          />
        );
        break;
      case "Directions":
        currentTabJsx = (
          <Directions
            setDirections={this.setDirections}
            changeActiveTab={this.changeActiveTab.bind(this)}
            directions={[...this.state.recipeInfo.directions]}
            recipeInfo={this.state.recipeInfo}
            changeActiveWindow={this.changeActiveWindow.bind(this)}
            clearRecipeInfo={this.clearRecipeInfo}
          />
        );
        break;
      default:
        console.error("Tab not found");
        break;
    }
    return (
      <div className={classes.new__recipe}>
        <Ui.BackgroundImage
          url={this.state.backgroundImage.url}
          name={this.state.backgroundImage.name}
          cssStyles={this.state.backgroundImage.cssStyles}
        />
        <Ui.Overlay />
        <Ui.Wrapper wrapperStyles={wrapperStyles}>
          <div className={classes.navigation}>
            <div className={classes["page__name"]}>New Recipe</div>
            <Ui.Button
              button__Type="dark__button"
              handleOnClick={this.changeActiveWindow.bind(this)}
            >
              Main <i className="far fa-compass" />
            </Ui.Button>
          </div>
          <div className={classes["recipe__information"]}>{currentTabJsx}</div>
        </Ui.Wrapper>
      </div>
    );
  }
}
