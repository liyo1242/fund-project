import factory from '../../ethereum/factory'
import getFundraisingInstance from '../../ethereum/fundraising'
import web3 from '../../ethereum/web3'

const useFundraising = () => {
  const createFundraising = async (minimumFund: number) => {
    const accounts = await web3.eth.getAccounts()
    await factory.methods.createFundraising(minimumFund).send({
      from: accounts[0],
    })
  }

  const getFundraisingList = async () => {
    const lists = await factory.methods.getDeployedFundraising().call()
    return lists
  }

  const createFundraisingRequest =
    (address: string) => async (description: string, value: string, recipient: string) => {
      const accounts = await web3.eth.getAccounts()
      await getFundraisingInstance(address)
        .methods.createRequest(description, value, recipient)
        .send({
          from: accounts[0],
        })
    }

  return {
    createFundraising,
    getFundraisingList,
    createFundraisingRequest,
  }
}

export default useFundraising
