# Loops and iteration

## 1.for statement
A for loop repeats until a specified condition evaluates to false. The JavaScript for loop is similar to the Java and C for loop.

A for statement looks as follows:  
`for (initialization condition afterthought) statement`

## 2.do...while statement

The do...while statement repeats until a specified condition evaluates to false.

A do...while statement looks as follows:  
`do statement while (condition);`

statement is always executed once before the condition is checked. (To execute multiple statements, use a block statement ({ }) to group those statements.)

If condition is true, the statement executes again. At the end of every execution, the condition is checked. When the condition is false, execution stops, and control passes to the statement following do...while.

**In the following example, the do loop iterates at least once and reiterates until `i` is no longer less than 5:**  
```javascript
let i =0;
do {
    i +=1;
    console.log(i)
} while (i<5)
```

## 3.while statement
A while `statement` executes its `statements` as long as a specified condition evaluates to true. A while statement looks as follows:  
`while (condition) Statement`

If the `condition` becomes `false`, `statement` within the loop stops executing and control passes to the `statement` following the loop.  

The condition test occurs before statement in the loop is executed. If the condition returns `true`, `statement` is executed and the condition is tested again. If the condition returns `false`, execution stops, and control is passed to the `statement` following while.  

The following while loop iterates as long as n is less than 3:
```javascript
let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}
```
With each iteration, the loop increments n and adds that value to x. Therefore, x and n take on the following values:
* After the first pass: `n` = `1` and `x` = `1`
* After the second pass: `n` = `2` and `x` = `3`
* After the third pass: `n` = `3` and `x` = `6`  

**After completing the third pass, the condition `n < 3` is no longer true, so the loop terminates.**  

**Avoid infinite loops. Make sure the `condition` in a loop eventually becomes false—otherwise, the loop will never terminate! The statements in the following while loop execute forever because the condition never becomes `false`:**  
```javascript
// Infinite loops are bad!
while (true) {
  console.log("Hello, world!");
}
```  
# 4.break statement
Use the break statement to terminate a loop, switch, or in conjunction with a labeled statement.  

* When you use break without a label, it terminates the innermost enclosing while, do-while, for, or switch immediately and transfers control to the following statement.  


* When you use break with a label, it terminates the specified labeled statement  

**The following example iterates through the elements in an array until it finds the index of an element whose value is theValue:**  
```javascript
for (let i = 0; i < a.length; i++) {
  if (a[i] === theValue) {
    break;
  }
}
```
