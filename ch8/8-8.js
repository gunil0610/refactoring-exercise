export function acquireData(input) {
  return input
    .split("\n")
    .splice(1)
    .filter((line) => line.trim() && line.split(",")[1].trim() === "India")
    .map((line) => ({
      city: line.split(",")[0].trim(),
      phone: line.split(",")[2].trim(),
    }));
}

const input = `office, country, telephone\n
Chicago, USA, +1 312 373 1000\n
Beijing, China, +86 4008 900 505\n
Bangalore, India, +91 80 4064 9570\n
Porto Alegre, Brazil, +55 51 3079 3550\n
Chennai, India, +91 44 660 44766`;
const result = acquireData(input);
console.log(result);
