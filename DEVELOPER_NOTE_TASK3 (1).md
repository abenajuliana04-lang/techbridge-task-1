# Developer Note — Task 3: Internship Tasks Experience

I presented the 8 internship tasks as a vertical connected timeline, with each task shown as a card containing its day, task number, title, short description, difficulty level, and an expandable "What you'll build" section for more detail.

I chose this layout because a timeline naturally communicates progression — the connecting line and sequential day markers make it immediately clear that the internship moves from Day 1 through Day 26 in a structured order, rather than presenting the tasks as a flat, disconnected list.

Building this taught me how to use CSS positioning and pseudo-elements to create a connecting line between cards, and how to structure expandable content sections without relying on JavaScript.

**Challenges encountered:**
- Keeping the timeline visually aligned across different screen sizes — the connecting line and card positions needed to adjust without breaking the sequence on smaller viewports.
- Making sure the file naming and internal links matched exactly (case-sensitivity), since GitHub Pages is case-sensitive and a mismatched filename or href caused a 404 during testing.
- Dealing with browser caching while testing changes — updates to the live site sometimes appeared delayed because the browser was serving a cached version rather than the newly deployed page, which I resolved by testing in an incognito window.
