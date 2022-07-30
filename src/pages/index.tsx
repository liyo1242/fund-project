/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import React from 'react'
import factory from '../../ethereum/factory'
import FundraisingList from '../feature/fundraisingList'

const Home: NextPage<{ lists: Array<string> }> = (props) => (
  <>
    <FundraisingList lists={props.lists} />
  </>
)

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const lists = await factory.methods.getDeployedFundraising().call()
  return {
    props: {
      lists,
    },
  }
}
