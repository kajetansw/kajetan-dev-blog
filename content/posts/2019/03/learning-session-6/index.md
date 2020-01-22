---
title: "Learning Session #6"
date: 2019-03-16
description: Spend time with me by learning new things in this 6th Learning Session!
tags: ['learningsession', 'angular', 'html', 'css', 'java']
---

---

## Angular

Today I’d like to focus mainly on a series of articles about zones and change detection mechanisms. They relate mostly to the Angular, but the knowledge can be applied also to other JS frameworks. Really interesting read if you are interested in how your framework may work behind the scenes!

**\>> [“Understanding zones” by Pascal Precht](https://blog.thoughtram.io/angular/2016/01/22/understanding-zones.html#creating-a-profiling-zone)**

An explanation of what zones are, how they work and how they can improve our work. The conception itself was created some time ago and it quickly got deserved attention. Now it is one of core mechanisms in Angular. 

**\>> [“Zones in Angular” by Pascal Precht](https://blog.thoughtram.io/angular/2016/02/01/zones-in-angular-2.html)**

Extension of the previous article describing how the Angular takes advantage of zones in its change detection. 

**\>> [“A Comprehensive Guide to Angular onPush Change Detection Strategy” by Netanel Basal](https://netbasal.com/a-comprehensive-guide-to-angular-onpush-change-detection-strategy-5bac493074a4)**

Introduction to change detection strategies and how and when we should them. The article focuses mostly on “onPush” strategy, which can improve the performance of our app when used correctly. 

**\>> [“Angular change detection explained” by Pascal Precht](https://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)**

Great addition to the previous article. After reading both of them you get a really solid introduction to the topic. 

After reading those articles I really think I got a bit better understanding of how Angular really works. I really recommend reading them, because it surely will turn out for the best for every Angular developer 😊

---

## HTML / CSS

**\>> [Delayed effect on hover](https://stackoverflow.com/a/8566205)**

This week I was facing a problem with navbar component: a user had to make almost pixel-perfect moves to display menu items, sub-items, etc. One unintentional move to the side with a cursor and the menu was disappearing. That is obviously a UX problem which had to be fixed. 

I used CSS `transition` to manipulate the visibility property of an element with `transition-delay` on hover. One warning though: it doesn’t work with `display` property.

**\>> [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)**

An introduction to really neat functionality of CSS, which enables us to manipulate an element’s size and position on our site. 

We should not worry anymore with positioning our elements when flexbox and grid layouts come to aid!

**\>> [Indeterminate checkbox state](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type%3Dcheckbox))**

I just only recently found out that we can use the “indeterminate” state in our checkboxes natively in HTML. That means our checkbox can display third value, aside of boolean values. 

Example use case? For me, it was implementing “check all” checkbox for my checkbox group. 

**\>> Intro into SVG [[ 1 ]](https://developer.mozilla.org/en-US/docs/Web/SVG) [[ 2 ]](https://www.pluralsight.com/courses/svg-fundamentals) [[ 3 ]](https://medium.com/prod-io/an-intro-to-svg-animations-smil-6476c03a397c)**

Learning to create and use SVGs in web applications was on my mind for quite some time. I took some time and got through fundamentals guide by Brian Treese. Had fun doing it and I might use it in my next project!

(Still, designing isn’t my strong suit, so I might as well drop that idea when I’ll get horrible results 😉)

**\>> [How to override external CSS styles](https://stackoverflow.com/questions/20721248/how-can-i-override-bootstrap-css-styles/27704409#)**

We can sometimes face a problem when we want to override styles from CSS libraries, like Bootstrap. When we cannot just change the dedicated SCSS variable to match our preferences we need to override style itself. 

Of course, using !important rule is not a great idea and is a sign of horrible CSS architecture. To do that we can take advantage of CSS priorities. 

It’s a mechanism that counts weights of our CSS selector. In conclusion: the more complex our selector is, the more importance it has over others. Nice feature, but we should be careful with it. I can imagine taking it too far with creating too complex selectors which depend to tightly on our layout structure. 

---

## Java

**\>> [“Java 9 Features with Examples” by Rambabu Posa](https://www.journaldev.com/13121/java-9-features-with-examples)**

With Java 12 right around the corner, I started thinking about making up for all Java versions after Java 8. This article was my first step towards that. In it, you can find a list of all major features of Java 9. 

I got to know that Java 9 got some really nice features:

- jshell (or Java Shell) – you can now execute simple Java code in command prompt in one step. (Am I the only one who got the urge to joke around about differences between Java and JavaScript now? 😉)
- Module System – a big change that included separating JDK into multiple modules so it could be scaled more efficiently. 
- Stream and Optional APIs improvements.