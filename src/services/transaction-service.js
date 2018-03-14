import { StorageService } from "./storage";

///try another way
export class TransactionListService {
  constructor(props) {
    this.props = props;
  }
  get() {
    console.log(StorageService.get("transactionList"));
    StorageService.get("transactionList").then(
      list => {
        this.props.returnList(list);
      },
      error => console.error(`get transactions: ${error.message}`)
    );
  }

  /// use promise???
  set(value) {
    StorageService.set("transactionList", value);
  }
}
