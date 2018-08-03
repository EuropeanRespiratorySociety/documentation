1. Use tooling available to enforce guidelines for the language in JS this would be for example [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). 
2. Line length no more than 80 characters. This also helps with the output in the console and makes it more readable
3. Tab vs four spaces -> configure the tab to do 4 spaces… like this those who want to waste time typing 4 key stroke, can, but those who want to use the tab key can as well. Why not tabs? Simply because tabs are length is rendered differently in different systems and editors, which can lead weird results.
4. Start curly Braces on the same line as the class method or function delcaration.
    ```c#
    class Program {
        static void Main(string[] args) {
        }
    }
    ```
5. Avoid side effects (modify things in the global scope for example our outside of the function doing the job)
6. Code review seems necessary. This is not a judgemental thing. It is not to find out who is the best. It is meant to help each other become more proficient. If I (Samuel) had to write a JSON endpoint in C# I would not really know where to start. I could write something that works but that is ugly and unmaintainable, it would be best for me to look at my peers and ask for help. 
7. Enforce Pull Requests like mechanism
8. Use the latest feature of a language. These needs to be learned so we need to invest time in this.

# Functions/methods
> “The first rule of functions is that they should be small. The second rule of functions is that they should be smaller than that”

1. No more than 25 lines. This is an arbitrary number, but probably if the function is longer it needs to be refactored
2. No more than 3 parameters… 
    1. no parameters, this mean the function is probably having a side effect, 
    2. 1 parameter this is perfect and mathematical f(a) -> b This is the best function as it is easy to test.
    3. 2 parameters, the function is somehow configurable complexity increase but that is ok
    4. 3 parameters there is some rare edge case to handle, most likely the third parameter needs to have a default value.
    5. 4 parameters this is Pandora box, and most likely that function can be refactored there is a block that can be extracted etc.  
    6. If more than 4 is necessary, consider passing one object to the function. (But seriously, refactor)
3.	Referential transparency. `f(a:int, b:int) -> a + b` can be replace by `2 + 2` or by `4`. Therefore, tests are easy.
4.	No side effects. The function takes a value, and returns a value, it should not modify anything outside its scope.  Side effects also means that with the same input you get the same output, always. And it should comply to the referential transparency principle.  The following function is dangerous as it has sides effect.
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

# Naming conventions
Names should be simple and explicit and not reduntant.
```c#
    // bad (useless information)
    public enum coinEnum {
        Penny,
        Nickel,
        Dime,
        Quarter,
        Dollar
    }
    
    // good
    public enum coin {
        Penny,
        Nickel,
        Dime,
        Quarter,
        Dollar
    }

    // bad
    public async Example methodAsync(Soemthing something) {
	
    }

    // good
    public async Example method(Soemthing something) {
	
    }
```

## Class names
Classes and objects should have noun or noun phrase names like Customer, WikiPage, Account, and AddressParser. Avoid words like Manager, Processor, Data, or Info in the name of a class. A class name should not be a verb.

1. use PascalCasing for class names.
    ```c#
    public class ClientActivity
    { 
    }
    ```
## Method/Function names
1. Methods should have verb or verb phrase names like postPayment, deletePage, or save.
2. Give it non-redundant meaningful names. We are doing poetry, so… I would rather read:

    ```js
    await getUser(id) 
    await addMembership(membership) 
    await saveUser(user)
    ```
We know what is happening, everything is clear if we need the implementation details we can dig in.
3. use camelCasing for method arguments and local variables.
4. Pick one word per concept
   This one is super important. When starting to have a really big code base, the team might start failing to be consistent in the concepts. That might end up having a fetch, retrieve, and get as equivalent methods of different classes.

   Imagine you use fetch to call an api that populates your object and get to just return the value of some property. What if you start confusing the two ? You’ll need to always check what is the behaviour of that specific method if you don’t stick with the concept.

   Pick one word for one abstract concept and stick with it.

## Variable names
1. use camelcasing
2. use meaningful name
3. Do not use redundant information
    ```c#
    // Correct
    int counter;
    string name;
    
    // Avoid
    int iCounter;
    string strName;
    ```
4. use `_` for private variables
   ```c#
    // Correct
    public DateTime clientAppointment;
    public TimeSpan timeLeft;
    
    // Avoid
    public DateTime client_Appointment;
    public TimeSpan time_Left;
    
    // Exception
    private DateTime _registrationDate;
   ```
5. Avoid abreviations but commonly used ones such as `http`, `xml`, `ftp`, `uri`, `id`...
    ```c#
    // Correct
    UserGroup userGroup;
    Assignment employeeAssignment;
    
    // Avoid
    UserGroup usrGrp;
    Assignment empAssignment;
    
    // Exceptions
    CustomerId customerId;
    XmlDocument xmlDocument;
    FtpHelper ftpHelper;
    UriPart uriPart;
    ```

6. Capitalize abreviations: abreviation > 2 characters ? `PascalCase` : `Both uppercase`
    ```c#
        HtmlHelper htmlHelper;
        FtpTransfer ftpTransfer;
        UIControl uiControl;
    ```