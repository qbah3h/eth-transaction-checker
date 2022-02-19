const TransactionChecker = require("./utils/transactionChecker");
async function init() {
    try {
        console.log('Starting the app')
        console.log('----------------------------START-----------------------------------')

        //hardcoded wallet to check
        let txChecker = new TransactionChecker('0xDf1d7f38f2b5c8D74E4404732BECDc0086Ff7A90');
        txChecker.subscribe('pendingTransactions');
        txChecker.watchTransactions()

        console.log('-----------------------------Delegating the app to the transaction checker----------------------------------')
    } catch (error) {
        console.log(error)
    }
}

init()