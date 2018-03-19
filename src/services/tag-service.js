import { StorageService } from "./storage";

export class TagListService {
  static get() {
    return StorageService.get("tagList");
  }

  static set(value) {
    return StorageService.set("tagList", value);
  }
}
