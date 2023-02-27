// In order to understand infer we first need to understand what a Conditional Type is:

type ConditionalTypeExample = true extends boolean ? 1 : 0; // 1
// So, pretty simple, if true is boolean then the type is 1 else 0


// Now, lets create a simple function.
const simpleFunction = () => {
    return 'Hello world';
};
// Now, if for some reason, we want to capture the return type of this function dynamically, as a type
// we can use ReturnType which is a global type helper that TS provides

type SimpleFunctionType = ReturnType<typeof simpleFunction>;
// Just like functions in JavaScript, you can pass types to other types as arguments. Just like functions, they then return other types.
// So, here SimpleFunctionType is string if the simpleFunction returns string, or number if it returns number. You got the point
// But how does ReturnType work? How it captures the type?

type ReturnType2<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
// So, this is how it is declared. It might look complicated at first glance but it is just a Conditional Type
// T extends (...args: any) => infer R ? R : any; This part is conditional type
// Lets simplify that a little bit by removing those T and infer stuff

type ReturnTypeSimplified_1 = typeof simpleFunction extends (...args: any) => any ? 1 : 0;
// So, here typeof simpleFunction matches up with (...args: any) => any so, type will be 1.


// Here is the magical question. Would not it be really useful, if it matched, we can extract information from the thing that matched
// To create a mental modal for this lets take a look at this example. 

const result = `example_string-here`.replace(/(_|-)/g, '___')
// Imagine that we have given a task that we have to make three times the dashes or underscores in a given string
// With the above approach, it will just replace it all with underscores, but we somehow need to catch that symbol and replace that things with itself
// So, we catch dash, and we replace it with {dash} {dash} {dash}. Here is how we can do it.

const result_2 = `example_string-here`.replace(/(_|-)/g, (matchedValue) => `${matchedValue}${matchedValue}${matchedValue}`)
// This is the exact mental modal that you need in order to be able to understand and use infer

// Infer lets you find something out about the thing that you are investigating, instantiate a variable and then reuse that variable however you want to.
