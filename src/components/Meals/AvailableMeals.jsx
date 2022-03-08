import Card from '../UI/Card'
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem'
import { useEffect, useState } from 'react'

export default function AvailableMeals() {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://yummyfood-delivery-default-rtdb.firebaseio.com/meals.json'
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const data = await response.json()

      let loadedMeals = []

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className={classes.mealsLoading}>Loading...</p>}
        {error && <p className={classes.mealsError}>{error}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}
