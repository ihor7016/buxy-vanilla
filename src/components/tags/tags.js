import template from "./tags.html";
import tagItemTemplate from "./tag-item.html";
import { ButtonMoreComponent } from "../button-more/button-more";
import { TagListService } from "../../services/tag-service";
import { TagDialogComponent } from "../tag-dialog/tag-dialog";

export class TagsComponent {
  constructor(mountPoint) {
    this.mountPoint = mountPoint;
  }

  querySelectors() {
    this.tagsRoot = this.mountPoint.querySelector(".tags");
    this.addTagButton = this.mountPoint.querySelector(
      ".tags__add-tag-dialog-activation"
    );
    this.tagDialogMountPoint = this.mountPoint.querySelector(
      ".tags__add-tag-dialog"
    );
    this.tagsList = this.mountPoint.querySelector(".tags__list-items");
  }

  handleAddTagConfirmed(tag) {
    TagListService.add(tag);
    this.addTagToHead(tag);
  }

  handleEditTagConfirmed(tag) {
    //
  }

  handleAddTagClicked() {
    this.tagDialogComponent.showDialog("Add");
  }

  initMoreBtns() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".tags__more-button"
    );
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClick: this.handleDeleteClick.bind(this),
        onEditClick: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  mountChildren() {
    this.tagDialogComponent = new TagDialogComponent(this.tagDialogMountPoint, {
      onAddTagConfirm: this.handleAddTagConfirmed.bind(this),
      onEditTagConfirm: this.handleEditTagConfirmed.bind(this)
    });
    this.tagDialogComponent.mount();
  }

  initTags(tags) {
    tags.forEach(item => {
      this.addTag(item);
    });
    this.initMoreBtns();
  }

  initData() {
    this.tagsList.innerHTML = "";
    TagListService.get().then(tags => {
      if (!tags) {
        tags = [];
        TagListService.set(tags);
      }
      this.initTags(tags);
    });
  }

  addEventListeners() {
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagClicked.bind(this)
    );
  }

  addTagToHead(tag) {
    this.tagsList.innerHTML =
      tagItemTemplate({ tag: tag }) + this.tagsList.innerHTML;
    this.initMoreBtns();
  }

  addTag(tag) {
    this.tagsList.innerHTML += tagItemTemplate({ tag: tag });
  }

  handleEditClick() {
    this.tagDialogComponent.showDialog("Edit");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.addEventListeners();
    this.initData();
  }
}
