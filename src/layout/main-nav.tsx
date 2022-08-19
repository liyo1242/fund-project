import Link from 'next/link'
import classes from './main-nav.module.css'

const navLinks = [
  {
    path: '/',
    text: 'Main',
  },
]

function MainNav(props: { activePath: string }) {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          {navLinks.map((navLink) => (
            <li
              className={props.activePath === navLink.path ? classes.linkActive : ''}
              key={navLink.path}
            >
              <Link href={navLink.path}>{navLink.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default MainNav
