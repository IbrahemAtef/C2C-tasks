/**
 * * Iterable Protocol in JavaScript :
 * ! Before we talk about Iterable Protocol I will talk about:
 * ? ** Iteration protocols which aren't new built-ins or syntax, but protocols.
 * ? These protocols can be implemented by any object by following some conventions.
 * ? which are two protocols (iterable protocol, iterator protocol)
 * *********************************************************************************
 * * The First protocol (Iterable Protocol): is a feature in JavaScript that allows objects to define or customize their iteration behavior.
 * * Benefits: it enables objects to be used in constructs like for...of loops, the spread operator (...), Array.from(), and others.
 *
 * * How to make an object iterated: By calling [Symbol.iterator]() method with no arguments
 * * and the returned iterator is used to obtain the values to be iterated.
 * *********************************************************************************
 * * The Second protocol (Iterator Protocol): defines a standard way to produce a sequence of values (either finite or infinite),
 * * and potentially a return value when all values have been generated.
 * *********************************************************************************
 * ! Use cases in real-world JavaScript development:
 * * It's very crucial in many areas of modern JavaScript such as the Built-in data structures like arrays, strings, sets, and maps all implement this protocol.
 * * It also powers features like destructuring and asynchronous iteration
 */

/**
 * TODO: Example of Iterable Protocol
 */
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
  },
};

/**
 ** It will recognize the object myIterable as iterable object like array and then i can use it with the spread operator
 */
console.log([...myIterable]);
