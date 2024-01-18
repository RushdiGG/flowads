import { fabric } from "fabric";

const placeholder_image =
  "https://flowadss3bucket.s3.eu-north-1.amazonaws.com/flowadsfiles/c96c774b-b8ee-47d3-9d7a-4fc3c24a6544.png";

export const getMeta = (img) => {
  return new Promise((resolve) => {
    img.onload = function () {
      resolve({ img: img, w: this.width, h: this.height });
    };
  });
};

const calculateNewProps = (fObj, w, h) => {
  let fW = fObj.getScaledWidth();
  let fH = fObj.getScaledHeight();
  let scale = (fW > fH ? fW : fH) / (w > h ? w : h);
  let tl = fObj.aCoords.tl;
  let center = { x: tl.x + fW / 2, y: tl.y + fH / 2 };
  debugger;
  console.log(`Width: ${w}, Height: ${h}, Scale: ${scale}, Center: ${center}`);
  return {
    x: center.x - (w * scale) / 2,
    y: center.y - (h * scale) / 2,
    fW: fW,
    scale: scale,
  };
};

export const createFabricImage = async (imgUrl, cb) => {
  let imgObj = new Image();
  imgObj.src = imgUrl;
  imgObj.crossOrigin = "Anonymous";
  let img = false;

  try {
    img = await getMeta(imgObj);
  } catch (e) {
    console.log(e);
  }
  if (!img) {
    return false
  };

  const options = {
    angle: 0,
    padding: 10,
    cornersize: 10,
    height: img.h,
    width: img.w,
  };
  let obj = new fabric.Image();
  obj.initialize(imgObj, options);
  obj.scaleToWidth(300);

  cb(obj);
};

export const handleProductChange = (canvas, dynamicObjects, product, cb) => {
  let allObjects = canvas.getObjects();
  let imageSwaps = dynamicObjects
    .map((object) => {
      let cObj = allObjects[object.index];
      let checkType = object.type;

      if (!cObj.type === checkType) return;

      switch (cObj.type) {
        case "i-text":
          cObj.text = product.title;
          return false;
        case "image":
          console.log(product.image_link);
          return swapImage(cObj, product.image_link);
      }
    })
    .filter((isSwap) => isSwap);
  Promise.all(imageSwaps).then(() => {
    cb();
  });
};

export const getDynamicObjects = (canvas) => {
  let objects = canvas.getObjects().map((object, i) => {
    return { type: object.type, default: getValue(object), index: i };
  });
  return objects.filter((object) => isDynamicField(object));
};

const getValue = (object) => {
  switch (object.type) {
    case "i-text":
      return object.text;
    case "image":
      return object.getSrc();
    default:
      return "";
  }
};

export const isDynamicField = (object) => {
  return (
    object.default == "Product Title" || object.default == placeholder_image
  );
};

const swapImage = async (fabricObj, imgUrl, cb) => {
  return new Promise(async (resolve) => {
    let imgObj = new Image();
    imgObj.src = imgUrl;
    let isReset = imgUrl == placeholder_image;
    // imgObj.crossOrigin = "Anonymous";
    let img = false;
    try {
      img = await getMeta(imgObj);
    } catch (e) {
      console.log(e);
    }

    if (!img) resolve(false);

    let newProps = calculateNewProps(fabricObj, img.w, img.h);

    const options = {
      angle: 0,
      padding: 10,
      cornersize: 10,
      height: img.h,
      width: img.w,
      top: newProps.y,
      left: newProps.x,
    };
    debugger;
    fabricObj.initialize(img.img, options);
    fabricObj.scale(newProps.scale);
    resolve(true);
  });
};

// Canvas Actions

export const addText = (canvas, text, cb) => {
  let textObject = new fabric.IText(text, {
    top: 100,
    left: 100,
  });
  canvas.add(textObject);
  canvas.renderAll.bind(canvas);
  cb();
};

export const addImage = (canvas, url, cb) => {
  createFabricImage(url, (img) => {
    if (!img) cb(true);
    canvas.add(img);
    canvas.renderAll.bind(canvas);
    cb();
  });
};

export const selectObject = (canvas, index, cb) => {
  let objects = canvas.getObjects();
  let o = objects[index];
  let object = makeSelectedObject(o, index);
  cb(object);
};

export const moveObject = (canvas, dynamicObjects, pos, cb) => {
  let objects = canvas.getObjects();
  let object = objects[pos.from];

  for (let i = 0; i < dynamicObjects.length; i++) {
    let c = dynamicObjects[i].index;
    if (c == pos.from) {
      dynamicObjects[i].index = pos.to;
    } else if (c > pos.from && c <= pos.to) {
      dynamicObjects[i].index = c - 1;
    } else if (c < pos.from && c >= pos.to) {
      dynamicObjects[i].index = c + 1;
    }
  }

  object.moveTo(pos.to);
  cb(dynamicObjects);
};

export const deleteObject = (canvas, dynamicObjects, index, cb) => {
  // Get the real dynamic objects & objects for reference
  let objects = canvas.getObjects();
  dynamicObjects = dynamicObjects.filter((object) => object.index != index);
  for (let i = 0; i < dynamicObjects.length; i++) {
    if (dynamicObjects[i].index > index) {
      dynamicObjects[i].index = dynamicObjects[i].index - 1;
    }
  }
  canvas.remove(objects[index]);
  canvas.renderAll.bind(canvas);
  cb(dynamicObjects);
};

export const loadTemplate = (canvas, json, cb) => {
  canvas.loadFromJSON(json, () => {
    cb();
  });
};

export const toLayerFormat = (objects) => {
  return objects.map((obj) => {
    return {
      type: obj.type,
      value: getValue(obj),
    };
  });
};

export const makeSaveable = (canvas, dynamicObjects, cb) => {
  resetImages(canvas, dynamicObjects)
    .then((previous) => {
      return makePlain(
        canvas,
        JSON.stringify(canvas.toJSON()),
        dynamicObjects,
        previous
      );
    })
    .then(([err, json]) => {
      if (err) cb(false);
      console.log("makesaveable end");
      cb(json);
    });
  // let json = await makePlain(
  //   canvas,
  //   JSON.stringify(canvas.toJSON()),
  //   dynamicObjects,
  //   previous
  // );
  // console.log(json);
  // cb();
  // console.log("makesaveable end");
  // return json;
};

const makePlain = (canvas, jsonString, dynamicObjects, previous) => {
  return new Promise((resolve) => {
    let objects = canvas.getObjects();
    for (let i = 0; i < dynamicObjects.length; i++) {
      let value = dynamicObjects[i].default;
      let valueToReplace = getValue(objects[dynamicObjects[i].index]);
      jsonString = jsonString.replace(valueToReplace, value);
    }
    undoReset(canvas, dynamicObjects, previous).then((success) => {
      if (!success) console.log("Error while undoreset");
      console.log(jsonString);
      resolve([false, jsonString]);
    });
  });
};

const resetImages = (canvas, dynamicObjects) => {
  return new Promise((resolve) => {
    let objects = canvas.getObjects();
    let previous = {};
    let imageSwaps = [];
    for (let i = 0; i < dynamicObjects.length; i++) {
      let index = dynamicObjects[i].index;
      let o = objects[index];
      if (o.type == "image") {
        let url = o.getSrc();
        imageSwaps.push(swapImage(o, placeholder_image));
        console.log("swapped");
        previous[`index${index}`] = {
          src: url,
        };
      }
    }
    Promise.all(imageSwaps).then(() => {
      resolve(previous);
    });
  });
};

const undoReset = (canvas, dynamicObjects, previous) => {
  return new Promise((resolve) => {
    let objects = canvas.getObjects();
    let imageSwaps = [];
    for (let i = 0; i < dynamicObjects.length; i++) {
      let index = dynamicObjects[i].index;
      let o = objects[index];
      if (o.type == "image") {
        imageSwaps.push(swapImage(o, previous[`index${index}`].src));
      }
    }
    Promise.all(imageSwaps).then(() => {
      resolve(true);
    });
  });
};

export const openImage = async (canvas) => {
  let url = await canvas.toDataURL({ format: "jpeg", quality: 0.8 });
  console.log(url);
  window.open(url, "_blank");
};

export const selectBackground = (canvas, cb) => {
  let bgColor = canvas.backgroundColor;
  let hexColor = new fabric.Color(bgColor).toHex();
  cb({ type: "background", backgroundColor: hexColor });
};

export const setBackground = (canvas, options, cb) => {
  let cbo = null;
  switch (options.property) {
    case "COLOR":
      canvas.setBackgroundColor(options.value);
      let bgColor = canvas.backgroundColor;
      let hexColor = new fabric.Color(bgColor).toHex();
      cbo = { type: "background", backgroundColor: hexColor };
      break;
    default:
      break;
  }
  cb(cbo);
};

export const changeITextFont = (canvas, change, cb) => {
  let objects = canvas.getObjects();
  let object = objects[change.index];
  object.fontFamily = change.font;
  cb(makeSelectedObject(object));
};

const makeSelectedObject = (o, i) => {
  let object = {
    type: o.type,
    value: getValue(o),
    index: i,
    opacity: o.opacity,
  };
  switch (o.type) {
    case "i-text":
      return { ...object, fontFamily: o.fontFamily };
    default:
      return object;
  }
};
