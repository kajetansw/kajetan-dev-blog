---
title: 'Level up your TypeScript code by using... Elm? (Part 2)'
date: 2020-03-09
cover: ./level-up3.jpg
description: Second part of my tips on improving TypeScript code by using common Elm features. 
tags: ['typescript', 'javascript', 'elm', 'functionalprogramming']
---

Within this mini-series, my goal is to convey to you my modest philosophy on how to improve both as a TypeScript developer and software engineer altogether. I decided to use a specific example for that: improving one's TypeScript code by trying out something else, not considered "mainstream", like Elm. 

I started by sharing with you the idea of Elm decoders and how they can be used in TypeScript.

Now it's time to dive into other features of Elm and what can we learn from them.

---

## Pattern matching - a million-dollar feature 💲💲💲

If you've used TypeScript before, you most likely came across switch-case statements. It's a quite useful tool in a programmers toolkit that enables check value of an expression against a specific `case`. 

Let's begin with a simple example and build our way up. Here's an example of a case expression in Elm:

```elm
parseRate : Int -> String
parseRate rate = 
  case rate of
    1 -> 
      "Horrible"
    2 -> 
      "Bad"
    3 -> 
      "Mediocre"
    4 -> 
      "Good"
    5 ->
      "Excellent"
    _ -> 
      "INVALID RATE"
```

This is the most typical example I could think of but it lets you see for yourself how the syntax looks like. At the end, you can also see a `default` option that is handled by using a `_` wildcard. 

In most imperative languages that would be all we can squeeze from the case-statement. But Elm (and most of FP languages, in fact) can take it to another level. With it, you can match against even more complicated "patterns" like lists, tuples, records, etc. 

We'll start building an example for this section now. 

Let's assume, that our simple application loads a response from a server and renders it. The server can respond with either a successfully processed data (here, a simple integer value) or with validation errors. For that, we would like to define messages (actions that our application reacts to) and a model. 

We can discriminate three different messages and we can do it with a union of types:

```elm
type Msg
  = Ok Int
  | Err (List String)
  | HttpError String
```

Also, we can create a corresponding model:

```elm
type alias Model = 
  { data : Int
  , error : (List String)
  , httpError : String
  }
```

The application can carry an `Ok` message, that indicates, that data has been fetched successfully. Another one is `Err` that can carry a payload as a `List String` (list of strings) - a list of validation errors that came as a result of our server-side computation. `HttpError` contains data about possible HTTP error. 

Another thing is a `Model` that our view is based on. In an ideal world that's how our web applications should behave - it should be a function that takes a model and returns a view based on that model. That's what we shall assume here (for simplicity) - that the type `Model` represents both data that is carried by our application and also a view.

Next, we would like to have a function, that transforms our model based on a received message. For that we would like to react to all of three possible messages available. Surprisingly, we can use the good, old case expression for that:

```elm
updateModel : Msg -> Model -> Model
updateModel msg model =
  case msg of
    Ok data ->
      { model | data = data }
    Err es -> 
      { model | error = es }
    HttpError err -> 
      { model | httpError = err }
```

It turns out, that case expressions in Elm can not only be used against primitive types but also against more complex ones. It is thanks to a mechanism known as the "pattern matching". 

With that we discriminate elements of a union of types, that is our `Msg`, and return modified value of `Model`. On `Ok` we replace a `data` field with response payload, on `Error` we pass a list of error messages to the model. On `HttpError` we pass an error message. 

Wait, that's not all! Would you like to see some cool trick? Let's just delete one case and see what happens: 

```
-- MISSING PATTERNS -------------------------------------------- Jump To Problem

This `case` does not have branches for all possibilities:

27|>  case msg of
28|>    Ok data ->
29|>      { model | data = data }
30|>    Error es -> 
31|>      { model | error = es }

Missing possibilities include:

    HttpError _

I would have to crash if I saw one of those. Add branches for them!
```

The project won't even compile! Compiler reminds us (very politely 😉) that there are some missing patterns that we didn't handle and we should change that. Elm is designed like that - with a bunch of little helpers built within a compiler that watch over us and our types. With those, we are able to avoid many troublesome bugs. More than that - it was always a crucial point for Elm to have as helpful and readable error messages as possible. 

Unfortunately, JavaScript and TypeScript don't have a pattern matching feature. Even Elm's pattern matching is limited compared to Haskell, in favor of simplicity. But still - it is quite powerful.

> **Resources**: [Here](https://github.com/tc39/proposal-pattern-matching) you can read about pattern matching proposal for TS39 which is now at stage 1. Also, [find out more](http://learnyouahaskell.com/syntax-in-functions) about pattern matching in Haskell (*this is a more advanced topic though*).

Nevertheless, it cannot discourage us - let's get inspired and try to simulate those concepts in TypeScript! First idea you may think of (at least I did) is to use string literal types:

```typescript
type Ok = 'Ok';
type Err = 'Err';
type HttpError = 'HttpError';

type Msg
  = Ok
  | Err
  | HttpError;

type Model = {
  data: int;
  errors: string[];
  httpError: string;
};

function updateModel(msg: Msg, model: Model): Model {
  switch (msg) {
    case 'Ok':
      // Well... What now?
    case 'Err':
      // Well... What now?
    case 'HttpError':
      // Well... What now?
  }
}
```

Unfortunately, we quickly realize, that it's impossible for a string literal type to carry some extra payload. One of the popular ways to discriminate types that hold some payload is to define them as JS objects with an additional field (commonly named `type`) that lets us discriminate object over the others:

```typescript
type Ok = {
  type: 'Ok';
  data: number;
};

type Err = {
  type: 'Err';
  errors: string[];
};

type HttpError = {
  type: 'HttpError';
  message: string;
};

type Model = {
  data: number;
  errors: string[];
  httpError: string;
};

type Msg
  = Ok
  | Err
  | HttpError;
```

With that we are able to successfully discriminate union of types with a case-statement:

```typescript
function updateModel(msg: Msg, model: Model): Model {
  switch (msg.type) {
    case 'Ok':
      return { ...model, data: msg.data };
    case 'Err':
      return { ...model, errors: msg.errors };
    case 'HttpError':
      return { ...model, httpError: msg.message };
  }
}
```

Done! TypeScript compiler even helps us by merging possible values of a `type` field from the union. When we hover over `msg.type` we get all possible values: `(property) type: "Ok" | "Err" | "HttpError"`. This can help us when building the list of our cases.

But wait! What about a situation when we forget one of the possible cases like we did with the Elm example? 

It turns out that when you omit some cases (and do not provide a `default` option) we get a compilation error of: `Function lacks ending return statement and return type does not include 'undefined'`. `undefined`? We don't want that in our function! This is a message for us that we missed a `case` and should add one. 

Look out, though! There are some cases when that magic won't work and we will expose ourselves to unexpected bugs as a result. Above will work only if you have `strictNullChecks` flag turned on within your `tsconfig.json` (which I strongly encourage you to do!) and return type of your function is not `undefined` or `void`. 

Fortunately, there is one interesting solution that is universal and works in all situations. It lets us leverage `never` type within our case expression:

```typescript
function updateModel(msg: Msg, model: Model): Model {
  switch (msg.type) {
    case 'Ok':
      return { ...model, data: msg.data };
    case 'Err':
      return { ...model, errors: msg.errors };
    case 'HttpError':
      return { ...model, httpError: msg.message };
    default:
      assertUnreachable(msg);
  }
}

function assertUnreachable(x: never): never {
    throw new Error("Supposed to be unreachable...");
}
```

`never` is a type that: 
> *"(...) represents the type of values that never occur. For instance, never is the return type for a function expression or an arrow function expression that always throws an exception or one that never returns."* 
~ TypeScript docs

Here, when we remove one case, for example the `HttpError` one, we get a compilation error of `Argument of type 'HttpError' is not assignable to parameter of type 'never'.`. It's because it is impossible to assign a value to type `never`, which has no values at all.

There is only one more thing worth noting. Discrimination of a union of types in TypeScript works only within the top-level fields of an object!

> **Resources**: [This blog post](https://blog.asana.com/2020/01/typescript-quirks/) describes interesting quirks of a TypeScript, that are all worth to know. Among them are constraints that come with discrimination of union type I mentioned above.

---

## Conclusion 

Pattern matching is a killer feature of such languages like Haskell and PureScript and most of the developers wouldn't imagine working without it. It exist also in Elm and it lets us, for example, discriminate actions that occur in our applications. 

> **Resources**: If you want to read about pattern matching in Elm, you can find more at [this section](https://elmprogramming.com/pattern-matching.html) of "Beginning Elm" tutorial.

---

This is all for this part! This series turns out to be longer than I anticipated when I started conceptualizing it. Nevertheless, I hope that it'll turn out useful to anyone that wants to learn more about TypeScript and/or consider trying out some other languages (with stronger type system).

Thanks for reading and see you next time! 
