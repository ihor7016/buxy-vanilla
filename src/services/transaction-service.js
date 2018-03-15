import { StorageService } from "./storage";

///need a review
export class TransactionListService {
  constructor(props) {
    this.props = props;
  }
  get() {
    StorageService.get("transactionList").then(
      list => {
        this.props.returnList(list);
      },
      error => console.error(`get transactions: ${error.message}`)
    );
  }

  set(value) {
    StorageService.set("transactionList", value).catch(error =>
      console.error(`set transactions: ${error.message}`)
    );
  }
}
