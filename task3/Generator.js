/**
 * * Generators in JavaScript:
 * * They are a special type of function in JavaScript introduced in ES6.
 * * It will return a Generator object that conforms to both the iterable protocol and the iterator protocol.
 * * Generator is a subclass of the hidden Iterator class.
 * *********************************************************************
 * ? How to define:
 * ? They are defined using the (function*) syntax and can pause and resume their execution using the yield keyword.
 * *********************************************************************
 * ! Use cases in real-world JavaScript development:
 * * They can be used to handle lazy evaluation, where data is generated only when needed, reducing memory usage
 * * or to work with asynchronous streams of data like files, HTTP responses, or WebSocket messages
 */

/**
 * TODO: Example of Generator in JavaScript
 */

function* helloWorld() {
  yield "Hello";
  yield "World";
}

const gen = helloWorld(); // "Generator { }"
/**
 * * The generator return an object with two keys value and done
 * * The value will take the yield value each iterate
 * * The boolean done will be false until the last yield reached
 */
console.log(gen.next()); // { value: 'Hello', done: false }
console.log(gen.next()); // { value: 'World', done: false }
console.log(gen.next()); // { value: undefined, done: true }
