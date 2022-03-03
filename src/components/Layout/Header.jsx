import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

export default function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>YummyFood Delivery</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="meals" />
      </div>
    </>
  )
}
