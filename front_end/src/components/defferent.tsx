import { Button , makeStyles  } from "@material-ui/core";
import chainlink  from "../chainlink.png"
import { useWinner } from "../hooks/useWinner"

const useStyles = makeStyles((theme) => ({
    container:{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        color: "black",
        padding: theme.spacing(2),
        display: "flex",
        margin: "30px",
        justifyContent: "space-around",
        gap : theme.spacing(1)
    },
    heading:{
        textAlign: "center",
        fontSize: "50px" 
    },
    tokenImg:{
        width: "250px"
    },
    button:{
        width: "210px",
        marginTop: "20px",
        backgroundColor: "#FF8C4E",
        '&:hover': {
            background: "#FF6411",
         },
    }
}))

export const Different = () => {

    const classes = useStyles()

    var recentwinner = "{ Connect Your Wallet First }"
    const winner  = useWinner()
    if (typeof winner != "undefined"){ 
        console.log(winner)
        recentwinner = winner.toString()
    }

    return ( 

        <div>
            <div>
            <h1 className={classes.heading}> Recent Winners </h1>
            <h1 style={{textAlign: "center"}} > {recentwinner} </h1>
                
            </div>



             <h1 className={classes.heading}> How it's differnet ? </h1> 
        
        <div className={classes.container} >  
        <div style={{ width: "50%", fontSize:"20px" }}>
            <p> Our lottery is different from others Because every time a new request for random winner outcome pops up, the Chainlink VRF creates a random number and proof that is cryptographic in nature, stating the determination of the number. 
                The proof generated is then verified and published on-chain before it gets utilized by other consuming applications. This proof generation process ensures that the data cannot be tampered with or altered by anyone for their benefit. 
                With Verifiable Random Function (VRF) assistance, developers creating smart contracts can develop different games with more security with the assistance of a source of randomness that is verified on-chain. 
                This also allows the developers to give added proof to the security-sensitive users.</p>
        </div>
        <img className={classes.tokenImg} src={chainlink} alt="" />
        </div>

        </div>
    )
}