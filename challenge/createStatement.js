class Performance {
  #audience;
  #play;
  constructor(audience, play) {
    this.#audience = audience;
    this.#play = play;
  }

  get play() {
    return this.#play;
  }

  get audience() {
    return this.#audience;
  }

  get amount() {
    switch (this.#play.type) {
      case "tragedy": // 비극
        return this.#audience > 30
          ? 40000 + 1000 * (this.#audience - 30)
          : 40000;

      case "comedy": // 희극
        return this.#audience > 20
          ? 30000 + 800 * this.#audience
          : 30000 + 300 * this.#audience;

      default:
        throw new Error(`알 수 없는 장르: ${performance.play.type}`);
    }
  }

  get credits() {
    return this.#play.type === "comedy"
      ? Math.max(this.#audience - 30, 0) + Math.floor(this.#audience / 5)
      : Math.max(this.#audience - 30, 0);
  }
}

export function createStatement(invoice, plays) {
  const statement = {};
  statement.customer = invoice.customer;
  statement.performances = invoice.performances.map(
    (p) => new Performance(p.audience, plays[p.playID])
  );
  statement.totalAmount = totalAmount(statement.performances);
  statement.totalCredits = totalCredits(statement.performances);
  return statement;

  function totalAmount(performances) {
    return performances.reduce((sum, p) => (sum += p.amount), 0);
  }

  function totalCredits(performances) {
    return performances.reduce((sum, p) => (sum += p.credits), 0);
  }
}
