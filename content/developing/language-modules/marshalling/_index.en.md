---
title: Marshalling
weight: 10
---

In Plugify, marshalling types is an essential process that allows different programming languages to interoperate within the framework. This is achieved using an additional library, `plugify-jit`, which provides functionality for creating wrappers for calls and managing dynamic function generation.

## Using the `plugify-jit` Library

The `plugify-jit` library contains the `JitCallback` and `JitCall` classes, which is crucial for runtime function generation and dynamic function call.

#### JitCallback

That class can be used to create callback objects, that can be passed to functions as callback function pointers. In other words, a pointer to the callback object can be "called", directly. A generic callback handler invoked by this object then allows iterating dynamically over the arguments once called back.

```cpp
/**
 * @brief Get a dynamically created function based on the method reference.
 * @param method Reference to the method.
 * @param callback Callback function.
 * @param data User data.
 * @param hidden If true, return will be pass as first argument.
 * @return Pointer to the generated function.
 *
 * @details Creates a new callback object, where method is a
 * signature describing the function to be called back, and callback is a pointer to a generic
 * callback handler (see below). The signature is needed in the generic
 * callback handler to correctly retrieve the arguments provided by the
 * caller of the callback. Note that the generic handler's function
 * type/declaration is always the same for any callback.  userdata is a
 * pointer to arbitrary user data to be available in the generic callback handler.
 */
MemAddr GetJitFunc(MethodRef method, CallbackHandler callback, MemAddr data = nullptr, HiddenParam hidden = &ValueUtils::IsHiddenParam);
```

The CallbackHandler type is defined as follows:
```cpp
using CallbackHandler = void(*)(MethodRef method, MemAddr data, const Parameters* params, uint8_t count, const Return* ret);
```

Here is a step-by-step guide on how to use the `JitCallback` class:

1. **Initialize the Object**: Create an instance of the `JitCallback` class. It require `asmjit` runtime object for executable memory allocation.
```cpp
JitCallback callback(jitRuntime);
```
{{% notice warning %}}
The function will be deallocated when it goes out of scope. Ensure that the `JitCallback` object remains in scope as long as the generated function is needed, or use appropriate smart pointers to manage its lifetime.
{{% /notice %}}

2. **Generate the Function**: Use the GetJitFunc method to get the address of the dynamically generated function.
```cpp
void* methodAddr = callback.GetJitFunc(method, &Callback, funcAddress);
```
{{% notice note %}}
Before calling `GetJitFunc`, ensure that the method object passed as an argument is valid and will be valid. Also, correctly represents the method for which you want to generate a callback function.
{{% /notice %}}

3. **Implementation of Callback Function**: This function should be responsible for converting types and calling the original function. 
```cpp
void Callback(plugify::MethodRef method, plugify::MemAddr data, const plugify::JitCallback::Parameters* params, uint8_t count, const plugify::JitCallback::Return* ret) {
    // Implementation of the callback function
}
```

## Detailed Example

Below is a more detailed example demonstrating the entire process:
```cpp
// Define the callback function
void Callback(plugify::MethodRef method, plugify::MemAddr data, const plugify::JitCallback::Parameters* params, uint8_t count, const plugify::JitCallback::Return* ret) {
    // Implementation of the callback function
}

int main() {
	// Initialize the JitCallback object
	plugify::JitCallback callback(jitRuntime);

	// Define the method and function pointers
	plugify::MethodRef method;  // Assume this is properly initialized from plugify core
	void* func = /* function pointer to be used or any other data */;

	// Generate the JIT function (C Calling Convention)
	void* methodAddr = callback.GetJitFunc(method, &Callback, func);
}
```

#### JitCall

That class encapsulates architecture-, OS- and compiler-specific function call semantics in a virtual "bind argument parameters from left to right and then call" interface allowing programmers to call C functions in a completely dynamic manner. In other words, instead of calling a function directly, class provides a mechanism to push the function parameters manually and to issue the call afterwards.

```cpp
/**
 * @brief Get a dynamically created function based on the method reference.
 * @param method Reference to the method.
 * @param target Target function to call.
 * @param waitType Optionally insert a breakpoint before the call.
 * @param hidden If true, return will be pass as first argument.
 * @return Pointer to the generated function.
 */
MemAddr GetJitFunc(MethodRef method, MemAddr target, WaitType waitType = WaitType::None, HiddenParam hidden = &ValueUtils::IsHiddenParam);
```

Here is a step-by-step guide on how to use the `JitCall` class:

1. **Initialize the Object**: Create an instance of the `JitCall` class. It require `asmjit` runtime object for executable memory allocation.
```cpp
JitCall call(jitRuntime);
```
{{% notice warning %}}
The function will be deallocated when it goes out of scope. Ensure that the `JitCall` object remains in scope as long as the generated function is needed, or use appropriate smart pointers to manage its lifetime.
{{% /notice %}}

2. **Generate the Function**: Use the GetJitFunc method to get the address of the dynamically generated function.
```cpp
void* methodAddr = call.GetJitFunc(method, funcAddress);
```
{{% notice note %}}
Before calling `GetJitFunc`, ensure that the method object passed as an argument is valid and will be valid. Also, correctly represents the method for which you want to generate a callback function.
{{% /notice %}}

## Detailed Example

Below is a more detailed example demonstrating the entire process:
```cpp
int main() {
	// Initialize the JitCall object
	plugify::JitCall call(jitRuntime);

	// Define the method and function pointers
	plugify::MethodRef method;  // Assume this is properly initialized from plugify core
	void* func = /* function pointer to be used */;

	// suppose target function is int(*)(int, float, double, const plg::string*);

	// Generate the JIT function (C Calling Convention)
	MemAddr methodAddr = call.GetJitFunc(method, func);
	
	// Generate parameters holder
	plugify::JitCall::Parameters params(2);
	
	// Pass some parameters by value
	params.AddArgument(2);
	params.AddArgument(2.0f);
	params.AddArgument(2.0);
	
	// Pass rest parameters by ref
	plg::string str("Some string");
	params.AddArgument(&str);
	
	// Call function with passing parameters array and return storage
	plugify::JitCall::Return ret{};
	methodAddr.Cast<CallingFunc>()(params.GetDataPtr(), &ret);
	
	// Validate return here
	assert(ret.GetReturn<int>() == 1);
}
```

## Benefits of Using
The plugify-jit library provides several benefits:

1. **`Dynamic Function Generation`**: Allows the creation and calling of functions at runtime, making it flexible and adaptable to various use cases.
2. **`Interoperability`**: Facilitates communication between different programming languages within the Plugify framework.
3. **`Simplified Integration`**: Provides a straightforward API for generating and using dynamic functions, reducing the complexity of marshalling types.

By leveraging the plugify-jit library, language modules can efficiently manage function calls and ensure seamless integration within the Plugify ecosystem.

## Linking Library

To link the `plugify-jit` library with your language module, you simply need to add `plugify::plugify-jit` to your CMake target. This tells CMake to link your language module with the `plugify-jit` library during the build process.

Here's an example of how to add the link in your CMakeLists.txt file:

```cmake
target_link_libraries(${PROJECT_NAME} PRIVATE plugify::plugify plugify::plugify-jit)
```

By adding this line to your CMakeLists.txt file, CMake will automatically handle linking the plugify-jit library with your language module, making the functionality of plugify-jit available to your code.
