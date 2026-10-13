# SC-200 practice exam and reviewer

Unofficial practice exam and reviewer for **SC-200: Microsoft Security Operations Analyst**, built from `sc-200.pdf` in this folder.

## How to run

- **Online:** https://projectvelox.github.io/sc-200-reviewer/
- **Computer, offline:** open `index.html` in Chrome or Edge. No server or install is needed.
- **Phone, offline:** copy `dist/sc200-reviewer.html` to the phone and open it. It is one self-contained file.

Progress and history are stored in the browser, separately for each copy and each device.

After changing anything in `assets/`, rebuild the single file with `node tools/build-single-file.js`.

The online copy is served by GitHub Pages from the `main` branch of `projectvelox/sc-200-reviewer`. Pushing to `main` updates it within a minute or two. The source PDF is not in the repository. `index.html` carries a `noindex` tag so that search engines do not list the site; anyone with the link can still open it.

## What is in the bank

The PDF's cover says 484 questions. The file contains **80**, and all 80 are in the bank, in PDF order.

| Question type | Count |
| --- | ---: |
| Multiple choice | 46 |
| Multiple response | 11 |
| Hotspot, drop-downs (10 inside a query or template, 5 with labelled rows) | 15 |
| Hotspot, Yes/No | 1 |
| Drag and drop, sequence | 4 |
| Drag and drop, match (1 inside a query, 2 with labelled targets) | 3 |
| **Total** | **80** |

| Skill area (official study guide) | Count |
| --- | ---: |
| Manage a security operations environment | 29 |
| Respond to security incidents | 38 |
| Perform threat hunting | 13 |

Skill area, topic and difficulty were assigned during transcription. The PDF does not have them.

### Scenario sets

| Set | Questions | Kind |
| --- | --- | --- |
| Defender for Identity accounts | 10, 11, 12, 22 | Series, "Does this meet the goal?" |
| Third-party antivirus devices | 62, 63, 64, 66 | Series, "Does this meet the goal?" |
| Security Center alert | 67, 76, 77 | Series, "Does this meet the goal?" |
| Fabrikam, Inc. | 42 | Case study (the PDF has one of its questions) |
| Litware Inc. | 52 | Case study (the PDF has one of its questions) |

A set always stays together in a session, in its own order. That is why question 22 follows question 12, and why the position shown in the header can differ from the PDF number. The PDF number is shown as "Source" under each explanation.

The three series say that a question cannot be returned to, so they follow the no-return rule in Exam mode. The two case studies do not.

## Answers

Every answer is the one the PDF prints. For hotspot and drag-and-drop questions it was read from the marked copy of the answer area in the PDF.

**Questions where the PDF prints no selectable answer: none.** Every printed letter exists among the options, and every hotspot and drag-and-drop has a marked selection.

Explanations were written for this reviewer. Where the printed answer could not be fully derived from the documentation, the explanation says "The reference answer is ..." and explains what is true around it (questions 14, 18, 21, 26, 27, 34, 37, 38, 48, 51, 54, 55, 59, 64 and 69).

## Transcription notes

Wording, options and their order are as printed. The changes below are the only ones.

**Applied to all questions**

- Scaffolding words are left out: "HOTSPOT -", "DRAG DROP -", "Hot Area:", "Select and Place:", "Answer:". The app shows the question type itself.
- Queries, commands, JSON and tables that the PDF shows as pictures are typed out as text. Curly quotes in them are replaced with straight quotes.
- The bullet marks of the PDF ("✑", "•") became bullet lists.
- The shared note and scenario of each series are shown once, in the scenario pane. Each question keeps only its "Solution: ..." line and "Does this meet the goal?".
- Case study section names are the PDF's own, without the trailing dash ("Overview -").

**Single questions**

- **Q1:** the answer area is four stacked boxes with the word "and" after the second. It is shown as a four-line query with the same "and". The value `| summarize LogonFailures=count() by DeviceName, LogonType` is printed on two lines in the picture and is one line here.
- **Q4:** the four options are pictures of commands. The pictures print the rule ID with stray spaces and long dashes ("D4F940AB –401B –4EFC –AADC –AD5F3C50688A"). It is typed as the GUID `D4F940AB-401B-4EFC-AADC-AD5F3C50688A` with plain hyphens, and each command breaks before its second parameter.
- **Q26:** the bulleted tasks in the table are kept as bullet lines inside the table cell.
- **Q46:** the text layer of the PDF has a stray "51 HOTSPOT" before the question. It is left out.
- **Q48:** the PDF labels the options A, B, B, D, E, F. The third option is labelled C here. The printed answer, EF, is not affected.
- **Q53:** options B and D are printed as "AuditLogs -" followed by the query lines. The trailing dash is left out and the options are shown as code.
- **Q66:** this question of the series adds one sentence to the scenario ("All Windows devices are onboarded to Microsoft Defender for Endpoint."). It is shown in the question, above the solution.

**Kept as printed, including apparent typos**

- Q8: `'runsll32.exe'` in the query.
- Q14: the option `EmailAttachementInfo`.
- Q17: the line `where isnotempty` has no leading pipe.
- Q43: the first drop-down, before the parenthesis, lists tables, and the second lists operators.
- Q46: `RecipientEmailAddtess` in the last line of the query.
- Q80: `'ITEM2/workflows'` in the template, and the line breaks of the JSON.
- Small wording slips in stems, such as "sign-events" (Q25), "IP addressed" (Q36) and "You need remediate" (Q39).

**Images**

One exhibit is kept as an image because it is a portal screenshot: `assets/exhibits/q06-cloud-discovery-discovered-apps.png` (Q6). Everything else is text.

## Testing

`node tools/validate-bank.js` reports no errors. The letter answers were also compared with the PDF text by script, and every image-based answer was compared by eye with the marked answer area.

`node tools/smoke-test.js` reports `ALL CHECKS PASSED`: all 80 questions answered with the key through the interface score 100 percent, with checks for overflow at desktop, tablet and phone sizes, the reveal in Reviewer mode, drag and drop by mouse and by touch, resume, timer expiry and accessibility. The single file in `dist` was opened at phone size and loads all 80 questions and the exhibit.

All 74 reference links were requested and resolve.

One change was made to the test tool, none to the app: in `tools/smoke-test.js`, the touch-drag check now scrolls to the list of values when an answer area is taller than the screen. Without it, the test started its drag on a point hidden under the header for Q1 at phone size. Dragging itself works there, including automatic scrolling to a target that is off screen.

To rerun the browser test, install its dependencies first:

```
npm install --prefix tools/.test-deps puppeteer-core axe-core
node tools/smoke-test.js
```

## Files

```
index.html                     the app, for a computer
dist/sc200-reviewer.html       the same app as one file, for a phone
assets/js/bank/meta.js         exam details, skill areas, scenario sets
assets/js/bank/bank-01..05.js  the 80 questions, 16 per file
assets/js/app/, assets/css/    the app (unchanged from the kit)
assets/exhibits/               the one image exhibit
tools/                         validate, test and build scripts
```
