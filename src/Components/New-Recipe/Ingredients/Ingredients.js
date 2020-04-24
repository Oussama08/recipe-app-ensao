import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Ingredients.module.scss';
import AddIngredients from './Add-Ingredients/Add-Ingredients';
import ListOfIngredients from './List-Of-Ingredients/List-Of-Ingredients';
import { Ui } from '../../Ui-Components/Ui-Components';
import { withAlert } from 'react-alert';
class Ingredients extends Component {
  static propTypes = {
    addIngredient: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
    removeIngredient: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      ingredient: { name: '' },
      validationErrorMessage: { name: false, addToList: false }
    };
  }
  changeActiveTab(tabName = 'Basic Info') {
    if (tabName === 'Directions') {
      if (this.props.ingredients.length <= 0) {
        this.setState({
          validationErrorMessage: { name: false, addToList: true }
        });

        this.props.alert.info('No Ingredients for Recipe?');
        setTimeout(() => {
          this.setState({
            validationErrorMessage: {
              name: false,
              addToList: false
            }
          });
        }, 100);
        return;
      }
    }
    this.props.changeActiveTab(tabName);
  }
  setIngredientName(event) {
    const ingredientName = event.target.value;
    this.setState(prevState => {
      return { ingredient: { ...prevState.ingredient, name: ingredientName } };
    });
  }

  addIngredient = () => {
    const { name } = this.state.ingredient;
    if (name !== '') {
      this.props.addIngredient({ name });
      this.setState({
        ingredient: {
          name: ''
        }
      });
    } else {
      let element = null;
      switch (true) {
        case name === '':
          element = { name: true, addToList: false };
          break;
        default:
          break;
      }
      this.props.alert.info('Name for Ingredient!');
      this.setState({ validationErrorMessage: element });
      setTimeout(() => {
        this.setState({
          validationErrorMessage: {
            name: false,
            addToList: false
          }
        });
      }, 100);
    }
  };
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.addIngredient();
    }
  };

  removeIngredient = ingredientName => {
    this.props.removeIngredient(ingredientName);
  };
  render() {
    return (
      <div className={classes.ingredients}>
        <AddIngredients
          ingredient={this.state.ingredient}
          setName={this.setIngredientName.bind(this)}
          addIngredient={this.addIngredient.bind(this)}
          validationErrorElements={this.state.validationErrorMessage}
          handleKeyPress={this.handleKeyPress}
        />
        <ListOfIngredients
          ingredients={this.props.ingredients}
          removeIngredient={this.removeIngredient}
        />
        <div className={classes['actions']}>
          <Ui.Button
            button__Type="light__button"
            handleOnClick={this.changeActiveTab.bind(this, 'Basic Info')}
          >
            Basic Info <i className="far fa-hand-point-left" />
          </Ui.Button>
          <Ui.Button
            button__Type="dark__button"
            handleOnClick={this.changeActiveTab.bind(this, 'Directions')}
          >
            Directions <i className="far fa-hand-point-right" />
          </Ui.Button>
        </div>
      </div>
    );
  }
}

export default withAlert(Ingredients);
