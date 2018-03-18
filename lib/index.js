'use strict';

var _block = require('./block.js');

var _block2 = _interopRequireDefault(_block);

var _transaction = require('./transaction.js');

var _transaction2 = _interopRequireDefault(_transaction);

var _blockChain = require('./blockChain.js');

var _blockChain2 = _interopRequireDefault(_blockChain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//初始化
let myCoin = new _blockChain2.default();

console.log('Creating some transactions...');
myCoin.createTransaction(new _transaction2.default('address1', 'address2', 100));
myCoin.createTransaction(new _transaction2.default('address2', 'address1', 50));

console.log('Starting the miner...');
myCoin.minePendingTransactions('minChou-address');

console.log('Balance of minChou address is ', myCoin.getBalanceOfAddress('minChou-address'));

console.log('Starting the miner again...');
myCoin.minePendingTransactions('minChou-address');
console.log('Balance of minChou address is ', myCoin.getBalanceOfAddress('minChou-address'));