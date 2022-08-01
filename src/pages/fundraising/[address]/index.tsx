/* eslint-disable react/prop-types */
import type { NextPage, GetStaticPropsContext } from 'next'
import getFundraisingInstance from '../../../../ethereum/fundraising'
import factory from '../../../../ethereum/factory'
import FundraisingDetail from '../../../feature/fundraisingDetail'

const FundraisingIndex: NextPage<{ detail: Array<[string, string]> }> = (props) => (
  <>
    <FundraisingDetail detail={props.detail} />
  </>
)

export default FundraisingIndex

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
  const keys = ['minimumFundRaising', 'addressBalance', 'numRequests', 'investorCount', 'manager']
  const result = Object.values(fundraisingDetail).map((val, ind) => [keys[ind], val])
  return {
    props: {
      detail: result,
    },
  }
}
