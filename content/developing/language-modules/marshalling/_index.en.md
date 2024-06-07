---
title: Marshalling
weight: 10
---

In Plugify, marshalling types is an essential process that allows different programming languages to interoperate within the framework. This is achieved using an additional library, `plugify-function`, which provides functionality for creating wrappers for calls and managing dynamic function generation.

## Using the `plugify-function` Library

The `plugify-function` library contains the `Function` class, which is crucial for dynamic (runtime) function generation. This class can be used by language modules to create wrappers for various calls.

### Example Usage

Below is an example demonstrating how to use the `plugify-function` library to generate a callback function dynamically:

```cpp
/**
 * @brief Get a dynamically created callback function using a typedef represented as a string.
 * @param method Reference to the method.
 * @param callback Callback function.
 * @param data User data.
 * @param obj If true, return will be passed as the first argument.
 * @return Pointer to the generated function.
 */
void* GetJitFunc(const Method& method, FuncCallback callback, void* data = nullptr, bool obj = true);
```

The FuncCallback type is defined as follows:
```cpp
using FuncCallback = void(*)(const plugify::Method* method, void* data, const plugify::Parameters* params, uint8_t count, const plugify::ReturnValue* ret);
```

Here is a step-by-step guide on how to use the Function class:

1. **Initialize the Function Object**: Create an instance of the Function class. It require asmjit runtime object for executable memory allocation.
```cpp
Function function(jitRuntime);
```
{{% notice warning %}}
The function will be deallocated when it goes out of scope. Ensure that the `Function` object remains in scope as long as the generated function is needed, or use appropriate smart pointers to manage its lifetime.
{{% /notice %}}

2. **Generate the Function**: Use the GetJitFunc method to get the address of the dynamically generated function.
```cpp
void* methodAddr = function.GetJitFunc(method, &Callback, reinterpret_cast<void*>(func));
```
{{% notice note %}}
Before calling `GetJitFunc`, ensure that the method object passed as an argument is valid and will be valid. Also, correctly represents the method for which you want to generate a callback function.
{{% /notice %}}

3. ***Implementation of Callback Function***: This function should be responsible for converting types and calling the original function. 
```cpp
void Callback(const plugify::Method* method, void* data, const plugify::Parameters* params, uint8_t count, const plugify::ReturnValue* ret) {
    // Implementation of the callback function
}
```

## Detailed Example

Below is a more detailed example demonstrating the entire process:
```cpp
// Define the callback function
void Callback(const Method* method, void* data, const Parameters* params, uint8_t count, const ReturnValue* ret) {
    // Implementation of the callback function
}

int main() {
	// Initialize the Function object
	plugify::Function function(jitRuntime);

	// Define the method and function pointers
	plugify::Method method;  // Assume this is properly initialized
	void* func = /* function pointer to be used or any other data */;

	// Generate the JIT function (C Calling Convention)
	void* methodAddr = function.GetJitFunc(method, &Callback, reinterpret_cast<void*>(func));
}
```

## Benefits of Using
The plugify-function library provides several benefits:

1. **`Dynamic Function Generation`**: Allows the creation of functions at runtime, making it flexible and adaptable to various use cases.
2. **`Interoperability`**: Facilitates communication between different programming languages within the Plugify framework.
3. **`Simplified Integration`**: Provides a straightforward API for generating and using dynamic functions, reducing the complexity of marshalling types.

By leveraging the plugify-function library, language modules can efficiently manage function calls and ensure seamless integration within the Plugify ecosystem.

## Linking Library

To link the `plugify-function` library with your language module, you simply need to add `plugify::plugify-function` to your CMake target. This tells CMake to link your language module with the `plugify-function` library during the build process.

Here's an example of how to add the link in your CMakeLists.txt file:

```cmake
target_link_libraries(${PROJECT_NAME} PRIVATE plugify::plugify plugify::plugify-function)
```

By adding this line to your CMakeLists.txt file, CMake will automatically handle linking the plugify-function library with your language module, making the functionality of plugify-function available to your code.
