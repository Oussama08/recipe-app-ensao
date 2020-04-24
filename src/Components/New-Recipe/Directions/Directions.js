import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Directions.module.scss';
import Direction from './Direction/Direction';
import Actions from './Actions/Actions';
import { Ui } from '../../Ui-Components/Ui-Components';
import { withAlert } from 'react-alert';
var uniqid = require('uniqid');

class Directions extends Component {
  static propTypes = {
    setDirections: PropTypes.func.isRequired,
    directions: PropTypes.array.isRequired,
    changeActiveTab: PropTypes.func.isRequired
  };
  state = {
    directions: [' '],
    validationErrorElements: { saveDirections: false }
  };
  componentDidMount() {
    if (this.props.directions.length > 0) {
      this.setState({
        directions: this.props.directions
      });
    }
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({
      behavior: 'smooth'
    });
  }
  newDirection = () => {
    if (this.state.directions[this.state.directions.length - 1] !== ' ') {
      this.setState(prevState => {
        return { directions: [...prevState.directions, ' '] };
      });
      this.scrollToBottom();
    }
  };
  saveDirections = () => {
    if (this.state.directions.length) {
      if (this.state.directions[this.state.directions.length - 1].trim()) {
        this.props.setDirections(this.state.directions);
        this.props.alert.info('Directions Saved!');
      }
    }
  };
  editDirection(index, event) {
    const direction = event.target.value;
    this.setState(prevState => {
      const directions = [...prevState.directions];
      directions[index] = direction;
      return { directions: directions };
    });
  }
  changeActiveTab(tabName, e) {
    if (tabName === 'save') {
      if (
        (this.state.directions.length === 1 &&
          this.state.directions[0].trim() === '') ||
        this.props.directions.length === 0
      ) {
        this.setState({
          validationErrorElements: {
            saveDirections: true
          }
        });

        this.props.alert.info('No Directions for Recipe?');
        setTimeout(() => {
          this.setState({
            validationErrorElements: {
              saveDirections: false
            }
          });
        }, 100);
        return;
      } else {
        this.saveRecipe(e);
      }
    } else {
      this.props.changeActiveTab(tabName);
    }
  }
  saveRecipe(e) {
    {
      const prevRecipeWebappData = JSON.parse(
        localStorage.getItem('recipe-webapp-data')
      );
      if (prevRecipeWebappData) {
        const recipeWebappData = {
          recipeInfo: [
            ...prevRecipeWebappData.recipeInfo,
            { ...this.props.recipeInfo, id: uniqid() }
          ]
        };
        localStorage.setItem(
          'recipe-webapp-data',
          JSON.stringify(recipeWebappData)
        );
        this.props.alert.info('Recipe Saved!');
        this.props.clearRecipeInfo();
        this.props.changeActiveWindow(e);
        return;
      }
    }
    const recipeWebappData = {
      recipeInfo: [{ ...this.props.recipeInfo, id: uniqid() }]
    };
    localStorage.setItem(
      'recipe-webapp-data',
      JSON.stringify(recipeWebappData)
    );
    this.props.alert.info('Recipe Saved!');
    this.props.clearRecipeInfo();
    this.props.changeActiveWindow(e);
  }
  render() {
    const directions = this.state.directions.map((direction, index) => (
      <Direction
        directionName={direction}
        editDirection={this.editDirection.bind(this, index)}
        index={index + 1}
        key={uniqid()}
      />
    ));
    return (
      <div
        className={classes['directions__wrapper']}
        ref={el => {
          this.el = el;
        }}
      >
        <div className={classes.directions}>
          {directions}
          <Actions
            newDirection={this.newDirection}
            saveDirections={this.saveDirections}
            validationErrorElements={this.state.validationErrorElements}
          />
        </div>
        <div className={classes['actions']}>
          <Ui.Button
            button__Type="light__button"
            handleOnClick={this.changeActiveTab.bind(this, 'Ingredients')}
          >
            Ingredients <i className="far fa-hand-point-left" />
          </Ui.Button>
          <Ui.Button
            button__Type="dark__button"
            handleOnClick={this.changeActiveTab.bind(this, 'save')}
          >
            Save <i className="far fa-save" />
          </Ui.Button>
        </div>
      </div>
    );
  }
}
export default withAlert(Directions);
