const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

// * delete build folder
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

// * read contract
const CONTRACT_FILE = 'Fundraising.sol'

const contractPath = path.resolve(__dirname, 'contracts', CONTRACT_FILE)
const source = fs.readFileSync(contractPath, 'utf8')

// * compile contract to /build folder
const input = {
  language: 'Solidity',
  sources: {
    [CONTRACT_FILE]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)))
fs.ensureDirSync(buildPath)
for (let contractName in output.contracts[CONTRACT_FILE]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contractName + '.json'),
    output.contracts[CONTRACT_FILE][contractName]
  )
}