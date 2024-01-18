import { fabric } from "fabric";
import "fabric-history";
import { saveTemplate, loadTemplate } from "../../../../api";
import { includeFields, textTypes, imageTypes } from "../../../../config";

/**
 * Override the initialize function for the _historyInit();
 */
fabric.Canvas.prototype.initialize = (function (originalFn) {
  return function (...args) {
    originalFn.call(this, ...args);
    this._historyInit();
    return this;
  };
})(fabric.Canvas.prototype.initialize);

/**
 * Override initialization of the plugin to add extraProps "isDynamic" and "dynamicType"
 */
fabric.Canvas.prototype._historyInit = function () {
  this.historyUndo = [];
  this.historyRedo = [];
  this.extraProps = ["selectable", "isDynamic", "dynamicType"];
  this.historyNextState = this._historyNext();

  this.on(this._historyEvents());
};

fabric.Canvas.prototype._historySaveAction = function () {
  if (this.historyProcessing) return;

  const json = this.historyNextState;
  this.historyUndo.push(json);
  this.historyNextState = this._historyNext();
  this.fire("history:append", { json: json });
};

fabric.Canvas.prototype.addText = function (
  text = "Lorem ipsum",
  dynamic = false,
  dynamicType = "not_dynamic"
) {
  let textObject = new fabric.IText(text, {
    top: 100,
    left: 100,
  });
  textObject.isDynamic = dynamic;
  textObject.dynamicType = dynamicType;

  this.add(textObject);
  this.renderAll();
};

fabric.Canvas.prototype.addImage = function (
  url,
  width = 300,
  dynamic = false,
  dynamicType = "not_dynamic"
) {
  fabric.Image.fromURL(url, (img, err) => {
    if (!img || err) console.log("Couldnt load image");
    let scale = width / img.width;

    img.set({
      scaleX: scale,
      scaleY: scale,
    });
    if (dynamic) {
      img.centeredScaling = true;
    }
    img.isDynamic = dynamic;
    img.dynamicType = dynamicType;

    this.add(img);
    this.renderAll();
  });
};

fabric.Canvas.prototype.trackObjects = function (trackEvent) {
  this.on({
    "after:render": objectEventUpdate,
  });
  function objectEventUpdate() {
    trackEvent(this.getObjects());
  }
};

fabric.Canvas.prototype.trackSelected = function (trackEvent) {
  this.on({
    "selection:updated": objectEventUpdate,
    "selection:cleared": objectEventUpdate,
    "selection:created": objectEventUpdate,
  });

  function objectEventUpdate() {
    trackEvent(this.getActiveObject());
  }
};

fabric.Canvas.prototype.changeProduct = function (product) {
  const productFields = Object.keys(product);
  this.getObjects().map((o) => {
    const type = o.dynamicType;
    if (!o.isDynamic) return;
    if (!productFields.includes(type)) {
      o.visible = false;
    } else {
      if (textTypes.includes(type)) {
        o.text = product[type];
        o.canvas.renderAll();
      } else if (imageTypes.includes(type)) {
        let pw = o.getScaledWidth();
        let ph = o.getScaledHeight();
        let prevLong = pw > ph ? pw : ph;
        let prevScale = o.scaleX;
        let centerX = o.aCoords.tl.x + pw / 2;
        let centerY = o.aCoords.tl.y + ph / 2;

        o.setSrc(product[type], function (o, err) {
          if (err) console.log("Error when setting source for image");
          let w = o.getScaledWidth();
          let h = o.getScaledHeight();
          let long = w > h ? w : h;
          let scale = (prevLong / long) * prevScale;
          o.scale(scale);

          let newLeft = centerX - o.getScaledWidth() / 2;
          let newTop = centerY - o.getScaledHeight() / 2;
          o.set("left", newLeft);
          o.set("top", newTop);
          o.setCoords();

          o.canvas.renderAll();
        });
      }
    }
  });
};

fabric.Canvas.prototype.moveLayer = function (from, to) {
  this.getObjects()[from].moveTo(to);
  this.renderAll();
};

fabric.Canvas.prototype.save = function (id) {
  let json = this.toJSON(includeFields);
  saveTemplate(id, json);
};

fabric.Canvas.prototype.load = function (id) {
  loadTemplate(id).then((res) => {
    this.loadFromJSON(res.data.canvas);
  });
};

fabric.Canvas.prototype.setBackgroundImageCover = function (url) {
  let _this = this;
  fabric.Image.fromURL(url, function (img) {
    _this.setBackgroundImage(
      img,
      () => {
        _this.renderAll();
        _this._historySaveAction();
      },
      {
        scaleX: _this.width / img.width,
        scaleY: _this.height / img.height,
      }
    );
  });
};
