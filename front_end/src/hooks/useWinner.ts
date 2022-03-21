import { useContractFunction, useEthers, useContractCall } from "@usedapp/core"
import Lottery from "../chian-info/contracts/Lottery.json"
import networkMapping from "../chian-info/deployments/map.json";
import { constants , utils } from "ethers";
import { Contract } from "@ethersproject/contracts" 

export const useWinner = () => {
    const {chainId , error} = useEthers()
    const { abi } = Lottery
    const LotteryAddress = chainId ? networkMapping["4"]["Lottery"][0] : constants.AddressZero
    const LotteryInterface = new utils.Interface(abi)
    const LotteryContract = new Contract(LotteryAddress, LotteryInterface)


   // const { state , send : amount } = useContractFunction(LotteryContract, "enter" , {})

   // console.log(state.status)
   /// if (state.status === "Success"){
   // amount({ value: utils.parseEther("0.00005") })

    //}
      

    
    

    //const approveAndStake = ( amount: string ) => {
       //return approvedErc20Send(LotteryAddress)
    //}

    
    const [fee]: any = useContractCall({
    abi: LotteryInterface,
    address: LotteryAddress,
    method: "recentWinner",
    args: [],
        }) ?? [];
    return fee;

    



}