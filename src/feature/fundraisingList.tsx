import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Card, Button, PageHeader } from 'antd'

import classes from './fundraisingList.module.css'

interface FundraisingListProps {
  lists: Array<string>
}

const FundraisingList = (props: PropsWithChildren<FundraisingListProps>) => (
  <>
    <PageHeader
      title="Fundraising List"
      extra={[
        <Link key="1" href={`/fundraising/new`}>
          <Button type="primary">
            <p>Add New Fundraising</p>
          </Button>
        </Link>,
      ]}
    />
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
