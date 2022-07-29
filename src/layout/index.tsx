import type { PropsWithChildren } from 'react'
import { Fragment } from 'react'
import MainNav from './main-nav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Layout(props: PropsWithChildren) {
  const router = useRouter()

  const [activePath, setActivePath] = useState('')

  useEffect(() => {
    setActivePath('/' + (router.pathname.split('/')[1] || ''))
  }, [router.pathname])

  return (
    <Fragment>
      <MainNav activePath={activePath}></MainNav>
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
