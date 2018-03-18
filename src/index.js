import Block from './block.js';
import Transaction from './transaction.js';
import BlockChain from './blockChain.js';

//初始化
let myCoin = new BlockChain();

console.log('Creating some transactions...');
myCoin.createTransaction(new Transaction('address1', 'address2', 100));
myCoin.createTransaction(new Transaction('address2', 'address1', 50));

console.log('Starting the miner...');
myCoin.minePendingTransactions('minChou-address');

console.log('Balance of minChou address is ', myCoin.getBalanceOfAddress('minChou-address'));

console.log('Starting the miner again...');
myCoin.minePendingTransactions('minChou-address');
console.log('Balance of minChou address is ', myCoin.getBalanceOfAddress('minChou-address'));