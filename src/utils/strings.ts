export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function hexToRgbA(hex: any, opacity = 1) {
  let c = hex.substring(1).split('');
  if (c.length === 3) {
    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
  }
  c = '0x' + c.join('');
  return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
}

export function randomColor() {
  let retries = 3;
  let result = '';

  while (retries-- > 0 && result.length < 7) {
    result = '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  return result;
}

export function checkIsColorTooBright(hex: string) {
  if (!hex) return false;

  const str = hex.substring(1);
  const rgb = parseInt(str, 16);
  const values = {
    r: (rgb >> 16) & 0xff,
    g: (rgb >> 8) & 0xff,
    b: (rgb >> 0) & 0xff,
  };

  const luma = 0.2126 * values.r + 0.7152 * values.g + 0.0722 * values.b; // ITU-R BT.709
  return luma > 127.5;
}