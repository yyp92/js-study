function test(str = 'Abbb Cvvv' ) {
    const reg = [" ", "-", "_"]
    let newStr = ''

    for (let i = 0; i < str.length; i++) {
        const val = str[i]

        if (i > 0 && reg.includes(val)) {
            newStr += str[++i].toLocaleUpperCase() 
        }
        else {
            newStr += str[i].toLocaleLowerCase()
        }
    }

    return newStr
}

console.log(test('Foo Bar'))
console.log(test('foo-bar'))
console.log(test('FOO_BAR'))
// fooBar