/*

Copyright (c) 2018 - 2024 PhotoPrism UG. All rights reserved.

    This program is free software: you can redistribute it and/or modify
    it under Version 3 of the GNU Affero General Public License (the "AGPL"):
    <https://docs.photoprism.app/license/agpl>

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    The AGPL is supplemented by our Trademark and Brand Guidelines,
    which describe how our Brand Assets may be used:
    <https://www.photoprism.app/trademark>

Feel free to send an email to hello@photoprism.app if you have questions,
want to support our work, or just want to say hello.

Additional information can be found in our Developer Guide:
<https://docs.photoprism.app/developer-guide/>

*/

function isObject(val) {
  return val && val instanceof Object;
}

function isModel(model) {
  return (
    model &&
    typeof model.getId === "function" &&
    typeof model.constructor.getCollectionResource === "function"
  );
}

class Selection {
  /**
   * @param {Object?} items
   */
  constructor(items) {
    this.clear();
    this.addItems(items);
  }

  clear() {
    this.files = [];
    this.photos = [];
    this.albums = [];
    this.labels = [];
    this.places = [];
    this.subjects = [];

    return this;
  }

  /**
   * @param {Object} items
   */
  addItems(items) {
    if (isObject(items) && Object.keys(items).length > 0) {
      for (const [key, value] of Object.entries(items)) {
        if (this.hasOwnProperty(key) && Array.isArray(value) && value.length > 0) {
          if (this[key].length === 0 || this[key][0] !== value[0]) {
            this[key].push(...value);
          }
        }
      }
    }

    return this;
  }

  addModel(model) {
    if (!isModel(model)) {
      return;
    }

    const id = model.getId();
    const key = model.constructor.getCollectionResource();

    if (!id || !key || !this.hasOwnProperty(key)) {
      return;
    }

    if (!this[key].includes(id)) {
      this[key].push(id);
    }

    return this;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    for (const items of Object.values(this)) {
      if (Array.isArray(items) && items.length > 0) {
        return false;
      }
    }

    return true;
  }
}

export default Selection;
