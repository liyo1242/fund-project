/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import React from 'react'
import FundraisingList from '../feature/fundraisingList'
import { getDeployedFundraising } from '../lib'

const Home: NextPage<{ lists: Array<string> }> = (props) => (
  <>
    <FundraisingList lists={props.lists} />
  </>
)

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const lists = await getDeployedFundraising()
  return {
    props: {
      lists,
    },
  }
}
