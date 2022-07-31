import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

const useFundraising = () => {
  const createFundraising = async (minimumFund: number) => {
    const accounts = await web3.eth.getAccounts()
    await factory.methods.createFundraising(minimumFund).send({
      from: accounts[0],
    })
  }

  return {
    createFundraising,
  }
}

export default useFundraising
