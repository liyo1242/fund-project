import { useEffect, useState } from 'react'
import factory from '../../ethereum/factory'
import getFundraisingInstance from '../../ethereum/fundraising'
import web3 from '../../ethereum/web3'

const useFundraising = () => {
  const [currentAccount, setCurrentAccount] = useState('')

  useEffect(() => {
    getCurrentAccount()
  })

  const getCurrentAccount = async () => {
    const accounts = await web3.eth.getAccounts()
    setCurrentAccount(accounts[0])
  }

  const createFundraising = async (minimumFund: number) => {
    await factory.methods.createFundraising(minimumFund).send({
      from: currentAccount,
    })
  }

  const createFundraisingRequest =
    (address: string) => async (description: string, value: string, recipient: string) => {
      await getFundraisingInstance(address)
        .methods.createRequest(description, value, recipient)
        .send({
          from: currentAccount,
        })
    }

  const investFundraisingByAddress = (address: string) => async (value: number) => {
    const fundraisingInstance = getFundraisingInstance(address)
    await fundraisingInstance.methods.invest().send({
      value,
      from: currentAccount,
    })
  }

  const approveFundraisingRequestByAddress = (address: string) => async (index: number) => {
    const fundraisingInstance = getFundraisingInstance(address)
    await fundraisingInstance.methods.approveRequest(index).send({
      from: currentAccount,
    })
  }

  const completeFundraisingRequestByAddress = (address: string) => async (index: number) => {
    const fundraisingInstance = getFundraisingInstance(address)
    await fundraisingInstance.methods.finishRequest(index).send({
      from: currentAccount,
    })
  }

  return {
    createFundraising,
    createFundraisingRequest,
    investFundraisingByAddress,
    approveFundraisingRequestByAddress,
    completeFundraisingRequestByAddress,
    currentAccount,
  }
}

export default useFundraising
