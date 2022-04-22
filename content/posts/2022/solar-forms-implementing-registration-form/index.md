---
title: 'Building registration form with SolidJS and Solar Forms'
date: 2022-04-23
cover: ./thumbnail.png
description: Tutorial on building simple form with Solar Forms with managing form properties and validating user inputs.
tags: ['solidjs', 'open-source', 'solar forms', 'forms']
---

---

## TL;DR

[Solar](https://github.com/kajetansw/solar-forms#readme) is a form library inspired by Angular's [reactive forms](https://angular.io/guide/reactive-forms).
Solar Forms gives you abilities to:
- manage your form's values easily
- manage form control properties like `disabled`, `touched`, `dirty`
- manage form group properties like `disabledAll`, `touchedAll`, `dirtyAll`
- check if your form values are valid with `valid` property
- access all above properties as SolidJS signals
- set up validators for your form controls
- use built-in validator functions or create your own

---

## Introduction

This article is a step-by-step guide to implementing basic registration form with [SolidJS](https://www.solidjs.com/) and [Solar Forms](https://github.com/kajetansw/solar-forms#readme). The 
final result will work similar to this:

<iframe src="https://stackblitz.com/edit/solid-vite-km8l2n?ctl=1&embed=1&file=src/index.tsx&view=preview" height="600px" width="100%"></iframe>

With this example we will cover things like:
- setting up a SolidJS project from scratch
- installing Solar Forms
- creating form group and declaring form controls
- binding form group to a `form` element
- creating inputs for your form
- setting up validators for your form controls
- checking if form is valid

> ⚠️ Before diving into this guide you should be familiar with basics of web development like: NodeJS, npm,
> HTML, CSS, components.

First, let me introduce you briefly to tools we'll be working with!

---

## What is SolidJS?

I think the creators of SolidJS sum up core values of the framework very well:

> _Solid is a JavaScript framework for making interactive web applications. With Solid, you can use your 
> existing HTML and JavaScript knowledge to build components that can be reused throughout your app. 
> Solid provides the tools to enhance your components with reactivity: declarative JavaScript code that links 
> the user interface with the data that it uses and creates._

There are two key aspects of SolidJS that made me dive into it in the first place: reactivity and performance
benchmarks. 

A foundation of UI updates and managing state in SolidJS is the idea of reactive primitives. The simplest of 
those are "signals":

```tsx
import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const App = () => {
  const [count, setCount] = createSignal(0);
  const timer = setInterval(() => setCount(count() + 1), 1000);

  onCleanup(() => clearInterval(timer));

  return <div>{count()}</div>;
};

render(() => <App />, document.getElementById("app"));
```

If you are familiar with the React ecosystem, you can find the API of SolidJS primitives similar to React hooks.
Although the API is similar, the rendering works very differently in SolidJS, so not good practices for writing 
hooks translate 1-to-1 from React to SolidJS.

As for performance, let me just say, that SolidJS takes a high place in [JS framework benchmark results](https://krausest.github.io/js-framework-benchmark/index.html).
If you'd like to learn more about its philosophy on rendering and granular updates, you can learn it from its
creator, Ryan Carniato, in [this article](https://dev.to/ryansolid/thinking-granular-how-is-solidjs-so-performant-4g37).

I very much encourage you to walk you through the [interactive tutorial](https://www.solidjs.com/tutorial/introduction_basics)
for SolidJS and also to try out [examples](https://www.solidjs.com/examples/), if you haven't already, as in 
next parts of this guide we will make use of SolidJS "signals" and "directives".

---

## What is Solar Forms?

Solar is a form library inspired by Angular's reactive forms. It allows you to create reactive and type-safe 
state for your form controls. Its core features are:
- Create form group as a set of related controls that you can manage.
- Use form control properties like `value`, `disabled`, `dirty` and `touched`.
- Use form group properties like `disabledAll`, `dirtyAll` and `touchedAll`.
- Pre-configure form controls with built-in or custom validator functions to ensure you have all information you need before the form is submitted.
- Check if a single form control or an entire form group is valid with `valid` and `validAll` properties.
- Access validation errors with `errors` form control property.
- Access all form group and form control properties as SolidJS signals.
- Create nested form control structures.

If you'd like to see a detailed guide on Solar's API, please see [the documentation](https://github.com/kajetansw/solar-forms#documentation).

---

## Setting up SolidJS project

Now that we are (hopefully) familiar with basic concepts of SolidJS, let's set up a project by running:
```shell
npx degit solidjs/templates/ts solar-forms-example
cd solar-forms-example
npm i
```

Then open the `solar-forms-example` directory with your favourite IDE.

> Alternatively, you can use a [SolidJS template on StackBlitz](https://stackblitz.com/edit/solid-vite-qjzxar?file=src/App.tsx)
while going through this tutorial.

`src/App.tsx` will be the primary file you'll be working with. Replace the existing implementation of `App` component with:

```tsx
export const App: Component = () => {
  return 'hello world!';
};
```

This way we'll start off our work with clean slate.

---

## Installing Solar Forms

To install Solar Forms library run this command in your terminal:
```shell
npm i solar-forms
```

---

## Creating form group

Form group is a fundamental concept in Solar Forms. Upon creation, it sets up all form control values and other properties
that can be later used as SolidJS signals.

To create a form group, you can use the `createFormGroup` function. This function accepts one argument, and that
is an object representing desired structure of your form:
```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: ''
  });

  return 'hello world!';
};
```

Let's break down exactly what the above code does taking into consideration how the form group was implemented. 
It does a couple of things:
- creates a single form control with `firstName` name
- sets up a default value for `firstName` form control as empty string
- sets up a type of the form control's value (values' types matter!)

> 💡**Tip**: Form controls are accepting `null` as value as well! Although to change the form control value later, 
> you'd need to declare the default value as a union type of desired type and null, e.g. `string | null`.

Let's now see how to bind our form group to the `<form>` element.

---

## Binding form group with `formGroup` directive

There's only one way to bind the form group that we've created earlier to our `<form>` element. For that we'll use
the `formGroup` [SolidJS directive](https://www.solidjs.com/tutorial/bindings_directives):

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
  });

  return (
    <form use:formGroup={fg}>
      {/* TBD */}
    </form>
  );
};
```

> ⚠️ If you have problems running the project at some point, please consult [Solar Form's FAQ](https://github.com/kajetansw/solar-forms#faq) 
> section. There are some well known issues with setting up custom directives and this doc will help you solve those.

By assigning `use:formGroup={fg}` attribute to our `<form>` element with our form group as an argument,
we set up two-way binding between the form and our form group holding reactive form properties.

But how do we let the `formGroup` directive know, which form control belongs to which form input element?

---

## Assigning form control to form element with `formControlName`

Let's now create a `label` and an `input` element for our form for our `firstName` control:

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
  });

  return (
    <form use:formGroup={fg}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" type="text" />
    </form>
  );
};
```

We set up a `label`, assigned it to an `input` element and declared the type of the `input`. There's one more thing
left. We need a way to tell the `formGroup` which form input belongs to which form control. 

We can do that by using `formControlName` custom attribute:

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
  });

  return (
    <form use:formGroup={fg}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" type="text" formControlName="firstName"/>
    </form>
  );
};
```

When using `formControlName` attribute on our form inputs, we assign to it a name of our form control.

This way we're done with setting up form group and binding it to our form and form inputs.

---

## Setting up multiple form controls

To complete creating our form as per requirements, we need other form controls as well. What we'd like to have is: 
`firstName`, `username`, `password` and `acceptTerms` form controls.

We can create them by adding new keys to the initial structure of form group and add missing form inputs:

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
    username: '',
    password: '',
    acceptTerms: false
  });

  return (
    <form use:formGroup={fg}>
      <label htmlFor="firstName">First name</label>
      <input id="firstName" type="text" formControlName="firstName" />

      <label htmlFor="username">Username</label>
      <input id="username" type="text" formControlName="username" />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" formControlName="password" />

      <label htmlFor="acceptTerms">Accept terms</label>
      <input id="acceptTerms" type="checkbox" formControlName="acceptTerms" />
    </form>
  );
};
```

Notice, that types of default values of form controls match the type of the form inputs. Form group
is created in a way, to let you work with types of values that suits your form controls the best.

When type of form control does not match the expected type, based on the type of form input, Solar Forms
will throw a custom error to let you know.

An example of that situation may be when you'd initiate your form control with value of `true` and bind it
to an element that is of `type="number"`. Number inputs are not expected to be managed with booleans.

If you'd like to see what input types match with which data types, please refer to the 
[dedicated section of docs](https://github.com/kajetansw/solar-forms#binding-form-controls-to-different-types-of-input-elements).

---

## Updating form values

Let's imagine we'd like to create a feature of generating usernames for users, that cannot decide on theirs.

This is a perfect opportunity to try out managing our reactive form values!

We can access the form value signal by accessing a specific property of our form group:

```tsx
const fg = createFormGroup({
  firstName: '',
  username: '',
  password: '',
  acceptTerms: false
});
const [form, setForm] = fg.value;
```

`fg.value` returns a tuple of reactive accessor for form values and a setter function. We'll see in a second 
how those can be used.

As for the "generating username" part, let's just go with simple function for creating random string
shamelessly copied from Stack Overflow (you can place it whenever you want in the project):

```tsx
export function getRandomUsername(): string {
  return (Math.random() + 1).toString(36).substring(7);
}
```

Now let's see how we can create a function for updating our username. We can implement it two ways:

```tsx
const createNewUsername = () => setForm({ ...form(), username: getRandomUsername() });
// or
const createNewUsername = () => setForm(s => ({ ...s, username: getRandomUsername() }));
```

Like you can see, the value setter function accepts either new state object or a setter callback. What you'll
use in this situation is up to you.

As a final touch, let's also add a button for generating new username. The final code for the component should 
look something like this:

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
    username: '',
    password: '',
    acceptTerms: false,
  });
  const [form, setForm] = fg.value;

  const createNewUsername = () =>
    setForm((s) => ({ ...s, username: getRandomUsername() }));

  return (
    <>
      <form use:formGroup={fg}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" type="text" formControlName="firstName" />

        <label htmlFor="username">Username</label>
        <input id="username" type="text" formControlName="username" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" formControlName="password" />

        <label htmlFor="acceptTerms">Accept terms</label>
        <input id="acceptTerms" type="checkbox" formControlName="acceptTerms" />
      </form>

      <button onClick={createNewUsername}>Generate username</button>
    </>
  );
};
```

---

## Validating form values

It's a common scenario, when we'd like to prevent user from submitting the form when form has invalid values.
We'll do just that for our example.

Requirements for our registration form:
- `username` control should be required
- `password` control should be required
- `acceptTerms` checkbox should be checked

We can set up our validators when defining form group. As an alternative to passing just the default value
for our form controls, we can pass a tuple of default value and config objects.

One of the optional values of config objects is `validators`, which accepts list of validator functions
which have a following type:

```tsx
export interface ValidatorFn {
  (control: FormControl): ValidationErrors | null;
}

export interface FormControl {
  value: string | number | boolean | Date | null;
  disabled: boolean;
  touched: boolean;
  dirty: boolean;
}

export type ValidationErrors = {
  [key: string]: unknown;
};
```

As you can see, when defining a validator function, you can use various data about your form control that
may be important to you: its current value and whether it is disabled, touched or dirty. If form control
is valid, the validation function should return `null`, if not, a `ValidationErrors` record.

You can define validator functions yourself, or use set of built-in functions.

In our example we'll use two of built-in validator functions:
- `required`, that checks whether form value is empty
- `is`, that checks whether form value is equal to provided value

This is how we'll create our form group with validators as per requirements:

```tsx
import { createFormGroup, formGroup, Validators as V } from 'solar-forms';

const fg = createFormGroup({
  firstName: '',
  username: ['', { validators: [V.required] }],
  password: ['', { validators: [V.required] }],
  acceptTerms: [false, { validators: [V.is(true)] }],
});
```

You may ask now - how can we check whether our form controls' values are valid or not? Solar's form group 
provide properties other than just `value`. In this case, we can use `validAll` property, which is a reactive 
accessor:

```tsx
import { createFormGroup, formGroup, Validators as V } from 'solar-forms';

const fg = createFormGroup({
  firstName: '',
  username: ['', { validators: [V.required] }],
  password: ['', { validators: [V.required] }],
  acceptTerms: [false, { validators: [V.is(true)] }],
});
const validAll = fg.validAll;
```

> We can also access the `valid` property to be more granular about the "value" state of form group
> and access the state of each form controls separately.

The last part of this section will be adding the submit button that is disabled if the entire form is invalid.
The final code will look something like that:

```tsx
export const App: Component = () => {
  const fg = createFormGroup({
    firstName: '',
    username: ['', { validators: [V.required] }],
    password: ['', { validators: [V.required] }],
    acceptTerms: [false, { validators: [V.is(true)] }],
  });
  const [form, setForm] = fg.value;
  const validAll = fg.validAll;

  const createNewUsername = () =>
    setForm((s) => ({ ...s, username: getRandomUsername() }));
  const submit = (e: MouseEvent) => {
    e.preventDefault();
    console.log(form());
  };

  return (
    <>
      <form use:formGroup={fg}>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" type="text" formControlName="firstName" />

        <label htmlFor="username">Username</label>
        <input id="username" type="text" formControlName="username" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" formControlName="password" />

        <label htmlFor="acceptTerms">Accept terms</label>
        <input id="acceptTerms" type="checkbox" formControlName="acceptTerms" />

        <button onClick={submit} disabled={!validAll()}>
          Submit
        </button>
      </form>

      <button onClick={createNewUsername}>Generate username</button>
    </>
  );
};
```

---

## Other form group and form control properties

This example does not cover all properties that is provided by Solar's form group. If you'd like 
to learn more about superpowers that you gain from Solar, pleas refer to 
[this section of our docs](https://github.com/kajetansw/solar-forms#managing-disabled-form-control-property).

---

## Conclusion

I realize that this may already be much to absorb, that's why we'll stop and let you think on things we learned here.

With this guide we covered following features of Solar Forms:
- creating form group and binding it to `<form>` element and form inputs
- accessing and setting form values reactively
- setting up validators for form controls' values
- getting information on whether the form is valid or not

If you'd like to see expanded version of this example, you can see our [official online example](https://stackblitz.com/edit/solid-vite-km8l2n?file=src/index.tsx)
for registration form.

I hope you found this guide useful, thanks for your time!

---

## 🏆 Solid Hack 2022

![SolidHack](./solidhack-logo.png)

This project was submitted for the [SolidHack 2022](https://hack.solidjs.com/) competition, so if you like it,
you can place your vote for it [here](https://hack.solidjs.com/submissions). Thanks!

---