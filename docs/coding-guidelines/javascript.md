# Javscript

## When to use =>
The arrow function is very helpful to write consise code. They are called "Fat arrow". They are:

1. Anonymous, basically it could be compared to a lambda
2. They change the way `this` binds to functions

So with arrow functions, we do not have to type the `function` and the `return` keyword.

The fat arrow cannot blindly replace function declarations. Basically everytime you need to access `this` of the current environement which is traditionally passed down with `const self = this` you can replace it by an arrow function. 

```js
const obj = {
  prop: 'test',
  foo: function () {
    const self = this
    bar()
    function bar() {
      console.log(self)
    }
  }
}
obj.foo() // { prop: 'test', foo: [Function: foo] }
```
There are three JavaScript methods that can be use to bind the context `call()`, `apply()` and `bind()`. They are quite similar. The difference is that unlike the two others `bind()` is not called immediately but returns a closure.

Same result but with the fat arrow.
```js
const obj = {
  prop: 'test',
  foo: function () {
    const bar = () => {
      console.log(this)
    }
    bar()
  }
}
obj.foo()
// { prop: 'test', foo: [Function: foo] }
```
`this` did behave like we expected. Additionnaly, arrow function cannot 
* be called with `new`
* be called with `bind()` or `call()`

Arrow functions are only __callable__ and class functions are only __constructors__ while function expression are both.

We have seen that arrow function cannot use `bind()`. When Vuejs creates a component instance, it uses `bind()` behind the scene. Therefore we need to declare methods with function expressions:

```js
  methods: {
    someFunction() { 
      // at the moment, `this` points to the `methods` object that the function is defined in.
    },
    someOtherFunction() {
      this.someFunction(); // this should give an error
    }

  }
```
But when the component is instanciated, `this` is bound to the component instance and not anymore to the methods object wich allows to call `this.someFunction()` or `this.nameOfAVariable()`


## The this Context
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
In an object, a method will behave has we expect

In objects, this
```js{3}
var obj = {
    foo: function() {
        return this;   
    }
};

obj.foo() === obj; // true
```

On the other hand a function using this uses the global context:
```js
function foo() {
    console.log(this);
}
// window
```
But you can "instantiate" a class from a function, therefore using the above function with the `new` keyword:

```js
new foo()
// foo
```
Notice that `this` is correctly bound to the newly created object. It works like creation of the object in the first example. Like in other language, the `new` keyword calls a constructor. Therefore we could:

```js
function Foo(bar) { // it's a class so we use uppercase
    this.bar = bar
}
```

I can instantiate many objects:
```js
const obj1 = new Foo('test');
const obj2 = new Foo('test2');
```

And if I call a method on obj1:

```js
console.log(obj1.method())
// TypeError: obj1.method is not a function
```

Of course it crashes, we did  not define it. Let's add it to the object
```js
obj1.method = function () {
  return 'method called';
}

obj1.method();
// method called

obj2.method();
// TypeError: obj2.method is not a function
```

The method does not exist on `obj2` it was added to the instance of `obj1`
So we coud try to add it to `Foo` our class

```js
Foo.method2 = function() {
  return 'method2 called',
}
obj1.method2();
obj2.method2();
// TypeError: obj1.method2 is not a function
// TypeError: obj2.method2 is not a function 
Foo.method2();
// method2 called
```
So method 2 has been added to the instance the function object `Foo` but it did not spread to the instatiated objects. This is because JavaScript is a language with prototypes. If we want to modifiy the Class we actually need to modify the prototype of the function.

So let's modify the prototype:

```js
Foo.prototype.method3 = function() {
    console.log(this);
    return 'hello method 3';
}
```

Now both objects have a method available.
```js
console.log(obj2.method3())
// Foo {}
// hello method 3
```
This in the context of `method3()` would be exactly what we expect this would reference `Foo`
Members or properties of a Class work in the exact same manner.

```js
Foo.prototype.color = 'black'
```
And both object would print `black` if `obj1.color` or `obj2.color` was called.

But if I set a new color to `obj1`: 
```js
obj1.color = 'white';
```
If we log it, it correctly prints `white` and this happens:

```js
console.log(obj1.__proto__.color) // black
console.log(obj2.__proto__.color) // black
console.log(obj1.color)  // white
console.log(obj2.color) // black
```
But wait... did we not declare obj1 as constant? Yes we did... The linter should pick it up. But we will speak more on that.

We digressed slightly on prototypes but what we saw so far is that the `this` keywords defaults to the global scope (window in the browser) when called as an unbound function.

This means that:
```js
const obj3 = {
  prop: 'test',
  foo: function () {
    bar()
    function bar() {
      console.log(this)
    }
  }
}
obj3.foo() // window
```
Yes, again the function `bar()` is unbound, this means that `this` refers to the window object. One of the method bind the context is to create a variable called by convention `self` and pass it down as a closure.

## Closures

## Rest and Spread




