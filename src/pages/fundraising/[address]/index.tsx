/* eslint-disable react/prop-types */
import type { NextPage, GetStaticPropsContext } from 'next'
import FundraisingDetail from '../../../feature/fundraisingDetail'
import type { FundraisingSummary } from '../../../lib'
import { getDeployedFundraising, getFundraisingSummaryByAddress } from '../../../lib'

const FundraisingIndex: NextPage<{
  detail: FundraisingSummary
}> = (props) => (
  <>
    <FundraisingDetail detail={props.detail} />
  </>
)

export default FundraisingIndex

export const getStaticPaths = async () => {
  const addresses = await getDeployedFundraising()

  return {
    paths: addresses.map((address) => ({ params: { address } })),
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{ address: string }>) => {
  const { params } = context
  const { address = '' } = params || {}
  const getFundraisingSummary = getFundraisingSummaryByAddress(address)
  const result = await getFundraisingSummary()
  return {
    props: {
      detail: result,
    },
  }
}
