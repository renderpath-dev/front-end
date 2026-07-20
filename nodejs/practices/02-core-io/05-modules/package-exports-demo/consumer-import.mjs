import { formatStatus } from 'package-exports-demo';
import { parseStatus } from 'package-exports-demo/parser';

console.log(formatStatus(parseStatus('200')));
