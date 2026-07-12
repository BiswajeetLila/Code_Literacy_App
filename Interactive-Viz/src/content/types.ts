import type { Card } from "../cards.ts";
import type { CodeSpec } from "../codeBlock.ts";
import type { Resource } from "../resources.ts";

export type WeekLesson = {
  id: string;
  number: string;
  title: string;
  summary: string;
  widgetId: string;
  code: CodeSpec;
};

export type WeekCard = Card & {
  lessonId: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  weekId: string;
  plain: string;
  picture: string;
  code: string;
  where: string;
};

export type WeekData = {
  meta: {
    id: string;
    title: string;
    capability: string;
    picture: string;
    status: "built" | "in_progress" | "next" | "planned";
  };
  lessons: WeekLesson[];
  cards: WeekCard[];
  resources: Resource[];
  glossaryTerms: GlossaryTerm[];
};
