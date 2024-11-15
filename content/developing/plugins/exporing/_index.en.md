---
title: Exporting Functions
weight: 15
---

In the Plugify ecosystem, functions can be exported to be accessible by other plugins. Typically, to export a function, it should be static in most cases. This approach ensures that the function can be called without instantiating an object, which simplifies integration and usage across different parts of the system.
However, some language modules, such as C# or Python, offer more flexibility and allow you to export member functions of the main Plugin class. This means that in these languages, you can export functions that are part of a class instance, providing greater flexibility and enabling more complex interactions within your plugin.
For languages that compile into dynamic link libraries (DLLs), such as C++ or C#, exported functions should be marked to be visible for exporting in the DLL. This is often achieved using specific compiler directives or attributes that indicate which functions should be accessible externally. Ensuring that functions are correctly marked for export is crucial for proper functionality within the Plugify framework.
In most cases, language modules use native basic types that directly map to C types. However, language modules might have marshaling function wrappers to convert object types like `plg::vector` or `plg::string` to native language types. These wrappers facilitate the conversion and ensure seamless integration and interaction with the plugin system.
When exporting functions, ensure that you follow the conventions and requirements of the specific language module you are using. Properly documented and accessible exported functions can significantly enhance the interoperability and functionality of your plugins within the Plugify ecosystem.

{{% notice info %}}
The use of the exporting function system is not the only way to enable communication between plugins. Some language modules, such as Python and C#, allow direct communication between plugins if they use the same language module. For example, C# plugins loaded by Mono/.NET into one domain can easily use each other's data. You just need to compile plugins where you use other compiled binaries as references. This capability can significantly simplify interactions and data sharing between plugins written in the same language.
{{% /notice %}}

## Basic Type mapping

The following lists how the types are exposed to the C++ API.

| Type                       | Alias    | Ref ? |
|----------------------------|----------|-------|
| void                       | void     | false |
| bool                       | bool     | true  |
| char                       | char8    | true  |
| char16_t                   | char16   | true  |
| int8_t                     | int8     | true  |
| int16_t                    | int16    | true  |
| int32_t                    | int32    | true  |
| int64_t                    | int64    | true  |
| uint8_t                    | uint8    | true  |
| uint16_t                   | uint16   | true  |
| uint32_t                   | uint32   | true  |
| uint64_t                   | uint64   | true  |
| uintptr_t                  | ptr64    | true  |
| uintptr_t                  | ptr32    | true  |
| float                      | float    | true  |
| double                     | double   | true  |
| void*                      | function | false |
| plg::string                | string   | true  |
| plg::vector\<bool\>        | bool*    | true  |
| plg::vector\<char\>        | char8*   | true  |
| plg::vector\<char16_t\>    | char16*  | true  |
| plg::vector\<int8_t\>      | int8*    | true  |
| plg::vector\<int16_t\>     | int16*   | true  |
| plg::vector\<int32_t\>     | int32*   | true  |
| plg::vector\<int64_t\>     | int64*   | true  |
| plg::vector\<uint8_t\>     | uint8*   | true  |
| plg::vector\<uint16_t\>    | uint16*  | true  |
| plg::vector\<uint32_t\>    | uint32*  | true  |
| plg::vector\<uint64_t\>    | uint64*  | true  |
| plg::vector\<uintptr_t\>   | ptr64*   | true  |
| plg::vector\<uintptr_t\>   | ptr32*   | true  |
| plg::vector\<float\>       | float*   | true  |
| plg::vector\<double\>      | double*  | true  |
| plg::vector\<plg::string\> | string*  | true  |
| plg::vec2                  | vec2     | true  |
| plg::vec3                  | vec3     | true  |
| plg::vec4                  | vec4     | true  |
| plg::mat4x4                | mat4x4   | true  |

## Exported Functions

### Example 1

- **Function Name:** Example_Function
- **Exported Method Name:** Example_Function_Exported_Name
- **Parameters:**
    - Parameter 1:
        - **Type:** ptr64
        - **Name:** param1
    - Parameter 2:
        - **Type:** string
        - **Name:** param2
    - Parameter 3:
        - **Type:** int32
        - **Name:** param3
    - Parameter 4:
        - **Type:** int8*
        - **Name:** param4
        - **Reference:** true
- **Return Type:** string

Here's an example template that combines these elements:

```json
{
  "name": "Example_Function",
  "funcName": "Example_Function_Exported_Name",
  "paramTypes": [
    {
      "type": "ptr64",
      "name": "param1"
    },
    {
      "type": "string",
      "name": "param2"
    },
    {
      "type": "int32",
      "name": "param3"
    },
    {
      "type": "int8*",
      "name": "param4",
      "ref": true
    }
  ],
  "retType": {
    "type": "string"
  }
}
```

How it will look like on plugin's side:

{{< tabs >}}
{{% tab name="c++" %}}
```c++
extern "C" 
PLUGIN_API plg::string Example_Function(void* p1, const plg::string& p2, int32_t p3, plg::vector<uint8_t>& p4) {
    return "Example_String";
}
```
{{% /tab %}}
{{% tab name=".net" %}}
```c#
namespace CSharpTest
{
    public class ExportClass
    {
	    public static string Example_Function(UIntPtr p1, string p2, int p3, byte[] p4)
        {
			// ... implementation
			return "Example_String"
        }
	}
}
```
{{% /tab %}}
{{% tab name="python" %}}
```python
def Example_Function(p1, p2, p3, p4)
	# ... implementation
	return "Example_String"
```
{{% /tab %}}
{{% tab name="go" %}}
```go
//export Example_Function
func Example_Function(p1 uintptr, p2 string, p3 int32, p4 []int8) string {
	// ... implementation
	return "Example_String"
}

```
{{% /tab %}}
{{< /tabs >}}

### Example 2

- **Function Name:** Example_Function
- **Exported Method Name:** Example_Function_Exported_Name
- **Parameters:**
    - Parameter 1:
        - **Type:** float
        - **Name:** param1
    - Parameter 2:
        - **Type:** double
        - **Name:** param2
        - **Reference:** true
    - Parameter 3:
        - **Type:** function
        - **Name:** param3
- **Return Type:** void

Here's an example template that combines these elements:

```json
{
  "name": "Example_Function",
  "funcName": "Example_Function_Exported_Name",
  "paramTypes": [
    {
      "type": "float",
      "name": "param1"
    },
    {
      "type": "double",
      "name": "param2",
      "ref": "true"
    },
    {
      "type": "function",
      "name": "param3",
      "prototype":
      {
        "name": "Example_Callback_Function",
        "funcName": "Example_Callback_Function_Exported_Name",
        "paramTypes": [
          {
            "type": "ptr64",
            "name": "param1"
          },
          {
            "type": "string",
            "name": "param2"
          },
          {
            "type": "int32",
            "name": "param3"
          }
        ],
        "retType": {
          "type": "string"
        }
      }
    }
  ],
  "retType": {
    "type": "int32"
  }
}
```

How it will look like on plugin's side:

{{< tabs >}}
{{% tab name="c++" %}}
```c++
using Example_Callback_Function = plg::string(*)(void*, const plg::string&, int32_t);
extern "C" 
PLUGIN_API int32_t Example_Function(float p1, double& p2, Example_Callback_Function p4) {
	// ... implementation
	return 0;
}
```
{{% /tab %}}
{{% tab name=".net" %}}
```c#
namespace CSharpTest
{
	public class ExportClass
	{
		delegate string Example_Callback_Function(UIntPtr p1, string p2, int p3);
	
		public static int Example_Function(float p1, ref double p2, Example_Callback_Function p4)
		{
			// ... implementation
			return 0;
		}
	}
}
```
{{% /tab %}}
{{% tab name="python" %}}
```python
def Example_Function(p1, p2, p3)
	# ... implementation
	return [0, p2] // ref parameter go to return tuple
```
{{% /tab %}}
{{% tab name="go" %}}
```go
//export Example_Function
func Example_Function(p1 float32, p2 *float64, p3 uintptr) int32 {
	// ... implementation
	// use 'cgo' to call function pointer yourself with marshaling using 'plugify.h' functions
	return 0
}
```
{{% /tab %}}
{{< /tabs >}}

### Example 3

- **Function Name:** Example_Function
- **Exported Method Name:** Example_Function_Exported_Name
- **Parameters:**
    - Parameter 1:
        - **Type:** char8
        - **Name:** param1
    - Parameter 2:
        - **Type:** double*
        - **Name:** param2
        - **Reference:** true
    - Parameter 3:
        - **Type:** vec3
        - **Name:** param3
- **Return Type:** string*

Here's an example template that combines these elements:

```json
{
  "name": "Example_Function",
  "funcName": "Example_Function_Exported_Name",
  "paramTypes": [
    {
      "type": "char8",
      "name": "param1"
    },
    {
      "type": "double*",
      "name": "param2",
      "ref": "true"
    },
    {
      "type": "vec3",
      "name": "param3"
    }
  ],
  "retType": {
    "type": "string*"
  }
}
```

How it will look like on plugin's side:

{{< tabs >}}
{{% tab name="c++" %}}
```c++
extern "C" 
PLUGIN_API plg::vector<plg::string> Example_Function(char p1, const plg::vector<double>& p2, const plugify::Vector3& p4) {
	return {"Example_String1", "Example_String2", "Example_String3"};
}
```
{{% /tab %}}
{{% tab name=".net" %}}
```c#
namespace CSharpTest
{
	public class ExportClass
	{
		public static string[] Example_Function(char p1, double[] p2, Vector3 p4)
		{
			// ... implementation
			return string[]{"Example_String1", "Example_String2", "Example_String3"};
		}
	}
}
```
{{% /tab %}}
{{% tab name="python" %}}
```python
def Example_Function(p1, p2, p3)
	# ... implementation
	ret = ["Example_String1", "Example_String2", "Example_String3"] 
	return ret
```
{{% /tab %}}
{{% tab name="go" %}}
```go
var globalString []string= []string{
	"Example_String1", "Example_String2", "Example_String3",
}

//export Example_Function
func Example_Function(p1 int8, p2 []float64, p3 C.Vector3) []string {
	// ... implementation
	return globalString # making sure that outputed data will be valid
	
}
```
{{% /tab %}}
{{< /tabs >}}

---

### Parameter and Return Type Conventions

To maintain consistency and adhere to the standard C calling conventions, all array, string, and POD (Plain Old Data) types in the API must be passed and returned in specific ways. This ensures compatibility with C linkage and minimizes issues with type handling across the boundary between C and C++.

1. Arrays:  
   All arrays, regardless of type, must be represented by `plg::vector<T>&` when passed to functions. Using `plg::vector<T>&` allows for flexible array handling without requiring explicit size information, which can be cumbersome to manage in C.

2. Strings:  
   For string data, use `plg::string&` as the parameter type. This ensures efficient reference passing and avoids unnecessary copies.

3. Structures:  
   POD types should also be passed by reference only. This includes structs and classes containing only trivial data (i.e., no non-trivial constructors, destructors, or member functions), ensuring efficient memory handling and minimal overhead.

4. Primitive Values (e.g., `int`, `float`, `double`):  
   Primitive values can be passed either by value or by reference. Passing by value is efficient and straightforward for small data types, while passing by reference can be beneficial for larger primitive types or when modification of the original value is required. Could be enabled by setting "ref" parameter to true.

Return Value Conventions

For compatibility with the standard C calling conventions, **all arrays, strings, and POD structures should be returned by value**. This allows the API to manage memory allocation and cleanup consistently, providing a simplified and efficient interface for users accessing the library from C.

Summary Table

| Type             | Parameter Passing Convention | Return Convention      |
|------------------|------------------------------|------------------------|
| Arrays           | `plg::vector<T>&`            | By value (standard C)  |
| Strings          | `plg::string&`               | By value (standard C)  |
| POD Structures   | Only by reference            | By value (standard C)  |
| Primitive Values | By value or by reference     | By value (standard C)  |

By adhering to these conventions, you can ensure efficient usage of the API and compatibility across C and C++ code.

### Return Workaround
You can use C linkage (to skip mangling/simplify symbol names) on C++-specific objects and types, but the environment referencing those symbols needs to be specified such that it can make sense of those objects. As our linking environment is also C++, this should not be a problem, assuming we use binary-compatible versions of the C++ `"plg"` library on "both sides". However, directly returning C++ objects from extern "C" functions can produce warnings, as C functions do not expect to see complex C++ objects by value. To address this, we employ a workaround by creating C-style structs that mirror the internal structure of the C++ objects and return those from the extern "C" functions instead. This avoids the warnings without suppressing them.

Here is an example to illustrate this approach:
```cpp
extern "C" PLUGIN_API plg::vec Example_FunctionReturnObject(char p1, const plg::vector<double>& p2, const plugify::Vector3& p4) {
	// Create a C-style struct that represents the internal structure of the C++ object.
	plg::vec ret;

	// Use `std::construct_at` to construct a `plg::vector<plg::string>` in the memory allocated for `ret`.
	std::construct_at(reinterpret_cast<plg::vector<plg::string>*>(&ret),
		plg::vector<plg::string>{"Example_String1", "Example_String2", "Example_String3"});

	return ret;
}
```

The caller must **allocate memory for the return value** and pass a pointer to this memory as the first/hidden argument of the function. This is typically handled by passing the pointer via:

- The **first argument** in Intel-based architectures, or
- The **X8 register** in ARM-based architectures.
