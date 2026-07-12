import type { WeekData } from "../types.ts";

export const WEEK_03: WeekData = {
  meta: {
    id: "03",
    title: "Recipes that take what you give them",
    capability: "READ",
    picture: "a recipe card with named ingredient spaces and a dish handed back",
    status: "built",
  },
  lessons: [
    {
      id: "w3-l1",
      number: "01",
      title: "Recipe Card",
      summary: "Change arguments, predict the return value, then run the function.",
      widgetId: "week03-recipe",
      code: {
        title: "Parameters in, return value out",
        lang: "TypeScript",
        lines: [
          { code: "function makeSnack(fruit, servings = 2) {", note: "named ingredient spaces" },
          { code: "  const label = `${servings} bowls of ${fruit}`;", note: "recipe steps" },
          { code: "  return label;", note: "hand the dish back" },
          { code: "}", note: "recipe ends" },
          { code: "makeSnack('apple', 3);", note: "real arguments" },
        ],
      },
    },
    {
      id: "w3-l2",
      number: "02",
      title: "Trace the Value",
      summary: "Scrub one number through nested calls and watch local names enter and leave scope.",
      widgetId: "week03-trace",
      code: {
        title: "One value through two calls",
        lang: "TypeScript",
        lines: [
          { code: "function addTax(price) {", note: "price is local here" },
          { code: "  return price * 1.08;", note: "first returned value" },
          { code: "}", note: "price leaves scope" },
          { code: "function formatTotal(total) {", note: "total is a new local name" },
          { code: "  return `$${total.toFixed(2)}`;", note: "final value handed back" },
          { code: "}", note: "trace ends" },
        ],
      },
    },
  ],
  cards: [
    { lessonId: "w3-l1", q: "In `makeSnack('apple', 3)`, which pieces are arguments?", a: "`'apple'` and `3` are arguments: the real values placed into the function's parameter spaces." },
    { lessonId: "w3-l1", q: "What happens when the servings argument is omitted?", a: "The default value is used. In this recipe, servings becomes 2." },
    { lessonId: "w3-l1", q: "Does `return` print the value on screen?", a: "No. Return hands the value back to the caller; another line decides whether to display it." },
    { lessonId: "w3-l2", q: "Can `formatTotal` directly use the `price` parameter from `addTax`?", a: "No. `price` belongs to addTax's local scope. formatTotal receives a new argument under its own `total` name." },
    { lessonId: "w3-l2", q: "Why can the same value have different names while it moves?", a: "Each function has its own parameter names. The returned number is passed into the next function's local name." },
  ],
  resources: [
    { title: "Functions - reusable blocks of code", source: "MDN Web Docs", time: "20 min read", why: "A beginner reference for parameters, arguments, and return values.", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Functions", group: "core" },
    { title: "Default parameters", source: "MDN Web Docs", time: "8 min read", why: "Shows how a function supplies a value when an argument is missing.", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters", group: "core" },
    { title: "Closures and scope", source: "MDN Web Docs", time: "15 min read", why: "A deeper explanation of which names are available in which part of a program.", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures", group: "deeper" },
  ],
  glossaryTerms: [
    { slug: "function", term: "function", weekId: "03", plain: "A named set of steps that can receive values and hand a result back.", picture: "A recipe card you can use more than once.", code: "function double(value) { return value * 2; }", where: "Named code blocks, callbacks, handlers, and imported helpers." },
    { slug: "parameter", term: "parameter", weekId: "03", plain: "A named input space written in a function definition.", picture: "The ingredient blank printed on a recipe card.", code: "function greet(name) { return `Hi ${name}`; }", where: "Inside the parentheses where a function is defined." },
    { slug: "argument", term: "argument", weekId: "03", plain: "A real value supplied when a function is used.", picture: "The actual apple placed into the recipe's fruit space.", code: "greet('Maya')", where: "Inside the parentheses where a function is called." },
    { slug: "return-value", term: "return value", weekId: "03", plain: "The result a function hands back to its caller.", picture: "The finished dish handed across the counter.", code: "return total;", where: "After the `return` keyword or where a function call is assigned." },
    { slug: "default-value", term: "default value", weekId: "03", plain: "A fallback input used when no argument is supplied.", picture: "The recipe's normal serving size when nobody asks for another amount.", code: "function serve(count = 2) { return count; }", where: "A parameter followed by `=` in a function definition." },
    { slug: "scope", term: "scope", weekId: "03", plain: "The part of the program where a name is available.", picture: "What is on this counter, not every item in the whole pantry.", code: "function f() { const local = 1; return local; }", where: "Functions, blocks, and modules that create local names." },
  ],
};
