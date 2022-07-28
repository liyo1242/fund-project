const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') // construct func
const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/FundraisingFactory.json')
const compiledFundraising = require('../ethereum/build/Fundraising.json')

let accounts
let factory
let fundraisingAddress
let fundraising

beforeEach(async () => {
  // * get a list of ganache test account
  accounts = await web3.eth.getAccounts()

  // * use test account register factory contract

  // ? why my contract require at least 1500000 gas ?? 
  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({
      from: accounts[0],
      gas: '1500000'
    })

  await factory.methods.createFundraising('100').send({
    from: accounts[0],
    gas: '1500000'
  })

  // * use factory contract to construct main contract
  const addresses = await factory.methods.getDeployedFundraising().call()
  fundraisingAddress = addresses[0]

  fundraising= await new web3.eth.Contract(
    compiledFundraising.abi,
    fundraisingAddress
  )
})

describe('Fundraising', () => {
  it('deploy factory & fundraising', () => {
    assert.ok(factory.options.address)
    assert.ok(fundraising.options.address)
  })

  it('factory caller is fundraising manager', async () => {
    const manager = await fundraising.methods.manager().call()
    assert.equal(manager, accounts[0])
  })

  it('allow investor enter to share ether', async () => {
    await fundraising.methods.invest().send({
      value: '200',
      from: accounts[1]
    })
    await fundraising.methods.invest().send({
      value: '300',
      from: accounts[2]
    })
    const isAccount1Investor = await fundraising.methods.investors(accounts[1]).call()
    const isAccount2Investor = await fundraising.methods.investors(accounts[2]).call()
    const isAccount3Investor = await fundraising.methods.investors(accounts[3]).call()
    assert.ok(isAccount1Investor)
    assert.ok(isAccount2Investor)
    assert.ok(!isAccount3Investor)
  })

  it('required minimum fund', async () => {
    try {
      await fundraising.methods.invest().send({
        value: '50',
        from: accounts[1]
      })
      assert(false)
    } catch (err){
      assert(err)
    }
  })

  it('manager can create request', async () => {
    const reqDesc = 'buy something'
    await fundraising.methods.createRequest(reqDesc, '100', accounts[1])
    .send({
      from: accounts[0],
      gas: '1500000'
    })

    const request = await fundraising.methods.requests(0).call()
    assert.equal(reqDesc, request.description)
  })

  it('processes request', async () => {
    await fundraising.methods.invest().send({
      value: web3.utils.toWei('10', 'ether'),
      from: accounts[1]
    })

    await fundraising.methods.createRequest('buy something', web3.utils.toWei('5', 'ether'), accounts[2])
    .send({
      from: accounts[0],
      gas: '1500000'
    })

    await fundraising.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1500000'
    })

    await fundraising.methods.finishRequest(0).send({
      from: accounts[0],
      gas: '1500000'
    })

    let balance = await web3.eth.getBalance(accounts[2])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    console.log(balance)
    // * it's close to 105 (actual is 104.9999)
    assert(balance > 104)
  })
})