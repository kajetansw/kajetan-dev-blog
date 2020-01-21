---
title: "Learning Session #3 - January's Meetups"
cover: ''
date: 2019-02-06
description: Spend time with me by learning new things in this 3rd Learning Session!
tags: ['learningsession', 'meetup', 'javascript', 'graphql']
---

Today I’d like to talk about IT meetups. I’ve been visiting them for quite some time and I think they are really valuable experience. They give us opportunity to hear speeches from experienced developers and meet new people who share the same interests as you.

This is of course another chance to learn something new, so I’d like to share a few things I have learned from them this week in Wrocław. I’ll cover all meetups one by one and describe each speech through bulletpoints.

Let’s start learning, shall we? 😉

---

## meet.js – 01/28/2019

#### Speech #1: “Documenting projects written in JS with JSDoc” by Wojciech Krysiak

Wojtek spoke about importance of documenting projects written in JavaScript. He presented us his and his team’s app: Admin Bro, admin interface for NodeJS apps inspired by Django Admin and alike. I was written in JavaSciript and Wojtek’s team made it crucial to document project for all users.

Quick summary:

- [Repository](https://github.com/SoftwareBrothers/admin-bro) for AdminBro.
- It is especially important to document code written in weakly-typed language and code that is meant to be reused by many developers. That means libraries, frameworks, packages, etc.
- [Documentation](http://usejsdoc.org/) for JSDoc.
- After documenting your code you can generate documentation using [JSDoc3 generator](https://github.com/jsdoc3/jsdoc) for JSDoc-ed files.
- [Great template for JSDocs](https://github.com/SoftwareBrothers/better-docs) created by SoftwareBrothers.
- You can include any other repository inside your GitHub repository using [submodules](https://github.blog/2016-02-01-working-with-submodules/). Authors of AdminBro used it to separate repositories with documentation and application itself to prevent long pull request to review.
- There are several plugins for JSDocs. For example there is Mermaid (enables creating diagrams and charts inside your documentation) and Markdown (enables converting Markdown to HTML).
- JSDoc can be used for typing your JavaScript code. We can use something like `@param` tag to describe parameter type and even create our own types inside doc comments using `@typedef`. Experimental check.js option in VS Code is even integrating comments with IDE-level type checking.

```js
/**
 * Handles blog posts' data saving and loading.
 */
class BlogPostService {
  /**
   * Data structure representing blog post.
   * @typedef {BlogPost}
   * @property {number} id
   * @property {string} title
   * @property {User} author
   * @property {boolean} isPrivate - Indicates whether post is private. Private posts are only visible to the author and his friends.
   */

  /**
   * Made-up HTTP API for our app.
   */
  http = new Http();

  /**
   * Returns blog post by its id.
   * @param {number} id
   * @return {BlogPost}
   */
  getBlogPost(id) {
    return this.http.get('api/get');
  }

  /**
   * Saves blog post to db.
   * @param {BlogPost} blogPost - Post data to be saved.
   */
  saveBlogPost(blogPost) {
    this.http.post('api/save', blogPost);
  }
}
```

#### Speech #2: “Cypress.io and e2e tests” by Przemysław Pietrzak

Przemek shared with us his knowledge about e2e testingideology and Cypress.io testing framework. I too had my encounter with Cypress.io when helping my girlfriend with learning testing tools. It was really impressive to see how someone with little knowledge of testing and programming could write first solid tests in just couple of hours! For me it is really intuitive and complex tool.

What I learned:

- Cypress.io is based on chainers – concept of chaining one method with another (all belonging to global `cy` object) and thus creating chain of events that make the test.
- Cypress.io has something like commands and they are equivalent of page objects in other frameworks. With that we can pre-define functionalities that can be shared by all test cases (like logging to the site).
- Cypress has clear and intuitive panel for navigating through your test and backtracking through them In case of debugging. Each step of test is even provided with before-and-after screenshot of application.
- Not everything should be covered by e2e tests because they are pretty time-consuming in terms of runtime and maintainability. Sometimes it is better to replace them with unit or integration tests. What definitely should be tested: every user functionality heavily related to business logic, “positive paths”, functionality that has impact on database.
- Test data should be generated randomly (if it’s possible) in terms of all tests.
- Cypress.io has ability to create HTTP spies that mocks backend responses.

```js
describe('Login Page', () => {
  it('should show error message when input is invalid', () => {
    // Given - Visit our app
    cy.visit('https://dummy.page/login')

    // When - Type invalid inputs
    cy.get('#email').type('dummy@dummy.com').should('have.value', 'dummy@dummy.com')
    cy.get('#password').type('passw0rd').should('have.value', 'passw0rd')
    cy.get('#loginButton').click()

    // Then - Assert that error message appeared
    cy.get('.error').should('contain', 'Invalid email or password.')
  });
}
```

---

## GraphQL Wrocław #1: REST is history – 01/29/2019

#### Speech #1: “Advantages of migrating to GraphQL” by Marcin Gębala

I should start by explaining, that GraphQL is a fairly new standard of implementing query executions on your backend. It can be integrated with many languages/platforms including JavaScript, Java, Python, etc.

Long story short:

- GraphQL uses only one endpoint where we send our query as a string using POST.
- It has strong typing, so every data object must have its type defined in the GraphQL schema. GraphQL uses its SDL (Schema Definition Language) for defining schemas and types. 
- We also implement resolvers, which are functions that define how we can obtain our data.
- Making queries is very intuitive and easy:

```
// This query will resolve user data for user of _id=1 in our made-up blogging app including all users' posts 
query {
    user(_id: 1) {
        name
        age
        posts {
            title
            creationDate
        }
    }
}
```

- We can use GraphQL with Apollo platform which implements GraphQL standard on the Client side (with popular front-end frameworks), Server (with back-end libraries) and also Engine (which gives us stats about our system).
- GraphQL makes our API visible in one place and making changes to it are easy.
- Problems with GraphQL for now: it is fairly new, so best practices are still emerging, differences in implementing with every frameworks, no support for caching.
- Shopify’s tutorial on designing GraphQL API based on their use cases.

#### Speech #2: “Ariadne: Familiar GraphQL in Python” by Rafał Pitoń

Here Rafał was telling us a story of creating Python server library with GraphQL.

Interesting facts:

- There is not much libraries for creating GraphQL APIs in Python. Most popular are Graphene and GraphQL-Core-Next.
- Above libraries are known for being over-complicated in terms of syntax.
- Ariadne is a library inspired by Apollo Server which very first task is to make using GraphQL conventions easy for user while creating API in Python.
- Syntax of Ariadne is based on Apollo Server’s. We should always learn from the best, shouldn’t we? 😉

That’s all for now. I think you would be too bored if you read all of my meetup story in one place, so I decided to split it into two parts 😉 Next one should be really soon and it will cover TypeScript Wrocław #1 and ng-Wrocław #26.

Till the next time!