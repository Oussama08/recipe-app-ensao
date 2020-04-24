import React from "react";
import PropTypes from "prop-types";
import classes from "./Add-Ingredients.module.scss";
import { Ui } from "../../../Ui-Components/Ui-Components";

const AddIngredients = (props) => {
  const style = {
    ingredient__name: { width: "100%", fontSize: "1rem" },
  };

  let addIngredientToListButtonClasses = "fas fa-hand-point-right";
  if (props.validationErrorElements.addToList) {
    addIngredientToListButtonClasses = [
      "fas fa-hand-point-right",
      classes["addToListButton__validation"],
    ].join(" ");
  }
  return (
    <div className={classes["add__ingredient"]}>
      <div className={classes["add__ingredient--input"]}>
        <div className={classes["ingredient__name"]}>
          <Ui.Input
            placeholder="Name & Quantity?"
            style={style["ingredient__name"]}
            handleOnChange={props.setName}
            value={props.ingredient.name}
            setFocus={true}
            onKeyPress={props.handleKeyPress}
            validationErrorMessage={props.validationErrorElements.name}
          />
        </div>
      </div>
      <div className={classes["add__to--list"]}>
        <span
          className={classes["add__bg"]}
          onClick={props.addIngredient}
          title="Add Ingredient to the list please"
        >
          <i className={addIngredientToListButtonClasses} />
        </span>
      </div>
    </div>
  );
};

AddIngredients.propTypes = {
  ingredient: PropTypes.object.isRequired,
  setName: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  validationErrorElements: PropTypes.object.isRequired,
};

export default AddIngredients;
