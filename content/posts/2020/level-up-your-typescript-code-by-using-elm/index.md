---
title: 'Level up your TypeScript code by using... Elm? (Part 1)'
date: 2020-02-10
cover: ./level-up2.JPG
description: This is my take on how to improve your knowledge on TypeScript by trying out a different language - Elm. Not convinced? Enter and see how you can benefit from it! 😉 (Part 1)
tags: ['typescript', 'javascript', 'elm', 'functionalprogramming']
---

I imagine what you may think right now - "Dude, you're crazy! TypeScript is complex on its own and you just said that I should learn another language? Forget it! I revoke the subscription!".

Let me explain first what is the purpose of this article before you actually do that. Seriously, don't, please.

😉

---

## What's the purpose? 🤔

I use TypeScript daily and I think it is beneficial to sharpen your tool as good and as frequently as you can. For this, I seek means to improve my work and my understanding of deep-down mechanisms. Along the way, when you have enough understanding of a tool, you may want to try another one. This way you can experience something new and compare it with your previous knowledge. The findings are often surprising!

![Set of tools layed in a box.](./markus-spiske.jpg)

The same goes for programming languages. When the time comes, you'd probably think about learning something new. Who knows - maybe that new tool may become your new favorite...

Basically, what I want to tell you is:

> Knowing your tool is as important as developing a different **perspective**.

There was a time when I wanted to learn something new and enter this yet-again-hyped "functional programming train", so I decided to learn [Elm](https://elm-lang.org/). This front-end language is recommended for all people with a JavaScript background, so it suited me perfectly.

It turns out, that I didn't fall in love with Elm (I like it though!), nor I want to use it everywhere from now on. Nevertheless, I came to some interesting conclusions and gained a different perspective on the tools I was using earlier. 

In just a second I'll share with you just how knowing Elm lead me to writing better TypeScript code.

> **Disclaimer**: I don't want to promote myself as being an Elm expert. The truth is that I fiddled with it only for a couple of weeks by creating a small project. Even though, if you have any questions, you are more than welcome to ask 😊 In the worst case - I would just admit that I don't know, fairly embarrassed! 😧

---

## Type-checking - know the quirks 🚩

How you can call yourself a true master of given language if you are not aware of its downsides? And let's be honest here - TypeScript is not perfect. It is a weird case though because a lot of its quirks come from the fact that:

> In the end, TypeScript compiles down to JavaScript.

That means, that after the compilation phase, we forget about all the types, interfaces, etc. we created during our work. The powerful type system delivered by TypeScript is thrown away and that may lead to all sorts of bugs and inconsistencies during runtime.

The simplest example is handling HTTP responses from REST API. Let's imagine a simple function that returns data on a planet using Star Wars API:

```ts
function fetchFilm(filmId: number) {
  return fetch(`https://swapi.co/api/films/${filmId}`)
    .then((res => res.json());
}
```

Having this function written like that, the type of the function is inferred to be `number -> Promise<any>`. We can do better with our types!

```ts
// We create an interface for our expected value:
interface SWFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
}

// We specify the type of our output:
function fetchFilm(filmId: number): Promise<SWFilm> {
  return fetch(`https://swapi.co/api/films/${filmId}`)
    .then(res => res.json());
}

// Let's simulate some operation being done to our fetched value:
fetchFilm(1)
  .then(film => console.log(`${film.opening_crawl.substring(0, 40)...}`))
  .catch(console.error);

// OUTPUT: It is a period of civil war. Rebel spac...
```

Yup, we are safe now! Both TypeScipt compiler and other developers reading the code know what is the expected type of `fetchPlanet`'s output. 

Should we really feel safe, though?

What if our app runs happily on the production and the external REST API changes its model without a notice? What if we don't talk to our back-end developers anymore and they are the ones that changed the model? (No, really, talk to each other! 😏)

In our case, if the `opening_crawl` field may change to a camel case notation (obviously!) and we are prone to receiving everyone's favorite `TypeError: Cannot read property 'substring' of undefined`!

What we realize pretty quickly then, is that: 

> TypeScript does not provide any type-checking during runtime. 

Many people starting with the language have the wrong impression of how the TS compiler works and don't know about that important fact.

What can we do then? We can do simple type checking:

```ts
fetchFilm(1)
  .then(film => {
    if (film && typeof film.opening_crawl === 'string') {
      console.log(`Opening: ${film.opening_crawl.substring(0, 40)}...`);
    } else {
      throw new Error('Wrong type, dude!');
    }
  }) 
  .catch(console.error);
```

In this case, it's not all that bad. But what if we have to check if the entire object is compliant with the interface we've created? That may prove to be tedious 😧

A solution to our problem may lay in the common mechanism in Elm - JSON decoders.

JSON Decoder is a function that takes data in JSON format and extracts specified fields from it. Let's see how this looks like:

```elm
import Json.Decode exposing (decodeString, int)

decodeString int "4"     
-- OUTPUT: Ok 4 

decodeString int "haw haw"     
-- OUTPUT: Err ...  
```

Like you see, nothing to be afraid of. Firstly, in Elm, we don't use parenthesis when calling the function. `decodeString` is a build-in function for decoding strings in JSON format. It accepts a specific decoder and the value to be decoded. `int` is a primitive decoder for integers, so what we're doing above is trying to parse two strings to an integer. As you see, one attempt is successful and the second is not. 

We now know how to parse primitive values. What about JSON objects? For that we have to create the appropriate decoder ourselves:

> **Disclaimer**: We won't dive into too many details in our examples (considering that this may be your first time seeing Elm code) but if you want to check it out for yourself, I'll provide you with appropriate resources. I'll just try to keep the examples as simple as I can 😉

```elm
import Json.Decode as Decode exposing (Decoder, int, string)
import Json.Decode.Pipeline exposing (required)

type alias SWFilm =
    { title : String
    , episode_id : Int
    , opening_crawl : String
    }

swFilmDecoder : Decoder SWFilm
swFilmDecoder =
    Decode.succeed SWFilm
        |> required "title" string
        |> required "episode_id" int
        |> required "opening_crawl" string
```

> **Resources**: You can find more specific information on how to use and create decoders by reading [section of Beggining Elm tutorial](https://elmprogramming.com/decoding-json-part-1.html) or docs for the [NoRedInk/elm-json-decode-pipeline](https://package.elm-lang.org/packages/NoRedInk/elm-json-decode-pipeline/latest/Json-Decode-Pipeline) package. 

Firstly, we create type alias for `SWFilm`, similar to the interface created with TypeScript.

When comes to creating a decoder, in a typical manner for Elm, we first declare type and then define the body of a constant or a function.

We could interpret the body of a `swFilmDecoder` as listing out required fields for our `SWFilm` type and their types individually. By doing that we compose more primitive decoders, like `string : Decoder String`, to create more complex Decoders for more complex data structures.

Then, if we want to recreate our previous `fetchFilm` function, it would look like that:

```elm
import Http

fetchFilm : String -> Cmd Msg
fetchFilm filmId =
  Http.get
    { url = "https://swapi.co/api/films/" ++ filmId
    , expect = Http.expectJson toMsgOnSuccessOrError swFilmDecoder
    }
```

> **Resources**: You can find more information on using `Http` module and creating HTTP requests by reading [section of Beginning Elm tutorial](https://elmprogramming.com/fetching-data-using-get.html) or reading [the official guide](https://guide.elm-lang.org/effects/http.html).

With this, we create command (that's the meaning of `Cmd Msg` in the type signature) for [Elm runtime](https://elmprogramming.com/elm-runtime.html) for running HTTP GET request for given URL and expecting response body to be in JSON format. We also specify that JSON we receive in the response should be compatible with `SWFilm` type by providing our `swFilmDecoder`. 

The most enigmatic thing here is probably `toMsgOnSuccessOrError` function. I won't dive into it too deeply, because that is not the point here. Let's agree, that this custom function should create an appropriate message to the Elm runtime after parsing JSON through the decoder - whether it succeeds or fails to do so. 

By creating HTTP client this way, we are basically enforced by the type system to create not only a decoder that checks our JSON structure but also a concrete function that reacts to success or failure of the decoding process (here `toMsgOnSuccessOrError`). And that's what is missing in our TypeScript code.

Should we build that kind of system in TypeScript by ourselves? We certainly can if we have a specific idea in our minds. But for most use cases, there already exist some packages that may suit our needs! There's a lot of them actually, for example [io-ts](https://github.com/gcanti/io-ts) or [ts.data.json](https://github.com/joanllenas/ts.data.json) packages. 

> **Resources**: You can find more about the idea of JSON decoders in TypeScript by reading [Typescript and validations at runtime boundaries](https://lorefnon.tech/2018/03/25/typescript-and-validations-at-runtime-boundaries/) article by [@lorefnon](https://twitter.com/lorefnon).

Let's take [ts.data.json](https://github.com/joanllenas/ts.data.json) as an example because it is the smallest one and brings the idea of validation of a JSON string in the simplest way ([io-ts](https://github.com/gcanti/io-ts) seems to be the most popular one, though). With this package we create our decoder in TypeScript like that:

```ts
import { JsonDecoder } from 'ts.data.json';

const swFilmDecoder = JsonDecoder.object<SWFilm>(
  {
    title: JsonDecoder.string,
    episode_id: JsonDecoder.number,
    opening_crawl: JsonDecoder.string
  },
  'SWFilm'
);
```

Then we can use it in our `fetchFilm` function: 

```ts
function fetchFilm(filmId: number): Promise<SWFilm> {
  return fetch(`https://swapi.co/api/films/${filmId}`)
    .then(res => res.json())
    .then(film => swFilmDecoder.decodePromise(film));
}
```

That fits perfectly with our use case! We are now 100% sure that if something wrong will come from the REST API, we can handle it. `decodePromise` just returns our film wrapped in a new Promise when parsing succeeds. In case of failure, the decoder would throw an error with a pretty readable message: e.g. `<SWFilm> decoder failed at key "opening_crawl" with error: null is not a valid string`.

(Do you see it redundant that we create both interface and the decoder definition that looks basically the same? Yeah, me too 🙁 But don't you worry, some packages, like [io-ts](https://github.com/gcanti/io-ts), provide you with a way to define decoder and create a `type` definition based on that decoder with only one line! 😎)

And we're done! With this solution, we don't have to worry about type errors in runtime and are able to handle them gracefully 😉

---

⚡️ This is the end of **part one** of this mini-series on using Elm to improve your TypeScript! Stay tuned for another article that (hopefully 😛) will come soon! ⚡️

<!-- ### Discriminating union types 🙏

Union types in TypeScript is a pretty powerful feature that enable us to create a sum type of multiple other types. To demonstrate what I mean, I'll use an example:

```ts
type Book = {
  name: string;
  price: number;
  pages: number;
};

type Movie = {
  name: string;
  price: number;
  duration: number;
};

type Product = Book | Movie;
```

The `Product` we handle in our application can be a `Book` or `Movie`, depending on the user's interaction. this can be pretty convenient, because we can share some logic between them (for example if we want to have some functions that sorts list of `Product`s by their `name` or `price` on a product list screen of our app).  -->