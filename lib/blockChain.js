'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _block = require('./block.js');

var _block2 = _interopRequireDefault(_block);

var _transaction = require('./transaction.js');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlockChain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;

		//在区块产生之间存储交易
		this.pendingTransactions = [];

		//挖矿汇报
		this.miningReward = 100;
	}

	//创建初始区块
	createGenesisBlock() {
		return new _block2.default(Date.parse('2018-03-18'), [], '0');
	}

	//获取区块链最后一个区块
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	//创建交易
	createTransaction(transaction) {
		//校验

		//推入待处理交易
		this.pendingTransactions.push(transaction);
	}

	/* 挖矿
  * @param miningRewardAddress:钱包地址
  */
	minePendingTransactions(miningRewardAddress) {
		//用所有待交易来创建新的区块并且开挖
		let block = new _block2.default(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log('Block successfully mined!');

		//将新挖的矿加入到链上
		this.chain.push(block);

		//重置待处理交易列表，并且发送奖励
		//发送的奖励也是需要等待处理的
		this.pendingTransactions = [new _transaction2.default(null, miningRewardAddress, this.miningReward)];
	}

	//检测地址余额
	getBalanceOfAddress(address) {
		let balance = 0;

		//遍历每个区块以及每个区块内的交易
		for (const block of this.chain) {
			for (const item of block.transaction) {
				if (item.fromAddress === address) {
					//如果是发起方，减少余额
					balance -= item.amount;
				}

				if (item.toAddress === address) {
					//如果是接收方，增加余额
					balance += item.amount;
				}
			}
		}

		return balance;
	}

	//校验区块链是否被篡改过
	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}

		return true;
	}

	showBlockChain() {
		return this.chain;
	}
}

exports.default = BlockChain;