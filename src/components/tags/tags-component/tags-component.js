import template from "./tags-component.html";
import tagItemTemplate from "./tag-item.html";
import { ButtonMoreComponent } from "../../button-more/button-more";
import { AddTagComponent } from "../add-tag-dialog/add-tag-dialog";
import { TagService } from "../../../services/tag-service";

export class TagsComponent {
  constructor(mountPoint, props) {
    this.mountPoint = mountPoint;
    this.props = props;
  }

  querySelectors() {
    this.tagsRoot = this.mountPoint.querySelector(".tags");
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".tag__more-button"
    );
    this.addTagButton = this.mountPoint.querySelector(
      ".tag__add-tag-dialog-activation"
    );
    this.tagList = this.mountPoint.querySelector(".tag__list");
  }

  initDialogComponent() {
    this.addTagComponent = new AddTagComponent(this.props.addTagMountPoint, {
      onAddTagConfirmed: this.handleAddTagConfirmed.bind(this)
    });
  }

  handleAddTagConfirmed(tag) {
    TagService.get().then(tags => {
      if (!tags) {
        TagService.set([tag]);
      } else {
        let updatedTags = [tag].concat(tags);
        TagService.set(updatedTags);
      }
      this.props.onAddTagConfirmed(tag);
    });
  }

  initMoreBtns() {
    this.moreBtnMountPoints = this.mountPoint.querySelectorAll(
      ".tag__more-button"
    );
    Array.from(this.moreBtnMountPoints).forEach(point => {
      new ButtonMoreComponent(point, {
        position: "right",
        onDeleteClicked: this.handleDeleteClick.bind(this),
        onEditClicked: this.handleEditClick.bind(this)
      }).mount();
    });
  }

  addEventListeners() {
    this.addTagButton.addEventListener(
      "click",
      this.handleAddTagClick.bind(this)
    );
  }

  addTag(tag) {
    let element = document.createElement("div");
    element.innerHTML = tagItemTemplate({ tag: tag });
    let childNode = this.tagList.childNodes[2];
    this.tagList.insertBefore(element.firstChild, childNode);
    this.initMoreBtns();
  }

  handleAddTagClick() {
    this.addTagComponent.mount();
    this.addTagComponent.showDialog();
  }

  handleEditClick() {
    console.log("handleEditClick");
  }

  handleDeleteClick() {
    console.log("handleDeleteClick");
  }

  mount() {
    this.mountPoint.innerHTML = template();
    this.querySelectors();
    this.initDialogComponent();
    this.initMoreBtns();
    this.addEventListeners();
  }
}
