import { Card } from 'antd'
import { useRouter } from 'next/router'
import type { PropsWithChildren } from 'react'

const FundraisingDetail = (props: PropsWithChildren<{ detail: Array<[string, string]> }>) => {
  const router = useRouter()
  const { address = '' } = router.query
  return (
    <>
      <div>
        {props.detail.map((item, ind) => {
          if (ind !== 2) {
            return (
              <Card key={`${ind}-${item[0]}`} title={item[0]} bordered={false}>
                <p>{item[1]}</p>
              </Card>
            )
          } else {
            return (
              <Card
                key={`${ind}-${item[0]}`}
                title={item[0]}
                extra={<a href={`/fundraising/${address}/requests`}>More</a>}
                bordered={false}
              >
                <p>{item[1]}</p>
              </Card>
            )
          }
        })}
      </div>
    </>
  )
}
export default FundraisingDetail
