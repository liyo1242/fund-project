import type { NextPage, GetStaticPropsContext } from 'next'
import getFundraisingInstance from '../../../../ethereum/fundraising'
// import FundraisingDetail from '../../../feature/fundraisingList'

const FundraisingIndex: NextPage<{ detail: Array<string> }> = () => (
  <>{/* <FundraisingDetail detail={props.detail} /> */}</>
)

export default FundraisingIndex

export const getStaticProps = async (context: GetStaticPropsContext<{ address: string }>) => {
  const { params } = context
  const { address = '' } = params || {}
  const fundraisingDetail = await getFundraisingInstance(address).methods.getSummary().call()
  return {
    props: {
      detail: fundraisingDetail,
    },
  }
}
