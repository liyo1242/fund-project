/* eslint-disable react/prop-types */
import type { NextPage, GetStaticPropsContext } from 'next'
import type { FundraisingRequests } from '../../../../lib'
import { getDeployedFundraising, getFundraisingRequestByAddress } from '../../../../lib'
import FundraisingRequestList from '../../../../feature/fundraisingRequestList'

const FundraisingRequest: NextPage<{ requests: FundraisingRequests }> = (props) => (
  <>
    <FundraisingRequestList requests={props.requests} />
  </>
)

export default FundraisingRequest

export const getStaticPaths = async () => {
  const addresses: Array<string> = await getDeployedFundraising()

  return {
    paths: addresses.map((address) => ({ params: { address } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ address: string }>) => {
  const { params } = context
  const { address = '' } = params || {}
  const getFundraisingRequest = getFundraisingRequestByAddress(address)
  const result = await getFundraisingRequest()

  return {
    props: {
      requests: result,
    },
  }
}
