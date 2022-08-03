/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './ethereum/.env' })
const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('../ethereum/build/FundraisingFactory.json')
const fs = require('fs-extra')
const path = require('path')

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.RINKEBY_ADDRESS)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1800000', from: accounts[0] })

  console.log('success deploy contract to rinkby', result.options.address)

  fs.removeSync(path.resolve(__dirname, 'ADDRESS'))

  fs.outputJSONSync(path.resolve(__dirname, 'ADDRESS'), result.options.address)
}

deploy()
