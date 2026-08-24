/**
 * One source of truth for the FAQ.
 *
 * The same array feeds the visible `<FAQ>` section and the FAQPage JSON-LD, so an
 * answer a crawler reads is always the answer a visitor reads — the mismatch between
 * the two is the most common way FAQ structured data gets a page penalised.
 *
 * Answers are plain strings rather than nodes for exactly that reason: anything richer
 * would have to be flattened for the schema, and the flattening is where they drift.
 */

export interface FaqEntry {
  id: string
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqEntry[] = [
  {
    id: 'certificate',
    question: 'Do I get a certificate?',
    answer:
      'Yes. Finish every lesson and project in a course and SkillForge issues a certificate of completion with a verification link you can share or add to LinkedIn. Certificates are free on every plan, including the free courses, and they never expire.',
  },
  {
    id: 'lifetime',
    question: 'Is there lifetime access?',
    answer:
      'Yes. A course you buy is yours permanently, including every future update to it. Instructors here re-record material when the tooling changes rather than leaving an outdated module in place, and you get those revisions at no extra cost. Your progress, notes and certificates stay with your account whether or not you hold a subscription.',
  },
  {
    id: 'refund',
    question: 'What is the refund policy?',
    answer:
      'Thirty days, no questions asked. Request a refund from your dashboard within 30 days of purchase and it is returned to the original payment method, typically within five working days. You keep any certificate you already earned. There is no cap on how much of the course you watched first.',
  },
  {
    id: 'hands-on',
    question: 'How much of each course is hands-on?',
    answer:
      'Between a third and a half, depending on the course. Every course page carries a "What is inside" chart that splits the total running time into video, quizzes and hands-on projects, and those figures are computed from the lesson list itself rather than estimated — so the chart and the curriculum below it always agree. Projects are the bulk of the practical time: you build and ship something real, and the finished repository is yours to keep.',
  },
  {
    id: 'prerequisites',
    question: 'What do I need before I start?',
    answer:
      'A computer, an editor and the level marked on the course. Beginner courses assume no prior knowledge of the subject; intermediate courses assume you write code professionally; advanced courses assume you are comfortable in the ecosystem already. Every course page lists what you will learn, and the first lesson of each is free to preview so you can judge the pace before paying.',
  },
  {
    id: 'pace',
    question: 'Can I learn at my own pace?',
    answer:
      'Entirely. Everything is self-paced with no cohort dates and no deadlines. The dashboard tracks your weekly minutes and your streak so you can see your own rhythm, but nothing expires and nothing is withheld if you take a month off.',
  },
]

/** Shape the FAQPage JSON-LD builder expects. */
export function faqForSchema() {
  return FAQ_ITEMS.map((item) => ({ question: item.question, answerText: item.answer }))
}
