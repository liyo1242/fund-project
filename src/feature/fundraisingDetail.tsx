import { Card, Button } from 'antd'
import Input from 'antd/lib/input/Input'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { PropsWithChildren, useState } from 'react'
import type { FundraisingSummary } from '../lib'
import useFundraising from '../hook/useFundraising'

const FundraisingDetail = (props: PropsWithChildren<{ detail: FundraisingSummary }>) => {
  const router = useRouter()
  const { address = '' } = router.query
  const [valueForInvest, setValueForInvest] = useState(0)
  const { investFundraisingByAddress } = useFundraising()

  const handleInvest = async () => {
    const investFundraising = investFundraisingByAddress(address as string)
    await investFundraising(valueForInvest)
    setValueForInvest(0)
    alert('Invest Success')
    router.reload()
  }

  return (
    <>
      <div>
        <Card
          bordered={false}
          title={props.detail.title}
          extra={
            <>
              <Button onClick={handleInvest} type="primary">
                Invest
              </Button>
              <Input
                value={valueForInvest}
                onChange={(event) => setValueForInvest(+event.target.value)}
                addonAfter={<span>wei</span>}
              ></Input>
            </>
          }
        >
          <Card title="minContribution">
            <p>{props.detail.minContribution}</p>
          </Card>
          <Card title="amount">
            <p>{props.detail.amount}</p>
          </Card>
          <Card
            title="requestQuantity"
            extra={<a href={`/fundraising/${address}/requests`}>More</a>}
          >
            <p>{props.detail.requestQuantity}</p>
            <Link href={`/fundraising/${address}/requests/new`}>
              <Button type="primary">
                <p>Add New Fundraising Request</p>
              </Button>
            </Link>
          </Card>
          <Card title="investorQuantity">
            <p>{props.detail.investorQuantity}</p>
          </Card>
          <Card title="manager">
            <p>{props.detail.manager}</p>
          </Card>
        </Card>
      </div>
    </>
  )
}
export default FundraisingDetail
