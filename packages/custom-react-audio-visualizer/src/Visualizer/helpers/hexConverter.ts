interface RGB {
    r: number
    g: number
    b: number
}
function rgbToYIQ({ r, g, b }: RGB): number {
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function hexToRgb(hex: string): RGB | undefined {
    if (!hex || hex === undefined || hex === '') {
        return undefined;
    }

    const result: RegExpExecArray | null =
          /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : undefined;
}

export function generateContrastHex(colorHex: string | undefined,
                         threshold: number = 128): string {
    if (colorHex === undefined) {
        return '#000';
    }
    if (colorHex.length < 7) {
        return '#fff'
    }

    const rgb: RGB | undefined = hexToRgb(colorHex);
    
    if (rgb === undefined) {
        return '#000';
    }

    return rgbToYIQ(rgb) >= threshold ? '#000' : '#fff';
}

export function generateRandomHex() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export function generateRandomHexAndItsContrastHex() {
    const randomBgColor = generateRandomHex();
    const randomColor = generateContrastHex(randomBgColor);
    return {
        background: randomBgColor,
        color: randomColor
    }
}

export function generateRandomHexForWaveSurfer() {
    const randomBgColor = '#0A1931';
    const randomWaveColor = generateRandomHex();
    const randomCursorColor = generateRandomHex();
    const randomProgressColor = generateContrastHex(randomBgColor);
    return {
        background: randomBgColor,
        wave: randomWaveColor,
        cursor: randomCursorColor,
        progress: randomProgressColor
    }
}