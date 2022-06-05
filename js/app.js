const inputImage = document.querySelector("#input-image");
const previewContainer = document.querySelector("#preview-image");
const canvas = document.querySelector("#cs");
const textColor = document.querySelector("#color-rgb");
const inputColor = document.querySelector("#color-picker");

function useCanvas(el, image, callback){
  el.width = image.width;
  el.height = image.height;
  el.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
  return callback();
}

function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

inputImage.onchange = () => {
  const file = inputImage.files[0];

  console.log(file)

  if (file) {
    previewContainer.src = URL.createObjectURL(file);
  }
}

previewContainer.addEventListener("click", (e) => {
  let x, y;

  if(e.offsetX) {
    x = e.offsetX;
    y = e.offsetY;
  }

  useCanvas(canvas, previewContainer, function() {
    let p = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    const colorHex = rgbToHex(p[0], p[1], p[2]);

    textColor.textContent = colorHex;
    inputColor.value = colorHex;
  });
})
