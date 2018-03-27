import template from "./tags.html";
import tagItemTemplate from "./tag-item.html";

import { ButtonMoreComponent } from "../button-more/button-more";
import { TagDialogComponent } from "../tag-dialog/tag-dialog";

import { TagListService } from "../../services/tag-service";
import { AddTagDialogComponent } from "../add-tag-dialog/add-tag-dialog";
import { TransactionListService } from "../../services/transaction-service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog";

export class TagsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.addTagButton = this.mountPoint.querySelector(
      ".tags__add-tag-dialog-activation"
    );
    this.tagDialogMountPoint = this.mountPoint.querySelector(
      ".tags__add-tag-dialog"
    );
    this.tagsList = this.mountPoint.querySelector(".tags__list-items");
    this.confirmDialogMountPoint = this.mountPoint.querySelector(
      ".tags__delete-confirm-dialog"
    );
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
    TagListService.get().then(tags =>
      this.tagDialogComponent.showDialog("Add", tags)
    );
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

  initAddTagDialogComponent() {
    this.addTagDialogComponent = new AddTagDialogComponent(
      this.addTagMountPoint,
      {
        onAddTagConfirm: this.handleAddTagConfirmed.bind(this)
      }
    );
    this.addTagDialogComponent.mount();
  }

  mountChildren() {
    this.tagDialogComponent = new TagDialogComponent(this.tagDialogMountPoint, {
      onAddTagConfirm: this.handleAddTagConfirm.bind(this),
      onEditTagConfirm: this.handleEditTagConfirm.bind(this)
    });
    this.tagDialogComponent.mount();
    this.initAddTagDialogComponent();
    this.initConfirmDialog();
  }

  initTags(tags) {
    tags.forEach(item => {
      this.addTag(item);
    });
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
    this.initMoreBtns();
  }

  handleEditClick(e) {
    this.tagToEdit = e.target.closest(".tags__list-item");
    TagListService.get().then(tags =>
      this.tagDialogComponent.showDialog(
        "Edit",
        tags,
        this.tagToEdit.dataset.name
      )
    );
  }

  handleDeleteClick(event) {
    let moreButton = event.target.closest(".button-more");
    this.listItem = moreButton.closest(".tags__list-item");
    let tagName = this.listItem.querySelector(".tags__list-item-name")
      .innerText;
    this.confirmDialog.showDialog("tag", tagName);
  }

  initConfirmDialog() {
    this.confirmDialog = new ConfirmDialogComponent(
      this.confirmDialogMountPoint,
      {
        onOkClick: this.handleDeleteConfirm.bind(this)
      }
    );
    this.confirmDialog.mount();
  }

  handleDeleteConfirm() {
    this.delTag(this.listItem);
  }

  delTag(listItem) {
    let tag = listItem.querySelector(".tags__list-item-name").innerText;
    TransactionListService.deleteByTag(tag)
      .then(() => {
        let index = Array.from(this.tagsList.children).indexOf(listItem);
        return TagListService.del(index);
      })
      .then(() => {
        this.tagsList.removeChild(listItem);
        this.props.onTagDelete();
      });
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.mountChildren();
    this.addEventListeners();
    this.initData();
  }
}
