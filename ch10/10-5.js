class Hotel {
  constructor() {
    this.rooms = [];
  }

  addRoom(roomNumber) {
    this.rooms[roomNumber] = new Room(roomNumber);
  }

  emptyRoom(roomNumber) {
    // this.rooms[roomNumber] = null; // BAD
    this.rooms[roomNumber] = new EmptyRoom(roomNumber); // BAD
  }

  cleanRooms() {
    this.rooms.forEach((room) => room.clean());
  }
}

class Room {
  constructor(roomNumber) {
    this.roomNumber = roomNumber;
  }

  clean() {
    console.log("clean");
  }
}

class EmptyRoom extends Room {
  clean() {
    console.log("it's empty");
  }
}

export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer === "unknown"
      ? new UnknownCustomer()
      : new Customer(this._customer);
  }
}

class UnknownCustomer extends Customer {
  get name() {
    return "occupant";
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  let customerName = aCustomer.name;

  return customerName;
}
