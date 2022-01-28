import { DUMMY_MEALS } from './dummyMeals';
import MealItem from './Mealtem';

const MealsItems = function () {
  return DUMMY_MEALS.map(meal => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        heading={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });
};

export default MealsItems;
