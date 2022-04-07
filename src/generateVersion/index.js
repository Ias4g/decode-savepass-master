function generateVersion() {
    const date = Date.now()
    const myArrow = String(date)

    const numberPrimary = myArrow.slice(0, 1)
    const numberSecundary = myArrow.slice(1, 3)
    const numberRest = myArrow.slice(3, myArrow.length)

    let versionApp = `${numberPrimary}.${numberSecundary}.${numberRest}`

    console.log(versionApp)
}

generateVersion()
