function addWarningBox() {
  const newBox = document.createElement("div");
  newBox.classList = "cookie-warn";
  
  const newContent = document.createTextNode(
    "Aviso: esse site utiliza cookies."
  );
  
  newBox.appendChild(newContent);
  const boxStyles = `
    position: absolute;
    top: 6rem;
    right: 1rem;
    width: 300px;
    padding: 1rem;
    background-color: #d5d5d5;
    z-index: 1;
    border-radius: 10px;
    font-size: .9rem;
    font-family: 'EuclidReg', sans-serif;
    user-select: none;
  `;

  newBox.style = boxStyles;

  document.body.appendChild(newBox);
}

function hideElementByClassName(className) {
  const element = document.querySelector("." + String(className));
  
  let i = 100;

  setTimeout(() => {
    const idInterval = setInterval(() => {
      if (i >= 0) {
        element.style.opacity = Number(i / 100);
        i-=5;
      } else {
        clearInterval(idInterval);
      }
    }, 50);
  }, 8000);
}

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    addWarningBox();

    hideElementByClassName("cookie-warn");
  }, 750);
});

