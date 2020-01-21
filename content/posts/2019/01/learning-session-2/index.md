---
title: 'Learning Session #2'
cover: ""
date: 2019-01-17
description: Spend time with me by learning new things in this 2nd Learning Session!
tags: ['learningsession', 'git', 'react', 'security', 'java', 'typescript']
---

---

## Git

\>> [Free and (almost) unlimited private repositories on GitHub](https://blog.github.com/2019-01-07-new-year-new-github/)

Last week everyone on Twitter was talking about this so I can't just leave that be, right? 😉 What I’m referring to is GitHub announcing free and unlimited private repositories for all users. That’s a great news and I was wondering why this option was not enabled from day one I started using GitHub.

I mentioned that this option is “almost” unlimited because free private repository can manage up to three collaborators only. Big projects won’t be able to use those, but at least individual users can now freely hide code they consider shameful 😉

---

## React

\>> [React Crash Course by Mosh Hamedani](https://www.youtube.com/watch?v=Ke90Tje7VS0)

During last two weeks I’ve completed this YouTube crash course by Mosh Hamedani. It is derived from his full course on React and contains first couple of lessons.

It think it was a great introduction to the library itself (React is a considered a library, not a framework, isn’t it? 😊). Tutorial ends up with creating simple shopping cart app with few controls and couple of components with parent-child relations. Passing and maintaining the state and rendering components is the main focus here.

I chose to take this crash course because it might be a good practice to know at least basics of other technologies, even if I’m using only Angular at work.

\>> [React + TypeScript](https://scotch.io/tutorials/using-create-react-app-v2-and-typescript)

Topic may be old (three months is a long time in IT!) but create-react-app in v2 started enabling using TypeScript within React projects. For someone coming from Angular world it is fascinating news: enabling usage of my dear TS with one of the most (if not THE most popular) JS library. Chris Sevilleja introduces us to that concept in his article.

Is it really useful? Is using JavaScript not enough? Is it a breakthrough? I would like to get some feedback from someone who uses React on daily basis 😊

---

## Web security

\>> [OWASP To 10 Project](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project)

Recently I have started “Web Applications Security” course path on Pluralsight and one of the topics was a talk about OWASP Top 10 2017. It is a document created by ~500 web experts on Top 10 web applications’ risks. For reference the top three are:

1. Injection – thanks to frameworks and provided security modules we may think that injection should be somewhere lower. Despite that the consequences of successful injection may be catastrophic for not only the application but for users and authors.
2. Broken authentication – it is a matter of people using weak password. When creating our application we need to encourage users to create secure (complex, long) passwords. As far as I know it is not a problem to crack a weak and predictable password now…
3. Sensitive Data Exposure – a fairly new topic, mostly related to GDPR and adapting web apps to new laws.

Document itself has only 25 pages and contains all information about the topic. It may be an interesting read for all web developers.

\>> [“Do not EVER use eval()!”](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)

eval() is pretty simple function in JavaScript that executes string that is passed to it as a JS code. It dates back to the ECMAScript 1 standard from 1997. And everyone in 2019 must be thinking: “Who and why invented and implemented such monstrosity?”. Today a common sense is not to use this function because of one simple reason: cross-site scripting.

I can’t imagine a use case for eval() anyway and can only imagine how to implement it securely. In that case I just won’t use it and even forget that it ever existed!

\>> [SQL Injection Attack](https://www.veracode.com/security/sql-injection)

“The biggest of them all” in the world of web security risks is still SQL Injection. The article above discloses specifics and presents vulnerabilities that may expose our application to this attack. Examples here are presented in Java, but it is not a problem to find their equivalents in other technologies. I also found out some clever ways to transform existing into almost everything and execute them.

Really scary stuff if you ask me…

---

## Java

\>> [How does Java evaluate Logical Expressions?](https://stackoverflow.com/questions/6352139/does-java-evaluate-remaining-conditions-after-boolean-result-is-known/6352184#6352184)

Really simple matter - when writing a Java code I started wondering what should be the most optimal order of logical expressions in my if-statements. The answer lays in the Stack Overflow answer above. Java uses so called “short-circuiting” which means that the next logical operand is evaluated only when the previous one does not meet the condition. We can optimize our expressions based on that knowledge!

\>> [Why we should not use field dependency injection](https://www.vojtechruzicka.com/field-dependency-injection-considered-harmful)

The dependency injection pattern is now common concept in web frameworks, e.g. Spring or Angular. In fact, the first time I came across it was when I was learning Spring. I was presented with three basic types of DI: field, constructor and setter.

Recently at work I came across some code where field DI was used and was highlighted by the IDE as a warning. The message was: “Field injection is not recommended”, so I started looking for a reason.

Article above made by Vojtech Ruzicka gives us a perfect explanation for that problem. It lists most valuable reasons of what is wrong with field injection and separates use cases of constructor and setter injections. Really worth the read for Spring developers.

Also worth mentioning is the fact, that constructor DI is advocated by Spring team itself.

\>> [Basics of JVM Architecture](https://blog.overops.com/jvm-architecture-101-get-to-know-your-virtual-machine/)

Interesting article by Tzofia Shiftan describing basic concepts of Java Virtual Machine. It describes steps of how Java code is translated into machine code and how each function is executed inside single thread. It also shows us Java bytecode generated from simple functions which I found really educating!

---

## TypeScript

\>> [“Classes vs interfaces in TypeScript”](https://toddmotto.com/classes-vs-interfaces-in-typescript)

I use TypeScript for almost half a year and I think of it as a blessing in JS world. Now… I made some allies and enemies with that one statement alone, didn’t I? 😉

During my learning of TS I found it extremely important to understand concept of class and interface. It was simply because interface in TS differs a little from Java, which was known to me beforehand. Todd Motto explains to us what is the actual difference. Quick summary:

- Interface in TS is merely a type checker for the compiler. It is cruelly abandoned and forgotten during runtime.
- Class is a “blueprint” of not only dataset for an object, but also for its behavior, because it also enables us to implement methods. That actually is similar to Java’s classes.

\>> [Advanced types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

A little more learning material to be processed here, but important nonetheless. TypeScript is strongly oriented on type checking and has many tools for us developers to rely on. The most interesting ones I found here are:

- Union types - let us declare that a variable can be of multiple types;
- Type guards – narrow down type of object and create a condition, examples are typeof, instanceof and user-define type guards (which can be pretty hard to understand at first);
- Literal types - define strings or numbers as a union type of values that are enabled for a variable, somewhat like enum type;
- Polymorphic this types – use this keyword as a type to enable classes extending our class to use methods returning this;
- Type aliases – allow us to create new names for types, I used it couple of times to create type for my union types, so they could be used in multiple places. You can also create generic types and even nest themselves as a property. But the mind-blowing parts come next… 
- Index types – it dynamically checks attributes of an object and treats them as type (or union types) themselves. It uses keyof keyword to do just that;
- Mapped types – patterns that enable us to create new types out of existing types or interfaces;
- Predefined conditional types.