// 예제 1
function setWidth(value){
  this._height = value;
}

function setHeight(value){
  this._width = value;
}

// 예제 2
class Concert {
  regularBook(customer) {}
  premiumBook(customer) {}
  // 내부적으로 중복되는 로직이 많다면, 이렇게 내부에서만 사용하도록 해도 OK
  #book(customer, isPremium){}
}

// 예제 3
function switchOn();
function switchOff();
