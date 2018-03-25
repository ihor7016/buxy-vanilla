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

  static del(index) {
    return this.get().then(tags => {
      tags.splice(index, 1);
      this.set(tags);
    });
  }

  static get() {
    return StorageService.get("tagList");
  }

  static set(value) {
    return StorageService.set("tagList", value);
  }
}
