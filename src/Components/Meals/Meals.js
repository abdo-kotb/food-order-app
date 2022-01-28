import styles from './Meals.module.css';

import Card from '../UI/Card';
import MealsItems from './MealsItems';
import MealsSummary from './MealsSummary';

const Meals = function () {
  return (
    <section>
      <MealsSummary />
      <Card className={styles.meals}>
        <ul>
          <MealsItems />
        </ul>
      </Card>
    </section>
  );
};

export default Meals;
