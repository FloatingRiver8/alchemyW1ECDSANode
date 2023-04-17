const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1")


app.use(cors());
app.use(express.json());

const balances = { //addresses
  "9afe333ae67734999ef5752c17e711159da69e1350cf63712f0eefba378380d7": 100,//dan
  "a2566972c823b184a733def146993a0ba5a7c8621c6c2f15a9956f5877dd82ec": 50,//al
  "227346684ab50508e94661a092049425092c9a2377c58ad6a16242a5a6fdf786": 75,//ben
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, mssg, recoveryBit, recipient, amount } = req.body;
   const recoveredKey = secp.recoverPublicKey(sender)

 


console.log("sender", sender)
console.log("recoveredKey", recoveredKey)

  setInitialBalance(recoveredKey);
  setInitialBalance(recipient);

  if (balances[recoveredKey] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[recoveredKey] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[recoveredKey] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
