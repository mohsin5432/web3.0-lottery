import { Button, Tab ,Box , Input , CircularProgress , Snackbar  } from "@material-ui/core"
import Lottery from "../chian-info/contracts/Lottery.json"
import networkMapping from "../chian-info/deployments/map.json";
import { constants , utils } from "ethers";
import { useContractFunction, useEthers , useContractCall } from "@usedapp/core"
import { Contract } from "@ethersproject/contracts"
import React , { useEffect, useState } from 'react'
import { useLottery } from "../hooks/useLottery"

import { makeStyles } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import Alert from "@material-ui/lab/Alert"

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)",
        borderRadius: "25px",
        height: "200px",
        padding: "50px",
    },
    header: {
        color: "black"
    },
    button: {
        margin: "0",
        left: "50%",
        transform: "translate(-50%)",
        backgroundColor: "#f05ddf",
        '&:hover': {
            background: "#f00",
         },     
    },
    center:{
        textAlign: "center",
        top: "5%",
        color: "white"
    },
    content : {
        paddingTop: "200px"
    }
}))



export const Main = () => {

    const { abi } = Lottery
    const {chainId} = useEthers()
    const LotteryAddress = chainId ? networkMapping["4"]["Lottery"][0] : constants.AddressZero
    const { account } = useEthers()
    const LotteryInterface = new utils.Interface(abi)
    const LotteryContract = new Contract(LotteryAddress, LotteryInterface)
    const [showapproval,setshowapproval] = useState(false)
    //const  [amount , setAmount ] = useState<number | string | Array<number | string >>(0)
    //const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //    const newAmount = event.target.value === "" ? "" : Number(event.target.value)
    //    setAmount(newAmount)
   // }

    
   const { send , state } = useContractFunction(LotteryContract, "enter" , {})

 
   
    const amount = 0.0250
   const amountAsWei = utils.parseEther(amount.toString())
    

    
   


    

   const count = useLottery()
 

    const handleAmountSubmit = () => {
        send({ value: count })
    }
    const isConnected = account !== undefined
    console.log(state.status)
    const isMining = state.status === "Mining" || state.status === "PendingSignature"
    const isapproved = state.status === "Success"
    const classes = useStyles()

    useEffect(() => {
        if (state.status === "Success") {
            setshowapproval(true)
        }
     },[isMining])

     const handleCloseSnack = () => {
        setshowapproval(false)
    }



    return (
        <div>
        <Box className={classes.content}>
            <Box className={classes.box}>
                <h1  className={classes.center} > <strong> Join our Lottery </strong> <br></br>
                    Get a chance to Win 5000$ </h1> 
            {isConnected ? (
            <Button
                onClick={handleAmountSubmit}
                color = "primary"
                variant="contained" 
                size="large"
                className={classes.button}
                disabled={isMining}
            >
           <strong> {isMining ? <CircularProgress size={36} thickness={7} color={"secondary"} /> : "Pay 50$ worth ether to enter" }    </strong>  
            </Button>
             ) : (
                <Button
                onClick={handleAmountSubmit}
                color = "primary"
                variant="contained" 
                size="large"
                className={classes.button}
                disabled={true}
            >
               Connect Your Wallet First
            </Button>
                )} 
            </Box>
        </Box>
        <Snackbar
                open={showapproval}
                autoHideDuration={5000}
                onClose={handleCloseSnack}
                >
                <Alert onClose={handleCloseSnack} severity="success">
                    You have successfully Entered in the List
                </Alert>
        </Snackbar>
        </div>
    )
}