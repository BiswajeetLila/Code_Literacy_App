import type { WeekData } from "../types.ts";

export const WEEK_05: WeekData = {
  meta: { id: "05", title: "Ordering from a menu", capability: "READ + DEBUG", picture: "an API menu, order ticket, membership card, and bill verdict", status: "built" },
  lessons: [
    { id: "w5-l1", number: "01", title: "The Menu", summary: "Choose an endpoint and verb, send the request, and decode the status.", widgetId: "week05-menu", code: { title: "Request with a key", lang: "TypeScript", lines: [
      { code: "const response = await fetch('/api/orders', {", note: "choose endpoint" }, { code: "  method: 'POST',", note: "choose action" }, { code: "  headers: { Authorization: `Bearer ${apiKey}` },", note: "show membership card" }, { code: "  body: JSON.stringify(order),", note: "send JSON ticket" }, { code: "});", note: "receive status verdict" },
    ] } },
    { id: "w5-l2", number: "02", title: "Read the Ticket", summary: "Inspect JSON keys and trace each value into the visible interface.", widgetId: "week05-ticket", code: { title: "JSON answer to UI", lang: "TypeScript", lines: [
      { code: "const data = await response.json();", note: "read the ticket" }, { code: "title.textContent = data.item.name;", note: "name goes to heading" }, { code: "price.textContent = `$${data.item.price}`;", note: "price goes to label" }, { code: "image.src = data.item.imageUrl;", note: "URL goes to picture" },
    ] } },
  ],
  cards: [
    { lessonId: "w5-l1", q: "Which status usually means the API key is missing or rejected?", a: "401 Unauthorized. Check the key or authentication before changing unrelated UI code." },
    { lessonId: "w5-l1", q: "What is the difference between an endpoint and an HTTP verb?", a: "The endpoint names the destination; the verb names the action, such as GET or POST." },
    { lessonId: "w5-l1", q: "Does a 500 prove your request shape is wrong?", a: "No. It means the server failed while handling the request; inspect server evidence before blaming the client." },
    { lessonId: "w5-l2", q: "The UI shows `data.item.price`. Which JSON key should you inspect?", a: "Open `item`, then `price`. The dots show the same path through the ticket." },
    { lessonId: "w5-l2", q: "Why call `await response.json()`?", a: "Reading the response body is asynchronous; await gives the parsed data instead of unfinished work." },
  ],
  resources: [
    { title: "Using the Fetch API", source: "MDN Web Docs", time: "25 min read", why: "The browser reference for requests, headers, status, and JSON.", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", group: "core" },
    { title: "HTTP response status codes", source: "MDN Web Docs", time: "15 min read", why: "A searchable map for 200, 401, 404, and 500.", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status", group: "core" },
    { title: "Working with JSON", source: "MDN Web Docs", time: "15 min read", why: "Shows the object and array shapes APIs commonly return.", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON", group: "deeper" },
  ],
  glossaryTerms: [
    { slug: "api", term: "API", weekId: "05", plain: "A defined way for one program to ask another program for work or data.", picture: "A menu describing what can be ordered.", code: "await fetch('/api/orders')", where: "fetch calls, SDK methods, and outside-service documentation." },
    { slug: "endpoint", term: "endpoint", weekId: "05", plain: "One address for a specific API resource or action.", picture: "One line on the menu, such as Orders.", code: "'/api/orders'", where: "URLs passed to fetch, requests, or API clients." },
    { slug: "http-verb", term: "HTTP verb", weekId: "05", plain: "The action requested at an endpoint.", picture: "Whether you are reading the menu or placing a new order.", code: "method: 'POST'", where: "GET, POST, PUT, PATCH, and DELETE request options." },
    { slug: "status-code", term: "status code", weekId: "05", plain: "A number summarizing how the request turned out.", picture: "The bill verdict: accepted, not found, membership rejected, or kitchen failed.", code: "if (response.status === 401) ...", where: "Network panels, response objects, logs, and API errors." },
    { slug: "json", term: "JSON", weekId: "05", plain: "A text format for named values, lists, and nested data.", picture: "The structured order ticket carried between rooms.", code: "{ \"item\": { \"price\": 12 } }", where: "API request bodies, responses, config files, and logs." },
    { slug: "header", term: "header", weekId: "05", plain: "Extra request information sent beside the main body.", picture: "Notes attached to the order ticket.", code: "headers: { 'Content-Type': 'application/json' }", where: "fetch options and network request details." },
    { slug: "api-key", term: "API key", weekId: "05", plain: "A secret value an API uses to identify or authorize a caller.", picture: "A membership card shown before ordering.", code: "Authorization: `Bearer ${apiKey}`", where: "Environment variables and authorization headers; never committed publicly." },
  ],
};
