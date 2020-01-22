---
title: "Learning Session #7"
date: 2019-05-01
description: Spend time with me by learning new things in this 7th Learning Session!
tags: ['learningsession', 'typescript', 'java', 'tools']
---

---

Hello again, we’re meeting again, this time after a long break. I was on the vacation in Portugal for a week and got myself a needed coding detox 😊 I got a week of exploring foreign culture and cuisine and it was really worth the time! Now I am full of energy and positive mindset to start learning and having fun with coding again!

Shall we start, then?

---

## TypeScript

**\>> [“Notes on TypeScript: Pick, Exclude and Higher Order Components” by A. Sharif](https://dev.to/busypeoples/notes-on-typescript-pick-exclude-and-higher-order-components-40cp)**

Here is a good example of using Pick, Exclude and Omit types in the TS which helps you create new types based on existing ones by extracting certain properties.

There can be many use cases for that, for me, it was creating a type with Omit, which was based on an existing business model and then used in Angular’s reactive form.

For the other reason entirely I’ve also written a type that creates union type from keys which extend Date interface:

```ts
type DatePropertyNames<T> = { 
  [K in keyof T]: T[K] extends Date ? K : never 
}[keyof T];
```

\>> [`unknown` type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)

Fairly new unknown type in TS lets you forget about any type and its inabilities. The difference is slight but significant.

Value of type any can be assigned to anything and anything can be assigned to this value. Value of unknown type CANNOT be assigned to anything, but anything can be assigned to the value.

That is powerful, because it is more type-safe, even if it still is somewhat “any”. With that, we can forget with bad practices of using any and related errors.

**\>> [TSLint rule: member-ordering](https://palantir.github.io/tslint/rules/member-ordering/)**

Next step for ensuring clarity and readability of your classes is here. With this simple rule, you can manage the ordering of each member of your classes: private/public, static/instance/, fields/methods – you name it.

**\>> [“Custom TSLint rules — easier than you think” by Eran Shabi](https://hackernoon.com/custom-tslint-rules-easier-than-you-think-1bd9c361d70c)**

This a really nice article introduces you to the world of custom TSLint rules. With it, you can create a simple example rule and see for yourself that it is not difficult at all! I can relate because I’ve already used it to create something on my own 😊 Now our code can be even more beautiful!

**\>> [“lodash-decorators” npm package](https://www.npmjs.com/package/lodash-decorators)**

The cool thing I found recently is the utility decorators for JavaScript (apparently also for TypeScript) based on popular lodash library. Here you can find decorators like @Memoize or @Bind.

---

## Java

**\>> [“JPA Attribute Converters” by baeldung](https://www.baeldung.com/jpa-attribute-converters)**

A great functionality to use in your Spring back-end is an attribute converter. It does exactly what it states – it converts attributes for your database entity. It may be used in the case when you want to convert some data from a database and make it more explicit for the user when sent to the client. When data comes back converter does the backward – it converts the data back to be interpreted correctly by the database.

---

## Other

**\>> [Wakatime](https://wakatime.com/)**

I found really awesome tool for measuring the time you spend on coding. Just create an account, hook it up to your IDE and start coding! It measures the time spent on certain projects and in certain languages. It is also configurable to some degree, for example, if you wish to not include time spent on JSON files (like I did 😉).


In the end, I wanted also to share with you, that for the last two weeks I’ve been preoccupied with learning about functional programming. It is an exciting new experience for me and I can’t wait to share my insights with you! See you soon!