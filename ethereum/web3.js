import Web3 from 'web3'
let web3
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  window.ethereum.request({ method: 'eth_requestAccounts' })
  web3 = new Web3(window.ethereum)
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/643a7cfd793f441d9fabaa6e33bc4253'
  )
  web3 = new Web3(provider)
}

export default web3
