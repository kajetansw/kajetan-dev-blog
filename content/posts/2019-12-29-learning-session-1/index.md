---
title: 'Learning Session #1'
cover: ''
date: 2018-12-29
description: Spend time with me by learning new things in this 1st Learning Session!
tags: ['beginner', 'angular', 'javascript', 'typescript', 'css']
---

---

## Angular

\>> [Reactive Forms](https://angular.io/guide/reactive-forms)

As we started to use forms at work for our project (which is fairly new) I thought I should refresh my knowledge about template-driven and reactive forms in Angular. Here is a great tutorial for reactive forms inside Angular documentation itself. I highly recommend using their documentation for all Angular-related problems, because it is one of the best I’ve seen so far.

About reactive form itself – it may be the best way of handling forms in Angular when you have really strong domain-driven application. With that you can handle state, content and validation of your forms in very flexible way. It is also easy to create your own custom validators.

---

## JavaScript

\>> Iterators and generators [[ 1 ]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) [[ 2 ]](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e)

Last week there was a training session in my company during which my coworkers had an opportunity to refresh their knowledge about JavaScript (which was essential to move further into training). After the training I asked them to describe what they have learnt, so I also could get to know a new thing or two. And I did – my friend Wojtek presented us two interesting features of JavaScript. First one was a concept of:

- Iterator: sequence which returns next object from an iterable,
- Generator: function defined with unique syntax function\* which is not execution is not continuous. Boundary of its execution is marked by yield keyword.

Above articles let you know how to use those and even create your own iterables (aside those build-in, like arrays and maps). Now you can create your custom iterable objects!

\>> [“Tasks, microtasks, queues and schedules” in JavaScript](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

This topic is in reference of second theme laid down by Wojtek and it is greatly described in article by Jake Archibald of title quoted above. It describes tasks, microtasks, JS stack and event loop inside browser’s engine. If I had to sum it up in few words:

- “Synchronous” code in JavaScript is executed first in given block of code.
- Microtasks such as Promises are registered and scheduled to be executed right after “synchronous” code in given block of code.
- setTimeout creates another task which is executed after given time, which is MINIMAL time of execution. It really executes right after all other tasks and microtasks are execued.
- Usage of async/await lets us prioritize resolving async actions above all other tasks.

\>> [`this` keyword in JavaScript](https://medium.freecodecamp.org/how-to-understand-the-keyword-this-and-context-in-javascript-cd624c6b74b8)

One of the most important knowledge for every JS developer is to understand this keyword and its relation to context. It is basic not only when using vanilla JS but also when using complex frameworks like React.

Really a must-read!

\>> [Using browser’s debugger instead of console.log()](https://medium.com/datadriveninvestor/stopping-using-console-log-and-start-using-your-browsers-debugger-62bc893d93ff)

Good introduction of how to use build-in debugger inside of your browser instead using just console.log(). I’ll start using it from now on, I promise! 😉

\>> [Using CSS in console.log()](https://itnext.io/console-rules-b30560fc2367)

It may be just an interesting fact, but you can add CSS styling to your console.log(). What’s more, you can put there funny cat GIFs 😯

---

## TypeScript

\>> [Creating your own decorator](https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4)

For all the time using Angular I’ve been using only build-in decorators like @Injectable or @NgModule, but I have never thought of creating my own decorator in TypeScript. I really first came across decorators in Spring (there called annotations) and there learned about their influence on Aspect Oriented Programming. It all revolves around “adding additional behavior to existing code (an advice) without modifying the code itself”, like the article says.

It is interesting read of how to create and use four kinds of decorators in TS: class, method, accessor and parameter decorator.

---

## CSS

This month was fairly full of CSS content, because of styling and animating my portfolio. I dug up some really useful stuff and I will be posting some of them along the way.

\>> Creating button that changes it’s inner text on hover [[ 1 ]](https://stackoverflow.com/a/9913526) [[ 2 ]](https://codepen.io/sethabbott/pen/FtuLz)

Here I found a way of how to set up the effect described above using :hover and :before CSS selectors with content attribute.

Another link is a codepen of interesting button animation created by Seth Abbott. Really pretty effect. Inside @keyframes you create… Well, keyframes of your animation. Inside the class you then customize its behavior, like duration, iterations, fill-modes, delay, etc. It is really useful to know the basics of creating animations.

\>> Intro to @keyframe animations in CSS [[ 1 ]](https://www.w3schools.com/css/css3_animations.asp) [[ 2 ]](https://css-tricks.com/snippets/css/keyframe-animation-syntax/)

Here you can find basic syntax for creating CSS animations using @keyframe keyword and adding it to CSS class that triggers the animation on element.

\>> [Restarting CSS animation using JavaScript](https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element)

When creating my side project I came across problem of starting and restarting animation on button click. I created @keyframes animation, added it to CSS class and created JS function to remove and add this class when clicking a button. That was supposed to trigger animation each time I clicked the button. But it somehow didn’t. After reviewing all solutions mentioned in the board, the one that worked for me was:

```js
function restartAnimation() {
  const timeline = $('.timeline');

  timeline.removeClass('timeline--slide-out');

  setTimeout(() => {
    timeline.addClass('timeline--slide-out');
  }, 0);
}
```

---

## Other

\>> [BrandColors](https://brandcolors.net/)

This was really useful while doing my portfolio page when I needed brand colors of Angular, Spring and others. Good to have everything in one place.

\>> [Keyframes (for Chrome)](https://chrome.google.com/webstore/detail/keyframes/dalaiblmpeklkjnpeocmaojcfldmbfck)

Already talked about “keyframes” today, but now it’s about Chrome extension. With that simple tool you can create simple CSS keyframes for elements visible on the page. When you create your keyframes you can extract it and copy CSS code right into your project. Awesome stuff!

\>> [Embedding gists into website](https://github.com/blairvanderhoof/gist-embed)

I just had to mention "gist-embed" project created by blairvanderhoof which allow to embed GitHub gists into the website in two simple steps. I even used it in this post and it is super useful! 😄