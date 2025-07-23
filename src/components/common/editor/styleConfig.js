import React from 'react';

const MIN_ALLOWED_FONT_SIZE = 8;
const MAX_ALLOWED_FONT_SIZE = 72;

export const parseAllowedFontSize = (input) => {
    const match = input.match(/^(\d+(?:\.\d+)?)px$/);
    if (match) {
        const n = Number(match[1]);
        if (n >= MIN_ALLOWED_FONT_SIZE && n <= MAX_ALLOWED_FONT_SIZE) {
            return input;
        }
    }
    return '';
};

export function parseAllowedColor(input) {
    return /^rgb\(\d+, \d+, \d+\)$/.test(input) ? input : '';
}

const FontSizeColorValidator = () => {
    const sampleFontSize = '16px';
    const sampleColor = 'rgb(255, 0, 0)';

    const validFontSize = parseAllowedFontSize(sampleFontSize);
    const validColor = parseAllowedColor(sampleColor);

    return (
        <div>
            <p>
                {validFontSize
                    ? `Font size '${sampleFontSize}' is valid.`
                    : `Font size '${sampleFontSize}' is invalid.`}
            </p>
            <p>
                {validColor
                    ? `Color '${sampleColor}' is valid.`
                    : `Color '${sampleColor}' is invalid.`}
            </p>
        </div>
    );
};

export default FontSizeColorValidator;
