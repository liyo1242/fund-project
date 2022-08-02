import factory from '../../ethereum/factory'
import getFundraisingInstance from '../../ethereum/fundraising'

export type UnPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export const getDeployedFundraising = async () => {
  const lists = await factory.methods.getDeployedFundraising().call()
  return lists as Array<string>
}

export type FundraisingSummary = UnPromise<
  ReturnType<ReturnType<typeof getFundraisingSummaryByAddress>>
>

export const getFundraisingSummaryByAddress = (address: string) => async () => {
  const fundraisingInstance = getFundraisingInstance(address)
  const summary = await fundraisingInstance.methods.getSummary().call()

  return {
    title: summary[0] as string,
    minContribution: +summary[1],
    amount: +summary[2],
    requestQuantity: +summary[3],
    investorQuantity: +summary[4],
    manager: summary[5] as string,
  }
}

export type FundraisingRequests = UnPromise<
  ReturnType<ReturnType<typeof getFundraisingRequestByAddress>>
>

export const getFundraisingRequestByAddress = (address: string) => async () => {
  const fundraisingInstance = getFundraisingInstance(address)
  const requestQuantity = Number(await fundraisingInstance.methods.numRequests().call())
  const investorQuantity = Number(await fundraisingInstance.methods.investorCount().call())
  const requests = await Promise.all(
    Array.from(Array(requestQuantity).keys()).map((index) =>
      fundraisingInstance.methods.requests(index).call()
    )
  )
  return requests.map((request) => ({
    title: request[0] as string,
    cost: +request[1],
    isComplete: !!request[2],
    recipient: request[3] as string,
    approve: +request[4],
    investorQuantity: investorQuantity,
  }))
}
