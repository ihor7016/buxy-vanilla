import template from "./tags.html";
import tagItemTemplate from "./tag-item.html";

import { ButtonMoreComponent } from "../button-more/button-more";
import { TagDialogComponent } from "../tag-dialog/tag-dialog";

import { TagListService } from "../../services/tag-service";
import { TransactionListService } from "../../services/transaction-service";

export class TagsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
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

  handleAddTagConfirm(tag) {
    TagListService.add(tag);
    this.addTagToHead(tag);
  }

  handleEditTagConfirm(newTag) {
    const oldTag = this.tagToEdit.dataset.name;
    TagListService.update(oldTag, newTag)
      .then(() => TransactionListService.updateTags(oldTag, newTag))
      .then(() => this.props.onTagChange());
    this.tagToEdit.outerHTML = tagItemTemplate({ tag: newTag });
    this.initMoreBtns();
  }

  handleAddTagClick() {
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
      onAddTagConfirm: this.handleAddTagConfirm.bind(this),
      onEditTagConfirm: this.handleEditTagConfirm.bind(this)
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
      this.handleAddTagClick.bind(this)
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

  handleEditClick(e) {
    this.tagToEdit = e.target.closest(".tags__list-item");
    this.tagDialogComponent.showDialog("Edit", this.tagToEdit.dataset.name);
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
