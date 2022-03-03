import DUMMY_MEALS from '../../Mock/dummyMeals'
import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'

export default function AvailableMeals() {
  const dummyList = DUMMY_MEALS.map(meal => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{dummyList}</ul>
      </Card>
    </section>
  )
}
