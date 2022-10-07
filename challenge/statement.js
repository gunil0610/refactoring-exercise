function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
}

export function statement(invoice, plays) {
  const statement = {};
  statement.customer = invoice.customer;
  statement.performances = invoice.performances;
  return renderPlainText(statement, plays);
}

function renderPlainText(statement, plays) {
  let result = `청구 내역 (고객명: ${statement.customer})\n`;

  for (let perf of statement.performances) {
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트: ${totalCredits()}점\n`;
  return result;

  function playFor(performance) {
    return plays[performance.playID];
  }

  function creditsFor(performance) {
    return playFor(performance).type === "comedy"
      ? Math.max(performance.audience - 30, 0) +
          Math.floor(performance.audience / 5)
      : Math.max(performance.audience - 30, 0);
  }

  function amountFor(performance) {
    switch (playFor(performance).type) {
      case "tragedy": // 비극
        return performance.audience > 30
          ? 40000 + 1000 * (performance.audience - 30)
          : 40000;

      case "comedy": // 희극
        return performance.audience > 20
          ? 30000 + 800 * performance.audience
          : 30000 + 300 * performance.audience;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }
  }

  function totalAmount() {
    return statement.performances.reduce((sum, p) => sum + amountFor(p), 0);
  }

  function totalCredits() {
    return statement.performances.reduce((sum, p) => sum + creditsFor(p), 0);
  }
}

class Statement {
  #customer;
  #performances;
  #plays;
  #result;

  constructor(invoice, plays) {
    this.#customer = invoice.customer;
    this.#performances = invoice.performances;
    this.#plays = plays;
  }

  playFor(performance) {
    return this.#plays[performance.playID];
  }

  creditsFor(performance) {
    return this.playFor(performance).type === "comedy"
      ? Math.max(performance.audience - 30, 0) +
          Math.floor(performance.audience / 5)
      : Math.max(performance.audience - 30, 0);
  }

  amountFor(performance) {
    let result = 0;
    switch (this.playFor(performance).type) {
      case "tragedy": // 비극
        result =
          performance.audience > 30
            ? 40000 + 1000 * (performance.audience - 30)
            : 40000;
        break;
      case "comedy": // 희극
        result =
          performance.audience > 20
            ? 30000 + 800 * performance.audience
            : 30000 + 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.playFor(performance).type}`);
    }
    return result;
  }

  get totalAmount() {
    return this.#performances.reduce((sum, p) => sum + this.amountFor(p), 0);
  }

  get totalCredits() {
    return this.#performances.reduce((sum, p) => sum + this.creditsFor(p), 0);
  }

  print() {
    this.#result = `청구 내역 (고객명: ${this.#customer})\n`;
    this.#performances.forEach((perf) => {
      // 청구 내역을 출력한다.
      this.#result += `  ${this.playFor(perf).name}: ${usd(
        this.amountFor(perf) / 100
      )} (${perf.audience}석)\n`;
    });
    this.#result += `총액: ${usd(this.totalAmount / 100)}\n`;
    this.#result += `적립 포인트: ${this.totalCredits}점\n`;
    return this.#result;
  }

  printHtml() {
    this.#result = `<h1>청구 내역 (고객명: ${this.#customer})</h1>`;
  }
}

// 사용예:
const playsJSON = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoicesJSON = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

const result2 = new Statement(invoicesJSON[0], playsJSON);
const result = statement(invoicesJSON[0], playsJSON);
const expected =
  "청구 내역 (고객명: BigCo)\n" +
  "  Hamlet: $650.00 (55석)\n" +
  "  As You Like It: $580.00 (35석)\n" +
  "  Othello: $500.00 (40석)\n" +
  "총액: $1,730.00\n" +
  "적립 포인트: 47점\n";
console.log(result);
console.log(result === expected);
console.log(result2.print());
console.log(result2.print() === expected);
