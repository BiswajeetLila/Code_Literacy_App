import type { WeekData } from "../types.ts";

export const WEEK_04: WeekData = {
  meta: { id: "04", title: "Where did this number on screen come from?", capability: "READ + DEBUG", picture: "a parcel handed desk to desk and a room whiteboard redrawn on screen", status: "built" },
  lessons: [
    {
      id: "w4-l1", number: "01", title: "Follow the Parcel", summary: "Inspect a value as modules and props carry it toward the screen.", widgetId: "week04-data-flow",
      code: { title: "A value handed toward the screen", lang: "TypeScript", lines: [
        { code: "const total = order.items.length;", note: "make the parcel" },
        { code: "export function Summary({ total }) {", note: "receive it as a prop" },
        { code: "  const label = `${total} items`;", note: "give it a screen shape" },
        { code: "  return <strong>{label}</strong>;", note: "last desk draws it" },
        { code: "}", note: "flow ends" },
      ] },
    },
    {
      id: "w4-l2", number: "02", title: "The Whiteboard", summary: "Change state and watch the screen redraw from the stored value.", widgetId: "week04-state",
      code: { title: "State is the source of truth", lang: "TypeScript", lines: [
        { code: "const [count, setCount] = useState(0);", note: "room whiteboard" },
        { code: "function addOne() {", note: "event begins" },
        { code: "  setCount(count + 1);", note: "change the whiteboard" },
        { code: "}", note: "event ends" },
        { code: "return <button>{count}</button>;", note: "screen redraws from state" },
      ] },
    },
  ],
  cards: [
    { lessonId: "w4-l1", q: "A number appears inside `<Summary total={cart.length} />`. Where should you trace first?", a: "Start at the `total` prop, then follow its value back to `cart.length` and where `cart` was created or changed." },
    { lessonId: "w4-l1", q: "Does an import copy the whole module into your file?", a: "No. It makes an exported name from another module available here." },
    { lessonId: "w4-l1", q: "Which desk does a displayed value reach last?", a: "The screen/render desk. It turns the received value into visible text or UI." },
    { lessonId: "w4-l2", q: "Is the number printed on the button the source of truth?", a: "No. The state value is the source; the button is a picture redrawn from it." },
    { lessonId: "w4-l2", q: "Why can deleting `setCount(...)` break behavior while the page still builds?", a: "The screen can still render, but the event no longer updates state, so the visible value never changes." },
  ],
  resources: [
    { title: "Passing props to a component", source: "React Docs", time: "15 min read", why: "Shows values moving from one component into another.", url: "https://react.dev/learn/passing-props-to-a-component", group: "core" },
    { title: "State: a component's memory", source: "React Docs", time: "20 min read", why: "Explains why state stores a value and a render displays it.", url: "https://react.dev/learn/state-a-components-memory", group: "core" },
    { title: "JavaScript modules", source: "MDN Web Docs", time: "20 min read", why: "A broader reference for export and import across files.", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules", group: "deeper" },
  ],
  glossaryTerms: [
    { slug: "variable", term: "variable", weekId: "04", plain: "A name that points to a value while code runs.", picture: "A label stuck to one parcel so people can refer to it.", code: "const total = 3;", where: "Assignments, function bodies, state, and data transformations." },
    { slug: "state", term: "state", weekId: "04", plain: "Stored information that can change and cause the screen to redraw.", picture: "A whiteboard in the room that everyone checks for the current number.", code: "const [count, setCount] = useState(0);", where: "Interactive components, forms, selected items, and loading flags." },
    { slug: "props", term: "props", weekId: "04", plain: "Values handed from one component to another.", picture: "A labeled parcel passed to the next desk.", code: "<Summary total={cart.length} />", where: "Component tags and component function parameters." },
    { slug: "data-flow", term: "data flow", weekId: "04", plain: "The path a value follows through files, functions, and screen elements.", picture: "A parcel route through several desks in a building.", code: "data -> props -> label -> screen", where: "Debugging where an on-screen value came from." },
    { slug: "module", term: "module", weekId: "04", plain: "A file that exports code or data for another file to import.", picture: "One desk with its own work, passing named parcels to other desks.", code: "export const total = 3; import { total } from './data';", where: "Files containing import and export lines." },
  ],
};
