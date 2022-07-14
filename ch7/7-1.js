import _ from "lodash";

class Organization {
  #name;
  #country;
  #data;
  constructor(data) {
    this.#data = data;
    this.#name = data.name;
    this.#country = data.country;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    this.#name = value;
  }

  get country() {
    return this.#country;
  }

  get rawData() {
    return _.cloneDeep(this.#data);
  }
}

const organization = new Organization({
  name: "Acme Gooseberries",
  country: "GB",
});

organization.name = "Dream Coding";
console.log(organization.name);
console.log(organization.country);
console.log(organization.rawData);
