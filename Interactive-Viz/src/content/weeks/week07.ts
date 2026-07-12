import type { WeekData } from "../types.ts";

export const WEEK_07: WeekData = {
  meta: {
    id: "07",
    title: "Undo, and going back to an earlier save",
    capability: "READ + STEER",
    picture: "a document version-history panel with named saves, a safe side copy, and track changes",
    status: "built",
  },
  lessons: [
    {
      id: "w7-l1",
      number: "01",
      title: "Version History",
      summary: "Scrub named saves, follow a safe branch, and merge its useful document change back.",
      widgetId: "week07-history",
      code: {
        title: "A named save and a safe side copy",
        lang: "Git",
        lines: [
          { code: "git add event.md", note: "choose the changed sheet" },
          { code: "git commit -m \"Add open day details\"", note: "make a named save" },
          { code: "git switch -c volunteer-signup", note: "make a safe side copy" },
          { code: "git commit -am \"Add volunteer sign-up\"", note: "save the experiment" },
          { code: "git merge volunteer-signup", note: "fold the side edit back in" },
        ],
      },
    },
    {
      id: "w7-l2",
      number: "02",
      title: "Read the Diff",
      summary: "Click real diff hunks, decode added and removed lines, then predict whether a change is safe.",
      widgetId: "week07-diff",
      code: {
        title: "A reviewable change",
        lang: "TypeScript",
        lines: [
          { code: "const response = await fetch('/api/orders');", note: "wait for the answer" },
          { code: "if (!response.ok) throw new Error('Order failed');", note: "stop on a bad answer" },
          { code: "const order = await response.json();", note: "read the returned order" },
          { code: "setSubmitted(true);", note: "record that the form finished" },
          { code: "showReceipt(order.id);", note: "show the next screen" },
        ],
      },
    },
  ],
  cards: [
    { lessonId: "w7-l1", q: "Can you return to an older commit without deleting the later commits first?", a: "Yes. Version history lets you inspect an earlier named save. Changing the shared history is a separate, deliberate action." },
    { lessonId: "w7-l1", q: "Why make a branch before a risky idea?", a: "It gives the idea its own line of saves. The main document can keep moving while you try the change." },
    { lessonId: "w7-l1", q: "What does a merge do in plain words?", a: "It folds useful edits from one line of history into another line, such as a side branch back into main." },
    { lessonId: "w7-l2", q: "In a diff, what does a line starting with `-` mean?", a: "That exact old line is being removed. It is not a minus calculation." },
    { lessonId: "w7-l2", q: "What does `@@ -12,4 +12,5 @@` help you find?", a: "It marks a hunk: a small neighborhood of the file that changed, with old and new line locations." },
    { lessonId: "w7-l2", q: "Why can a short diff be risky?", a: "One removed state update, check, or await can quietly remove behavior even when the changed code still looks tidy." },
  ],
  resources: [
    { title: "About Git", source: "Git documentation", time: "10 min read", why: "Official plain-language orientation to repositories, commits, and history.", url: "https://git-scm.com/docs/gittutorial", group: "core" },
    { title: "Git branching", source: "Pro Git book", time: "20 min read", why: "The official book's visual explanation of branches and merging.", url: "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell", group: "core" },
    { title: "Reviewing proposed changes", source: "GitHub Docs", time: "15 min read", why: "Shows how diffs are read during a pull request review.", url: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request", group: "deeper" },
  ],
  glossaryTerms: [
    { slug: "commit", term: "commit", weekId: "07", plain: "A named saved point in a project's history.", picture: "A document save with a short note saying what changed.", code: "git commit -m \"Add open day details\"", where: "Git history panels, terminal commands, and pull requests." },
    { slug: "branch", term: "branch", weekId: "07", plain: "A separate line of saved work where you can try an idea without changing the main line yet.", picture: "A safe copy of the document used to try a risky edit.", code: "git switch -c volunteer-signup", where: "Git history graphs, pull requests, and branch pickers." },
    { slug: "merge", term: "merge", weekId: "07", plain: "Bringing saved edits from one branch into another branch.", picture: "Folding one person's useful document edits back into the main document.", code: "git merge volunteer-signup", where: "Pull requests, Git history graphs, and merge buttons." },
    { slug: "diff", term: "diff", weekId: "07", plain: "A view that shows exactly which lines were added and removed.", picture: "Track Changes: green lines came in and red lines went away.", code: "+ setSubmitted(true)\n- setSubmitted(false)", where: "Git changes panels, pull requests, and AI edit previews." },
    { slug: "pull-request", term: "pull request", weekId: "07", plain: "A request to review and merge one branch's changes into another branch.", picture: "Handing your edited copy to the group and asking them to inspect the track changes before folding it in.", code: "Compare volunteer-signup into main", where: "GitHub, GitLab, and other shared-code review tools." },
  ],
};
