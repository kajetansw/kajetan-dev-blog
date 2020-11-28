---
title: 'Bring reactivity to your Angular templates with the LetDirective - Part 1'
date: 2020-10-16
description: Part one of the step-by-step tutorial on how to implement your own structural directive for binding an Observable to the Angular view.
tags: ['angular', 'rxjs', 'zonejs']
---

---

#### ⚡ Originally posted on [inDepthDev](https://indepth.dev/bring-reactivity-to-your-angular-templates-with-the-letdirective-part-1). ⚡ 

---

## TL;DR

- Angular's built-in `AsyncPipe` serves as a convenient way to bind Observable values to the view.
- Even though it solves most of the use-cases, using it comes with some downsides:
  - It can be painful to deal with falsy values.
  - It does not work in the zone-less environment.
  - It only notifies about the `next`-ed values, thus ignoring `error` and `complete` notifications.
  - For complex use-cases it requires a lot of boilerplate code, especially when combining with `*ngIf`.
- We can solve the above issues by using the structural `LetDirective`.
- The `LetDirective` offers all the basic `AsyncPipe` features (like emitting switching context for different Observable notifications and subscribing/unsubscribing automatically on component's initialization/destruction) and adds a convenient API on top of it.
- The `LetDirective` allows us to switch view based on the source Observable's notifications (`complete` and `error`).

---

## Introduction

Angular has a pretty convenient way to bind an Observable to the view context. The popular `AsyncPipe` serves exactly that purpose:

```html
<app-hero-card [hero]="hero$ | async"></app-hero-card>
``` 

> *The async pipe subscribes to an Observable or Promise and returns the latest value it has emitted. When a new value is emitted, the async pipe marks the component to be checked for changes. When the component gets destroyed, the async pipe unsubscribes automatically to avoid potential memory leaks.*
(source: [official docs](https://angular.io/api/common/AsyncPipe))

In its core, the `AsyncPipe` does its job well: 
- It applies values emitted from the source Observable to the view. 
- It stops emitting when the source Observable completes.
- It stops emitting and displays an error message to the console when the source raises an error.

The above features cover all three [Observable notifications](https://rxjs-dev.firebaseapp.com/guide/observable#executing-observables) - different "states" that the Observable might be in.

I'm not here to introduce the `AsyncPipe` though. I'll assume that you have some prior knowledge about it. Firstly, I want to present some issues that you may encounter when using this pipe, based on our current knowledge.

---

## Issues with the `AsyncPipe`

### Zone.js and rendering performance
This issue is interesting and complex at the same time because it involves solving performance issues with rendering for large Angular applications. It's becoming more and more common to find solutions for creating applications that don't rely on the Zone.js. There are even plans to remove usage of Zone.js in the Angular itself. I'll touch on the specifics later, but how is that even connected to the `AsyncPipe`?

The `AsyncPipe` relies on the Zone to be present - it doesn't really trigger change detection by itself. It marks the component and its ancestors dirty waiting for the Zone to trigger change detection. So, in case you want to create a zone-less application, the `AsyncPipe` is not going to do much for you.  

> If you want to hear more about creating reactive zone-less Angular applications, performant reactive rendering, and why it contributes to the future of the core Angular, watch this awesome talk:
> -  🎥 ["Fully zone-less - High Performance in post IVY"](https://www.youtube.com/watch?v=x0W_mbivKLk) by [Michael Hladky](https://twitter.com/Michael_Hladky/).


### Displaying context-based templates
This one involves the complexity of code when we want to display different templates depending on the Observable notification. 

To sum it all up, take a look at this piece of code:

▶️ [Live example available at Stackblitz](https://stackblitz.com/edit/angular-ivy-ngif-async-example?devtoolsheight=33&file=src/app/app.component.ts). 
```typescript
@Component({
  selector: 'my-app',
  template: `
    <p *ngIf="count$ | async as count; else loading">
      Count: {{ count }}
    </p>

    <ng-template #loading>
      Loading...
    </ng-template>
  `
})
export class AppComponent  {
  count$ = interval(1000).pipe(
    delay(2000),
    tap(console.log),
    switchMap(i => {
      if (i > 5) {
        return throwError(new Error('BOOM!'))
      }
      return of(i);
    })
  );
}
```

That's how we would deal with displaying values emitted from the source Observable with  the typical `async`+`*ngIf` implementation. We even have a possibility to
display a template in a "loading" state - when we wait for the first value to be emitted (long loading is mocked with a `delay` operator). There are some 
problems with the implementation though, specifically the ones that I mentioned a couple of paragraphs before:

- The emitted value of `0` is ignored and considered a loading state. `*ngIf` directive interferes with the 
rendering process and in case of falsy values (like `0`) being emitted the view would not be displayed.
- An error thrown in the Observable (mocked by the `throwError` operator) is not indicated for the user, only logged to the console. 

We can work around it by adding a separate Observable to emit information if error occurred:

▶️ [Live example available at Stackblitz](https://stackblitz.com/edit/angular-async-ngif-with-error?devtoolsheight=33&file=src/app/app.component.ts).
```typescript
@Component({
  selector: 'my-app',
  template: `
    <p *ngIf="count$ | async as count; else loadingOrError">
      Count: {{ count }}
    </p>

    <ng-template #loadingOrError>
      <p *ngIf="isError$ | async; else loading">
        Error!
      </p>

      <ng-template #loading>
        Loading...
      </ng-template>
    </ng-template>
  `
})
export class AppComponent  {
  isError$ = new BehaviorSubject<boolean>(false);

  count$ = interval(1000).pipe(
    delay(2000),
    tap(console.log),
    switchMap(i => {
      if (i > 5) {
        return throwError(new Error('BOOM!'))
      }
      return of(i);
    }),
    catchError(e => {
      this.isError$.next(true);
      return of(0);
    })
  );
}
```

It works, but it's not the prettiest of solutions. We can see it by looking at the usage of nested `<ng-template>` elements, and a separate Observable `isError$` to handle the `count$` 's error and loading state. Also, a hack with switching templates by emitting a falsy value on error (in the `catchError` callback) can make one's head hurt. We can definitely do better!

---

Turns out, all of those can be resolved with our own hands! What I want with this article is to bend your mind a little - introduce you to the rare and underestimated art of creating Angular structural directives. I want to walk you through implementing a structural directive, that will solve all above issues of the `AsyncPipe` - the `LetDirective`.

> If you want to read more the potential problems with the `AsyncPipe` (especially performance issues) and how to solve those, I recommend the article:
> - 🧾 ["New possibilities with Angular's rendering and the push pipe"](https://indepth.dev/angulars-push-pipe-part-1/) by [Michael Hladky](https://twitter.com/Michael_Hladky/).

---

## Requirements

Just like for every feature, we need a list of requirements for the `LetDirective`. I'd like to gather all of them here. I think the first ones were already mentioned, just a couple of paragraphs above. Let's list them again, to keep things tidy:

> - It applies values emitted from the source Observable to the view. 
> - It stops emitting when the source Observable completes.
> - It stops emitting and displays an error message to the console when the source raises an error.

Also, another one can be derived from the description of the `AsyncPipe`:

> - Subscribe automatically and unsubscribe on the component's destruction.

So far it's boring, I know - we've just listed basic requirements for the good, old `AsyncPipe`. Here comes the fun part - what if we want to bind different templates to different Observable notifications? With the "classic" `AsyncPipe` we could do that with a nested combination of `async` and `*ngIf` directive. Everything is great until we realize potential problems, e.g.:

1. `*ngIf` directive renders values based on it being truthy or falsy. What if we would like to render a value of `0`, for example?
2. Displaying a template on the "error" or "complete" notification is possible, but it requires the usage of e.g. `catchError` or `tap` for the source Observable to catch those notifications. It's not the prettiest solution but yes, it would work. But why bother, if we could do it better? 😉

The usage of the `LetDirective` after the implementation I have in mind would look like this:

```html
<ng-container *rxLet="hero$; let hero; error: error; complete: complete">
  <app-hero-card [hero]="hero"></app-hero-card>
</ng-container>

<ng-template #error>Error while loading hero feed.</ng-template>
<ng-template #complete>Hero feed completed!</ng-template>
```

Neat, right? This doesn't require any custom "piping" for the source Observable or any combination of different Angular pipes or directives. Let's add the requirement to the list:

> - Display a different template (if provided) on different Observable notification - "next", "error" and "complete".

I think that's enough, you'll soon see we already have a lot to cover 😉 Fire up your editor, open your Angular project and let's get started!

<!--
    ADD GIF WITH ROLLING SLEEVES HERE
 -->

---

## Implementation

#### Define the view context

Firstly, let's define our view context. "What is this view context?", you might ask. It is data associated with the view you would like to render. In our case, the main goal is to have values emitted from the source Observable bound to our view:

```typescript
export interface LetViewContext<T> {
  $implicit: T;
}
```

`$implicit` is an Angular-specific field that is recognised by the compiler to hold a default value from the provided context. In our case, that's the value emitted from the source Observable. Also, defining the `$implicit` field will enable us to use the `observable$; let o` syntax in our directive, e.g.:

```html
<ng-container *rxLet="hero$; let hero">
  <app-hero-card [hero]="hero"></app-hero-card>
</ng-container>
```

Now, let's define additional fields for view context object for other Observable notifications:

```typescript
export interface LetViewContext<T> {
  $implicit: T;
  $error: Error;
  $complete: boolean;
}
```

Later we'll add logic to our directive for mutating the view context based on the current Observable notification and e.g. render `Error` message when it occurs. For the "complete" - let's leave it as a simple boolean that marks whether the source Observable has completed or not.


> ##### 🏆 Bonus round
> We can implement an additional field for our context, that would let us use the `observable$ as o` syntax in our `LetDirective`. To do that we can add `rxLet` field:
>
> ```typescript
> export interface LetViewContext<T> {
>   $implicit: T;
>   $error: Error;
>   $complete: boolean;
>   rxLet: T;
> }
> ```
> 
> Why `rxLet`? It has to be equal to the selector of our directive. Now the below syntax works:
> ```html
> <ng-container *rxLet="hero$ as hero">
>   <app-hero-card [hero]="hero"></app-hero-card>
> </ng-container>
> ```
> 
> Although this syntax might look nicer than the previous one, there is one problem. With the version of Angular available at the time of writing this article, the type of the value "unwrapped" from the Observable might not be inferred correctly. The Angular Language Service, which resolves type inference inside Angular templates, is not yet 100% compatible with Ivy and has some issues with e.g. type inference for custom structural directives. That's why for this article I'll stay with the `observable$; let o` syntax.


#### Create the `LetDirective` and its first input binding

Let's use the Angular CLI to generate our directive:

```
ng g d let
```

After changing the selector and adding two interface declarations (we'll need those later) we have:

```typescript
@Directive({
  selector: '[rxLet]'
})
export class LetDirective implements OnInit, OnDestroy {
}
```

I'd like to point out, that at some point we would have to reference the type of the value from the source Observable bound to the `LetDirective`. We don't actually know what type it would be - that depends solely on the user of our directive. In that case, let's introduce a generic type available for the entire `LetDirective` class:

```typescript
@Directive({
  selector: '[rxLet]'
})
export class LetDirective<T> implements OnInit, OnDestroy {
}
```

Now let's follow up the previous paragraph and add the initial definition to the `LetDirective` class:

```typescript
private readonly viewContext: LetViewContext<T> = {
  $implicit: undefined,
  rxLet: undefined, 
  $error: undefined,
  $complete: false,
};
```

With that in place, we should create our first input binding, for the most important of all values, our source Observable:

```typescript
@Input()
set rxLet(sourceObservable: Observable<T>) {
  // ...
}
```

Now, let's remind ourselves one of our requirements:

> - Subscribe automatically and unsubscribe on the component's destruction.

We need to subscribe to our source Observable after we get it from the input binding. That's, in fact, the only way to get the value emitted from the Observable, isn't it? 

```typescript
@Input()
set rxLet(sourceObservable: Observable<T>) {
  sourceObservable.pipe(
    distinctUntilChanged()
  ).subscribe();
}
```

You probably noticed that I added the `distinctUntilChanged` operator - thanks to that we won't trigger unnecessary re-renderings when the emitted value didn't actually change. Also, we need to unsubscribe on the view's destruction, so we need to hold the `Subscription` somewhere:

```typescript
@Directive({
  selector: '[rxLet]'
})
export class LetDirective<T> implements OnInit, OnDestroy {

  @Input()
  set rxLet(sourceObservable: Observable<T>) {
    // unsubscribe from previous Subscription if a new source Observable is provided
    this.subscription.unsubscribe();  
    this.sourceObservable = sourceObservable.pipe(
      distinctUntilChanged()
    );
    this.subscription = new Subscription().add(this.sourceObservable.subscribe());
  }

  private subscription = new Subscription();
  private sourceObservable: Observable<T>;

  // ...

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
```

With that, we can cross out 1 of 5 requirements:

> - <s>Subscribe automatically and unsubscribe on the component's destruction.</s>

---

## Summary of Part 1

We've done a lot for this article, and I think we both need to take a small break here 😉 In summary, we:

- Learned about possible problems with the `AsyncPipe`.
- Solved a typical use-case of the `async` pipe with `*ngIf` directive and saw possible improvements.
- Gathered requirements for our `LetDirective` that'll solve all the issues we've talked about.
- Implemented solid foundations for the next part - typed our view context object, created `LetDirective` class, and added the first input binding.

The next article will be even juicier! It will answer the question: how do we actually replace a view with a different one based on the source Observable's notifications? See you there and thanks for reading!
