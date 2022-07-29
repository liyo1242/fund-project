/* eslint-disable react/prop-types */
import type { NextPage, GetStaticProps } from 'next'
import React from 'react'
import factory from '../../ethereum/factory'
import { Card } from 'antd'

const Home: NextPage<{ lists: Array<string> }> = (props) => (
  <>
    <p>Hello World!!</p>
    {props.lists.map((list) => (
      <Card key={list} style={{ width: 300 }}>
        <p>{list}</p>
      </Card>
    ))}
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
