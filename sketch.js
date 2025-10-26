let mapImg;
let stamps = [];
let spaceMono;
let topOffset = 0; // amount of space to push the map down

function preload() {
  // Load font
  spaceMono = loadFont('SpaceMono-Regular.ttf');

  // Background map
  mapImg = loadImage('mapFinal.png');

  // Stamps (color + BW pairs)
  stamps = [
    {
      colorImg: loadImage('3.png'),
      bwImg: loadImage('PFP_Black.png'),
      xPercent: 0.58,
      yPercent: 0.38,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/pfpf"
    },
    {
      colorImg: loadImage('1.png'),
      bwImg: loadImage('SJBlack.png'),
      xPercent: 0.68,
      yPercent: 0.52,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/sjf"
    },
    {
      colorImg: loadImage('2.png'),
      bwImg: loadImage('SJB_Black.png'),
      xPercent: 0.43,
      yPercent: 0.42,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/sjbf"
    },
    {
      colorImg: loadImage('5.png'),
      bwImg: loadImage('SMG_Y.png'),
      xPercent: 0.92,
      yPercent: 0.50,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/smgf"
    },
    {
      colorImg: loadImage('6.png'),
      bwImg: loadImage('EC_Black.png'),
      xPercent: 0.31,
      yPercent: 0.77,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/ecf"
    },
    {
      colorImg: loadImage('7.png'),
      bwImg: loadImage('SPW_black.png'),
      xPercent: 0.43,
      yPercent: 0.90,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/spwf"
    },
    {
      colorImg: loadImage('8.8.png'),
      bwImg: loadImage('SMM_Black.png'),
      xPercent: 0.56,
      yPercent: 0.57,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/smmf"
    },
    {
      colorImg: loadImage('8.png'),
      bwImg: loadImage('SGG_Black.png'),
      xPercent: 0.82,
      yPercent: 0.16,
      sizePercent: 0.08,
      link: "https://timothyufit.cargo.site/sggf"
    }
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

let showMessage = true;
let messagePadding = 10;

function draw() {
  background(23, 22, 22);

  // --- Draw map ---
  let mapAspect = mapImg.width / mapImg.height;
  let canvasAspect = width / height;
  let drawWidth, drawHeight;

  if (canvasAspect > mapAspect) {
    drawHeight = height;
    drawWidth = mapAspect * height;
  } else {
    drawWidth = width;
    drawHeight = width / mapAspect;
  }

  let mapX = width / 2;
  let mapY = height / 2 + topOffset;

  image(mapImg, mapX, mapY, drawWidth, drawHeight);

  let hovered = false;

  // --- Draw each stamp ---
  for (let s of stamps) {
    let stampX = mapX - drawWidth / 2 + drawWidth * s.xPercent;
    let stampY = mapY - drawHeight / 2 + drawHeight * s.yPercent;
    let stampW = drawWidth * s.sizePercent;
    let stampH = (s.colorImg.height / s.colorImg.width) * stampW;

    // Hover detection
    s.isHovered = dist(mouseX, mouseY, stampX, stampY) < stampW / 2;

    // ✅ REVERSED BEHAVIOR:
    // Default: color
    // Hover: black & white
    let imgToShow = s.isHovered ? s.bwImg : s.colorImg;

    image(imgToShow, stampX, stampY, stampW, stampH);

    if (s.isHovered) hovered = true;
  }

  cursor(hovered ? HAND : ARROW);

  // --- Hide message permanently after first stamp hover ---
  if (hovered) {
    showMessage = false;
  }

  // --- Draw message near cursor until first interaction ---
  if (showMessage) {
    let msg = "Click on the stamp to interact";
    textFont(spaceMono);
    textSize(10);
    textAlign(LEFT, CENTER);

    let tWidth = textWidth(msg);
    let boxWidth = tWidth + messagePadding * 2;
    let boxHeight = 26;

    let x = mouseX + 15;
    let y = mouseY;

    noStroke();
    fill(241, 237, 231);
    rect(x - messagePadding / 2, y - boxHeight / 2, boxWidth, boxHeight, 4);

    fill(0);
    text(msg, x + messagePadding / 2, y);
  }
}

function mousePressed() {
  for (let s of stamps) {
    if (s.isHovered) {
      window.open(s.link, "_blank");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

