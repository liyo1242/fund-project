import web3 from './web3'
import FundraisingFactory from '../ethereum/build/FundraisingFactory.json'

const instance = new web3.eth.Contract(
  FundraisingFactory.abi,
  '0x8Ce7Ee21eecFc0a5dB20aC8CcA649010Ced07E89'
)

export default instance
