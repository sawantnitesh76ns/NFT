require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
const { ALCHEMY_URL, PRIVATE_KEY, ETHERSCAN_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: ALCHEMY_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  }
};
