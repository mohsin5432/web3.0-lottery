import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DAppProvider, ChainId } from '@usedapp/core';
import { Header } from "./components/Header";
import { Container } from "@material-ui/core";
import { Main } from "./components/Main";
import { makeStyles } from "@material-ui/core"
import background from "./background.jpg"
import { Footer } from "./components/Footer"
import { Different } from "./components/defferent"



function App() {
  
  return (
    <DAppProvider config={{
      supportedChains : [ChainId.Rinkeby],
      notifications: {
        expirationPeriod: 5000,
        checkInterval: 1000
      }
    }}>
        <Header />
        <div className='main' >
        <Container maxWidth="md"  >
           <Main />
        </Container>
        </div>
        <Different/>
    </DAppProvider>
  );
}

export default App;
