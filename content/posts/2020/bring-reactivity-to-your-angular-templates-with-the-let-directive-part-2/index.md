---
title: 'Bring reactivity to your Angular templates with the LetDirective - Part 2'
date: 2020-10-27
description: The second (and final) part of the step-by-step tutorial on how to implement your own structural directive for binding an Observable to the Angular view.
tags: ['angular', 'rxjs', 'zonejs']
---

---

#### ⚡ Originally posted on [inDepthDev](https://indepth.dev/bring-reactivity-to-your-angular-templates-with-the-letdirective-part-2). ⚡ 

---

## TL;DR

- The `LetDirective` lets us bind to an Observable and display values emitted from the source Observable.
- Aside from the functionality of the `AsyncPipe`, it enables us to display different views based on a source Observable's notifications - "next", "error", "complete" and even "suspense" ⌛.
- A combination of `async` pipe and `*ngIf` may not be satisfactory in some use-cases. We can regain control of what values we want to render in the view container with the `LetDirective`.
- Implementing the structural `LetDirective` requires you to understand how `ViewContainerRef` and `TemplateRef` are related and how to detach and insert views.
- When creating a view you can attach a view context to it. This lets us bind data to be used within the view.
- `NextObserver` can be used as an argument to the `tap()` RxJS operator. It may e.g. let us display different views on different Observable notifications.
- [@rx-angular/template](https://github.com/rx-angular/rx-angular) is a library that provides the `LetDirective` (and other reactive extensions) bundled with custom rendering strategies to achieve better performance for large Angular applications - with Zone.js or completely zone-less.

---

## Introduction 

This is the second part of an article that introduces the problems of `AsyncPipe` and lets us dive into the topic of implementing our own structural `LetDirective`. The previous part of this series can be found [here](https://indepth.dev/bring-reactivity-to-your-angular-templates-with-the-letdirective-part-1). 

Last time we:
- Learned about possible problems with the `AsyncPipe` alone.
- Solved a typical use-case of the `async` pipe with the `*ngIf` directive and saw possible improvements.
- Gathered requirements for our `LetDirective` that will solve all the issues we've talked about.
- Implemented solid foundations for the next part - typed our view context object, created a `LetDirective` class, and added the first input binding.

Now let's get to the main dish - how do we actually replace a view with one based on the source Observable's notifications?

---

## Implementation (continuation)

##### Add input bindings for the remaining templates

We can now add the remaining input bindings for the other two Observable notifications: "error" and "complete":

```typescript
@Input()
set rxLetComplete(templateRef: TemplateRef<LetViewContext<T>>) {
  // ...
}

@Input()
set rxLetError(templateRef: TemplateRef<LetViewContext<T>>) {
  // ...
}
``` 

What about the content of the setters above? Our `LetDirective` needs to get a hold of the template provided by the user and save it for later. 


##### Cache templates from input bindings

Let's represent our "cache" as a record holding all our templates:

```typescript
type TemplateRecord<T> = {
  complete: TemplateRef<LetViewContext<T>> | undefined,
  error: TemplateRef<LetViewContext<T>> | undefined,
  next: TemplateRef<LetViewContext<T>> | undefined,
};
```

`TemplateRef` is a representation of the `<ng-template></ng-template>` provided by the user of our directive. A template can be either provided (be a `TemplateRef` instance) or not (be `undefined`). Later we'll add a logic that deals with the case where a template is not provided.

Now, our "cache" needs to be added to the `LetDirective` class with all fields `undefined`:

```typescript
private readonly templateCache = {} as TemplateRecord<T>;
```

By using the `as` syntax from TypeScript we are able to instantiate an object with `undefined` fields in fewer characters and still preserve our type.

Next, we'll add the caching logic for each of the templates. For "next", it turns out, that we can use dependency injection to get the `TemplateRef` instance:

```typescript
constructor(private readonly nextTemplate: TemplateRef<LetViewContext<T>>) {
  this.templateCache.next = this.nextTemplate;
}
```

When it comes to the remaining "error" and "complete" templates, we provide the "caching" logic inside the input bindings:

```typescript
@Input()
set rxLetComplete(templateRef: TemplateRef<LetViewContext<T>>) {
  this.templateCache.complete = templateRef;
}

@Input()
set rxLetError(templateRef: TemplateRef<LetViewContext<T>>) {
  this.templateCache.error = templateRef;
}
```


##### Implement the logic for manipulating views

To understand how to manipulate views inside a container, you need to understand how `ViewContainerRef` works. For this example we just need to know that: `ViewContainerRef` is the representation of the container where the views can be attached to or detached from. In our case, that would be an element where the `*rxLet` directive is used. `ViewContainerRef` is an Angular injectable that has methods for injecting, clearing, moving, and detaching views.

> More about DOM manipulation and the `ViewContainerRef` can be found in excellent articles by [Max Koretskyi](https://twitter.com/maxkoretskyi):
> - 🧾 ["Exploring Angular DOM manipulation techniques using ViewContainerRef"](https://indepth.dev/exploring-angular-dom-manipulation-techniques-using-viewcontainerref/)
> - 🧾 ["Working with DOM in Angular: unexpected consequences and optimization techniques"](https://indepth.dev/working-with-dom-in-angular-unexpected-consequences-and-optimization-techniques/)  

We can access the `ViewContainerRef` instance for the container our `*rxLet` directive is attached to by using Angular's dependency injection:

```typescript
constructor(
  private readonly nextTemplate: TemplateRef<LetViewContext<T>>,
  private readonly viewContainerRef: ViewContainerRef
) {
  this.templateCache.next = this.nextTemplate;
}
```

Now, let's create a separate method for displaying views that will be convenient each time we would like to create a view out of the provided template:

```typescript
private displayView(name: keyof TemplateRecord<T>) {
  if (this.templateCache[name]) {    // (1)
    this.viewContainerRef.detach();  // (2)
    this.viewContainerRef.createEmbeddedView(this.templateCache[name], this.viewContext);  // (3)
  }
}
```

What happens in the code above?
1. Check if the template is cached. If not, do not do anything - we won't display a template that doesn't exist, right?
2. Detach the last inserted view. 

    > `ViewContainerRef#detach` method accepts an optional index of the view that should be detached, but when no argument is provided, it detaches the last one. It's important to establish, that we always want to have only ONE view inserted to the `ViewContainerRef` at all times, so whenever we are changing the view, we want to detach the last one.

3. Create and insert an embedded view based on the `TemplateRef` instance using `ViewContainerRef#createEmbeddedView`. Also, provide the view context object.

Also, to avoid unnecessary repetition of the "detach -> create -> insert" process for our `displayView` method, we should save which view is currently inserted. We can do that by simply saving the name of the active view: 

```typescript
private activeView: keyof TemplateRecord<T>;

private displayView(name: keyof TemplateRecord<T>) {
  if (this.activeView !== name && this.templateCache[name]) {
    this.viewContainerRef.detach();
    this.viewContainerRef.createEmbeddedView(this.templateCache[name], this.viewContext);
    this.activeView = name; 
  }
}
```


##### Implement logic for updating the view context

Just like with our convenient `LetDirective#displayView` method, we should create a method for mutating the `viewContext`:

```typescript
private updateViewContext(viewContextSlice: Partial<LetViewContext<T>>) {
  Object.entries(viewContextSlice).forEach(([key, value]) => {
    this.viewContext[key] = value;
  });
}
```

We take the part of the `LetViewContext` object (every time we want to change only 1-2 fields) and change fields from the `viewContext` object we want.

> Some of you may ask: why mutate and not change it immutably? When we create an embedded view with `ViewContainerRef#createEmbeddedView` we attach the view context object to the created view. If we would change the `viewContext` object immutably (by replacing the whole reference) we would lose this "connection" between view and view context object, so the changes wouldn't render on the screen. 


##### Change embedded views for each Observable notification

We now have every tool we need to update view inside our view container: 
- the `displayView` method for detaching existing and creating+inserting new view based on a cached template,
- the `updateViewContext` method for mutating view context object attached to the view.

Now we have to *react* to every emitted value from the source Observable and trigger our two methods in the correct way. The simplest way is to use the `tap` operator when constructing our Observable and pass to it the [`NextObserver`](https://rxjs-dev.firebaseapp.com/guide/observer) object. The `NextObserver` represents a consumer of *at least* the "next" Observable notification in shape of a callback(s). Inside the callback we implement our logic for managing views:

```typescript
@Input()
set rxLet(sourceObservable: Observable<T>) {
  this.subscription.unsubscribe();
  this.sourceObservable = sourceObservable.pipe(
    distinctUntilChanged(),
    tap(this.updateObserver) // (11)
  );
  this.subscription = new Subscription().add(this.sourceObservable.subscribe());
}

// ...

private readonly updateObserver: NextObserver<T> = {  // (1)
  next: (value: T) => {        // (2)
    this.displayView('next');  // (3)
    this.updateViewContext({   // (4)
      $implicit: value,
      rxLet: value
    });
  },
  complete: () => {                     // (5)
    if (this.templateCache.complete) {  // (6)
      this.displayView('complete');     
    } else {
      this.displayView('next');
    }
    this.updateViewContext({            // (7) 
      $complete: true 
    });
  },
  error: (err: Error) => {            // (8)
    if (this.templateCache.error) {   // (9)
      this.displayView('error');
    } else {
      this.displayView('next');
    }
    this.updateViewContext({          // (10)
      $error: err 
    });
  }
};
```

I went all-out with this one, so let me explain what happens here step-by-step.

1. Create the `updateObserver` as a separate, read-only field of the `LetDirective` class.
2. Add the "next" observer.
3. Display view for "next" template (there is ALWAYS "next" template, the same cannot be said for "error" and "complete" templates,
which can be omitted by the user of the directive).
4. Update fields of the view context dedicated to holding the value emitted from the source Observable.
5. Add the "complete" observer.
6. Depending on the "complete" template being provided by the user or not - display the "complete" template. Otherwise, display the "next" template.
7. Update field of the view context that represents data bound to "complete" notification - `$complete`.
8. Add the "error" observer.
9. Depending on the "error" template being provided by the user or not - display the "error" template. Otherwise, display the "next" template.
10. Update field of the view context that represents data bound to "error" notification with the error object - `$error`.
11. Pipe the `updateObserver` to the source Observable.

With this major step, we've covered the remaining four requirements in one sweep!

> - <s> Return values emitted from the Observable.</s>
> - <s> Stop emitting when the Observable completes.</s>
> - <s> Stop emitting and display an error message to the console on Observable's error.</s>
> - <s> Display a different template (if provided) on different Observable notification - "next", "error" and "complete".</s>

We finally completed implementing our `LetDirective`! All basic requirements we've listed are covered - we can sit back and celebrate a job well done!

---


## What's next?

That's the end of our implementation journey, but you don't have to stop here! There may be some use-cases we didn't cover in 100% which may be useful to you and others.

An example of that may be resetting the source Observable. What if our source Observable emitted an error, and we want to restart it? We can of course do it for the Observable itself, but the view won't be restarted correctly.

Try experimenting with it and implement solutions on your own!

---


## 🏆 Bonus round - adding suspense!

Turns out, we can extend our implementation by only the couple of lines and add "suspense" ⌛ handling - viewing a template before any value is emitted from the Observable.

What is needed? Firstly, we would have to add one more field to our `TemplateRecord` type, one representing the "suspense" template:

```typescript
type TemplateRecord<T> = {
  complete: TemplateRef<LetViewContext<T>> | undefined,
  error: TemplateRef<LetViewContext<T>> | undefined,
  next: TemplateRef<LetViewContext<T>> | undefined,
  suspense: TemplateRef<LetViewContext<T>> | undefined
};
```

Then, add input binding for the "suspense" template, just like we did it with the other ones:

```typescript
@Input()
set rxLetSuspense(templateRef: TemplateRef<LetViewContext<T>>) {
  this.templateCache.suspense = templateRef;
}
```

And display it on the view initialization:

```typescript
ngOnInit(): void {
  if (this.templateCache.suspense) {
    this.displayView('suspense');
  }
}
```

And that's all! You can now bind your templates with loading spinners or other indicators with ease!


> ▶️ [Completed implementation available live at Stackblitz](https://stackblitz.com/edit/let-directive-implementation-example?devtoolsheight=33&file=src/app/let.directive.ts)

---


## The `LetDirective` and creating high-performant reactive rendering

At the end, I want to get back to the topic I mentioned at the beginning of the Part 1 - using the `LetDirective` to achieve a high-performant rendering.

It's obvious, that some brilliant minds have already thought about the concept of the `LetDirective` before me and tried to use its potential for the greater good. The peak of that is enabling high-performant reactive rendering in Angular possible. We can achieve it by creating zone-less applications - and that's where the `LetDirective` (and the `PushPipe` mentioned at the beginning of 
the first part) shines the most.

Why would anyone want to create a zone-less Angular application? The Angular team did a great work with optimizing their solution with Zone.js and change detection, but it is proven, that for the large Angular applications Zone.js developers (and unfortunately the users) can encounter performance problems. For the massive component tree, each change detection cycle can result in traversing the entire tree and triggering change detection in every component in the way, even if for the particular components no change has occurred. That may result in many, many unnecessary re-renderings.

> If you want to hear more about creating reactive zone-less Angular applications, performant reactive rendering, and why it contributes to the future of the core Angular, watch this awesome talk:
> -  🎥 ["Fully zone-less - High Performance in post IVY"](https://www.youtube.com/watch?v=x0W_mbivKLk) by [Michael Hladky](https://twitter.com/Michael_Hladky/).

In fact, there is one library that, aside from all the features we've implemented so far, achieves higher performance by providing custom rendering strategies with the `LetDirective` and the `PushPipe` - the **[RxAngular](https://rx-angular.github.io/rx-angular/#/)**.

**[RxAngular](https://rx-angular.github.io/rx-angular/#/)** provides tools for just that - and more! What is also cool, RxAngular will enable you to achieve higher performance results (that of the zone-less applications) without switching to zone-less! Aside from tools for reactive rendering, it provides the possibility to manage your reactive, local state of your component in a smart and convenient way (see [`@rx-angular/state`](https://rx-angular.github.io/rx-angular/#/web/state/general/overview)). Check it out and star it on GitHub!

---


## Summary

I'd like to thank you for being curious enough to dive into this complex topic with me! I hope it was a fun journey and this knowledge will be useful to you and others who use the [RxAngular](https://rx-angular.github.io/rx-angular/#/) 's `LetDirective` and other features it provides.


## Acknowledgements

I'd like to thank a couple of wonderful people, that took their precious time to introduce me to the `@rx-angular/template` and peer review this two-part article 🙏

- [Michael Hladky](https://twitter.com/Michael_Hladky?s=20)
- [Julian Jandl](https://twitter.com/hoebbelsB?s=20)
- [Kirill Karnaukhov](https://twitter.com/kh_kirill?s=20)