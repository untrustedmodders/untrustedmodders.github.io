---
title: Exporting Functions
weight: 15
---

In the Plugify ecosystem, functions can be exported to be accessible by other plugins. Typically, to export a function, it should be static in most cases. This approach ensures that the function can be called without instantiating an object, which simplifies integration and usage across different parts of the system.
However, some language modules, such as C# or Python, offer more flexibility and allow you to export member functions of the main Plugin class. This means that in these languages, you can export functions that are part of a class instance, providing greater flexibility and enabling more complex interactions within your plugin.
For languages that compile into dynamic link libraries (DLLs), such as C++ or C#, exported functions should be marked to be visible for exporting in the DLL. This is often achieved using specific compiler directives or attributes that indicate which functions should be accessible externally. Ensuring that functions are correctly marked for export is crucial for proper functionality within the Plugify framework.
In most cases, language modules use native basic types that directly map to C types. However, language modules might have marshaling function wrappers to convert object types like `std::vector` or `std::string` to native language types. These wrappers facilitate the conversion and ensure seamless integration and interaction with the plugin system.
When exporting functions, ensure that you follow the conventions and requirements of the specific language module you are using. Properly documented and accessible exported functions can significantly enhance the interoperability and functionality of your plugins within the Plugify ecosystem.

{{% notice info %}}
The use of the exporting function system is not the only way to enable communication between plugins. Some language modules, such as Python and C#, allow direct communication between plugins if they use the same language module. For example, C# plugins loaded by Mono into one domain can easily use each other's data. You just need to compile plugins where you use other compiled binaries as references. This capability can significantly simplify interactions and data sharing between plugins written in the same language.
{{% /notice %}}

## Basic Type mapping

The following lists how the types are exposed to the C++ API.

| Type                   | Alias    | Ref ? |
|------------------------|----------|-------|
| void                   | void     | false |
| bool                   | bool     | true  |
| char                   | char8    | true  |
| char16_t               | char16   | true  |
| int8_t                 | int8     | true  |
| int16_t                | int16    | true  |
| int32_t                | int32    | true  |
| int64_t                | int64    | true  |
| uint8_t                | uint8    | true  |
| uint16_t               | uint16   | true  |
| uint32_t               | uint32   | true  |
| uint64_t               | uint64   | true  |
| uintptr_t              | ptr64    | true  |
| uintptr_t              | ptr32    | true  |
| float                  | float    | true  |
| double                 | double   | true  |
| void*                  | function | false |
| std::string            | string   | true  |
| std::vector<bool>      | bool*    | true  |
| std::vector<char>      | char8*   | true  |
| std::vector<char16_t>  | char16*  | true  |
| std::vector<int8_t>    | int8*    | true  |
| std::vector<int16_t>   | int16*   | true  |
| std::vector<int32_t>   | int32*   | true  |
| std::vector<int64_t>   | int64*   | true  |
| std::vector<uint8_t>   | uint8*   | true  |
| std::vector<uint16_t>  | uint16*  | true  |
| std::vector<uint32_t>  | uint32*  | true  |
| std::vector<uint64_t>  | uint64*  | true  |
| std::vector<uintptr_t> | ptr64*   | true  |
| std::vector<uintptr_t> | ptr32*   | true  |
| std::vector<float>     | float*   | true  |
| std::vector<double>    | double*  | true  |
| vector2                | vec2     | true  |
| vector3                | vec3     | true  |
| vector4                | vec4     | true  |
| matrix4x4              | mat4x4   | true  |

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
PLUGIN_API void Example_Function(std::string& ret, void* p1, const std::string& p2, int32_t p3, std::vector<uint8_t>& p4) {
	// ... implementation
	std::construct_at<>(*ret, "Example_String");
}
```
{{% /tab %}}
{{% tab name="c#" %}}
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
using Example_Callback_Function = std::string(*)(void*, const std::string&, int32_t);
extern "C" 
PLUGIN_API int32_t Example_Function(float p1, double& p2, Example_Callback_Function p4) {
	// ... implementation
	return 0;
}
```
{{% /tab %}}
{{% tab name="c#" %}}
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
PLUGIN_API void Example_Function(std::vector<std::string>& ret, char p1, const std::vector<double>& p2, const plugify::Vector3& p4) {
	// ... implementation
	std::construct_at<>(*ret, std::vector<std::string>{"Example_String1", "Example_String2", "Example_String3"});
}
```
{{% /tab %}}
{{% tab name="c#" %}}
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

### Pointers
For ref and out paramaters you'll use the corresponding
reference type. With setting "ref" parameter to true.
So if you have a type listed as "int32", you should use
"int32_t&" in your implementation. 

### Arrays and Strings
Arrays of any type must be described with a std::vector<>& and the
strings should be pass by std::string&. 

### Return
In x86-x64 calling conventions, which determine how function arguments are passed. 
For pod structures or objects returned by value, the caller must allocate memory 
for the return value and pass a pointer to it as the first argument.
	