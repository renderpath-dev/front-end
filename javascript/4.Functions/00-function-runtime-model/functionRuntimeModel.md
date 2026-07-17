# Function runtime model

Definition time:
- A function object is created.
- The parameter list is stored.
- The function body is stored.
- The lexical environment is connected.

Call time:
- A new execution context is created.
- The call form decides this, except for arrow functions.
- Arguments are bound to parameters by position.
- The function body runs.
- The call returns a value or undefined.

Questions for every function example:
1. Which function object was created?
2. Which call expression invoked it?
3. What was this during the call?
4. Which arguments were bound to which parameters?
5. Did the function capture an outer lexical binding?
6. What value did the call return?