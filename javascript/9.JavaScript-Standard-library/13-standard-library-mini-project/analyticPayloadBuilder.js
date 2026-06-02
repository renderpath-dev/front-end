// Goal:
// Combine multiple Chapter 11 APIs in one realistic data-processing flow.

const analyticsUrl = new URL(
  'https://example.com/track?event=purchase&amount=1299.5',
);
const analyticsEventPattern = /^[a-z]+$/;
const analyticsEventName = analyticsUrl.searchParams.get('event');
const analyticsAmountText = analyticsUrl.searchParams.get('amount');

if (
  analyticsEventName === null ||
  !analyticsEventPattern.test(analyticsEventName)
) {
  throw new Error('Invalid analytics event name');
}

const analyticsAmountValue = Number(analyticsAmountText);

if (!Number.isFinite(analyticsAmountValue)) {
  throw new TypeError('Analytics amount must be numeric');
}

const analyticsPayloadMap = new Map();
analyticsPayloadMap.set('event', analyticsEventName);
analyticsPayloadMap.set('amount', analyticsAmountValue);
analyticsPayloadMap.set('createdAt', new Date().toISOString());

const analyticsFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const analyticsPayloadRecord = Object.fromEntries(analyticsPayloadMap);
const analyticsPayloadJson = JSON.stringify(analyticsPayloadRecord);

console.table([analyticsPayloadRecord]);
console.log(analyticsFormatter.format(analyticsAmountValue));
console.log(analyticsPayloadJson);
