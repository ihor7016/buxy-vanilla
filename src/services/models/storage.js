export class StorageService {
  static get(name) {
    return new Promise(resolve => {
      const data = localStorage.getItem(name);
      const obj = JSON.parse(data);
      resolve(obj);
    });
  }

  static set(name, obj) {
    return new Promise(resolve => {
      const data = JSON.stringify(obj);
      localStorage.setItem(name, data);
      resolve();
    });
  }
}
