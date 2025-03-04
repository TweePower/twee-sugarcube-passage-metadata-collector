const specialCharsMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '`': '&#x60;',
    '"': '&quot;',
    "'": '&#039;',
    '\$': '&dollar;',
    "\\n": '<br>',
    '=': '&#x3D;',
    '': '',
};

window.escapeSpecialChars = (code) => {
    return code.replace(/(&|<|>|`|"|'|\$|\\n|=)/g, (word) => specialCharsMap[word])
}
