require("dotenv").config();
const API_URL = process.env.ALCHEMY_URL;
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATe_KEY = process.env.PRIVATe_KEY;

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

const contractAddress = "0xA5E9ebB52A77fE648707F66Cc84A13115A68b27F";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


// Created transaction
async function minNFT(tokenURL) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURL).encodeABI()
    };

    // Sign Transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATe_KEY);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {
                if (!err) {
                    console.log("The hash of your transatction is ",
                        hash,
                        " Check alchemy Mempool to view status of your transaction"
                    )
                } else {
                    console.log("Error occured: ", err)
                }
            }
        )
    }).catch((err) => {
        console.log("Prmise failed: ", err)
    })
}

minNFT("https://gateway.pinata.cloud/ipfs/QmWTdn6BKbt8BvVhNJNoQ9FY1ZvNVHJXEod89xbnVQZREZ");





