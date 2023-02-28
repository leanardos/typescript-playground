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

// Now if we would like to apply this to our previous example, we can do something like:
type ReturnTypeSimplified_2 = typeof simpleFunction extends (...args: any) => infer R ? 1 : 0;
// So here this R infers the return type from the thing that we checked

// And if now return this infered type R like this:
type ReturnTypeSimplified_3 = typeof simpleFunction extends (...args: any) => infer R ? R : 0;
// And now, type of ReturnTypeSimplified_3 will be string because simpleFunction returns string and infer R catches that, and we return that infer R which is string.
// If, simpleFunction would return number for example, then the type would be number for this example.

// If the pattern is not matched we can return never, cause never is suitable here, meaning that
// if the passed function or variable does not match the variable then what should we return?
// If we return 0 it is false, if we return null it is also not correct, we should just return never,
// Never in typescript is kind of throwing an erro, never is something like that should never ever be allowed
// It does not give you a red error message or something but for example if you would use never in type union
// something like:

type TestingUnionWithNeverType = 'here some string' | never | 123123
// if you check the type of TestingUnionWithNeverType you will see that it is either a 'here some string' or 123123 
// Never removed from the equation kind of.

// To put it another way, never is like a zero as a number, you know you have a zero of something,
// Never is like you have no version of that type that can exist.

// So, if we update our type with never it would look like this.
type ReturnTypeSimplified_4 = typeof simpleFunction extends (...args: any) => infer R ? R : never;
// Now the type still be string here because simpleFunction matches (...args: any) => infer R 
// but if we would put something like:

const someArray = [];
type ReturnTypeSimplified_5 = typeof someArray extends (...args: any) => infer R ? R : never;
// Now the type will be never because [] does not match with (...args: any) => infer R
