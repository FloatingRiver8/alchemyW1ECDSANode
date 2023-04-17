const secp = require("ethereum-cryptography/secp256k1");  
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } =  require("ethereum-cryptography/keccak")


 const privateKey = toHex(secp.utils.randomPrivateKey()); // returns a Uint8Array
const publicKey = secp.getPublicKey(privateKey)

//address from publicKey
//taking out first byte that indicates if its compress or not and then getting the last 20 bytes, then hashing the key with keccak
const myAddress = toHex(keccak256(publicKey.slice(1).slice(-20)))


console.log(`private key: ${privateKey}`)
console.log(`myAddress: ${myAddress}`)

//1 Dan
/* private key: df3928d7f5756f9a330b830f00321b858d60cea1e631c99e80bc13bb331818cb
myAddress: 9afe333ae67734999ef5752c17e711159da69e1350cf63712f0eefba378380d7
 */

//2 Al
/* private key: 9fd3db61eb232af03f9d0827a32f9ba14f9f4a9ff8f142708fd6a8abe92a3498
myAddress: a2566972c823b184a733def146993a0ba5a7c8621c6c2f15a9956f5877dd82ec */

//3 Ben
/* private key: e0542f9e6a9054d53825a0caa77b60b0a2fb333f467dcf518329421aa7766adb
myAddress: 227346684ab50508e94661a092049425092c9a2377c58ad6a16242a5a6fdf786 */