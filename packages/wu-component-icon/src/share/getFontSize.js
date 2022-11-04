export function getFontSize(size) {
    let fontSize = '';
    if (size && /\d(px|rem|em|vh|vw)$/.test(size)) {
        fontSize = size;
    }
    else {
        fontSize = `${size}px`;
    }
    return fontSize;
}
