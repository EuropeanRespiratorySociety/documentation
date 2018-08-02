1.	Use tooling available to enforce guidelines for the language in JS this would be for example [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). 
2.	Line length no more than 80 characters. This also helps with the output in the console and makes it more readable
3.	Tab vs four spaces -> configure the tab to do 4 spaces… like this those who want to waste time typing 4 key stroke, can, but those who want to use the tab key can as well. Why not tabs? Simply because tabs are length is rendered differently in different systems and editors, which can lead weird results.
4.	Avoid side effects (modify things in the global scope for example our outside of the function doing the job)
5.	Code review seems necessary. This is not a judgemental thing. It is not to find out who is the best. It is meant to help each other become more proficient. If I (Samuel) had to write a JSON endpoint in C# I would not really know where to start. I could write something that works but that is ugly and unmaintainable, it would be best for me to look at my peers and ask for help. 
6. Enforce Pull Requests like mechanism
7.	Use the latest feature of a language. These needs to be learned so we need to invest time in this.

# Functions/methods
1.	Give it non-redundant meaningful names. We are doing poetry, so… I would rather read:

```js
await getTheUser(id) 
await addTheMembership(membership) 
await saveTheUser(user)
```
We know what is happening, everything is clear if we need the implementation details we can dig in. 
2.	No more than 25 lines. This is an arbitrary number, but probably if the function is longer it needs to be refactored
3.	No more than 3 parameters… 
    a.	no parameters, this mean the function is probably having a side effect, 
    b.	1 parameter this is perfect and mathematical f(a) -> b This is the best function as it is easy to test.
    c.	2 parameters, the function is somehow configurable complexity increase but that is ok
    d.	3 parameters there is some rare edge case to handle, most likely the third parameter needs to have a default value.
    e.	4 parameters this is Pandora box, and most likely that function can be refactored there is a block that can be extracted etc.  
    f.	If more than 4 is necessary, consider passing one object to the function. (But seriously, refactor)
4.	Referential transparency. `f(a:int, b:int) -> a + b` can be replace by `2 + 2` or by `4`. Therefore, tests are easy.
5.	No side effects. The function takes a value, and returns a value, it should not modify anything outside its scope.  Side effects also means that with the same input you get the same output, always. And it should comply to the referential transparency principle.  The following function is dangerous as it has sides effect.
```js
list = [1,2,3]
function map (functionToApply) {
    let i = 0;
    for(i; i < list.length; i++){
	list[i] = functionToApply(list[i]))
    }
}
```
It modifies the list variable that might be modified by other functions or the map function modify the list used later on from somewhere unexpected when map(addOne)is called you are not really sure what happens… it will add one to list whatever its value is or needs to be.

The side effects free function looks like this:

```js
function map (list, functionToApply) {
    let result = []
    let i = 0;
    for(i; i < list.length; i++){
	result.push(functionToApply(list[i]))
    }
   return result
}
```

This function has internal side effect, but that is ok as it does not modify anything outside its scope and returns a new list with the modified items. It is also referentially transparent as the result of the map function can be swapped for its results. If we consider the list parameter to equal [1, 2, 3] the function to apply to actually add 1 then the result array should be [2, 3, 4]. It can be swapped, and actually the test is already written (part of it). 

Here is the same side effect problem represented as a Class. The method map is the method that has side effects

```js
class Something {
    list: [1, 2, 3]
    map: map
}

obj = new Something()
obj.map()
> obj.list === [2, 3, 4] //true
obj.map()
> obj.list === [2, 3, 4] // false
```

I let you imagine why this is bad practice in a big project as it makes debugging, very complicated.

