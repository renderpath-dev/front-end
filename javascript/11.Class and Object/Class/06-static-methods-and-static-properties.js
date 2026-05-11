'use strict';

// Goal:
// Show that static members belong to the class itself, not to instances.

class DateLabelFormatter {
  static defaultSeparator = '-';

  static createIsoDateLabel(yearValue, monthValue, dayValue) {
    return [yearValue, monthValue, dayValue].join(
      DateLabelFormatter.defaultSeparator,
    );
  }
}

console.log(DateLabelFormatter.createIsoDateLabel(2026, 5, 4));
console.log(DateLabelFormatter.defaultSeparator);
console.log(Object.hasOwn(DateLabelFormatter, 'createIsoDateLabel'));
console.log(Object.hasOwn(DateLabelFormatter, 'defaultSeparator'));

// In a static method call, this usually points to the class used as the receiver.
class LocaleMessageFactory {
  static fallbackLanguage = 'en';

  static buildWelcomeText(displayName) {
    return `${this.fallbackLanguage}: Welcome ${displayName}`;
  }
}

console.log(LocaleMessageFactory.buildWelcomeText('Ada'));

// Static and instance members live in different places.
class InvoiceNumberFormatter {
  static prefixText = 'INV';

  constructor(sequenceValue) {
    this.sequenceValue = sequenceValue;
  }

  createInstanceLabel() {
    return `${InvoiceNumberFormatter.prefixText}-${this.sequenceValue}`;
  }

  static createPreviewLabel(sequenceValue) {
    return `${InvoiceNumberFormatter.prefixText}-${sequenceValue}`;
  }
}

const invoiceNumberRecord = new InvoiceNumberFormatter(1001);

console.log(invoiceNumberRecord.createInstanceLabel());
console.log(InvoiceNumberFormatter.createPreviewLabel(1002));
console.log(InvoiceNumberFormatter.prefixText);
console.log(invoiceNumberRecord.prefixText);

try {
  console.log(invoiceNumberRecord.createPreviewLabel(1003));
} catch (caughtStaticCallError) {
  console.log(caughtStaticCallError.name);
}

// Static blocks run once when the class is initialized.
class BuildStampRegistry {
  static buildMode = 'development';

  static {
    console.log('static block runs');
  }

  constructor(recordName) {
    console.log('constructor runs');
    this.recordName = recordName;
  }
}

console.log('after class');

const firstBuildStamp = new BuildStampRegistry('client');
const secondBuildStamp = new BuildStampRegistry('server');

console.log(firstBuildStamp.recordName);
console.log(secondBuildStamp.recordName);

// Static blocks are useful for multistep class-level initialization.
class StatusMessageRegistry {
  static messageMap = new Map();
  static defaultStatusCode;

  static {
    StatusMessageRegistry.messageMap.set('success', 'Operation completed');
    StatusMessageRegistry.messageMap.set('error', 'Operation failed');
    StatusMessageRegistry.messageMap.set('pending', 'Operation pending');

    StatusMessageRegistry.defaultStatusCode = 'pending';
  }

  static getMessage(statusCode) {
    if (StatusMessageRegistry.messageMap.has(statusCode)) {
      return StatusMessageRegistry.messageMap.get(statusCode);
    }

    return StatusMessageRegistry.messageMap.get(
      StatusMessageRegistry.defaultStatusCode,
    );
  }
}

console.log(StatusMessageRegistry.getMessage('success'));
console.log(StatusMessageRegistry.getMessage('unknown'));

// Static blocks can contain conditional logic.
class ThemeModeResolver {
  static defaultThemeMode;
  static allowedThemeModes;

  static {
    const preferredThemeMode = 'dark';

    ThemeModeResolver.allowedThemeModes = ['light', 'dark', 'system'];

    if (ThemeModeResolver.allowedThemeModes.includes(preferredThemeMode)) {
      ThemeModeResolver.defaultThemeMode = preferredThemeMode;
    } else {
      ThemeModeResolver.defaultThemeMode = 'system';
    }
  }

  static getDefaultThemeMode() {
    return ThemeModeResolver.defaultThemeMode;
  }
}

console.log(ThemeModeResolver.getDefaultThemeMode());

// Static blocks can contain try...catch for synchronous setup.
class JsonConfigParser {
  static parsedConfig;
  static parseErrorMessage;

  static {
    const rawConfigText = '{"pageSize":20,"layoutMode":"grid"}';

    try {
      JsonConfigParser.parsedConfig = JSON.parse(rawConfigText);
      JsonConfigParser.parseErrorMessage = null;
    } catch (parseError) {
      JsonConfigParser.parsedConfig = {};
      JsonConfigParser.parseErrorMessage = parseError.message;
    }
  }

  static getPageSize() {
    return JsonConfigParser.parsedConfig.pageSize ?? 10;
  }
}

console.log(JsonConfigParser.getPageSize());

// Static private fields belong to the class and are only accessible inside it.
class TokenRuleRegistry {
  static #ruleMap;

  static {
    TokenRuleRegistry.#ruleMap = new Map();

    TokenRuleRegistry.#ruleMap.set('access', 15);
    TokenRuleRegistry.#ruleMap.set('refresh', 1440);
  }

  static getExpirationMinutes(tokenType) {
    return TokenRuleRegistry.#ruleMap.get(tokenType);
  }
}

console.log(TokenRuleRegistry.getExpirationMinutes('access'));
console.log(TokenRuleRegistry.getExpirationMinutes('refresh'));

// Static methods can also use super to call parent static methods.
class BaseTrackingCodeFactory {
  static createPrefixText() {
    return 'TRK';
  }
}

class ExpressTrackingCodeFactory extends BaseTrackingCodeFactory {
  static createExpressCode(sequenceNumber) {
    return `${super.createPrefixText()}-EXP-${sequenceNumber}`;
  }
}

console.log(ExpressTrackingCodeFactory.createExpressCode(1001));
