import { Button , makeStyles  } from "@material-ui/core";
import { useEthers } from "@usedapp/core";

const useStyles = makeStyles((theme) => ({
    container:{
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        color: "black",
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-around",
        gap : theme.spacing(1)
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

export const Header = () => {

    const classes = useStyles()

    const { account , activateBrowserWallet , deactivate } = useEthers()

    const isConnected = account !== undefined

    return ( 
        <div className={classes.container} >  
        <h1>Crypto Lottery</h1> 
        <div>
            {isConnected ? (
                <Button 
                color="secondary"
                variant="contained" 
                onClick={deactivate}
                className={classes.button}>
                    Disconnect
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="contained" 
                    onClick={() => activateBrowserWallet()}
                    className={classes.button}
                >
                   <strong>   Connect MetaMask </strong> 
                </Button>
            )}
        </div>
        </div>
    )
}