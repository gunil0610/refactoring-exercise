export function createStatement(invoice, plays) {
  const statement = {};
  statement.customer = invoice.customer;
  statement.performances = invoice.performances.map(enrichPerformance);
  statement.totalAmount = totalAmount(statement.performances);
  statement.totalCredits = totalCredits(statement.performances);
  return statement;

  function enrichPerformance(performance) {
    const result = { ...performance };
    result.play = playFor(performance);
    result.amount = amountFor(result);
    result.credits = creditsFor(result);
    return result;
  }

  function playFor(performance) {
    return plays[performance.playID];
  }

  function amountFor(performance) {
    switch (performance.play.type) {
      case "tragedy": // 비극
        return performance.audience > 30
          ? 40000 + 1000 * (performance.audience - 30)
          : 40000;

      case "comedy": // 희극
        return performance.audience > 20
          ? 30000 + 800 * performance.audience
          : 30000 + 300 * performance.audience;

      default:
        throw new Error(`알 수 없는 장르: ${performance.play.type}`);
    }
  }

  function creditsFor(performance) {
    return performance.play.type === "comedy"
      ? Math.max(performance.audience - 30, 0) +
          Math.floor(performance.audience / 5)
      : Math.max(performance.audience - 30, 0);
  }

  function totalAmount(performances) {
    return performances.reduce((sum, p) => (sum += p.amount), 0);
  }

  function totalCredits(performances) {
    return performances.reduce((sum, p) => (sum += p.credits), 0);
  }
}
