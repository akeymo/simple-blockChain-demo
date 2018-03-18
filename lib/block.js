'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
const SHA256 = require("crypto-js/sha256");

//区块类
class Block {
	constructor(timestamp, transaction) {
		let previousHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

		this.timestamp = timestamp;
		this.transaction = transaction;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transaction) + this.nonce).toString();
	}

	mineBlock(difficulty) {
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log('BLOCK MINED: ', this.hash);
	}
}
exports.default = Block;