import React from 'react';
import classes from './All-Recipes-Sidebar.module.scss';

export const AllRecipesSidebar = props => {
  const { allRecipeTitles, activeRecipeId } = props;
  return (
    <div className={classes['all-recipes__sidebar']}>
      {allRecipeTitles.length > 0 &&
        allRecipeTitles.map(recipe => (
          <div
            key={recipe[0]}
            className={classes['recipe-name-wrapper']}
            style={activeRecipeId === recipe[0] ? { marginBottom: '2%' } : {}}
          >
            <div
              className={classes['recipe__name']}
              style={
                activeRecipeId === recipe[0]
                  ? { boxShadow: '1px 2px 4px 0px #0000004f' }
                  : {}
              }
            >
              <span onClick={props.describeRecipe.bind(null, recipe[0])}>
                {recipe[1]}{' '}
              </span>
              <i
                className="fas fa-trash"
                title="Delete this recipe."
                onClick={props.deleteRecipe.bind(null, recipe[0])}
              />
            </div>
          </div>
        ))}
    </div>
  );
};
