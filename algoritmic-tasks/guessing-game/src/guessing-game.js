class GuessingGame {
    constructor() {}

    setRange(min, max) {
        this.min = min;
        this.max = max;
    }

    guess() {
        return this.number = Math.round((this.min + this.max) / 2);
    }

    lower() {
        this.setRange(this.min, this.number);
        this.guess();
    }

    greater() {
        this.setRange(this.number, this.max);
        this.guess();
    }
}

module.exports = GuessingGame;
