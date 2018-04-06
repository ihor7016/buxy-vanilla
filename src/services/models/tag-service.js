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

  static del(tag) {
    return this.get().then(tags => {
      const updatedTags = tags.filter(elem => elem !== tag);
      this.set(updatedTags);
    });
  }

  static update(oldTag, newTag) {
    return this.get().then(tags => {
      const updatedTags = tags.map(elem => {
        if (elem === oldTag) {
          return newTag;
        } else {
          return elem;
        }
      });
      this.set(updatedTags);
    });
  }

  static get() {
    return StorageService.get("tagList");
  }

  static set(value) {
    return StorageService.set("tagList", value);
  }
}
