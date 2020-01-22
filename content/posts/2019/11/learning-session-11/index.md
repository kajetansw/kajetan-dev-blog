---
title: "Learning Session #11"
date: 2019-11-08
description: Spend time with me by learning new things in this 11th Learning Session!
tags: ['learningsession', 'rxjs', 'angular', 'typescript', 'functionalprogramming']
---

---

## RxJS

**\>> [“The (Finite) State of Reactive Animations” by David Khourshid](https://www.youtube.com/watch?v=wOsqWoszMDI)**

Interesting talk displaying one of maybe the most underappreciated use cases of RxJS and reactive programming altogether – creating animations. This presentation from the RxJS Live conference is filled with fascinating examples (to which you have access to via CodePen). David explained how basic animations can be created with RxJS and how to use some math concepts to improve. What was also important was David’s take on the concept of Finite State Machines and how they fit into the world of reactive programming and animations.

**\>> [“An Animated Intro to RxJS” by David Khourshid](https://css-tricks.com/animated-intro-rxjs/)**

An article which I got to know from David’s talk I introduced earlier. This article is an easy introduction to RxJS by creating simple animations using JavaScript and CSS. We get to know ways to create streams from DOM events, combining some streams, emit on each animation frame and use linear interpolation to make our animation smooth and natural.

---

## Angular

**\>> [“Angular and the OWASP top 10” by Philippe De Ryck](https://www.youtube.com/watch?v=jc0YYLLEol0)**

Talk from Angular Connect conference about just how secured are Angular apps by default in the context of OWASP Top 10 standards. Then we get to know how we can make it even more secure on our own. Philippe also shared with us his Angular Security Cheat Sheet, which is a great addition to his talk.

**\>> [“Optimizing an Angular application” by Minko Gechev](https://www.youtube.com/watch?v=ybNj-id0kjY)**

A super interesting talk from ng-conf 2018 where we learn about cool tricks that can make our Angular applications faster. We get to know how Angular itself can help us with achieving this task, but also how we can use other libraries or popular programming concepts to improve. We can see the results ourselves as Minko guides us through live coding example.

---

## Functional Programming

**\>> [ImmutableJS](https://github.com/immutable-js/immutable-js)**

This is a highly regarded and popular library that enables using immutable data structures in JavaScript. Using immutable data structures is a basic concept if you want to adopt functional programming principles in your applications (but they are useful not only in the FP world!). What I found interesting were the implementation details that enable those data structures to improve our performance.

**[Spoiler]** This library was mentioned by Minko in his talk I described previously as a way of optimization Angular apps 😉

**\>> [monocle-ts – Functional optics by Giulio Canti](https://github.com/gcanti/monocle-ts)**

Functional optics are a fascinating concept existing in the functional programming world. They enable us to easily traverse through nested data structures in order to mutate the existing one. A great solution for people who are irritated with writing long chains of fields’ access and nested mutations.

**\>> [newtype-ts – Implementation of newtypes in TypeScript by Giulio Canti](https://github.com/gcanti/newtype-ts)**

Newtypes enable us to create a type that has the same representation at runtime, but different for the type system. How can we use it and for what? I think the best example exists as a part of the documentation for this library.

**\>> [“Binary Arithmetic in the TypeScript Type System”  by Josh Goldberg](http://blog.joshuakgoldberg.com/binary-arithmetic/)**

A great, eye-opening article that shows just how powerful may be a well-thought-out type system. Prepare to have your mind blown (just like mine was!) if you are not used to this sort of usage of types. I’m still little overwhelmed by the sheer concept of “programming with types” 😉

---

## Other

**\>> [“Welcome to the world of Statecharts” by Erik Mogensen](https://statecharts.github.io/)**

A website explaining what are statecharts (basically “beefed up state machines”) and what are the benefits of using them. This series of articles may serve as an extension of the things we have learned about creating animations with reactive programming and state machines.

**\>> [“Full Stack Type Safety with React, GraphQL, and TypeScript” by Robert Zhu](https://www.youtube.com/watch?v=2zfkCJIob28)**

Robert presented us with a technology stack that enables using the same GraphQL types on the backend and the frontend of our applications. I think this talk may open your eyes to new solutions if you ever considered making an app with this tech stack. Why typing it twice, if you can do it once?

**\>> [“Tensorflow.js for web developers” by Piérre Reimertz](https://www.youtube.com/watch?v=QDvo-6yb4MQ)**

At this talk from the NordicJS conference, Piérre explains his vision of how machine learning and Tensorflow.js can be used by web developers. Firstly, there is a small introduction to basic concepts of how neural networks work, then we are sent into the world of fascinating examples of how useful and/or joyful machine learning in the web can be.

This was a really inspiring talk after which I began to wonder – just how long would it take me to create a simple login page where you can authenticate with your face? 😊