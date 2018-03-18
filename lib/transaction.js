"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
//交易类
class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}
}
exports.default = Transaction;