// JAS 2026 review deck, styled to match the Feb 2026 "Branding Team – Strategic Roadmap" deck.
const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const { applyTheme } = require("/root/.claude/skills/synced/f38fb5a2-5e71-4f12-af2e-f3ec7c3154a1_3566875c-e75c-4bb9-9244-8e76cf05e160/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "Branding_JAS2026_Review_OND_Plan.pptx";
const ASSETS = process.argv[3] || path.join(__dirname, "assets");
const img = (f) => "image/jpeg;base64," + fs.readFileSync(path.join(ASSETS, f)).toString("base64");

const HEX = {
  blue: "0B5394", text: "434343", red: "CC0000", amber: "B45F06", muted: "777777",
  white: "FFFFFF", paper: "F3F3F3", blueTint: "E3ECF6", redTint: "F9E0E0", amberTint: "FCEBD7", line: "BFBFBF",
};
const THEME = {
  name: "Branding Team Feb 2026",
  headFontFace: "Impact",
  bodyFontFace: "Arial",
  colors: {
    dk1: HEX.text, lt1: HEX.white, dk2: HEX.blue, lt2: HEX.paper,
    accent1: HEX.blue, accent2: HEX.red, accent3: HEX.amber, accent4: HEX.muted,
    accent5: HEX.blueTint, accent6: HEX.redTint, hlink: HEX.blue, folHlink: HEX.muted,
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10 x 5.625, same aspect as the Feb deck
pres.title = "Branding Team - JAS 2026 Review and OND Plan";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const S = { text: C.text1, white: C.background1, blue: C.text2, red: C.accent2, amber: C.accent3, muted: C.accent4, blueTint: C.accent5, redTint: C.accent6 };

// Safe content area on the torn-paper background (wordmark sits at the right edge)
const X0 = 0.65, XW = 7.6, Y0 = 1.6;

pres.defineSlideMaster({ title: "COVER", background: { data: img("bg-cover.jpg") } });
pres.defineSlideMaster({ title: "END", background: { data: img("bg-end.jpg") } });
pres.defineSlideMaster({
  title: "CONTENT",
  background: { data: img("bg-content.jpg") },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: X0, y: 0.95, w: 7.6, h: 0.55, fontSize: 28, color: S.blue, valign: "middle", align: "left", margin: 0 }, text: "" } },
  ],
});

const ph = { color: S.red, italic: true };
function todo(slide, x, y, w, h, text, fontSize = 12) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: S.white, transparency: 30 },
    line: { color: S.red, width: 1.25, dashType: "dash" }, objectName: "Data placeholder",
  });
  slide.addText([
    { text: "TO ADD: ", options: { bold: true } },
    { text, options: { italic: true } },
  ], { x: x + 0.12, y, w: w - 0.24, h, fontSize, color: S.red, valign: "middle", margin: 0, isTextBox: true });
}
const tbl = (extra) => ({
  fontSize: 11, color: S.text, valign: "middle", margin: 0.05,
  border: [{ type: "none" }, { type: "none" }, { pt: 0.75, color: HEX.line }, { type: "none" }],
  fill: { color: S.white, transparency: 100 },
  ...extra,
});
const th = { bold: true, color: S.blue, fontSize: 11 };
const good = { bold: true, color: S.blue };
const mid = { bold: true, color: S.amber };
const bad = { bold: true, color: S.red };

(async () => {
  // ---------- 1. Cover ----------
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Opening" });
  s.addText([
    { text: "Branding Team – JAS 2026 Review & OND Plan", options: { fontSize: 15, breakLine: true } },
    { text: "Projection vs. Actually Done", options: { fontSize: 13, breakLine: true } },
    { text: "Date: 30-10-2026  ·  Blue Iris", options: { fontSize: 13 } },
  ], { x: 2.0, y: 3.7, w: 6.0, h: 1.1, align: "center", bold: true, color: "000000", paraSpaceAfter: 9, margin: 0, isTextBox: true });
  s.addNotes("Open (15 sec): 'In February we shared our 2026 roadmap. Here's what we delivered against it in July to September, how we score on our KPIs, and what we commit to for Oct to Dec.'");

  // ---------- 2. JAS at a glance ----------
  pres.addSection({ title: "JAS review" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("JAS at a Glance", { placeholder: "title" });
  const stats = [
    ["1,109", "creatives delivered\n(Jul – Sep)"],
    ["104", "master creatives\n(new concepts)"],
    ["81%", "of output went to\nthe 6 live retainers"],
    ["6 / 8", "projects closed\non time"],
  ];
  stats.forEach(([n, l], i) => {
    const x = X0 + i * 1.9;
    s.addText(n, { x, y: Y0, w: 1.8, h: 0.6, fontFace: "Impact", fontSize: 34, color: S.blue, margin: 0, isTextBox: true });
    s.addText(l, { x, y: Y0 + 0.62, w: 1.8, h: 0.42, fontSize: 10, color: S.text, margin: 0, isTextBox: true });
  });
  s.addText("Watch-outs", { x: X0, y: Y0 + 1.25, w: 4, h: 0.3, fontSize: 13, bold: true, color: S.text, margin: 0, isTextBox: true });
  s.addText([
    { text: "TMB alone is 44% of all output: heavy reliance on one client", options: { bullet: true, breakLine: true } },
    { text: "67% of master creatives came from one designer: key-person risk", options: { bullet: true, breakLine: true } },
    { text: "2 projects slipped: Checkpoint Diagnostic, Xylemx", options: { bullet: true } },
  ], { x: X0, y: Y0 + 1.55, w: 4.5, h: 1.3, fontSize: 11, color: S.text, paraSpaceAfter: 4, margin: 0, valign: "top", isTextBox: true });
  todo(s, X0 + 4.75, Y0 + 1.25, 2.85, 1.55, "Overall weighted KPI score for JAS, plus the biggest win and biggest miss in one line each.", 11);
  s.addNotes("~60 sec. Lead with the headline KPI score. 1,109 creatives, 104 of them new concepts. 81% (899 units) went to the 6 retainers: TMB, Star Health, VGN, TVS Credit, Maxivision, Athmalaya. Name the watch-outs yourself before anyone else does.");

  // ---------- 3. Feb roadmap check ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("Feb Roadmap vs. JAS", { placeholder: "title" });
  const rr = (a, b, c, d, ds, cs) => [{ text: a, options: { bold: true } }, { text: b }, { text: c, options: cs || {} }, { text: d, options: ds }];
  s.addTable([
    [{ text: "Roadmap line (26 Feb)", options: th }, { text: "What we said", options: th }, { text: "JAS reality", options: th }, { text: "Status", options: th }],
    rr("Creative volume", "200–250 / month", "~370 / month (1,109 total)", "Beat", good),
    rr("Individual projects", "4–5 / month", "~2.7 / month (8 in JAS)", "Below", mid),
    rr("AI TVC / YouTube ads", "R&D, then pitch", "3 TVC ads for TVS Green", "Delivered", good),
    rr("Upsell: Star Health, TMB", "Quarterly ads / YouTube", "[add: pitched? converted?]", "[add]", ph, ph),
    rr("New retainers", "+2 Type 1, +2 Type 2", "VGN Homes added · [confirm KIMS]", "Partial", mid),
    rr("New service lines", "AI photo, annual reports", "[add: any paid jobs?]", "[add]", ph, ph),
    rr("Resources requested", "2 designers, 1 video, AI tools", "[add: approved / pending]", "[add]", ph, ph),
  ], { x: X0, y: Y0, w: XW, colW: [1.85, 1.85, 3.0, 0.9], rowH: 0.355, ...tbl({ fontSize: 10 }) });
  s.addNotes("~75 sec. Leadership saw the Feb roadmap, so they'll judge JAS against it. Say it before they do. Volume: in Feb we said 200–250/month and 'close to optimal capacity'; JAS ran at ~370/month with the same 4 people. If the resource ask is still pending, that's the argument for it (and the 2 slips + one-designer concept dependency answer 'why hire if you managed?'). KIMS was a Type 2 retainer in Feb and isn't in the current list: confirm and have a one-line reason. Gen-AI photography / annual reports: if nothing happened, say whether parked or moved to OND.");

  // ---------- 4. TVS spotlight ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("TVS Ads Spotlight", { placeholder: "title" });
  s.addText([
    { text: "Committed: ", options: { bold: true } }, { text: "AMJ 2026", options: { breakLine: true } },
    { text: "Executed: ", options: { bold: true } }, { text: "JAS 2026", options: { breakLine: true } },
    { text: "Delivered: ", options: { bold: true } }, { text: "3 TVC commercial ads for TVS Green", options: { breakLine: true } },
    { text: "Team: ", options: { bold: true } }, { text: "Gowtham (5 master concepts), Naresh (7 creatives)", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Why it matters", options: { bold: true, color: S.blue, breakLine: true } },
    { text: "First delivery against the Feb roadmap's TVC / YouTube ads line, and the base for OND's real-estate AI videos." },
  ], { x: X0, y: Y0, w: 4.1, h: 2.9, fontSize: 12, color: S.text, paraSpaceAfter: 6, valign: "top", margin: 0, isTextBox: true });
  todo(s, X0 + 4.4, Y0, 3.2, 2.8, "2–3 stills or a short clip from the TVS ads, plus one line of client feedback.", 12);
  s.addNotes("~60 sec. The story to land: promised, carried over, delivered. CHECK FIRST: the project tracker still shows TVS Green 'TVC Commercial Ads - 3' as Oct / In-progress. Update it or someone will catch the mismatch. If the ads were not AI-produced, drop the 'AI' framing.");

  // ---------- 5. KPI scorecard ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("KPI Scorecard", { placeholder: "title" });
  s.addTable([
    [{ text: "KPI", options: th }, { text: "Weight", options: th }, { text: "Projection", options: th }, { text: "Actually done", options: th }, { text: "Score", options: th }],
    [{ text: "On-Time Project Delivery", options: { bold: true } }, { text: "25%" }, { text: "8 projects due" }, { text: "6 on time" }, { text: "75%", options: mid }],
    [{ text: "Design & Creatives outcomes", options: { bold: true } }, { text: "30%" }, { text: "561 (retainer scope)" }, { text: "841 units" }, { text: "150%*", options: good }],
    [{ text: "Attendance / Production days", options: { bold: true } }, { text: "5%" }, { text: "[add]", options: ph }, { text: "[add]", options: ph }, { text: "[add]", options: ph }],
  ], { x: X0, y: Y0, w: XW, colW: [2.35, 0.75, 1.95, 1.45, 1.1], rowH: 0.36, ...tbl({ fontSize: 11 }) });
  s.addText("Month-wise", { x: X0, y: Y0 + 1.6, w: 3, h: 0.3, fontSize: 13, bold: true, color: S.text, margin: 0, isTextBox: true });
  s.addText([
    { text: "Projects started:  ", options: { bold: true } },
    { text: "Jul 4 (all done)  ·  Aug 3 (1 done, 2 slipped)  ·  Sep 1 (done)" },
  ], { x: X0, y: Y0 + 1.9, w: XW, h: 0.3, fontSize: 11, color: S.text, margin: 0, isTextBox: true });
  todo(s, X0, Y0 + 2.28, XW, 0.42, "Creatives target vs. done for Jul / Aug / Sep (split the pivot by month).", 11);
  s.addText("* Scope = TMB, VGN, Star Health, Maxivision, Athmalaya × 3 months, adaptations included. Capped at 100% when weighted.", { x: X0, y: Y0 + 2.8, w: XW, h: 0.3, fontSize: 9, italic: true, color: S.muted, margin: 0, isTextBox: true });
  s.addNotes("~75 sec. Sources: on-time from PixDo / project tracker; design & creatives from the Branding Team Scrum Tracker; attendance from the PixDo leave report. Upsell, Project Retention and CSAT are deliberately left off. If asked: 'We start tracking them from OND with a defined source.'");

  // ---------- 6. Retainer delivery ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("Retainer Delivery vs. Scope", { placeholder: "title" });
  const pc = (t) => (t.endsWith("%") ? (parseInt(t) >= 100 ? good : parseInt(t) >= 80 ? mid : bad) : ph);
  const rt = (n, sc, d, a, b) => [{ text: n, options: { bold: true } }, { text: sc }, { text: d }, { text: a, options: pc(a) }, { text: b, options: pc(b) }];
  s.addTable([
    [{ text: "Retainer", options: th }, { text: "JAS scope", options: th }, { text: "Delivered", options: th }, { text: "% of scope", options: th }, { text: "% excl. adaptations", options: th }],
    rt("TMB Bank", "210", "491", "234%", "81%"),
    rt("VGN Homes", "105", "131", "125%", "107%"),
    rt("Star Health", "210 units", "175", "83%", "30%"),
    rt("Maxivision", "18–30", "41", "137%", "133%"),
    rt("Athmalaya", "6 posts", "3", "50%", "50%"),
    rt("TVS Credit", "~1 newsletter", "58", "[confirm unit]", "[confirm unit]"),
  ], { x: X0, y: Y0, w: XW, colW: [1.8, 1.5, 1.1, 1.4, 1.8], rowH: 0.34, ...tbl({ fontSize: 11 }) });
  s.addText([
    { text: "Decide before presenting: ", options: { bold: true, color: S.red } },
    { text: "do adaptations count toward scope? If yes, TMB is at 2.3× scope (unbilled over-delivery?). If no, TMB is at 81% and Star Health at 30%. Keep one % column." },
  ], { x: X0, y: Y0 + 2.48, w: XW, h: 0.5, fontSize: 10, color: S.text, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("~60 sec. Scope = monthly scope from the retainer tracker × 3. Delivered = JAS creative pivot by client. Athmalaya at 3 of 6 posts is a real shortfall either way, so have the reason ready. Star Health's scope says '70 units = 35–40 creatives': confirm how a unit is counted.");

  // ---------- 7. Team & projects ----------
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "JAS review" });
  s.addText("Team Output & Projects", { placeholder: "title" });
  const ppl = ["Ezhumalai", "Gowtham", "Keerthana", "Naresh"];
  s.addChart(pres.charts.BAR, [
    { name: "Master creatives", labels: ppl, values: [5, 70, 6, 23] },
    { name: "Creatives", labels: ppl, values: [101, 118, 91, 199] },
    { name: "Adaptations", labels: ppl, values: [93, 11, 302, 90] },
  ], {
    x: X0 - 0.1, y: Y0 - 0.15, w: 4.4, h: 3.1, barDir: "bar", barGrouping: "stacked",
    chartColors: [HEX.blue, HEX.red, "B7B7B7"],
    showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.white, dataLabelFontSize: 9, dataLabelFontFace: "+mn-lt", dataLabelFormatCode: "#,##0;;;",
    showLegend: true, legendPos: "b", legendFontSize: 9, legendFontFace: "+mn-lt", legendColor: HEX.text,
    catAxisLabelColor: HEX.text, catAxisLabelFontSize: 10, catAxisLabelFontFace: "+mn-lt", catAxisOrientation: "maxMin",
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  });
  s.addText([
    { text: "Team", options: { bold: true, color: S.blue, breakLine: true } },
    { text: "67% of master creatives came from Gowtham", options: { bullet: true, breakLine: true } },
    { text: "76% of Keerthana's output is adaptations", options: { bullet: true, breakLine: true } },
    { text: "Projects", options: { bold: true, color: S.blue, breakLine: true } },
    { text: "6 of 8 closed; Checkpoint and Xylemx slipped", options: { bullet: true, breakLine: true } },
    { text: "Pitches: Apollo and DBS used 9 master creatives", options: { bullet: true } },
  ], { x: X0 + 4.45, y: Y0, w: 3.15, h: 1.95, fontSize: 10, color: S.text, paraSpaceAfter: 4, valign: "top", margin: 0, isTextBox: true });
  todo(s, X0 + 4.45, Y0 + 2.05, 3.15, 0.8, "Why the 2 projects slipped, their new close dates, and the pitch outcomes.", 10);
  s.addNotes("~60 sec. Totals: Ezhumalai 199, Gowtham 199, Keerthana 399, Naresh 312. Don't rank by raw volume: a master creative is not equal to an adaptation. Key-person risk on concepts: name the OND mitigation (e.g., a second designer pairs on concepts). Checkpoint and Xylemx started in August and are still open at the end of October: give the reason and the new date, not an apology.");

  // ---------- 8. OND plan ----------
  pres.addSection({ title: "OND plan" });
  s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "OND plan" });
  s.addText("OND Plan", { placeholder: "title" });
  s.addText([
    { text: "Focus", options: { bold: true, color: S.blue, breakLine: true } },
    { text: "Real-estate AI videos", options: { bullet: true, breakLine: true } },
    { text: "AI-led creative deliverables", options: { bullet: true, breakLine: true } },
    { text: "Close Checkpoint, Xylemx, TVS Green", options: { bullet: true, breakLine: true } },
    { text: "Keep every retainer on scope", options: { bullet: true } },
  ], { x: X0, y: Y0, w: 2.9, h: 1.9, fontSize: 11, color: S.text, paraSpaceAfter: 5, valign: "top", margin: 0, isTextBox: true });
  const tr = (k) => [{ text: k, options: { bold: true } }, { text: "[add]", options: ph }, { text: "[add]", options: ph }, { text: "[add]", options: ph }];
  s.addTable([
    [{ text: "Target", options: th }, { text: "Oct (actual)", options: th }, { text: "Nov", options: th }, { text: "Dec", options: th }],
    tr("Real-estate AI videos"),
    tr("AI creative deliverables"),
    tr("Retainer delivery vs. scope"),
    tr("On-time delivery"),
  ], { x: X0 + 3.0, y: Y0, w: 4.6, colW: [1.9, 1.0, 0.85, 0.85], rowH: 0.36, ...tbl({ fontSize: 10 }) });
  todo(s, X0, Y0 + 2.2, XW, 0.55, "Any ask: AI tool budget, hiring decision, or billing TMB's over-scope work.", 11);
  s.addNotes("~60 sec. October is nearly over, so that column should be actuals. Give each AI target a number and an owner. End with the ask.");

  // ---------- 9. Thank you ----------
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "END", sectionTitle: "Close" });
  s.addNotes("Questions. Backing reports to have open: PixDo export, Branding Team Scrum Tracker, creative pivot, PixDo leave report.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
