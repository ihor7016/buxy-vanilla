export class Transaction {
  constructor(type, date, amount, desc, tag, account) {
    this.type = type;
    this.date = date;
    this.amount = amount;
    this.desc = desc;
    this.tag = tag;
    this.account = account;
  }
}
