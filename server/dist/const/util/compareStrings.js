"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkInclusion = function (s1, s2) {
    if (s1.length > s2.length)
        return false;
    const s1CharCount = new Array(26).fill(0);
    const window = new Array(26).fill(0);
    for (let char of s1) {
        const idx = char.charCodeAt() - 97;
        s1CharCount[idx]++;
    }
    for (let i = 0; i < s1.length; i++) {
        const idx = s2[i].charCodeAt() - 97;
        window[idx]++;
    }
    let start = 0;
    let end = s1.length - 1;
    while (end < s2.length) {
        if (window.join('') === s1CharCount.join(''))
            return true;
        end++;
        if (end === s2.length)
            break;
        const startIdx = s2[start].charCodeAt() - 97;
        const endIdx = s2[end].charCodeAt() - 97;
        window[startIdx]--;
        window[endIdx]++;
        start++;
    }
    return false;
};
exports.default = checkInclusion;
//# sourceMappingURL=compareStrings.js.map