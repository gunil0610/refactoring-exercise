function createBird(data) {
  return new Bird(data);
}

class Bird {
  #name;
  #plumage;
  #speciesDelegate;
  constructor(data) {
    this.#name = data.name;
    this.#plumage = data.plumage;
    this.#speciesDelegate = this.selectSpeciesDelegate(data);
  }

  get name() {
    return this.#name;
  }

  get plumage() {
    return this.#speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    return this.#speciesDelegate.airSpeedVelocity;
  }

  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "유럽 제비":
        return new EuropeanSwallowDelegate(data, this);
      case "아프리카 제비":
        return new AfricanSwallowDelegate(data, this);
      case "노르웨이 파랑 앵무":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}
class SpeciesDelegate {
  #bird;
  constructor(data, bird) {
    this.#bird = bird;
  }

  get plumage() {
    return this.#bird.#plumage || "보통이다";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallowDelegate extends SpeciesDelegate {
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallowDelegate extends SpeciesDelegate {
  #numberOfCoconuts;
  constructor(data, bird) {
    super(data, bird);

    this.#numberOfCoconuts = data.numberOfCoconuts;
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.#numberOfCoconuts;
  }
}

class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  #voltage;
  #isNailed;
  constructor(data, bird) {
    super(data, bird);

    this.#voltage = data.voltage;
    this.#isNailed = data.isNailed;
  }

  get plumage() {
    if (this.#voltage > 100) {
      return "그을렸다";
    } else {
      return this.#plumage || "예쁘다";
    }
  }

  get airSpeedVelocity() {
    return this.#isNailed ? 0 : 10 + this.#voltage / 10;
  }
}
