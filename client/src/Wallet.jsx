import server from "./server";
import * as  secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {

  /*   async function onChange(evt) {
      const address = evt.target.value;
      setAddress(address); */


  async function handleOnchangePk(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    //OBATIN publicKey from privateKey and finaly ADDRESS from publicKey. 
    //All the valid addresses derives from the privateKey
    const publicKey = secp.getPublicKey(privateKey)
    const address = toHex(keccak256(publicKey.slice(1).slice(-20)))
    console.log(address)
    setAddress(address)

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      setBalance(balance);
    } else {
      setBalance(0);
    }

  }



  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>


      <label>
        Private key
        <input placeholder="Type a private key" value={privateKey} onChange={handleOnchangePk}></input>
      </label>
      <label>
        Wallet Address
        <div >{address}</div>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
