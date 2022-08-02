import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Card, Button } from 'antd'
import { useRouter } from 'next/router'
import type { FundraisingRequests } from '../lib'
import useFundraising from '../hook/useFundraising'

interface FundraisingRequestListProps {
  requests: FundraisingRequests
}

const FundraisingRequestList = (props: PropsWithChildren<FundraisingRequestListProps>) => {
  const router = useRouter()
  const { address = '' } = router.query
  const { completeFundraisingRequestByAddress, approveFundraisingRequestByAddress } =
    useFundraising()

  const handleApprove = async (index: number) => {
    const approveFundraisingRequest = approveFundraisingRequestByAddress(address)
    await approveFundraisingRequest(index)
    router.reload()
  }

  const handleComplete = async (index: number) => {
    const completeFundraisingRequest = completeFundraisingRequestByAddress(address)
    await completeFundraisingRequest(index)
    router.reload()
  }

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
        {props.requests.map((request, ind) => (
          <Card key={request.title} title={request.title} bordered={false}>
            <Card title="cost">
              <p>{request.cost}</p>
            </Card>
            <Card
              title="isComplete"
              extra={
                !request.isComplete && request.approve > request.investorQuantity / 2 ? (
                  <Button onClick={() => handleComplete(ind)} type="primary">
                    Complete
                  </Button>
                ) : null
              }
            >
              <p>{request.isComplete ? 'Yes' : 'No'}</p>
            </Card>
            <Card title="recipient">
              <p>{request.recipient}</p>
            </Card>
            <Card
              title="approve"
              extra={
                <Button onClick={() => handleApprove(ind)} type="primary">
                  Approve
                </Button>
              }
            >
              <p>{request.approve}</p>
            </Card>
          </Card>
        ))}
      </div>
    </>
  )
}

export default FundraisingRequestList
