---
title: "Learning Session #5"
date: 2019-03-04
description: Spend time with me by learning new things in this 5th Learning Session!
tags: ['learningsession', 'meetup', 'npm', 'yarn', 'java', 'javascript', 'typescript']
---

---

## npm / yarn

\>> [“De-duplicating yarn.lock” by Sergio Cinos](https://medium.com/@scinos/de-duplicating-yarn-lock-ae30be4aa41a)

Yarn is a package manager for JavaScript libraries and an alternative to npm. I’ve been using yarn from quite some time and I’m satisfied with it, especially when comes to installation times (in contrast to npm).

This article highlights a problem of duplicated bundles in your project, which can occur inside of your project from time to time. This leads to an oversized project’s dependencies.

Sergio is also an author of the yarn-deduplicate package which analyses your yarn.lock and removes duplicates. As a fan of every type of optimization – thank you for your work, Sergio!

\>> [“Getting your Team Passionate About Web Performance to Achieve Performant Web Apps” by Nicolas Goutay](https://noti.st/phacks/FurUmG/getting-your-team-passionate-about-web-performance-to-achieve-performant-web-apps#sZ7GhJ2)

This is a great presentation I found, where the author shares his experiences in creating performant web applications.

What caught my eye:

- Using the right business methodology for your project is a key to success,
- Using the right tools is as important. With them, we can check if our project isn’t too big, how big it should be, how big individual modules are, etc.
- Share your knowledge and successes inside your team!

\>> [“These tools will help you write clean code” by Adeel Imran](https://medium.freecodecamp.org/these-tools-will-help-you-write-clean-code-da4b5401f68e)

This article introduces basic tools for writing clean code (mostly for JavaScript projects). I personally use some of them too. Now I can’t imagine working on a project without ESLint or TSLint!.

(In fact, when writing this I realized that creatia ng list of useful tools for creating clean and performant apps is a great idea for a separate article! I might just use this idea the in nearby future 😊)

---

## Java

\>> [“Testing Spring MVC Web Controllers with @WebMvcTest” by Tom Hombergs](https://reflectoring.io/spring-boot-web-controller-test/)

This Is only a part of a great “Testing with Spring Boots” series of articles created by Tom. I mentioned this one because this is the part I started from.

Frankly, I wasn’t always sure if testing controllers in Spring is possible or if it even makes sense. This article changed my mind and presented me with reasons and examples of why and how to implement such tests. It is even easier for us to create such integration tests because Spring provides us with tools.

I highly recommend reading all articles from the “Testing with Spring Boot” series!

\>> [“Auditing with JPA, Hibernate and Spring Data JPA” by baeldung](https://www.baeldung.com/database-auditing-jpa)

Article covers the implementation of audits on Spring entities using three methods. Methods varies and are different in the complexity of implementation and flexibility.
After reading this article you will surely find something to suit your needs!

---

## TypeScript / JavaScript

\>> Creating types for existing JS library

Recently at work, we’ve started working with external JS library and had to integrate it with our TypeScirpt/Angular codebase. For that, I started implementing types based on the library’s documentation.

It was more fun that I initially thought it would be! Maybe because I wasn’t doing anything like this previously…

There was two things I learned during this task:

- How to implement a type for the constructor:

```ts
interface Book {
  name: string;
  author: Author;
}

interface BookConstructor {
  new (name: String, author: Author): Book;
}

declare const Book: BookConstructor;

// now we can write type-safe definition like:
// const book = new Book('Firestarter', new Author('Stephen King'));
```

- There are a lot of differences between using types and interfaces in TypeScript. I basically was using a strategy: if I wanted generic and/or extendable functionality I used interfaces. In all other cases, I was using types.

\>> [Implementing “Copy To Clipboard” button for input field](https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript/30810322#30810322)

Here I found a thorough explanation of how to implement “Copy to Clipboard” functionality in JS. There are basically 3 ways and they are basically as good as the other, but they differ in browser compatibility. I personally used document.execCommand(‘copy’) option, because it worked well under IE11.

\>> [“How to check if a JavaScript object property is undefined” by Flavio Copes](https://flaviocopes.com/how-to-check-undefined-property-javascript/)

When using TypeScript I always used if (object.property) doSth(); syntax to check whether a property holds truthy value. Nothing is wrong with that of course, but it didn’t work in the one particular case.

Recently I made a mistake by assuming, that code above would also check whether the property of such name exists on object altogether. Well, wrong. In that case, JS engine would throw ReferenceError, because we are referring non-existing property.

For that to work, we need another condition and it is explained by Flavio in his article.

\>> Creating and exporting large text files [[ 1 ]](https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server/18197341#18197341) [[ 2 ]](https://stackoverflow.com/questions/23301467/javascript-exporting-large-text-csv-file-crashes-google-chrome/25975345#25975345)

Here I present two simple solutions that, when combined, let you generate and download pretty big text files (like CSV). With that solution, I’ve been able to asynchronously generate CSV file for 1.5mln objects served from my backend. That’s neat!

--- 

## Other

\>> [“10 tips for better Pull Requests” by Mark Seemann](http://blog.ploeh.dk/2015/01/15/10-tips-for-better-pull-requests/)

Here Mark lists his tips for creating better pull requests. I believe that implementing those simple rules in every team would make every team member’s life easier. I speak from experience, because I value readability when doing code reviews and make sure that my PRs are simple to review.

That's the end for today. In the end, I just want to share something small, but exciting. I was able to create my first pull request on public GitHub repo and got it merged! It may have been just two lines of changes, but everyone must start from something, right? 😛