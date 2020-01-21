---
title: "Learning Session #4 - January's Meetups, Part 2"
cover: ""
date: 2019-02-17
description: Spend time with me by learning new things in this 4th Learning Session!
tags: ['learningsession', 'meetup', 'typescript', 'angular']
---

## TypeScript Wrocław #1 – 01/30/2019

#### Speech #1: “TypeScript myths debunked” by Krzysztof Żuraw
Here Krzysiek presented us most popular myths about TypeScript that might discourage beginners from using TypeScript. (Of course I should not repeat myself by saying that you definitely should use it! 😉)

Most interesting points were:

- “TS is not needed when you have unit tests” – not true, because TS checks only typing and unit tests cover a lot more than that.
- “TS is strictly related to Angular” – no, you can use TS without Angular.
- “You cannot use TS with React” – we already know that you can! 😉
- “It’s hard to use external libraries with TS” – might be true, if library is strictly JavaScript-ish and has no related @types library.
- “It’s hard to introduce TS to existing project” – might be true, depends on scale of project and our eagerness to convert JS to TS 😉

#### Speech #2: “TypeScript with React” by Piotr Pietrzak

Piotr presented us his example application written in React with TypeScript.

#### Speech #3: “Developing VS Code Extensions” by Ola Sikora

Ola gave us short, but very rich and interesting presentation on creating your very own VS Code extension. I use this IDE along with IntelliJ and I love it for its flexibility and extensibility.

Here we go:

- What we need for creating extension is yo and generate-code packages.
- VS Code has API that we should use to interact with whatever is going on inside our IDE.
- We should use vsce package to publish our extension.
- List of sample extensions published by VS Code team.

#### Speech #4: “Handling transient errors with tryMax library” by Marcin Porębski

We heard couple of facts about transient errors and how to deal with them. What is a transient error? Well, I didn’t know either, but that mistake was quickly corrected 😉

Transient error is an error that occurs unpredictably and very rarely. When they appear we have difficulty to catch it in time or even identify what they are. With that the author of the speech came up with tryMax library. It enables retrying function or Promise with many configuration possibilities. The basic usage is to set up number of times for the function to retry before giving up and setting up delay between them.

#### Speech #5: “Map types in TypeScript” by Damian Paszkowski

Damian presented us use cases for map types in TS that he and his team uses in their project. For reference you can go into our Learning Session #2, where I wrote about advanced types. The talk was really educating, especially I fell in love in solution where I found out that you can convert your REST API into generic type in TS to reflect its structure. Writing all HTTP-related methods is then trivial even with auto-completion of endpoint paths enabled.

---

## ng-Wrocław #26 – 01/31/2019

#### Speech #1: “RxCoffeeShop” by Chris Trześniewski
Another edition of one of my favorites meetups started with talk about RxJS. Chris showed us the power of this library using an application that was simulation of working coffee shop, hence the name. During that time he reviewed useful RxJS operators that he used. Some of them were:

- scan – it operates somewhat like reduce() for arrays in JS, it accumulates values over given accumulator function and returns current accumulation when new value is emitted.
- share – it shares original observable value between all subscribers.
- merge – it merges observables and emits values when they are emitted from either of those.
- zip – emits all observable values as an array after emit has ended.
- mapTo – map emitted value to constant value.

Another thing that I have learned is that there is testing library for RxJS which is called rxjs-marbles.

For more information about RxJS you can look up:
- Official RxJS docs.
- RxJS marbles where each operator’s functionality is displayed as interactive diagrams.
- Learn RxJS - great site full of examples.

#### Speech #2: “Angular i18n – Current state and the future” by Piotr Lewandowski

Piotr talked about his experience in implementing internationalization in Angular apps. Generally there are to approach nowadays: using official Angular implementation and ngx-translate library. Both of them have their pros and cons and are used as often.

Piotr is using official Angular approach and these are the things he shared:

- You can use “i18n” attribute on HTML element to enable translation.
- To “i18n” attribute we can pass some metadata for element under translation like: meaning, description, custom ID, etc.
- Translations are stored in XLIFF file (special XML format).
- Every string under translation generates hash based on its value by default. We can change that by providing ID in “i18n” attribute.
- It may be a good idea to do above, because generated hashes include whitespaces, which can lead to bugs.
- Shortened process of implementing: adding “i18n” to elements, generating XLIFF via CLI, copying and translating XLIFFs to languages of choice.
- Translations are created during each application build and cannot be changed in runtime. It means that we need “n” builds of one application for “n” languages we want to support. This is biggest drawback of this approach IMO.
- Other problems of this approach: there is still a lot of bugs and there is no official release, after build the translations are generated inside of HTML, translations apply only in HTML, it is impossible to create them in other places (e.g. services).
- Official release depends on release of Angular Ivy compiler.

---

That is all for late January's meetup coverage. I suppose there will be more articles like this if I attend meetings as much interesting like those!