const Web3 = require('web3');
const config = require("../config/connection");

class TransactionChecker {
    web3;
    web3ws;
    account;
    subscription;

    constructor(account) {
        this.web3ws = new Web3(new Web3.providers.WebsocketProvider(config.bsc_node_ws));
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.bsc_node));
        this.account = account.toLowerCase();
    }

    subscribe(topic) {
        this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
            if (err) console.error(err);
        });
    }

    watchTransactions() {
        console.log('Watching all pending transactions...');
        this.subscription.on('data', (txHash) => {
            setTimeout(async () => {
                try {
                    let tx = await this.web3.eth.getTransaction(txHash);
                    if ((tx != null) && (tx != '')) {
                        if ((tx.to != null) && (this.account == tx.to.toLowerCase())) {
                            console.log('---------------------------HERE------------------------------------')
                            console.log({from: tx.from, to: this.account, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                            this.subscription.unsubscribe(function (error, success) {
                                if (success) {
                                    console.log('Successfully unsubscribed!');
                                }
                            });
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }, 60000)
        });
    }
}

module.exports = TransactionChecker