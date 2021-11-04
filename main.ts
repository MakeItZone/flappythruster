/**
 * USB Serial is 115200
 * 
 * Shake to go, A and B to sink.
 */
serial.redirectToUSB()
input.setAccelerometerRange(AcceleratorRange.TwoG)
radio.setGroup(1)
let thisMagnitude = 0
let lastMagnitude = thisMagnitude
let threshold = 750
let flags = 0
basic.forever(function () {
    flags = 0
    thisMagnitude = input.acceleration(Dimension.Strength)
    if (thisMagnitude - lastMagnitude > threshold) {
        flags = flags + 1
    }
    lastMagnitude = thisMagnitude
    if (input.buttonIsPressed(Button.AB)) {
        flags = flags + 2
    }
    if (flags == 1) {
        basic.showIcon(IconNames.Triangle)
    } else if (flags == 2) {
        basic.showIcon(IconNames.Sword)
    } else if (flags == 3) {
        basic.showIcon(IconNames.Butterfly)
    }
    if (flags != 0) {
        radio.sendNumber(2 + flags)
    }
    basic.pause(10)
})
