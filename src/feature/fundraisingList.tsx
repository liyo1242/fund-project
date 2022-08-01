import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Card, Button } from 'antd'

import classes from './fundraisingList.module.css'

interface FundraisingListProps {
  lists: Array<string>
}

const FundraisingList = (props: PropsWithChildren<FundraisingListProps>) => (
  <>
    <div className={classes.header}>
      <h2>Fundraising List</h2>
      <Link href={`/fundraising/new`}>
        <Button type="primary">
          <p>Add New Fundraising</p>
        </Button>
      </Link>
    </div>
    <div className={classes.content}>
      {props.lists.map((list) => (
        <Link key={list} href={`/fundraising/${list}`}>
          <Card>
            <p>{list}</p>
          </Card>
        </Link>
      ))}
    </div>
  </>
)

export default FundraisingList
