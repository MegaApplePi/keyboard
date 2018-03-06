/* globals domtoimage */
(function() {
  const $keyboard = document.getElementById("keyboard");
  const $controlsModeSelection = document.getElementById("controls-mode-selection");
  const $controlsColourSelection = document.getElementById("controls-colouring-selection");
  const $controlsAlignmentSelection = document.getElementById("controls-alignment-selection");
  const $controlsLayoutSelection = document.getElementById("controls-layout-selection");
  const $controlsSavePNG = document.getElementById("controls-save-png");
  const $controlsSaveJPG = document.getElementById("controls-save-jpg");

  let layouts;

  let isColouring = false;
  let colour = "white";

  function elementDisabled(e) {
    e.setAttribute("disabled", "");
  }
  function elementEnabled(e) {
    e.removeAttribute("disabled");
  }
  function $keyboard_click(e) {
    let {target} = e;
    if (target.tagName === "KBD") {
      if (isColouring) {
        target.setAttribute("data-colour", colour);
      }
    }
  }
  function $controlsModeSelection_click(e) {
    let {target} = e;
    let $colourSelectionInputs = document.querySelectorAll("#controls-colouring-selection input");
    let $kbdInputs = document.querySelectorAll("#keyboard kbd input");
    if (target.tagName === "INPUT") {
      if (target.value === "note") {
        isColouring = false;
        $colourSelectionInputs.forEach(elementDisabled);
        $kbdInputs.forEach(elementEnabled);
      } else {
        isColouring = true;
        $colourSelectionInputs.forEach(elementEnabled);
        $kbdInputs.forEach(elementDisabled);
      }
    }
  }
  function $controlsColourSelection_click(e) {
    let {target} = e;
    if (target.tagName === "INPUT") {
      colour = target.value;
    }
  }
  function $controlsAlignmentSelection_click(e) {
    let {target} = e;
    if (target.tagName === "INPUT") {
      $keyboard.setAttribute("data-alignment", target.value);
    }
  }
  function $controlsSavePNG_click() {
    domtoimage.toPng($keyboard)
      .then((blob) => {
        fetch(blob)
          .then((res) => res.blob())
          .then((blobImage) => window.saveAs(blobImage, "keyboard.png"));
      });
  }
  function $controlsSaveJPG_click() {
    domtoimage.toJpeg($keyboard, {"quality": 0.8})
      .then((blob) => {
        fetch(blob)
          .then((res) => res.blob())
          .then((blobImage) => window.saveAs(blobImage, "keyboard.jpg"));
      });
  }

  (function(){
    function xhr_load(e) {
      let {target} = e;
      if (target.responseText) {
        try {
          layouts = JSON.parse(target.responseText);
          changeLayout("QWERTY");
        } catch (e) {
          alert("An error occurred!");
          console.error(e);
        }
      }
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `key-layouts.json`);
    xhr.addEventListener("load", xhr_load);
    xhr.send();
  })();

  function changeLayout(layout) {
    while ($keyboard.firstChild) {
      $keyboard.removeChild($keyboard.firstChild);
    }

    $keyboard.insertAdjacentHTML("afterBegin", layouts[layout]);
    let $$kbd = [...$keyboard.querySelectorAll("kbd")];
    for (let element of $$kbd) {
      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("maxlength", 2);
      element.insertAdjacentElement("beforeEnd", input);
    }
  }

  let prevValue;
  function $controlsLayoutSelection_click(e) {
    let {target} = e;
    if (target.tagName === "INPUT") {
      let value = target.value;
      if (!["QWERTY", "AZERTY", "QWERTZ", "Dvorak", "Colemak", "JCUKEN"].includes(value)) {
        value = "QWERTY";
      }
      if (value !== prevValue) {
        prevValue = value;
        changeLayout(value);
      }
    }
  }

  $keyboard.addEventListener("click", $keyboard_click);
  $controlsModeSelection.addEventListener("click", $controlsModeSelection_click);
  $controlsColourSelection.addEventListener("click", $controlsColourSelection_click);
  $controlsAlignmentSelection.addEventListener("click", $controlsAlignmentSelection_click);
  $controlsLayoutSelection.addEventListener("click", $controlsLayoutSelection_click);
  $controlsSavePNG.addEventListener("click", $controlsSavePNG_click);
  $controlsSaveJPG.addEventListener("click", $controlsSaveJPG_click);
})();
