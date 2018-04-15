export class ColorGeneratorService {
  static get() {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  }
}
