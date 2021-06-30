import "./App.css";
import React from "react";
import Dapp from "./Dapp";
import { useContract } from "web3-hooks";
import { SmartStringAddress, SmartStringAbi } from "./contracts/SmartString";

export const SmartStringContext = React.createContext(null);

function App() {
  const SMS = useContract(SmartStringAddress, SmartStringAbi);

  return (
    <SmartStringContext.Provider value={SMS}>
        <Dapp />
    </SmartStringContext.Provider>
  );
}

export default App;