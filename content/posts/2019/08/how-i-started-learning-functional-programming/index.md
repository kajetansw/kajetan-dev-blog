---
title: "How I started learning Functional Programming"
date: 2019-08-04
cover: ./fran-legos.jpg
description: Read my personal story how I fell in love with Functional Programming and what I used to learn the very basics of it.
tags: ['functionalprogramming', 'story', 'meetup', 'typescript', 'javascript']
---

There was a moment during past Learning Sessions when I declared, that I’ll share with you how and why I decided to dive into Functional Programming. And that day is today! I’ll guide you along the path I took to understand basic concepts of FP.

---

## The Beginning

My first meaningful encounter with FP was during local [Wrocław TypeScript meetup](https://github.com/WrocTypeScript/past-events/blob/master/2019-03-27.md). There I got to hear [Józef Flakus](https://twitter.com/jozflakus) telling us about core concepts of the FP. We then got to the concept of FRP (Functional-Reactive Programming) and how it is used in [MarbleJS](https://docs.marblejs.com/), the framework for creating server-side apps. In fact, Józef is the creator of this framework. It was really cool to hear his point of view. Those concepts were entirely new to me, because (as it turned out) I had 100% imperative programming mindset.

The second talk that day was authored by [Tomasz Ducin](https://twitter.com/tomasz_ducin). He showed us how we can implement functional composition in TypeScript. It was a brilliant live coding session but… I had no idea what was going on 😉 (As it turned out I was lacking in knowledge of not only FP concepts, but also advanced types in TypeScript.) I was examining code created by Tomasz next day until I fully understood what was going on.

But those talks did it for me. Something clicked and I started diving into FP world step by step for the next couple of months.

---

## My First Resources 

The first thing I did was looking into [Awesome GitHub](https://github.com/sindresorhus/awesome) repository looking for some basic FP articles or videos. And I was not disappointed. I found two interesting sites: [Awesome Functional Programming](https://github.com/lucasviola/awesome-functional-programming#readme) and [Awesome FP JS](https://github.com/stoeffel/awesome-fp-js#readme). There you can find many reliable resources, but many of them seem really hardcore for people starting with FP, so tread carefully.

There are also a couple of honorable articles/videos/tutorials that I want to share with you.

**\>> [“Don’t fear the monad” talk with Brian Beckman](https://www.youtube.com/watch?v=ZhuHCtR3xq8)**

To this day I remember watching the video with my jaw dropped. The hour just wasn’t enough! Brian is a brilliant man with an extraordinary skill to attract a listener. He can explain difficult concepts with a couple of words and in a fun way. Watching this video just deepened my fascination with the subject.

**\>> [“Haskell is useless” – talk with Erik Meijer and Simon Peyton Jones](https://www.youtube.com/watch?v=iSmkqocn0oQ)**

Talk with two designers of Haskell language on a position of Haskell in the programming world. There we can also get an explanation of the famous diagram of how imperative and declarative languages relate to each other.

**\>> [LambdaCast podcast](https://soundcloud.com/lambda-cast)**

It took me a couple of weeks of listening to all the episodes but man, it was so worth it! For around 20 episodes podcast’s hosts and guests explained the core concepts and principles of FP in an approachable way. Just a flawless way to start learning for people with no prior knowledge, like me.

**\>> [Functors, Applicatives, And Monads In Pictures](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html)**

Another way to approach the problem of learning something new – through visualization. That’s the resource I come back to most frequently due to its simplicity.

**\>> [“Functional programming design patterns” talk by Scott Wlaschin](https://vimeo.com/113588389)**

Insightful and fun talk on how FP relates to OOP’s principles and patterns.

**\>> [“Mostly Adequate Guide to Functional Programming (in JS)” book by BrianLonsdorf](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/content/#)**

That is my favorite resource on this list. If you have a JavaScript background (like me) it’s an excellent tutorial. Due to being a multi-paradigm language, it’s super easy to explain FP using JS. I took my time with this book thoroughly re-reading chapters and examining examples. I think nothing else deepened my knowledge of the topic like this book, especially due to many practical examples. I recommend reading it through GitBooks – there you can do all the exercises inside your browser, without cloning the entire repository.

**\>> Functional Programming channels**

I encourage you to join FP channels on either Slack or Discord. There are genereral FP channels out there, as well as ones related to specific languages and libraries, like PureScript or `fp-ts`. 

It's worth to visit it once in a while to just read threads and get familiar with problems FP developers face - you can learn from it too! Of course, you can also ask questions there if you have any problems with learning or building your project.

The list of channels I used or still use:
- [Functional Programming Slack](https://functionalprogramming.slack.com/)
- [Functional Programming Discord](https://discord.com/invite/eTbWSZj)

---

Those are the most important resources I found to this day about the FP. If you know other interesting resources, don’t hesitate to share them with me and others 😊

For the last part, I would like to give you some advices, which might just save you time googling 😉


---

## (Optional) Bonus materials for TypeScript developers

This section contains bonus materials for every fan of TypeScript that wants to see how to start with FP in TS.

> ⚠️ I suggest getting familiar with basic principles of FP, e.g. by reading or watching above materials,
before you dive into those below.

**\>> [`fp-ts`](https://github.com/gcanti/fp-ts)**

This is probably the most popular and compound library for doing FP in TypeScript. The library is 
enormous and contains a lot of useful abstractions. Even if there's something missing, `fp-ts` provides extensibility 
in the form of rich [ecosystem of sub-libraries](https://gcanti.github.io/fp-ts/ecosystem/).


**\>> ["Practical Guide to Fp-ts" by Ryan Lee](https://rlee.dev/writing/practical-guide-to-fp-ts-part-1)**

A multi-part series of articles by Ryan Lee basic FP abstractions using `fp-ts`.


**\>> ["Introduction to functional programming" by Giulio Canti](https://github.com/enricopolanski/functional-programming)**

The link above redirects to English translation of Giulio Canti's book made by Enrico Polanski.


**\>> [`effect-ts`](https://github.com/Effect-TS/core)** - FP library for TypeScript

`effect-ts` is another FP library with a slightly different approach than the previous one. It is a port of Scala's 
[ZIO](https://zio.dev/). If you'd like to know more you can see the [presentation made by the author of the `effect-ts`](https://www.youtube.com/watch?v=LhCPPrxUUNM)
on that topic.


---

## Which language to pick to start my journey with FP?

I think there is no bad answer here. You should think about what you would like to do build the language first. If you want to create some web application – maybe try Elm. I personally started with Elm and I’m creating some simple recipe app as an exercise. 

If you want to create for the web, you might as well use Elixir, which can handle both front-end and back-end with its own Phoenix Framework. If you want to dive deep into the theory of FP you can use PureScript (which is my next personal pick) or Haskell. (PureScript seems more attractive to me just because it compiles to JS and uses the same ecosystem.) 

If you have JS background and don’t want to learn any new language you can use FP libraries for JavaScript ([`Ramda`](https://ramdajs.com/)) or TypeScript ([`fp-ts`](https://gcanti.github.io/fp-ts/)). There are also JS frameworks that use FP for building for the web, e.g. MarbleJS (REST API) or CycleJS (web apps).

---

## Why should I even be interested in FP?

There are a couple of reasons:

- Functional means declarative - declare what want to do, let the compiler do the rest. I find FP programs to be much more descriptive than others.
- FP ensures immutability. Once created, variables cannot be changed. With that, you can forget about constantly passing reference to an object and mutating it unknowingly along the way.
- Functions are like building blocks - you can have a lot of them, with any shape you want. Just start building, like with Legos.
- Pure functions help in preventing bugs. Just imagine having no unexpected behavior for your functions – isn’t that neat?
- FP simplifies your unit testing. Having most of your functions pure makes simpler test scenarios and ensures test separation.
- It broadens your mind and lets you try new things. It gives you a new perspective and makes you a more reliable engineer. Switching mindset like that is a great challenge for any developer.
- FP technologies are growing like never before. They’re becoming popular and you can see them more in production applications. Companies are also looking for people with knowledge of FP more often.

---

## I reviewed all the resources you provided - what should I do next?

Well, I have no idea, I just got there myself when writing this 😉 I’m sure I’ll share with you guys anything interesting I’ll learn.