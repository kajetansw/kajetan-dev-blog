---
title: "Learning Session #10"
date: 2019-10-05
description: Spend time with me by learning new things in this 10th Learning Session!
tags: ['learningsession', 'functionalprogramming', 'angular', 'typescript', 'rxjs', 'java', 'tools']
---

---

## Functional Programming

Basically all content surrounding FP this time is connected with articles and projects created by Giulio Canti (@giuliocanti). For me reading those articles below definitely firmed and expanded my previous knowledge on FP. I would like to give credit to Piotr (@hasparus) who introduced me to Giulio’s work after the last Wrocław TypeScript meetup. It was genuinely fascinating, thank you both!

**\>> [“fp-ts” library](https://gcanti.github.io/fp-ts/)**

I think fp-ts today is as famous for TypeScript as Rambda for JavaScript. With it, you can use “popular patterns and abstractions available in most functional languages”. If you are a newbie to FP (like me) and you know TypeScript it may be a good way to get your head around FP concepts through practice. Just play with it a little, create something small, something you know.

**\>> [“Getting started with fp-ts” series](https://dev.to/gcanti/getting-started-with-fp-ts-setoid-39f3)**

Aside from fp-ts having a well written official guide, Giulio created a series of articles, that introduce you to the structure of the library and core type classes. Thanks to the library itself being based on functional languages like Haskell and PureScript, we also get to know type classes popular in the functional world, starting with simple Eq and ending with a fearful Monad.

**\>> [“Functional Design” series](https://dev.to/gcanti/functional-design-combinators-14pn)**

The series of articles that I think are more focused on FP concepts themselves, just using fp-ts as a learning tool. Here we get to know how to combine values to create more complex ones (in a smart way), how to create data constructors with refinement type, what exactly are algebraic data types and more! 

---

## Angular

**\>> [Angular Update Guide](https://update.angular.io/)**

I wanted to make a little shout out to the creators of the Angular Update Guide. With couple of clicks you get a checklist of all things you need to do to successfully migrate from one version of Angular to another.

Recently I had a pleasure (I had a lot of fun!) of migrating a medium-sized application from version 6.0 to 8.0. I took me something like a day, or so, and the initial test run is all green. I have to say – boy, I was expecting more of a challenge! 😊

**\>> [“Testing your implementation of ngOnChanges in Angular” by Christoph Krautz](https://medium.com/@christophkrautz/testing-ngonchanges-in-angular-components-bbb3b4650ee8)**

What I was really surprised about is a way that we can test implementation of ngOnChanges method in our Angular components. It felt natural to me to make a change to the property marked with @Input decorator, invoke change detection and that’s all. Unfortunately, such a test would fail immediately, because no change would happen.

So, what’s the solution? You can find it inside Christoph’s article.

---

## RxJS

**\>> [“What GroupsBy in Vegas, Stays in Vegas” by Mike Ryan & Sam Julien](https://www.youtube.com/watch?v=hsr4ArAsOL4)**

RxJS Live was announced as a “world’s first all-RxJS conference” and it was pretty exciting news for me. Less exciting, that I couldn’t participate myself… But at least we have video recording on YouTube!

This talk introduces us to some interesting RxJS operators (groupBy, timeoutWith, ignoreElements, etc.) to create a small component simulating the “heart” button from Twitter. I was surprised, that a simple button like that can introduce so many implementation problems. Fortunately, Mike and Sam saved the day and explained potential problems and possible solutions.

---

## Java

**\>> [“The best way to map a many-to-many association with extra columns when using JPA and Hibernate” by Vlad Mihalcea](https://vladmihalcea.com/the-best-way-to-map-a-many-to-many-association-with-extra-columns-when-using-jpa-and-hibernate/)**

I think most people who dealt with JPA and Hibernate had to model your entities to express many-to-many relationship. But what about a situation, when your join table has more information than just foreign keys?

I recently had a similar problem and article created by Vlad proved to be the most useful out there. And trust me, I looked for a solution for a pretty long time!

---

## Other

**\>> [Netlify](https://www.netlify.com/)**

Recently I had a need to deploy a small web app quickly, to share it with some people. I had no defined way to do that at that time. I remembered, that many people on Twitter were sharing their experiences with Netlify. They were all very positive, so I decided to do that myself.

I created my account, read “Gettings Started” guide, installed Netlify’s CLI, gave credentials, hit “deploy” and… That was it! My application was live in merely 30 minutes without any problems. I really respect such a solution and will definitely use it for another project.

**\>> [“HTTP headers for the responsible developer” by Stefan Judis](https://www.youtube.com/watch?v=Mjqf2kkFLy8)**

Another great conference, another talk recordings to watch 😊 Here Stefan shared with us his background, motivation and insight of how to be a responsible web developer. One of those traits is to know your way around HTTP headers.

It is a really good introduction to useful HTTP headers (present or soon-to-be) for every web developer, because sooner or later, you’ll have to take deeper look at the security of your applications.