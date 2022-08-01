import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Card, Button } from 'antd'
import { useRouter } from 'next/router'

interface FundraisingRequestListProps {
  requests: Array<Array<[string, string]>>
}

const FundraisingRequestList = (props: PropsWithChildren<FundraisingRequestListProps>) => {
  const router = useRouter()
  const { address = '' } = router.query
  return (
    <>
      <div>
        <h2>Fundraising Request List</h2>
        <Link href={`/fundraising/${address}/requests/new`}>
          <Button type="primary">
            <p>Add New Fundraising Request</p>
          </Button>
        </Link>
      </div>
      <div>
        {props.requests.map((request) => (
          <Card key={request[0][1]} title={request[0][1]}>
            {request.map(([key, val]) => (
              <p key={key}>
                {key}: {val}
              </p>
            ))}
          </Card>
        ))}
      </div>
    </>
  )
}

export default FundraisingRequestList
