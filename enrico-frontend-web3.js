// SCEGLI BLOCKCHAIN

// SEZIONE ETHEREUM

/*const web3 = new Web3("https://cloudflare-eth.com"); // RETE ETHEREUM
var cntractTokenAddr = "0xc5bddf9843308380375a611c18b50fb9341f502a"; //yiernfinance
var cntractTokenName = "yveCRV";
var rete = "ETHEREUM";
var nomeTknRete = "ETH";
*/
//*******  FIne sezione ethereum

// SEZIONE FANTOM

const web3 = new Web3("https://rpc.ftm.tools/"); // RETE FANTOM
var cntractTokenAddr = "0x321162Cd933E2Be498Cd2267a90534A804051b11"; //(btc su fantom)
var cntractTokenName = "BTC";
var rete = "FANTOM";
var nomeTknRete = "FTM";

//*******  FIne sezione ethereum

var walletAddress;
var balance;

// SEZIONE LETTURA DEI TOKEN ERC20 //
// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

function chiamaBlockchain(inputvalue) {
  //alert("indirizzo " + inputvalue);
  walletAddress = inputvalue;
  if (!walletAddress) {
    alert("inserisci wallet address");
    return;
  }

  $("#indirizzo").empty();
  // legge bilancio e scrive sul frontend il risultato
  web3.eth.getBalance(walletAddress).then((bal) => {
    balance = bal;

    $("#indirizzo").append(`<h3>BLOCKCHAIN ${rete} </h3>`);
    $("#indirizzo").append(`<p>${"wallet: " + walletAddress}</p>`);
    $("#indirizzo").append(
      `<p>${nomeTknRete + ": " + (balance / 10 ** 18).toFixed(6)}</p>`
    );

    getBalance(cntractTokenAddr); //cerca token
  });
}

async function getBalance(tokenAddress) {
  var contractNumeraire = new web3.eth.Contract(minABI, tokenAddress);
  var result = await contractNumeraire.methods.balanceOf(walletAddress).call();
  var format = web3.utils.fromWei(result);
  $("#indirizzo").append(
    `<p>${"Token: " + cntractTokenName + " Quantita " + format}</p>`
  );
  console.log(format);
}

// legge il blocco corrente su rete ethereum
web3.eth.getBlockNumber(function (error, result) {
  console.log("Bolocco numero: " + result);
});
