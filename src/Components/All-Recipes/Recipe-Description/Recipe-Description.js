import React from 'react';
import classes from './Recipe-Description.module.scss';

export const RecipeDescription = props => {
  const { activeRecipe } = props;
  console.log(activeRecipe);
  if (activeRecipe) {
    const tags = activeRecipe.tags.map((tag, i) => (
      <span className={classes['tag']} key={i}>
        <i className="fas fa-hashtag" />
        {tag}
      </span>
    ));
    return (
      <div className={classes['recipe__description']}>
        <div className={classes['recipe__title']}>
          <span>{activeRecipe.title}</span>
        </div>
        <div className={classes['tags']}>{tags}</div>
        <div className={classes['writer-label']}>Writer:</div>
        <div className={classes['writer-name']}>{activeRecipe.writer}</div>
        <div className={classes['ingredient-label']}>Ingredients:</div>
        <ol className={classes['ingredients']}>
          {activeRecipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient.name}</li>
          ))}
        </ol>
        <div className={classes['ingredient-label']}>Directions:</div>
        <ol className={classes['ingredients']}>
          {activeRecipe.directions.map((direction, i) => (
            <li key={i}>{direction}</li>
          ))}
        </ol>
      </div>
    );
  }
  return null;
};
