import web3 from './web3'
import Fundraising from '../ethereum/build/Fundraising.json'

const getFundraisingInstance = (address) => new web3.eth.Contract(Fundraising.abi, address)

export default getFundraisingInstance
