const date = Date.now()
// const completeName = 'Kelly vitoria alves da silva'

// function getSum(n) {
//     let sum = 0;
//     while (n != 0) {
//         sum += n % 10;
//         n = parseInt(n / 10);
//     }
//     return sum
// }
// const soma = getSum(date)


function generateVersion(date) {
    const myArrowString = String(date)
    const numberPrimary = myArrowString.slice(0, 1)
    const numberSecundary = myArrowString.slice(1, 3)
    const numberRest = myArrowString.slice(3, myArrowString.length)

    const versionApp = `${numberPrimary}.${numberSecundary}.${numberRest}`

    return versionApp
}
const version = generateVersion(date)


// function nameSeparation(word) {
//     let initial = ''
//     const nSeparation = word.split(' ')

//     for (let i = 0; i < nSeparation.length; i++) {
//         initial += nSeparation[i][0]
//     }

//     return initial.toUpperCase()
// }
// const nome = nameSeparation(completeName)


// function generatePassword(i, s) {
//     return `${i}${s}`
// }
// const password = generatePassword(nome, soma)


// console.log(`Soma: ${soma}`)
console.log(`Versão: ${version}`)
// console.log(`Password: ${password}`)
// console.log(`Iniciais do nome: ${nome}`)