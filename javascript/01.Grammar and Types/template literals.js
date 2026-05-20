const formatArg = (arg) => {
  if (Array.isArray(arg)) {
    return arg.map((part) => `--${part}`).join('\n');
  }
  if (arg.toString === Object.prototype.toString) {
    return JSON.stringify(arg);
  }
  return arg;
};

const print = (segments,...args) => {
  let message = segments[0];
  segments.slice(1).forEach((segment, index) => {
    message += formatArg(args[index]) + segment;
  });
  console.log(message);
};

const todos = [
  "Learn JavaScript",
  "Learn WebAPIs",
  "Set up my website",
  "Profit",
];

const progress = {javascript:20,html:50,css:10};
print `I need to do: ${todos} 
My current progress is ${progress}!`;