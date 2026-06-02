// Goal:
// Customize Object.prototype.toString output.

class ValidationReport {
  get [Symbol.toStringTag]() {
    return 'ValidationReport';
  }
}

const reportInstance = new ValidationReport();

console.log(Object.prototype.toString.call(reportInstance));
