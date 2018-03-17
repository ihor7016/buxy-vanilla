import { StorageService } from "./storage";

export class TagService {
  static get() {
    return StorageService.get("tags");
  }

  static set(tags) {
    StorageService.set("tags", tags);
  }
}
