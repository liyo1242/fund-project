import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Card, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import classes from './fundraisingList.module.css'

interface FundraisingListProps {
  lists: Array<string>
}

const FundraisingList = (props: PropsWithChildren<FundraisingListProps>) => (
  <>
    <div className={classes.header}>
      <h2>Fundraising List</h2>
      <Button type="primary" icon={<PlusOutlined />}>
        Add New Fundraising
      </Button>
    </div>
    <div className={classes.content}>
      {props.lists.map((list) => (
        <Card key={list}>
          <Link href={`/fundraising/${list}`}>
            <p>{list}</p>
          </Link>
        </Card>
      ))}
    </div>
  </>
)

export default FundraisingList
