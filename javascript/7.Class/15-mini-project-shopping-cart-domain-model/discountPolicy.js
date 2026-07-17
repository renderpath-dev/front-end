// Goal:
// Define discount policy classes.

export class DiscountPolicy {
  apply(subtotalCents) {
    return subtotalCents;
  }
}

export class PercentageDiscountPolicy extends DiscountPolicy {
  constructor(percent) {
    super();

    if (percent < 0 || percent > 100) {
      throw new RangeError("percent must be between 0 and 100");
    }

    this.percent = percent;
  }

  apply(subtotalCents) {
    return Math.round(subtotalCents * (1 - this.percent / 100));
  }
}
