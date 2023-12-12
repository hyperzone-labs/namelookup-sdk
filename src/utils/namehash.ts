var sha3 = require('js-sha3').keccak_256
var uts46 = require('idna-uts46-hx')

export const namehash = (inputName: string) => {
    // Reject empty names:
    var node = ''
    for (var i = 0; i < 32; i++) {
        node += '00'
    }

    var name = normalize(inputName)

    if (name) {
        var labels = name.split('.')

        for(var i = labels.length - 1; i >= 0; i--) {
            var labelSha = sha3(labels[i])
            node = sha3(Buffer.from(node + labelSha, 'hex'))
        }
    }

    return '0x' + node
}

export const normalize = (name: string) => {
    return name ? uts46.toUnicode(name, {useStd3ASCII: true, transitional: false}) : name
}