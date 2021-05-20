---
title: "Comparing TypeScript's union types, enums and const enums"
date: 2021-05-20
description: This blog post will guide you through all three showing what they have in common and what sets them apart. Comparisons are intended to be non-judgmental and fact-based.
tags: ['typescript']
---

---

✨ This blog post was originally posted as a [Twitter thread](https://twitter.com/KajetanSw/status/1392825710486634498). ✨

⏯ [TypeScript playground](https://www.typescriptlang.org/play?ssl=1&ssc=1&pln=279&pc=10#code/PQKgBAUAxDt-DFOS1iJk2KBGMBhAewFsAHASwBsBTMAF3ONoDcBnMAJwFcA7ex6hAxYA8j0oBPMNR5di7DtVZdKdMOT4ApAMphCXOqQMA6MCLoALah3YBDRWAAmHQqVLVHTrhw0BzelZgAMYkFDTCmAxMxtBocfEJiTAQIMBCdBLuYABK1MSEdNQAIrZ0tgCqEWAAvGAA5AByBQCCrADWHnVVAD71ADKEto5+XVhgvXXaXEFBSqyjWBMAYrZU3tRdEDJyOXkFxaW2AKJgAN5VTXStHZ61jS3tnQA0VQNDfjX9g8M8vnUvYymMzmn0m01mrHmAKwKzWDjusMo6y6AF8hCEeKw1NtiLt8oUSmV8CdzmNLtcPKDyY9HP9Xt8Pnc3j8-tDMECIew7hy5nSxoj1qCBYpUUJQJAkpKpVKqlAAExgACShQ4pQ+lhcXF8FjAzFsSKUQjGuUopUpdEIYFIimY5H07EIPGopkVADMAtYNuweJa9QawKVOLwotQnmAAO60IK2Hg+tRVcgqs0BTXa9R0GLSrPZlApNIQV2EDhgAAUGKxTkO6j4uXxBzKRwAlGcIuXCDRjJRCL4SwAiRR1ytlMCuly4nEALjAvbDjkOjYA3BA0RBgMAwAAhAxgCT6YIxpyW1gkaiWD6UcgdAKB8OJnWWWi8O08YyviDltQD-aE2yfADa9xXDS-xfO8vwgWCnIQcKGwALoBuwH5LhkWTZEUnwodQhDul+BKHH+sjEAARtYsELmAa71NSNx1OMoEsrREw8pCjH1DBmyUQAmnu0Z8Im1jJj64YFkWpYfkOv7YZwex4WUzaksEjrHh2XY9v2Mm0HOw6jiQYBPo6U4zhJi7LmK4CxDmlmWbKADMYDaLedBBBYAC00asIIFyOi51AAB4WLYXBYuQzC0MQpTOR8jrSHe1h6O6D4ptQtCKMoqjsBo0gcC4xbhlYfBVC5LlYj4QR0A0KiUPgVhBG0iGhFQcWuAw0XkA6L4WVZXUyqkYrrq6vBlc+YCsI5zlHCWWJmlOtbfocTZTiVHznJRYyjYmzmllNhTyau65jGM7m0LNsnHMY1EeBOe0HTdmCKHQ3h8L2F2OL2S6rVgaKUSulEDTwQ3RetTkWOUk1lIUM0aT+5SNotdA+L8LYfZgQObWDZq7cjB1HVRDw0VdWO3dJD0cE9L1vddYxfeuK7XX9AN8KjFjEujEN4nNRILSN8PLZTWBM1t4PUJj+23TjJ31rYxLnXjl180Td2no907k+9ouYNTYC0+KnXdXr8SygALGAFVMKVur6lwhpVEchF2A4hHWOQQRgERUiONQrqBaopbkO6u5cIePB1GotiQuQvh8DGUh+lb9CWom7BVEwxHWKwjamNxge8QhrAR1HPBSIRJHFhaHpgI75s4pm+u13EebpJktAALKnqV5SfGAAAMdF4L0Cq9HZvSG0uWyEWArc80EJJVAAWtYhBhmIoZgAAKuGi9rxYigr0s+gcKZ75Kdi4+T6VxItmM88uEvTphuvm+r9vyVhnv3iH+Jfm2GQNBn875RTj-kEDutQu5qzAAAAToKwHyvl3BlR8tlIsU5V5N3qDgAA7LRNqFcCi53zrYIiNB470DQXUIB5Q6gxE-r5b+pBf5t3-nKQBjDgGfEweRdEx9pC0J-tQIBRwWFTxOLUARxhr6ECXDQuhDDhHMInqwkRYAOEUXXE0LKOUuGYmxLw+h-DWHEiEefJRQDpYSKkdwr+fDTFHHkTY9hGDyKUXUdYTRZkJR108cgWUABWMARxfKFB4CyI0WByg8GfIhA8JEeFBI9p4N2ThqBBFNAjfwv59J8Ckpk0h7hWCmCqE-WgjpJARlsFIMufk4kBj4DiPQxZP7jxwWXDEoUOBqAfLiMuVRfyYVdlIIIig1SI1-MoYgNcvGTLgA3CAfTmhxisBwEB9R5kFEWXKOoS46mrIfBwGeYwdmLNBIc6wGzTKNJ2CcjgF8FKYCucchZpzRSzLQQEuJHhlkS2hnRK55RkKvMCTIeJSirknF6F8+aLyshvKBR4C+tQrkX3BVDQ4xItEVisXomFwSPlTmxfE5Zz1ZavQsdonhMjqD4o8II-xgKcWOCURChsMsgI3FJRi3RNAqWOEMbS95PLGUos5iyikjhR6UXueGcpJDbCRWoKFEaOwpI4lYATdc2h96zCnBYOghhVVrl8HeLgRFjAhGIMAZuzsXDHldHQYAqD3DaEGeQUgdq2rKCUMATBPiACccooDuqtmapgPA6AuUNobH1Eau5RsNlC2g3K3mqk+Ey44PzHl7PZWoRNgTk21FOGAV8xhU1HDDEW0FWss0BjxXS4Fubfy1BzfDWwxgrnivMlMztyQxhQAAGxKjILKtQUlFBezKkWPwoTMCKnCoap0wQAq-A+LHWgYc86R3NJaRKOTRJ1Myr+VJvhaBVBCB7IiYdnSQDGFUAA6nePSETHRhgDnUTwAUFUtJqm0AMlBKBWlNBCdQg6yqUkSQ+E9i6j01M8FwUgWlaCWEIB5f9sqlAkPCsDCu1BwwW39FJbdj6OpjAAAouCumMFyikyCNWLL4Lg5APbsADj+x0-hEpSqkDGTwzH32rpHJVXU5BsPxXLgmYDw6EqBGcjGKDXH1CSajJBsKtgOjsA8piWg8rrASDyp6GIYwiA8HI1gSj4UKkqdoMeJg-AmBTrAHeyw0g7bPv0K+gMbhSmJWk78WgAArIKw6+CJRXSJnEdR2ApxLlerAcmzwKCUCoNQmUfRUbCHFVxRZ2Alj8rMV1EZ8o7h4kp0TYxew0FtS5Rdr0RoMdoJRxKdTItxUTtQSgroM5VFI4QYzmBKPeagzgjQU1Q1hjKKpn9+QKwpZDFUQzPWwCUeY12ZDiVCFUETBUo8yVy6sBCFkfDUniuyutewVbbhdZdrrjMnWl2pmygwWvPI9Dkx9H4qqP9DrrZjB1Xqica5wwA+MJhXbPhXWml+MYIsvhgCOEIEEVgwAqtEUIIQNowBFA0AvS5OMnrgfOtdeGlyOBjA6uIJQQpfRV77j4DEwZ1AzSeBKZxuwD7hqYQmbdq7vV42PZ-maV7SZKB4FqAAAwACSnFTeUFEYAJe-JRCLvqYBmiqAsPobUYYVXU9do+Dyngw56HcKqYJ7BCylye6aQoYALyC9yUoGIlEtxqA8ivSwgYHycYcNaQgjhpigYvYzoLgQQtrvzpuyAlFfxNY4GGOM5dGt5Ciy1trMQ+mrwt-zt7+oFSi4lyWmXcuM1HAVzz9PfPCgC4EpQOyufJdCqlsX2XpxEXF8V6uDtnPPGygABz2XhtMEm+pdTehIBoIfwO7PaB5ojPddhamcuKe6X8PpiBj7-X0ksdAN5ObkPbWgcfqAAEcuBD4TAp92ftXRxUSTwb+wswy6aGewTJ8XrRKBkM7-vZVvDj6bknMYJYfs1uWef6K6EWEUFgo2Vgnummx++oGckANsoUQe6uOoIWB2tANuVe3MaSEY+glAngGGzkLm2cMYcepAa60WmAiYJC9MLUUcwIrqHw1cF2neXUMydBw0ZqRghQE0201AkMdYP4TYl8WAlEsO3MFgpknB0U3BBg1AoM-BghHMFQu0Yw4hR4lg0hg09BqW8hLMSh7Mp0xIahYh64EhWIUhK4chvBJYJaIqNIi4qiZgAA0tdFAjAn5PAmGhlhwFOM0BwHRiGhJnbvUESqyh4L2NgiPqHOHJHIQsQmXBQaqEwCqCJn0nUCWlQkfGQPIRNIBKKnUE4VwrkYUKDAUcBCZDkTwdQCzKmtLC9E4ZRCIG4ZRB4bAt4YgjlP4YEXIB-ukWQuEaKlEeoDEfgvEUQghpaMkXfmkfhmQvUUcNkTYbUfkS9EUe2h4mwfrLKD6srsCOHCMsEgGAYIQG5KEDQPQTEFUCruvs-LQIagqsxoFBaOcXwroXJhoIUL+m1DIMhplKeppsMBaDYPplgLbLvtBopGSlrk6OHjEowKQEWIUJ4K6OQDYEllkhwB7KXJaEFAhlYOiVUGAdWHoLsmAPkL7jQPksrpQMeCQVhuHn0olLftZhgTvriFUGiRiWGJlEWDiTKgcRlNAhSYnnFNlsYL4KYCLvYS9CLggVUOUHnCMrhnHDpLiEtIjDkjgheFeEFB8NHDgeeCARztsewdzjdmaXrLKDgD3FMG4MiSOKJGsnFM2piGljYKWM6FKZuIQq1o2HZuEpElCVrkichilt7pMfIPljIHpMqf4I5DqMMK6FfooKGlQfQMbqwB6TSWIOXC6cWFVmGBctGWZvuPiSNCeGGGHFUOGD4LqrGYsgIWAD9qQPqsAADuGEDn-vjnQODlKVDsANAhiGib4AGspAzs3D7ioGhqwVaVmNdh3vOVZDaXgEUHDn0aGpOsueafmKACABgOAAEhSoeC7GbqztFOzoefZNtm7moMxjnM9rMAGKeU6aXIEJhGGERNuHHueYlNHv-uAB5DMd8RIPpr1H0pxKeL8qCFBVcBmpsmZAeWAEeQvq+eeSwShTeQSYGA+QeE+ZpHDqbqJMjo5g1k0tAq1kvscfqH+onFeuAABeBWkHUnBRWrchRCAKhSebDmeaJGxRmhyaKanBwKYL1GMAJQWbBdBQhYfPudeceXwuhaJCWeBdhdePeTxPhQBoRfDm+a7GsuXCWemB5G1lCbRQxSZcJSXPkoeWkMZZJbsjclUPubSjxXDvpY5UcsZdHmJWkBJTJVJXcF5dYM8kIFsHAo6acCiEAA)

--- 

## Compile time vs run time

Only enums result in JS output after compilation. Others are dropped during the compile time.

(See, that for all examples here, union types will have "U" suffix, similarly to enums with "E", and const enums with "CE".)

```typescript
// TypeScript code
type RemoteDataU
    = 'NotAsked'
    | 'Loading'
    | 'Success'
    | 'Failure'

enum RemoteDataE {
    NotAsked = 'NotAsked',
    Loading = 'Loading',
    Success = 'Success',
    Failure = 'Failure'
}

const enum RemoteDataCE {
    NotAsked = 'NotAsked',
    Loading = 'Loading',
    Success = 'Success',
    Failure = 'Failure'
}
```

```ts
// The same TS code compiled to JS
var RemoteDataE;
(function (RemoteDataE) {
    RemoteDataE["NotAsked"] = "NotAsked";
    RemoteDataE["Loading"] = "Loading";
    RemoteDataE["Success"] = "Success";
    RemoteDataE["Failure"] = "Failure";
})(RemoteDataE || (RemoteDataE = {}));
```

---

## Iterating through values

Only enums can be iterated through, because this case is, in fact, related to the previous one. If there's no value at runtime, we cannot iterate through it.

```ts
for (const data in RemoteDataE) {
   console.log("remote data from enum: ", data);
}

// But you can do something like that with the union...
const remoteData = ['NotAsked', 'Loading', 'Sucess', 'Failure'] as const;
type RD = typeof remoteData[number]; // 'NotAsked' | 'Loading' | 'Success' | 'Failure'

// You can iterate now
for (const data of remoteData) {
  console.log("remote data from union: ", data);
}
```

---

## Switch-case and matching values

Non-exhaustive matching on either of the three results in error when `--strictNullChecks` compiler option is on.

```ts
// Error: Function lacks ending return statement 
// and return type does not include 'undefined'.
function switchE(state: RemoteDataE): string {
    switch (state) {
        case RemoteDataE.NotAsked:
            return "NotAsked";
    }
}

// Error: Function lacks ending return statement 
// and return type does not include 'undefined'.
function switchU(state: RemoteDataU): string {
    switch (state) {
        case 'NotAsked':
            return "NotAsked";
    }
}

// Error: Function lacks ending return statement 
// and return type does not include 'undefined'.
function switchCE(state: RemoteDataCE): string {
    switch (state) {
        case RemoteDataCE.NotAsked:
            return "NotAsked";
    }
}
```

--- 

## Numeric values

Enums are numeric by default (if you don't assign any value to its members). You can assign any number to the numeric enum.

There's no problem with constraining numeric values with union types.

```ts
type MetricU =  0 | 1 | 2 | 3 | 4;

enum MetricE {
    Zero, One, Two, Three, Four
}

const enum MetricCE {
    Zero, One, Two, Three, Four
}

const exampleMetricU: MetricU = 0;
// @ts-expect-error: Type '17' is not assignable to type 'MetricU'.
const exampleMetricU2: MetricU = 17; 

const exampleMetricE: MetricE = MetricE.Zero;
const exampleMetricE2: MetricE = 17; // No error

const exampleMetricCE: MetricCE = MetricCE.Zero;
const exampleMetricCE2: MetricCE = 17; // No error
```

---

## Extending

Unions can be extended by declaring a "union of union types". One way to extend an enum or const enum is to convert them to a type by creating a sum.

```ts
type AnotherU = 'AnotherVal';
enum AnotherE {
    Another = 'AnotherVal'
}
const enum AnotherCE {
    Another = 'AnotherVal'
}

type ExtendedU = RemoteDataU | AnotherU;
type ExtendedE = AnotherE | RemoteDataE
type ExtendedCE = AnotherCE | RemoteDataCE

const exampleExtendedU: ExtendedU = "NotAsked";
const exampleExtendedE: ExtendedE = RemoteDataE.NotAsked;
const exampleExtendedCE: ExtendedCE = RemoteDataCE.NotAsked;
```

Another way to achieve sum of enums ([source](https://github.com/Microsoft/TypeScript/issues/17592#issuecomment-449440944)):

```ts
type ExtendedExtra = RemoteDataE | AnotherE;
const ExtendedExtra = { ...RemoteDataE, ...AnotherE };
const a: ExtendedExtra = ExtendedExtra.Another;
```

---

## Impact of refactoring

Imagine changing value assigned to the union or enum in a large codebase.

With union, you'd have to check all places impacted by the change and update those places to match new value of the union.

> Pro: compiler guides you along the way and gives a full view of the impact of the change and if it makes sense everywhere.
> <br/> Con: may take some time.<br/><br/>

With enum, you'd apply the change just on the value of enum's member. This result in no compiler errors (except when you change the "left-hand" side, the enum member itself).

> Pro: change is instant, takes almost no time
> <br/> Con: losing the ability to see the scope of the change<br/><br/>


---

## Template Literal Types

TLT can be created only as a union type ([docs](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html)).

(Although, enums can be used as operands for template literal types. But see, that they are produced based on the value assigned to a member, not the enum member itself.)

```ts
type TemplateLiteral1 = `${RemoteDataU} ${AnotherU}`
type TemplateLiteral2 = `${RemoteDataE} ${AnotherE}`
type TemplateLiteral3 = `${RemoteDataCE} ${AnotherCE}`
```

---

## Structural vs nominal types

Enum is an example of a nominal type (enums are not equal if they differ by name). Unions represent structural types (if literal values match, they are equal).

Even if value of literal value matches, you can't pass it to a function accepting enum.

```ts
function computeE(state: RemoteDataE) {
    // do sth
}
function computeU(state: RemoteDataU) {
    // do sth
}
function computeCE(state: RemoteDataCE) {
    // do sth
}

computeE(RemoteDataE.NotAsked); // OK
// @ts-expect-error: Argument of type '"NotAsked"' is not assignable 
// to parameter of type 'RemoteDataE'.
computeE('NotAsked'); 

computeU('NotAsked');

computeCE(RemoteDataCE.NotAsked); // OK
// @ts-expect-error: Argument of type '"NotAsked"' is not assignable 
// to parameter of type 'RemoteDataCE'.
computeCE('NotAsked');
```

---

## Accessing and auto-completion.

All give you auto-completion in code editors.

Enums need to be imported in order to use them in other modules. You need to type the name of the enum first in order to access its member. Using a value from union is like using any literal value.


---

## Support for other transpilers (e.g. Babel)

Unions and enums pose no problems when using with different transpilers. On the other hand, const enums may cause some, as written [here](https://www.typescriptlang.org/tsconfig#isolatedModules).

---

## Documenting

```ts
/**
 * Example doc for union type.
 * See that you can place a doc for the type, but not for the members 
 * separately.
 */
type YetAnotherU = 'YetAnother';

/**
 * Example doc for enum.
 * See that you can place docs for both the enum itself and all its 
 * members.
 */
enum YetAnotherE {
    /** Example doc for YetAnother enum member. */
    YetAnother = 'YetAnother'
}

/**
 * Example doc for const enum.
 * See that you can place docs for both the const enum itself and all 
 * its members.
 */
const enum YetAnotherCE {
    /** Example doc for YetAnother const enum member. */
    YetAnother = 'YetAnother'
}
```