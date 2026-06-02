// Goal:
// Compose modules, generators, and iterable processing.

import { orderRecordList } from './data/orderRecords.js';
import { createBatchGenerator } from './iterables/batchIterable.js';
import {
  createOrderLineGenerator,
  createRegionSummaryGenerator,
} from './iterables/orderFormatterGenerator.js';

for (const orderBatch of createBatchGenerator(orderRecordList, 2)) {
  console.log('batch-start');

  for (const orderLine of createOrderLineGenerator(orderBatch)) {
    console.log(orderLine);
  }
}

console.log('summary-start');

for (const summaryLine of createRegionSummaryGenerator(orderRecordList)) {
  console.log(summaryLine);
}
