import web3 from './web3'
import FundraisingFactory from '../ethereum/build/FundraisingFactory.json'

const instance = new web3.eth.Contract(
  FundraisingFactory.abi,
  '0xD9d93B2aCFb3B9d0CC7A4e3A39c357F60FECAe3E'
)

export default instance
