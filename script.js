const COLORS = [
    { name: "Red", hex: "#ff0000" },
    { name: "Green", hex: "#00ff00" },
    { name: "Blue", hex: "#0000ff" },
    { name: "Yellow", hex: "#ffff00" },
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
  ];
  
  let selectedColor1 = COLORS[0].hex;
  let selectedColor2 = COLORS[1].hex;
  let lastMixedColor = "#ffffff";
  
  function createColorButtons(containerId, isColor1) {
    const container = document.getElementById(containerId);
    COLORS.forEach(color => {
      const btn = document.createElement("button");
      btn.classList.add("color-button");
      btn.style.backgroundColor = color.hex;
  
      if ((isColor1 && color.hex === selectedColor1) ||
          (!isColor1 && color.hex === selectedColor2)) {
        btn.classList.add("selected");
      }
  
      btn.addEventListener("click", () => {
        document.querySelectorAll(`#${containerId} .color-button`)
          .forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
  
        if (isColor1) {
          selectedColor1 = color.hex;
        } else {
          selectedColor2 = color.hex;
        }
      });
  
      container.appendChild(btn);
    });
  }
  
  function mixColors() {
    const rgb1 = hexToRgb(selectedColor1);
    const rgb2 = hexToRgb(selectedColor2);
  
    const mixed = {
      r: Math.floor((rgb1.r + rgb2.r) / 2),
      g: Math.floor((rgb1.g + rgb2.g) / 2),
      b: Math.floor((rgb1.b + rgb2.b) / 2)
    };
  
    const mixedHex = rgbToHex(mixed.r, mixed.g, mixed.b);
    lastMixedColor = mixedHex;
  
    document.getElementById("result-box").style.backgroundColor = mixedHex;
    document.getElementById("result-hex").innerText = "Mixed Color: " + mixedHex;
  }
  
  function carryResult() {
    selectedColor1 = lastMixedColor;
    const group = document.getElementById("color1-buttons");
    const btn = document.createElement("button");
    btn.classList.add("color-button", "selected");
    btn.style.backgroundColor = lastMixedColor;
    group.querySelectorAll(".color-button").forEach(b => b.classList.remove("selected"));
    group.appendChild(btn);
  }
  
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  }
  
  function rgbToHex(r, g, b) {
    return "#" + [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("");
  }
  
  createColorButtons("color1-buttons", true);
  createColorButtons("color2-buttons", false);
  