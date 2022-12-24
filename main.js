const minuteLeds = [ledMin1, ledMin2, ledMin3, ledMin4, ledMin5, ledMin6]
const hourLeds = [ledHora1, ledHora2, ledHora3, ledHora4]
let powerOn = true

let update = setInterval(runTime, 1000)
function runTime() {
    const date = new Date()
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
    console.log(hours);
    const mins = date.getSeconds()
    const binaryHours = hours.toString(2)
    const binaryMins = mins.toString(2)
    updateLeds(binaryMins, minuteLeds)
    updateLeds(binaryHours, hourLeds)
}
function updateLeds(binaryTime, ledNodes) {
    const len = ledNodes.length
    for (let i = len - 1; i >= 0; i--) {
        if (binaryTime[binaryTime.length - len + i] == "1") {
            ledNodes[i].firstElementChild.style.fill = "rgb(255, 103, 103)"
            ledNodes[i].setAttribute('filter', `url(#filter-${ledNodes[i].id})`)
        } else {
            ledNodes[i].firstElementChild.style.fill = "gray"
            ledNodes[i].setAttribute('filter', '')
        }
    }
}
function powerOffLeds(ledNodes) {
    for (let i = 0; i < ledNodes.length; i++) {
        ledNodes[i].firstElementChild.style.fill = "gray"
        ledNodes[i].setAttribute('filter', '')
    }
}

const powerBtn = document.querySelector('header span')
powerBtn.addEventListener('click', () => {
    powerOn = !powerOn
    if (powerOn) {
        power.firstElementChild.style.fill = "#FF6767"
        power.setAttribute('filter', 'url(#filter-power)')
        update = setInterval(runTime, 1000)
    } else {
        power.firstElementChild.style.fill = "gray"
        power.setAttribute('filter', '')
        powerOffLeds(minuteLeds)
        powerOffLeds(hourLeds)
        clearInterval(update)
    }
})