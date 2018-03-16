import { StorageService } from "./storage";

export class TagListService {
  get() {
    return StorageService.get("tagList");
  }

  set(value) {
    return StorageService.set("tagList", value);
  }
}
