import React from 'react';

import { Intro } from '../Components/Intro/Intro';
import { NewRecipe } from '../Components/New-Recipe/New-Recipe';
import AllRecipes from '../Components/All-Recipes/All-Recipes';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeWindow: 'Intro' };
    this.changeActiveWindow = this.changeActiveWindow.bind(this);
  }
  changeActiveWindow(name = 'Intro') {
    this.setState({ activeWindow: name });
  }
  render() {
    let display = null;
    switch (this.state.activeWindow) {
      case 'Intro':
        display = (
          <Intro
            showTime={10000} // 7000
            activeWindow={this.state.activeWindow}
            navigateTo={this.changeActiveWindow}
          />
        );
        break;
      case 'Main':
        display = (
          <Intro
            showTime={5}
            activeWindow={this.state.activeWindow}
            navigateTo={this.changeActiveWindow}
          />
        );
        break;
      case 'New-Recipe':
        display = (
          <NewRecipe showTime={50} navigateTo={this.changeActiveWindow} />
        );
        break;
      case 'All-Recipes':
        display = (
          <AllRecipes showTime={50} navigateTo={this.changeActiveWindow} />
        );
        break;
      default:
        display = null;
        break;
    }
    return <>{display}</>;
  }
}
