import React from 'react';
import classes from './Loading-Screen.module.scss';
import IllustrationChefMonza from '../../../assets/images/chef_monza.svg';
import IllustrationEatingMonza from '../../../assets/images/eating_together_monza.svg';
import IllustrationStreetMonza from '../../../assets/images/street_food_monza.svg';
import IllustrationTastingMonza from '../../../assets/images/tasting_monza.svg';
import IllustrationChefDodger from '../../../assets/images/chef_dodger.svg';
import IllustrationEatingDodger from '../../../assets/images/eating_together_dodger.svg';
import IllustrationStreetDodger from '../../../assets/images/street_food_dodger.svg';
import IllustrationTastingDodger from '../../../assets/images/tasting_dodger.svg';

const getRandomIllustration = () => {
  const illustrations = [
    IllustrationChefMonza,
    IllustrationEatingMonza,
    IllustrationStreetMonza,
    IllustrationTastingMonza,
    IllustrationChefDodger,
    IllustrationEatingDodger,
    IllustrationStreetDodger,
    IllustrationTastingDodger
  ];
  return illustrations[Math.floor(Math.random() * illustrations.length)];
};
export const LoadingScreen = () => (
  <div className={classes.loading__screen}>
    <div className={classes.wrapper}>
      <div className={classes.text}>
        <img src={require('../../../assets/images/tomato.png')} alt="tomato" />{' '}
        <span>Loading...</span>
      </div>
      <div className={classes['illustration']}>
        <img src={getRandomIllustration()} alt="Random Illustration" />
      </div>
    </div>
  </div>
);
