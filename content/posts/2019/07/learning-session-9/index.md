---
title: "Learning Session #9"
date: 2019-07-21
description: Spend time with me by learning new things in this 9th Learning Session!
tags: ['learningsession', 'javascript', 'typescript', 'tools']
---

---

Timetables are expanding for me like crazy lately. Last month we did a major release, that of course meant a lot of work to do. I also volunteered to prepare JavaScript workshops at my workplace and hosted them a week ago. I had a blast presenting and learning other people about building REST APIs with NodeJS 😉 At the same time I feel relieved, that I finally emptied my calendar and have some time to rest.

Of course, being busy resulted in learning new stuff, so I want to share them with you, as always 😊

---

## JavaScript

**\>> [“Why (! + [] + [] + ![]).length is 9” by Tomas Forsman](https://dev.to/tomasforsman/why-length-is-9-2i4l)**

Tomas presents us with one of the unexpected behaviors of JavaScript. “Unexpected”, compared with other languages, of course. Firstly, I wouldn’t even expect the above code to even run without errors (that exclamation mark next to a “plus” sign was eerie). The author presents us a step by step explanation to the final solution. After thinking for a while about it, it’s really simple 😉

This is one of those “JavaScript, the weird parts” type of articles. Nevertheless, I love those little quirks of the language. I like presenting them to my co-workers and watch their baffled reactions 😊

**\>> [“Performance vs Readability” by Riccardo Polacci](https://blog.usejournal.com/performance-vs-readability-2e9332730790)**

Here Riccardo presents us with a really interesting remark – just how performant are all Array methods that enable us to transform data in a readable way?
It’s worth reading because the conclusion gives you really meaningful insight into how you should manage your data and what to watch for.

**\>> [“4 Types of Memory Leaks in JavaScript and How to Get Rid Of Them” by Sebastian Peyrott](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)**

Sebastian presents us with basic concepts of memory leaks in our applications and what are the dangers when dealing with JS. We get to know how the memory is managed internally and what are the most common sources of memory leaks in JS. There we can also find a thorough tutorial on how to detect and track memory leaks with Chrome’s DevTools.

**\>> [“shepherd.js” library](https://shepherdjs.dev/demo/)**

I was recently interested in finding a technology that enables creating interactive tour guides through your app. Shepherd.js is exactly that. Above link gives us a little demo of the library’s functionalities. You can use it with plain JS and with popular frameworks using corresponding wrapper library.

---

## TypeScript

**>> Using “io-ts” library to make a runtime validation in TypeScript [[ 1 ]](https://lorefnon.tech/2018/03/25/typescript-and-validations-at-runtime-boundaries/) [[ 2 ]](https://github.com/gcanti/io-ts)**

I think one of the most important things TS users are forgetting, that it is still a JavaScript underneath. During TS to JS compilation, we basically throw out everything that is TS and enter JS world. That may be tricky. We feel safe, because we provided necessary static typing to our objects, so nothing unexpected can happen with our data.

Nothing more misleading. We still have boundaries in our application, where unexpected data can slip in and destroy our delusion of safety. I experienced those situations myself. Those boundaries may be for example your services, that communicate with external REST API.

Lately, I found two solutions (libraries) to solve that problem. One of them is “io-ts”, that enables us to create runtime types, that decodes our objects and checks, whether they have the right structure during runtime.

**\>> [“Decoding JSON with Typescript” by Joan Llenas Masó](https://dev.to/joanllenas/decoding-json-with-typescript-1jjc)**

Here we have another solution for the above problem – “ts.data.json” library. It introduces JSON Decoders concepts known from Elm. It allows us to manage a set of decoders for primitive data types and compose our own for decoding (validate) our data.

The article explains just how severe our problem might be and gives us a thorough example of how to use a custom JSON Decoder to our advantage.

**\>> [“Union types in TypeScript: modeling state”  by Matias Klemola](https://matiasklemola.com/typescript-union-types)**

Matias shows us an interesting concept of how to model an application’s state with TypeScript’s union types. It’s inspired by how The Elm Architecture works.

I wonder just how we could use those concepts in Angular. Leveraging Functional Programming concepts in Angular may result in something really interesting.

---

## Web development

**\>> [“Svelte - Quickstart & Thorough Introduction Tutorial” video by Academind’s Maximilian Schwarzmüller](https://www.youtube.com/watch?v=LIfIRdRlD58)**

Here Max does a great job explaining core concepts of Svelte compiler. “Svelte” is a buzzword I hear a lot lately, so I wanted to try that technology myself. As always, I got a great tutorial, that is an intro to Max’s full course on the Udemy.

**\>> [“Practical Machine Learning for Front End Developers” by Charlie Gerard](https://www.youtube.com/watch?v=KoL-ODx5dG4)**

A great, enthusiastic and fun talk on how we can leverage machine learning in web development. We get to know necessary basics concepts of machine learning, available tooling and what are the use cases in web dev. I’m really glad Charlie presented us with so many interesting example apps that show entirely different use cases. Those just proved her point of how diverse the topic really is.

---

## Other

**\>> [Generate images of your code snippets](https://carbon.now.sh/)**

I was always wondering what all those people on Twitter use to create their pretty code snippet images. Now I finally got the answer! “Carbon” lets you set up your code snippet to share with others with little customization steps (like color theme and background) for the most popular languages.

**\>> [“My Guide for Great Developer Experience (DX)” by Sam Jarman](https://www.samjarman.co.nz/dxguide/)**

Recently I heard the term “DX” or “Developer Experience”, read about it and found the concept really interesting. Developers being your client targets are a lot different from other applications’ users and there's a lot to do to make them happy. I wasn’t aware of those concepts but found insight to them within the article made by Sam.