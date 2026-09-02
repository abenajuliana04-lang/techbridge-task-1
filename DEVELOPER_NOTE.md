# Developer Note

My design idea was to reflect TechBridge's "bridging" concept through a circuit/pathway
motif — echoing the connector mark in the logo — rather than generic stock photography,
paired with a confident navy-and-green palette pulled directly from the brand. I built a
single-page responsive homepage (`index.html` + `style.css`) covering brand identity, an
introduction, the two current programs (Data Analytics and Web Development), the 30-day
internship with its recommendation-letter benefit, an application call-to-action linking
to the official form, a WhatsApp community section, contact info, sticky navigation with
a mobile hamburger menu, and a footer — all styled with CSS Grid/Flexbox and media queries
for desktop, tablet, and mobile. I learned how much a tight, deliberate content structure
(rather than more visual decoration) does for communicating a real organization's purpose
quickly. The main challenge was the provided logo file: it had large transparent padding
around the mark, which made it render almost invisibly at nav-bar size, so I had to crop
it to its visible bounding box before it displayed correctly at small sizes.
