import { useEffect, useState } from 'react';
import LoadingIcon from '../UI/LoadingIcon';
import MealItem from './Mealtem';

const MealsItems = function () {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mealsData = [];

    const fetchMealsData = async function () {
      const response = await fetch(
        'https://react-http-477ed-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      for (const id in data) {
        mealsData.push({
          id: id,
          name: data[id].name,
          description: data[id].description,
          price: data[id].price,
        });
      }

      setMeals(mealsData);
      setIsLoading(false);
    };

    fetchMealsData().catch(() => {
      setIsLoading(false);
      setError('Something went wrong! Please try again later.');
    });
  }, []);

  if (isLoading) return <LoadingIcon />;

  if (error) return <p style={{ textAlign: 'center' }}>{error}</p>;

  return meals.map(meal => {
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
