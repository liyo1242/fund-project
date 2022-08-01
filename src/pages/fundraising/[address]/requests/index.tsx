/* eslint-disable react/prop-types */
import type { NextPage, GetStaticPropsContext } from 'next'
import getFundraisingInstance from '../../../../../ethereum/fundraising'
import factory from '../../../../../ethereum/factory'
import FundraisingRequestList from '../../../../feature/fundraisingRequestList'

const FundraisingRequest: NextPage<{ requests: Array<Array<[string, string]>> }> = (props) => (
  <>
    <FundraisingRequestList requests={props.requests} />
  </>
)

export default FundraisingRequest

export const getStaticPaths = async () => {
  const addresses: Array<string> = await factory.methods.getDeployedFundraising().call()

  return {
    paths: addresses.map((address) => ({ params: { address } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ address: string }>) => {
  const { params } = context
  const { address = '' } = params || {}
  const fundraisingDetail = await getFundraisingInstance(address).methods.getSummary().call()
  const requestCount: number = +fundraisingDetail[2]

  const requests = await Promise.all(
    Array.from(Array(requestCount).keys()).map((ind) =>
      getFundraisingInstance(address).methods.requests(ind).call()
    )
  )

  const result = requests.map((request) => {
    const keys = ['description', 'costOfRequest', 'isComplete:', 'recipient', 'approverCount']
    return keys.map((val, ind) => [val, request[ind]])
  })

  return {
    props: {
      requests: result,
    },
  }
}
