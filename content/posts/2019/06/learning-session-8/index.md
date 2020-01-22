---
title: "Learning Session #8"
date: 2019-06-09
description: Spend time with me by learning new things in this 8th Learning Session!
tags: ['learningsession', 'conference', 'typescript', 'angular', 'rxjs', 'javascript']
---

---

This time I’ve got an interesting batch of conference talks, as I listened to talks from recent conferences, like ngConf and Uphill Conf. ngConf is the probably the biggest Angular conference in the world and I would love to attend it someday! (Watching live feeds from people on Twitter made me envy them so much…)

---

## Conference talks

**\>> [“Wrapping it up with decorators” by Nicole Oliver](https://www.youtube.com/watch?v=Guvd5BYocYg)**

Decorators are probably the most underused TypeScript feature when developing Angular apps (at least for me). They let you modify existing functionalities of class and its members.

First time I’ve heard of an idea of decorators was in Java (there called “annotations”). They are part AOP (Aspect Oriented Programming) and allow you to extract repeatable functionality and reuse it. It takes shape of a function of a certain type (different type for class, field or method to decorate).

Nicole shows us not only how to create and use basic decorator in TS. She also shows us how they work internally and how to use basic concepts of meta-programming in JS for our advantage (with PropertyDescriptor).

**\>> [“Can you imagine a future without zones?” by Maxim Koretskyi](https://www.youtube.com/watch?v=TRfDXG98_Qg)**

We happened to talk about zones already and how crucial they are, especially in Angular. Maxim shows us an example Angular app and how we can maneuver with its settings to enable, disable and optimize zone usage and what are the consequences of those actions. We also get to know how Angular itself takes advantage of Zone.js library.

**\>> [“CDK Is The Coolest Thing You Are Not Using” by Jeremy Elbourn](https://www.youtube.com/watch?v=4EXQKP-Sihw)**

Here we hear the news related to Angular Material and CDK changes (recent or near-future ones). Angular Material is a library of the most often used UI components (like navbars, cards, lists, drag and drop, etc.). On the other hand, CDK gives us, developers, tools for creating components ourselves.

Jeremy shows us the newest components in the Material family and how he and his team are working towards further evolution of the projects.

**\>> [“20 RxJS operators in 20 minutes by Mike Brocchi & John Niedzwiecki](https://www.youtube.com/watch?v=ak3MvMn8u18)**

Mike and John present us with 20 common and uncommon RxJS operators. They do their speech brilliantly with both humor and expertise (I don’t mind dad jokes at all, even while not being one myself 😉). I wrote some of those operators down in my own RxJS dictionary.

**\>> [“RxJS Recipes” by Dominic Elm and Kwinten Pisman](https://www.youtube.com/watch?v=W8T3eqUEOSI)**

This is a wonderful talk about common RxJS patterns. With the sample app, Dominic and Kwinten present us how to solve problems with “divide and conquer” approach and making use of patterns and recipes.

Watching this talk, in particular, made me very excited, as they opened my eyes on how useful can RxJS actually be. Thanks to great talks like that, reactive programming is starting to feel much more natural for me when developing web apps. I wish there was a book/course on advanced RxJS patterns somewhere out there.

Does anyone know some?

---

## JavaScript misc.

**\>> [RxJS: Subscription and add()](https://rxjs-dev.firebaseapp.com/guide/subscription)**

This is one a very useful tip I found a while ago and it is worth sharing, as I see many people are unaware of this. You can add multiple subscriptions to one Subscription instance and then .unsubscribe() it whenever necessary to unsubscribe from all of them at once.

I mention it because I see a lot of people solving this problem by creating an array of Subscription instances and looping over them and unsubscribing. I also see some people sharing some npm libraries which solve this non-existing problem.

**\>> [“Debugging RxJS” and rxjs-spy by Nicholas Jamieson](https://blog.angularindepth.com/debugging-rxjs-4f0340286dd3)**

I found out a nice way of getting valuable information on your Observable instances currently running in your app. For that, use rxjs-spy npm package. With one command in the browser’s console, you can extract the state of your observables, how many subscribers it has, what is the value inside, etc.

I used and it was incredibly helpful, as I found a couple of subscription leaks, totally unaware of them before.

**\>> Typed reactive forms in Angular?**
[[GitHub issue]](https://github.com/angular/angular/issues/13721) [[@ng-stack/forms]](https://www.npmjs.com/package/@ng-stack/forms) [[ngx-strongly-typed-forms]](https://www.npmjs.com/package/ngx-strongly-typed-forms)

One thing I found awkward about reactive forms in Angular, that they are not as strongly typed as I wish them to be.

There is already a GitHub issue for that (linked above). For now, we can create our own type aliases that suit our needs or use external solutions, like those above.

I saw that there is an already rough discussion on that topic going on. People want (even demand) new functionalities over and over. There is probably a lot going on in the Angular team already, so please, be patient and understanding. Those folks are doing a really good job.

**\>> [Promise: then() + error callback vs catch()](https://stackoverflow.com/a/33278420)**

Interesting thread on using one of many Promises’ features. I was wondering what’s the difference between using error callback in `then()` or just using catch().

TL;DR: Using error callback might miss error that would occur in handler inside `then()`. So… If we want to handle errors properly we should always use catch(), right? Yup, JS is weird.

**\>> [Does unresolved Promise cause memory leak?](https://stackoverflow.com/questions/20068467/does-never-resolved-promise-cause-memory-leak)**

Here is Stack Overflow thread on that topic exactly. I was wondering what are the consequences of not resolving a Promise.

One thing is sure, if you create a Promise that never resolves/rejects, you create forever-pending Promise instance. I think that one of the comments says it all:

@cdhowie: “There's some truth in these comments and some that's misleading, so let me clarify: A promise with handlers attached might be eligible for garbage collection. A promise is kept alive (not GC-eligible) if any of the following are true: (1) there is a reference to the promise object, (2) there is a reference to the "deferred" state of the promise (the object/functions you use to resolve/reject it). Outside of this, the promise is eligible for GC. (If nobody has the promise and nobody can change its state, what is its purpose anymore, anyway?”

---

## Other

**\>> ["Awesome" GitHub repository](https://github.com/sindresorhus/awesome)**

This repository is one of the best and the biggest learning resources you can find on the Internet. It consists of many references to learning articles, tutorials, courses, videos, etc. A great starting point if you want to level up as a developer. I personally found many resources on the basics of functional programming and Elm there.