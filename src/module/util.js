export const fadeColor = (color, percent) => {
    // convert #hex notation to rgb array
    var parseColor = function (hexStr) {
        return hexStr.length === 4 ?
            hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); })
            : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
    };

    // zero-pad 1 digit to 2
    var pad = function (s) {
        return (s.length === 1) ? '0' + s : s;
    };

    var gradientColors = function (color, percent, gamma) {
        var j, output = [], so = [];
        gamma = gamma || 1;
        var normalize = function (channel) {
            return Math.pow(channel / 255, gamma);
        };
        color = parseColor(color).map(normalize);
        for (j = 0; j < 3; j++) {
            so[j] = pad(Math.round(Math.pow(color[j] * percent, 1 / gamma) * 255).toString(16));
            console.log(so[j]);
        }
        output.push('#' + so.join(''));
        return output;
    };

    return gradientColors(color, percent);
};

export const assignObj = (obj) => {
    const result = {};
    for(let i in obj){
        result[i] = obj[i]
    }
    return result;
}