import web3 from './web3'
import FundraisingFactory from '../ethereum/build/FundraisingFactory.json'
import AddressInstance from '../ethereum/ADDRESS.json'

const instance = new web3.eth.Contract(FundraisingFactory.abi, AddressInstance.address)

export default instance
