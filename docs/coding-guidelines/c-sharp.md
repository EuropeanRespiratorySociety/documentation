# C# Style Guide

## Clases
1. Use `PascalCase` for class name, `camelCase` for methods (confilct with .NET, but makes it consitent with the rest)
    ```c#
    public class ClientActivity {
        public void clearStatistics() {
            //...
        }
        public void calculateStatistics() {
            //...
        }
    }
    ```

2. Prefix interfaces with `I` (to be consistent with .NET) interfaces are nouns (noun phrases) or adjectives
    ```c#
    public interface IShape {
    }
    public interface IShapeCollection {
    }
    public interface IGroupable {
    }
   ```
3. Name source files according to their main classes.
   ```c#
    // Located in Task.cs
    public partial class Task {
        //...
    }
    // Located in Task.generated.cs
    public partial class Task {
        //...
    }
   ```
4. Use `camelCase` for method arguments and local variables
   ```c#
   public class UserLog {
        public void add(LogEvent logEvent) {
            int itemCount = logEvent.Items.Count;
            // ...
        }
    }
   ```
5. organize namespaces with a clearly defined structure
    ```c#
    // Examples
    namespace Company.Product.Module.SubModule
    namespace Product.Module.Component
    namespace Product.Layer.Module.Group
    ```
