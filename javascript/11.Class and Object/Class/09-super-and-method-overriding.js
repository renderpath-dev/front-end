'use strict';

// Goal:
// Separate subclass extension, super calls, and method overriding.

class StandardShippingQuote {
  constructor(destinationRegion, packageWeight) {
    this.destinationRegion = destinationRegion;
    this.packageWeight = packageWeight;
  }

  calculateShippingCost() {
    return this.packageWeight * 5;
  }

  buildShippingSummary() {
    return `${this.destinationRegion}: $${this.calculateShippingCost()}`;
  }
}

class ExpressShippingQuote extends StandardShippingQuote {
  constructor(destinationRegion, packageWeight, speedMultiplier) {
    super(destinationRegion, packageWeight);
    this.speedMultiplier = speedMultiplier;
  }

  // This is a new method, not an override.
  calculateExpressCost() {
    return super.calculateShippingCost() * this.speedMultiplier;
  }

  // This is also a new method, not an override.
  buildExpressSummary() {
    return `${super.buildShippingSummary()} with express total $${this.calculateExpressCost()}`;
  }
}

const expressShippingQuote = new ExpressShippingQuote('West Coast', 4, 2);

console.log(expressShippingQuote.calculateShippingCost());
console.log(expressShippingQuote.calculateExpressCost());
console.log(expressShippingQuote.buildExpressSummary());

// Method overriding uses the same method name in the child class.
class RegularFreightEstimate {
  constructor(regionLabel, weightAmount) {
    this.regionLabel = regionLabel;
    this.weightAmount = weightAmount;
  }

  calculateFreightCost() {
    return this.weightAmount * 5;
  }

  createFreightSummary() {
    return `${this.regionLabel}: $${this.calculateFreightCost()}`;
  }
}

class RushFreightEstimate extends RegularFreightEstimate {
  constructor(regionLabel, weightAmount, rushRate) {
    super(regionLabel, weightAmount);
    this.rushRate = rushRate;
  }

  calculateFreightCost() {
    return super.calculateFreightCost() * this.rushRate;
  }

  createFreightSummary() {
    return `${this.regionLabel}: rush total $${this.calculateFreightCost()}`;
  }
}

const rushFreightEstimate = new RushFreightEstimate('North Zone', 8, 2);

console.log(rushFreightEstimate.calculateFreightCost());
console.log(rushFreightEstimate.createFreightSummary());

// Scene 1: The subclass replaces a parent default behavior.
class PaymentRequestValidator {
  validatePaymentRequest(paymentAmount) {
    return paymentAmount > 0;
  }
}

class GiftCardRequestValidator extends PaymentRequestValidator {
  validatePaymentRequest(paymentAmount) {
    return paymentAmount >= 5 && paymentAmount <= 500;
  }
}

const giftCardRequestValidator = new GiftCardRequestValidator();

console.log(giftCardRequestValidator.validatePaymentRequest(3));
console.log(giftCardRequestValidator.validatePaymentRequest(100));

// Scene 2: The subclass keeps the parent logic and appends its own logic.
class BasicNotificationMessage {
  createDisplayMessage() {
    return 'Notification received';
  }
}

class WarningNotificationMessage extends BasicNotificationMessage {
  createDisplayMessage() {
    return `${super.createDisplayMessage()}: check system status`;
  }
}

const warningNotificationMessage = new WarningNotificationMessage();

console.log(warningNotificationMessage.createDisplayMessage());

// Scene 3: Template method pattern.
// The parent defines the workflow; the child overrides one step.
class FormSubmissionWorkflow {
  submitFormData(rawFormData) {
    const cleanedFormData = this.normalizeFormData(rawFormData);

    if (!this.validateFormData(cleanedFormData)) {
      return 'Form validation failed';
    }

    return 'Form submitted';
  }

  normalizeFormData(rawFormData) {
    return rawFormData.trim();
  }

  validateFormData(cleanedFormData) {
    return cleanedFormData.length > 0;
  }
}

class EmailSignupWorkflow extends FormSubmissionWorkflow {
  validateFormData(cleanedFormData) {
    return cleanedFormData.includes('@');
  }
}

const emailSignupWorkflow = new EmailSignupWorkflow();

console.log(emailSignupWorkflow.submitFormData(' ada@example.com '));
console.log(emailSignupWorkflow.submitFormData(' invalid-email '));

// Scene 4: Polymorphism through a shared method name.
class ExportFileWriter {
  createFileContent(dataRows) {
    return String(dataRows);
  }
}

class CsvFileWriter extends ExportFileWriter {
  createFileContent(dataRows) {
    return dataRows.map((rowValues) => rowValues.join(',')).join('\n');
  }
}

class JsonFileWriter extends ExportFileWriter {
  createFileContent(dataRows) {
    return JSON.stringify(dataRows);
  }
}

function printExportPreview(fileWriter, dataRows) {
  console.log(fileWriter.createFileContent(dataRows));
}

const csvFileWriter = new CsvFileWriter();
const jsonFileWriter = new JsonFileWriter();

printExportPreview(csvFileWriter, [
  ['name', 'score'],
  ['Ada', 95],
]);

printExportPreview(jsonFileWriter, [
  ['name', 'score'],
  ['Ada', 95],
]);

// super in a static method calls a parent static method.
class BaseTrackingCodeFactory {
  static createPrefixText() {
    return 'TRK';
  }
}

class PriorityTrackingCodeFactory extends BaseTrackingCodeFactory {
  static createPriorityCode(sequenceNumber) {
    return `${super.createPrefixText()}-PRI-${sequenceNumber}`;
  }
}

console.log(PriorityTrackingCodeFactory.createPriorityCode(3001));
