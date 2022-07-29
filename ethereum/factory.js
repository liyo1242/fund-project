import web3 from './web3'
import FundraisingFactory from '../ethereum/build/FundraisingFactory.json'

const instance = new web3.eth.Contract(
  FundraisingFactory.abi,
  '0x355Afd48D4C62d43cea3f8e2202B42B71B29cA8c'
)

export default instance
