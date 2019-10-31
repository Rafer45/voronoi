
function xyzToRgb(x, y, z) {
  const varX = x / 100.0
  const varY = y / 100.0
  const varZ = z / 100.0

  let varR = varX *  3.2406 + varY * -1.5372 + varZ * -0.4986
  let varG = varX * -0.9689 + varY *  1.8758 + varZ *  0.0415
  let varB = varX *  0.0557 + varY * -0.2040 + varZ *  1.0570

  if (varR > 0.0031308)
    varR = 1.055 * Math.pow(varR, (1.0/2.4)) - 0.055;
  else
    varR = 12.92 * varR;
  
  if (varG > 0.0031308)
    varG = 1.055 * Math.pow(varG, (1.0/2.4)) - 0.055;
  else
    varG = 12.92 * varG;

  if (varB > 0.0031308)
    varB = 1.055 * Math.pow(varB, (1.0/2.4)) - 0.055
  else
    varB = 12.92 * varB

  const r = varR * 255
  const g = varG * 255
  const b = varB * 255
  return [r, g, b]
}


function rgbToXyz(r, g, b) {
  let varR = (r / 255.0);
  let varG = (g / 255.0);
  let varB = (b / 255.0);

  if (varR > 0.04045)
    varR = Math.pow(((varR+0.055)/1.055), 2.4);
  else
    varR = varR / 12.92;

  if (varG > 0.04045)
    varG = Math.pow(((varG+0.055)/1.055), 2.4);
  else
    varG = varG / 12.92;

  if (varB > 0.04045)
    varB = Math.pow(((varB+0.055)/1.055), 2.4);
  else
    varB = varB / 12.92;

  varR = varR * 100
  varG = varG * 100
  varB = varB * 100

  const x = varR * 0.4124 + varG * 0.3576 + varB * 0.1805
  const y = varR * 0.2126 + varG * 0.7152 + varB * 0.0722
  const z = varR * 0.0193 + varG * 0.1192 + varB * 0.9505

  return [x, y, z]
}

const refX =  95.047;
const refY = 100.000;
const refZ = 108.883;

function xyzToLab(x, y, z) {
  let varX = x / refX
  let varY = y / refY
  let varZ = z / refZ

  if (varX > 0.008856)
    varX = Math.pow(varX, (1.0/3.0));
  else
    varX = (7.787 * varX) + (16.0 / 116.0);

  if (varY > 0.008856)
    varY = Math.pow(varY, (1.0/3.0));
  else
    varY = (7.787 * varY) + (16.0 / 116.0);

  if (varZ > 0.008856)
    varZ = Math.pow(varZ, (1.0/3.0));
  else
    varZ = (7.787 * varZ) + (16.0 / 116.0);

  const l = (116 * varY) - 16;
  const a = 500 * (varX - varY);
  const b = 200 * (varY - varZ);

  return [l, a, b];
}

function labToXyz(l, a, b) {
  let varY = (l + 16) / 116
  let varX = a / 500.0 + varY
  let varZ = varY - b / 200.0

  if (Math.pow(varY, 3)  > 0.008856)
    varY = Math.pow(varY, 3);
  else
    varY = (varY - 16.0 / 116.0) / 7.787;

  if (Math.pow(varX, 3)  > 0.008856)
    varX = Math.pow(varX, 3);
  else
    varX = (varX - 16.0 / 116.0) / 7.787;

  if (Math.pow(varZ, 3)  > 0.008856)
    varZ = Math.pow(varZ, 3);
  else
    varZ = (varZ - 16.0 / 116.0) / 7.787;

  const x = varX * refX
  const y = varY * refY
  const z = varZ * refZ

  return [x, y, z];
}


function rgbToLab(r, g, b) {
  return xyzToLab(...rgbToXyz(r, g, b));
}

function labToRgb(l, a, b) {
  return xyzToRgb(...labToXyz(l, a, b));
}

export { labToRgb, rgbToLab }
