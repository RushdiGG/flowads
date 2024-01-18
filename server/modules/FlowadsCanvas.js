const fabric = require("fabric").fabric;

const textTypes = ["title", "price"];
const imageTypes = ["image_link"];

fabric.StaticCanvas.prototype.changeProduct = async function (product, cb) {
  const productFields = Object.keys(product);

  this.getObjects()
    .filter((o) => o.isDynamic)
    .map((o) => {
      const type = o.dynamicType;
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
            cb();
          });
        }
      }
    });
};
