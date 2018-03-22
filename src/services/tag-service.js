import { StorageService } from "./storage";

export class TagListService {
  static add(tag) {
    return this.get().then(tags => {
      if (!tags) {
        this.set([tag]);
      } else {
        let updatedTags = [tag].concat(tags);
        this.set(updatedTags);
      }
    });
  }

  static get() {
    return StorageService.get("tagList");
  }

  static set(value) {
    return StorageService.set("tagList", value);
  }
}
