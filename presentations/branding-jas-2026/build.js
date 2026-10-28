const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require("/root/.claude/skills/synced/f38fb5a2-5e71-4f12-af2e-f3ec7c3154a1_3566875c-e75c-4bb9-9244-8e76cf05e160/pptx/scripts/apply_theme.js");

const OUT = process.argv[2] || "Branding_JAS2026_Review.pptx";

const HEX = {
  dark: "1F1F1F", white: "FFFFFF", green: "2E7D4F", cream: "FFF7EC",
  orange: "F28C28", red: "D9472F", yellow: "F6B93B", muted: "5F5A54",
  orangeLight: "FDE5CC", greenLight: "E3F1E8", redLight: "F9DAD3", yellowLight: "FDF0CF",
  orangeDeep: "B3561A",
};

const THEME = {
  name: "Branding JAS Review",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: HEX.dark, lt1: HEX.white, dk2: HEX.green, lt2: HEX.cream,
    accent1: HEX.orange, accent2: HEX.green, accent3: HEX.red, accent4: HEX.yellow,
    accent5: HEX.muted, accent6: HEX.orangeLight, hlink: HEX.green, folHlink: HEX.muted,
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
pres.title = "Branding Team - JAS 2026 Review and OND Plan";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
// Scheme aliases
const S = {
  dark: C.text1, white: C.background1, green: C.text2, cream: C.background2,
  orange: C.accent1, red: C.accent3, yellow: C.accent4, muted: C.accent5, orangeLight: C.accent6,
};

// ---------- assets ----------
async function iconPng(Icon, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Icon, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
async function squigglePng(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <path d="M30 320 C 90 200, 190 380, 240 250 S 330 60, 400 170 S 520 330, 570 90"
      fill="none" stroke="#${color}" stroke-width="34" stroke-linecap="round"/></svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- helpers ----------
const ph = { color: HEX.orangeDeep, italic: true, fill: { color: HEX.orangeLight } };
const FOOT = "Branding Team  ·  JAS 2026 Review & OND Plan";

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: opts.fill || S.white },
    line: { color: opts.border || S.dark, width: opts.borderW || 1.25 },
    shadow: { type: "outer", color: "000000", opacity: 0.12, blur: 6, offset: 3, angle: 90 },
    objectName: opts.name || "Card",
  });
  if (opts.dots !== false) {
    const dx = x + w - 0.95;
    [S.green, S.yellow, S.red].forEach((c, i) => {
      slide.addShape(pres.shapes.OVAL, {
        x: dx + i * 0.25, y: y + 0.15, w: 0.14, h: 0.14,
        fill: { color: c }, line: { color: c, width: 0 }, objectName: "Window dot",
      });
    });
  }
}

function placeholderBox(slide, x, y, w, h, text, fontSize = 14) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.1,
    fill: { color: S.orangeLight },
    line: { color: S.orange, width: 1.5, dashType: "dash" },
    objectName: "Data placeholder",
  });
  slide.addText([
    { text: "TO ADD  ", options: { bold: true, color: HEX.orangeDeep, fontSize: fontSize - 2, breakLine: true } },
    { text, options: { italic: true, color: HEX.orangeDeep, fontSize } },
  ], { x: x + 0.2, y: y + 0.1, w: w - 0.4, h: h - 0.2, valign: "middle", isTextBox: true, margin: 0 });
}

function iconCircle(slide, x, y, d, img, fill) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: "Icon circle" });
  const pad = d * 0.25;
  slide.addImage({ data: img, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad, altText: "icon" });
}

function chip(slide, x, y, w, text, fill, color) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.32, rectRadius: 0.16, fill: { color: fill }, line: { color: fill, width: 0 }, objectName: "Chip" });
  slide.addText(text, { x, y, w, h: 0.32, fontSize: 11, bold: true, color: color || S.white, align: "center", valign: "middle", margin: 0, isTextBox: true });
}

(async () => {
  const I = {
    film: await iconPng(fa.FaFilm, HEX.white),
    check: await iconPng(fa.FaCheckCircle, HEX.white),
    layers: await iconPng(fa.FaLayerGroup, HEX.white),
    lightbulb: await iconPng(fa.FaLightbulb, HEX.white),
    handshake: await iconPng(fa.FaHandshake, HEX.white),
    building: await iconPng(fa.FaBuilding, HEX.white),
    robot: await iconPng(fa.FaRobot, HEX.white),
    flag: await iconPng(fa.FaFlagCheckered, HEX.white),
    warn: await iconPng(fa.FaExclamationTriangle, HEX.white),
    clock: await iconPng(fa.FaClock, HEX.white),
    users: await iconPng(fa.FaUsers, HEX.white),
    pen: await iconPng(fa.FaPenNib, HEX.white),
  };
  const SQ_ORANGE = await squigglePng(HEX.orange);
  const SQ_GREEN = await squigglePng(HEX.green);

  // ---------- layouts ----------
  pres.defineSlideMaster({
    title: "COVER",
    background: { color: S.orange },
    objects: [
      { rect: { x: 0.4, y: 0.35, w: 12.53, h: 6.8, fill: { color: S.cream }, line: { color: S.cream, width: 0 } } },
    ],
  });
  pres.defineSlideMaster({
    title: "TITLE_ONLY",
    background: { color: S.cream },
    margin: [0.5, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 28, bold: true, color: S.dark, align: "left", valign: "middle", margin: 0 }, text: "" } },
      { text: { text: FOOT, options: { x: 0.6, y: 7.0, w: 8, h: 0.3, fontSize: 10, color: S.muted, margin: 0 } } },
    ],
    slideNumber: { x: 12.3, y: 7.0, w: 0.4, h: 0.3, fontSize: 10, color: S.muted, align: "right" },
  });

  // ================= 1. COVER =================
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "COVER", sectionTitle: "Opening" });
  s.addText("Branding Team", { x: 1.0, y: 1.1, w: 6, h: 0.45, fontSize: 20, bold: true, color: S.dark, margin: 0, isTextBox: true });
  s.addText("JAS 2026 Review\n& OND Plan", { x: 1.0, y: 1.65, w: 7, h: 2.3, fontSize: 54, bold: true, color: S.dark, margin: 0, valign: "top", isTextBox: true });
  s.addText("What we delivered in July – September, and what we commit to for October – December", { x: 1.0, y: 4.05, w: 6.6, h: 0.9, fontSize: 18, color: S.muted, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.0, y: 5.2, w: 3.9, h: 0.55, rectRadius: 0.27, fill: { color: S.green }, line: { color: S.green, width: 0 }, objectName: "Presenter pill" });
  s.addText("Presented by [Presenter name]", { x: 1.0, y: 5.2, w: 3.9, h: 0.55, fontSize: 15, bold: true, color: S.white, align: "center", valign: "middle", margin: 0, isTextBox: true });
  s.addText("30 Oct 2026  ·  Blue Iris", { x: 1.0, y: 5.95, w: 5, h: 0.35, fontSize: 14, color: S.muted, margin: 0, isTextBox: true });
  card(s, 8.2, 1.2, 4.1, 2.55, { border: S.orange, borderW: 3, name: "Hero stat card" });
  s.addText("1,109", { x: 8.5, y: 1.6, w: 3.6, h: 1.1, fontSize: 60, bold: true, color: S.orange, margin: 0, isTextBox: true });
  s.addText("creatives delivered in JAS", { x: 8.5, y: 2.75, w: 3.6, h: 0.5, fontSize: 18, color: S.dark, margin: 0, isTextBox: true });
  card(s, 8.7, 4.15, 3.6, 1.85, { border: S.green, borderW: 3, name: "Secondary stat card" });
  s.addText([
    { text: "6", options: { bold: true, color: S.green, fontSize: 30 } },
    { text: "  live retainers", options: { color: S.dark, fontSize: 16, breakLine: true } },
    { text: "8", options: { bold: true, color: S.green, fontSize: 30 } },
    { text: "  projects in the quarter", options: { color: S.dark, fontSize: 16 } },
  ], { x: 9.0, y: 4.5, w: 3.2, h: 1.35, margin: 0, valign: "middle", isTextBox: true });
  s.addImage({ data: SQ_ORANGE, x: 10.9, y: 6.1, w: 1.6, h: 1.07, altText: "decorative squiggle" });
  s.addNotes("Open (15 sec): 'In the next 10 minutes: what the branding team delivered in July to September, how we score against our KPIs, and what we're committing to for Oct to Dec.'");

  // ================= 2. AT A GLANCE =================
  pres.addSection({ title: "JAS review" });
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("JAS at a glance: 1,109 creatives, 81% for retainers", { placeholder: "title" });
  const stats = [
    { n: "1,109", l: "creatives delivered\n(Jul – Sep)", ic: I.layers, c: S.orange },
    { n: "104", l: "master creatives\n(new concepts)", ic: I.lightbulb, c: S.green },
    { n: "81%", l: "of output went to\nthe 6 live retainers", ic: I.handshake, c: S.orange },
    { n: "6 / 8", l: "projects closed\non time", ic: I.check, c: S.green },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 3.1;
    card(s, x, 1.5, 2.8, 2.35, { name: "Stat card" });
    iconCircle(s, x + 0.25, 1.75, 0.6, st.ic, st.c);
    s.addText(st.n, { x: x + 0.25, y: 2.45, w: 2.4, h: 0.75, fontSize: 40, bold: true, color: st.c, margin: 0, isTextBox: true });
    s.addText(st.l, { x: x + 0.25, y: 3.15, w: 2.4, h: 0.6, fontSize: 13, color: S.muted, margin: 0, isTextBox: true });
  });
  placeholderBox(s, 0.6, 4.2, 5.9, 2.5, "Overall weighted KPI score for JAS (one number, e.g. 87%), plus one line on the biggest win and one on the biggest miss.", 16);
  card(s, 6.8, 4.2, 5.9, 2.5, { border: S.red, borderW: 2, name: "Watch-outs card" });
  iconCircle(s, 7.05, 4.42, 0.5, I.warn, S.red);
  s.addText("Watch-outs", { x: 7.7, y: 4.42, w: 3, h: 0.5, fontSize: 18, bold: true, color: S.dark, valign: "middle", margin: 0, isTextBox: true });
  s.addText([
    { text: "TMB alone is 44% of all output: heavy reliance on one client", options: { bullet: true, breakLine: true } },
    { text: "67% of master creatives came from one designer: key-person risk", options: { bullet: true, breakLine: true } },
    { text: "2 projects slipped: Checkpoint Diagnostic, Xylemx", options: { bullet: true } },
  ], { x: 7.05, y: 5.05, w: 5.4, h: 1.5, fontSize: 14, color: S.dark, paraSpaceAfter: 6, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("~60 sec. Lead with the headline KPI score (fill the orange box). Then: 1,109 creatives, 104 of them new concepts. 81% of output (899 units) went to the 6 retainers: TMB, Star Health, VGN, TVS Credit, Maxivision, Athmalaya. Name the watch-outs yourself before anyone else does.");

  // ================= 2b. FEB ROADMAP CHECK =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("Feb roadmap check: volume beat it, new lines lag", { placeholder: "title" });
  const bh = { bold: true, color: S.white, fill: { color: S.green } };
  const okS = { fill: { color: HEX.greenLight }, color: S.green, bold: true, align: "center" };
  const midS = { fill: { color: HEX.yellowLight }, color: HEX.orangeDeep, bold: true, align: "center" };
  const badS = { fill: { color: HEX.redLight }, color: S.red, bold: true, align: "center" };
  const phS = { ...ph, align: "center" };
  const rm = (what, promised, actual, st, stStyle, actualStyle) => [
    { text: what, options: { bold: true } }, { text: promised }, { text: actual, options: actualStyle || {} }, { text: st, options: stStyle },
  ];
  s.addTable([
    [{ text: "Roadmap line (26 Feb 2026)", options: bh }, { text: "What we said", options: bh }, { text: "JAS reality", options: bh }, { text: "Status", options: { ...bh, align: "center" } }],
    rm("Creative volume", "200–250 creatives / month", "~370 / month (1,109 in 3 months)", "Beat", okS),
    rm("Individual projects", "4–5 per month", "~2.7 per month (8 in JAS)", "Below", midS),
    rm("AI TVC / YouTube ads", "R&D and trial run before pitching", "3 TVC ads for TVS Green", "Delivered", okS),
    rm("Upsell: Star Health ads, TMB YouTube", "Quarterly ads / YouTube campaigns", "[add: pitched? converted?]", "[add]", phS, ph),
    rm("New retainers", "+2 Type 1, +2 Type 2", "VGN Homes added  ·  [confirm: KIMS status]", "Partial", midS),
    rm("Gen-AI photography", "Food, fashion, industrial shoots", "[add: any paid jobs?]", "[add]", phS, ph),
    rm("Annual reports / white papers", "New high-value category", "None in the JAS tracker", "Not started", badS),
    rm("Resources requested", "2 designers, 1 video, AI tools", "[add: approved / pending]", "[add]", phS, ph),
  ], {
    x: 0.6, y: 1.45, w: 12.1, colW: [3.2, 3.3, 4.0, 1.6], rowH: 0.56,
    fontSize: 13, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.08,
  });
  s.addNotes("~60 sec. Leadership saw the Feb roadmap ('Scaling the Right Way'), so they will judge JAS against it. Say it before they do. Volume: the Feb deck said 200–250/month and 'close to optimal capacity'; JAS ran at ~370/month with the same 4 people. If the resource ask is still pending, that is your argument for it. KIMS was a Type 2 retainer in Feb and is not in the current retainer list, so confirm whether it was lost and be ready to say why. Annual reports / white papers had no movement: say whether it's parked or planned for OND.");

  // ================= 3. TVS SPOTLIGHT =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("TVS ads: committed last quarter, delivered this quarter", { placeholder: "title" });
  const steps = [
    { h: "AMJ 2026", t: "Committed to the client", ic: I.flag, c: S.orange },
    { h: "JAS 2026", t: "Concepts and production executed", ic: I.film, c: S.green },
    { h: "Delivered", t: "3 TVC commercial ads", ic: I.check, c: S.orange },
  ];
  steps.forEach((st, i) => {
    const x = 0.8 + i * 2.5;
    iconCircle(s, x, 1.6, 0.9, st.ic, st.c);
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 1.0, y: 2.05, w: 1.4, h: 0, line: { color: S.muted, width: 2, dashType: "dash", endArrowType: "triangle" }, objectName: "Timeline arrow" });
    s.addText(st.h, { x: x - 0.3, y: 2.6, w: 1.5, h: 0.4, fontSize: 16, bold: true, color: S.dark, align: "center", margin: 0, isTextBox: true });
    s.addText(st.t, { x: x - 0.4, y: 3.0, w: 1.7, h: 0.65, fontSize: 12, color: S.muted, align: "center", margin: 0, isTextBox: true });
  });
  card(s, 0.6, 4.0, 7.2, 2.7, { border: S.green, borderW: 2, name: "TVS facts card" });
  s.addText([
    { text: "Scope: ", options: { bold: true } }, { text: "3 TVC commercial ads for TVS Green", options: { breakLine: true } },
    { text: "Team: ", options: { bold: true } }, { text: "Gowtham (5 master concepts), Naresh (7 creatives)", options: { breakLine: true } },
    { text: "Why it matters: ", options: { bold: true } }, { text: "first delivery against the Feb roadmap's TVC / YouTube ads line. We kept a commitment across quarters, and it is the base for OND's real-estate AI videos." },
  ], { x: 0.9, y: 4.4, w: 6.6, h: 2.1, fontSize: 15, color: S.dark, paraSpaceAfter: 8, margin: 0, valign: "top", isTextBox: true });
  placeholderBox(s, 8.2, 1.5, 4.5, 5.2, "2–3 stills or a 10-sec clip from the TVS ads, plus one line of client feedback (quote or approval email).", 16);
  s.addNotes("~75 sec. This is the story to land. 'This was promised last quarter. We carried it over and delivered it this quarter.' Show the stills or clip. CHECK BEFORE PRESENTING: the project tracker still lists TVS Green 'TVC Commercial Ads - 3' as Oct / In-progress. Update the tracker to Completed or someone will catch the mismatch.");

  // ================= 4. MONTH-WISE =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("Month-wise: July closed 4 projects, August slipped 2", { placeholder: "title" });
  card(s, 0.6, 1.5, 5.6, 5.2, { name: "Projects chart card" });
  s.addChart(pres.charts.BAR, [
    { name: "Completed", labels: ["July", "August", "September"], values: [4, 1, 1] },
    { name: "In progress (delayed)", labels: ["July", "August", "September"], values: [0, 2, 0] },
  ], {
    x: 0.8, y: 1.85, w: 5.2, h: 4.7, barDir: "col", barGrouping: "stacked",
    chartColors: [HEX.green, HEX.orange],
    showTitle: true, title: "Projects started per month, by status", titleFontSize: 13, titleColor: HEX.dark, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.white, dataLabelFormatCode: "#,##0;;;", dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt",
    showLegend: true, legendPos: "b", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: HEX.muted,
    catAxisLabelColor: HEX.muted, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt",
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
    valAxisMaxVal: 5,
  });
  const hd = { bold: true, color: S.white, fill: { color: S.green } };
  s.addTable([
    [{ text: "Creatives", options: hd }, { text: "July", options: hd }, { text: "August", options: hd }, { text: "September", options: hd }],
    [{ text: "Target (projection)", options: { bold: true } }, { text: "[add]", options: ph }, { text: "[add]", options: ph }, { text: "[add]", options: ph }],
    [{ text: "Actually done", options: { bold: true } }, { text: "[add]", options: ph }, { text: "[add]", options: ph }, { text: "[add]", options: ph }],
    [{ text: "Achievement %", options: { bold: true } }, { text: "[add]", options: ph }, { text: "[add]", options: ph }, { text: "[add]", options: ph }],
    [{ text: "Quarter total", options: { bold: true } }, { text: "1,109 creatives delivered (Jul–Sep)", options: { colspan: 3, bold: true, color: S.green } }],
  ], {
    x: 6.6, y: 1.5, w: 6.1, colW: [1.9, 1.4, 1.4, 1.4], rowH: 0.62,
    fontSize: 14, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.08,
  });
  placeholderBox(s, 6.6, 4.9, 6.1, 1.8, "Split the creative pivot by month (Jul / Aug / Sep) and add the target for each month. The agenda asks for a month-wise review.", 14);
  s.addNotes("~60 sec. Projects by start month, from the project tracker. July: SBJH Founders Day, VKS Builders, SIP Academy 23-yr, Wewin Coimbatore (all done). August: JMI done; Checkpoint Diagnostic and Xylemx still in progress. September: Wewin Bangalore done. Fill the creatives table from a month-filtered pivot.");

  // ================= 5. KPI SCORECARD =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("KPI scorecard: projection vs. actually done", { placeholder: "title" });
  const kpis = [
    { k: "On-Time Project Delivery", w: "25%", big: "75%", sub: "6 of 8 projects delivered on time", pct: 0.75, c: S.yellow, chipTxt: "Amber", chipColor: S.dark, src: "Source: PixDo / project tracker" },
    { k: "Design & Creatives outcomes", w: "30%", big: "150%", sub: "841 units vs. 561 in retainer scope*", pct: 1, c: S.green, chipTxt: "Green", chipColor: S.white, src: "Source: Branding Team Scrum Tracker" },
  ];
  kpis.forEach((k, i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.5, 3.8, 4.4, { name: "KPI card" });
    chip(s, x + 0.25, 1.85, 1.1, "Weight " + k.w, S.dark);
    s.addText(k.k, { x: x + 0.25, y: 2.3, w: 3.3, h: 0.7, fontSize: 17, bold: true, color: S.dark, margin: 0, valign: "top", isTextBox: true });
    s.addText(k.big, { x: x + 0.25, y: 3.0, w: 2.4, h: 0.95, fontSize: 48, bold: true, color: k.c === S.yellow ? S.orange : S.green, margin: 0, isTextBox: true });
    chip(s, x + 2.55, 3.3, 0.95, k.chipTxt, k.c, k.chipColor);
    s.addText(k.sub, { x: x + 0.25, y: 3.95, w: 3.3, h: 0.55, fontSize: 13, color: S.muted, margin: 0, isTextBox: true });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: 4.65, w: 3.3, h: 0.22, rectRadius: 0.11, fill: { color: S.cream }, line: { color: S.cream, width: 0 }, objectName: "Progress track" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.25, y: 4.65, w: 3.3 * k.pct, h: 0.22, rectRadius: 0.11, fill: { color: k.c }, line: { color: k.c, width: 0 }, objectName: "Progress fill" });
    s.addText(k.src, { x: x + 0.25, y: 5.2, w: 3.3, h: 0.4, fontSize: 11, color: S.muted, italic: true, margin: 0, isTextBox: true });
  });
  card(s, 8.8, 1.5, 3.9, 4.4, { name: "Attendance KPI card" });
  chip(s, 9.05, 1.85, 1.1, "Weight 5%", S.dark);
  s.addText("Attendance / Production days", { x: 9.05, y: 2.3, w: 3.4, h: 0.7, fontSize: 17, bold: true, color: S.dark, margin: 0, valign: "top", isTextBox: true });
  placeholderBox(s, 9.05, 3.05, 3.4, 2.55, "Leave days ÷ total working days, from the PixDo leave report.", 14);
  s.addText("* Scope = TMB, VGN, Star Health, Maxivision, Athmalaya for 3 months. Counts adaptations; the next slide shows why that matters. Score capped at 100% when weighted.", { x: 0.6, y: 6.1, w: 12.1, h: 0.6, fontSize: 11, color: S.muted, italic: true, margin: 0, isTextBox: true });
  s.addNotes("~75 sec. KPI method = projection vs. actually done. On-time: 8 projects in JAS, 6 on time; Checkpoint Diagnostic and Xylemx slipped. Design & Creatives: planned = retainer scope (561 units), done = 841. Upsell, Project Retention and CSAT are deliberately left off this slide. Be ready if asked: 'We start tracking them from OND with a defined source.'");

  // ================= 6. RETAINER DELIVERY =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("Retainer delivery vs. scope: one definition decides it", { placeholder: "title" });
  const G = { fill: { color: HEX.greenLight }, color: S.green, bold: true };
  const A = { fill: { color: HEX.yellowLight }, color: HEX.orangeDeep, bold: true };
  const R = { fill: { color: HEX.redLight }, color: S.red, bold: true };
  const rh = { bold: true, color: S.white, fill: { color: S.green }, align: "center" };
  const num = { align: "center" };
  const retRow = (name, monthly, scope, core, adapt, total, p1, s1, p2, s2) => [
    { text: name, options: { bold: true } }, { text: monthly, options: num }, { text: scope, options: num },
    { text: core, options: num }, { text: adapt, options: num }, { text: total, options: { ...num, bold: true } },
    { text: p1, options: { ...s1, align: "center" } }, { text: p2, options: { ...s2, align: "center" } },
  ];
  s.addTable([
    [{ text: "Retainer", options: { ...rh, align: "left" } }, { text: "Scope / month", options: rh }, { text: "JAS scope", options: rh },
     { text: "Creatives + masters", options: rh }, { text: "Adaptations", options: rh }, { text: "Total", options: rh },
     { text: "% of scope (all)", options: rh }, { text: "% excl. adaptations", options: rh }],
    retRow("TMB Bank", "70", "210", "170", "321", "491", "234%", G, "81%", A),
    retRow("VGN Homes", "35", "105", "112", "19", "131", "125%", G, "107%", G),
    retRow("Star Health", "70 units", "210", "64", "111", "175", "83%", A, "30%", R),
    retRow("Maxivision", "6–10", "18–30", "40", "1", "41", "137%", G, "133%", G),
    retRow("Athmalaya", "2 posts", "6", "3", "0", "3", "50%", R, "50%", R),
    retRow("TVS Credit", "4 newsletters / yr", "~1 newsletter", "58", "0", "58", "confirm unit", ph, "confirm unit", ph),
  ], {
    x: 0.6, y: 1.45, w: 12.1, colW: [1.7, 1.7, 1.45, 1.5, 1.35, 1.0, 1.7, 1.7], rowH: 0.5,
    fontSize: 13, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.06,
  });
  card(s, 0.6, 5.25, 12.1, 1.45, { border: S.orange, borderW: 2, dots: false, name: "Decision callout" });
  iconCircle(s, 0.85, 5.55, 0.8, I.warn, S.orange);
  s.addText([
    { text: "Decide before presenting: do adaptations count toward retainer scope?  ", options: { bold: true, color: S.dark } },
    { text: "If they do, TMB is at 2.3× scope, which may be unbilled over-delivery. If they don't, TMB is under scope at 81% and Star Health at 30%.", options: { color: S.dark } },
  ], { x: 1.9, y: 5.35, w: 10.6, h: 1.25, fontSize: 15, valign: "middle", margin: 0, isTextBox: true });
  s.addNotes("~75 sec. Scope comes from the retainer tracker × 3 months. Delivered = JAS creative pivot by client. Present ONE of the two % columns once the definition is agreed, and delete the other. Athmalaya at 3 of 6 posts is a real shortfall either way. Have the reason ready. Star Health's scope says '70 creative units = 35–40 creatives', so confirm how a unit is counted.");

  // ================= 7. TEAM OUTPUT =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("Team output by type: new concepts sit with one person", { placeholder: "title" });
  card(s, 0.6, 1.5, 7.6, 5.2, { name: "Team chart card" });
  const ppl = ["Ezhumalai", "Gowtham", "Keerthana", "Naresh"];
  s.addChart(pres.charts.BAR, [
    { name: "Master creatives", labels: ppl, values: [5, 70, 6, 23] },
    { name: "Creatives", labels: ppl, values: [101, 118, 91, 199] },
    { name: "Adaptations", labels: ppl, values: [93, 11, 302, 90] },
  ], {
    x: 0.8, y: 1.85, w: 7.2, h: 4.7, barDir: "bar", barGrouping: "stacked",
    chartColors: [HEX.green, HEX.orange, HEX.yellow],
    showTitle: true, title: "Units delivered in JAS, by person and type", titleFontSize: 13, titleColor: HEX.dark, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "ctr", dataLabelColor: HEX.dark, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt",
    showLegend: true, legendPos: "b", legendFontSize: 11, legendFontFace: "+mn-lt", legendColor: HEX.muted,
    catAxisLabelColor: HEX.muted, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", catAxisOrientation: "maxMin",
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  });
  const ins = [
    { n: "67%", t: "of master creatives came from Gowtham (70 of 104). Concept work depends on one person.", c: S.green },
    { n: "76%", t: "of Keerthana's 399 units are adaptations: the high-volume production line.", c: S.orange },
    { n: "199", t: "creatives from Naresh, the most of any designer.", c: S.green },
  ];
  ins.forEach((it, i) => {
    const y = 1.5 + i * 1.8;
    card(s, 8.5, y, 4.2, 1.6, { dots: false, name: "Insight card" });
    s.addText(it.n, { x: 8.75, y: y + 0.2, w: 1.3, h: 1.2, fontSize: 30, bold: true, color: it.c, valign: "middle", margin: 0, isTextBox: true });
    s.addText(it.t, { x: 10.05, y: y + 0.15, w: 2.5, h: 1.3, fontSize: 13, color: S.dark, valign: "middle", margin: 0, isTextBox: true });
  });
  s.addNotes("~60 sec. Totals: Ezhumalai 199, Gowtham 199, Keerthana 399, Naresh 312. Don't rank people by raw volume: a master creative is not equal to an adaptation. If asked for a ranking, use a weighting agreed with leadership beforehand. Key-person risk: name the OND mitigation (e.g., a second designer pairs on concepts).");

  // ================= 8. PROJECTS =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "JAS review" });
  s.addText("Projects in JAS: 6 closed, 2 slipped", { placeholder: "title" });
  const projs = [
    ["Jul", "SBJH Founders Day", "Event collaterals: standee, stage LED, videos", "Completed"],
    ["Jul", "VKS Builders", "Brand logo design & stationery", "Completed"],
    ["Jul", "SIP Academy", "23-year anniversary event collaterals", "Completed"],
    ["Jul", "Wewin Automation", "B-card & event panels, Coimbatore (11)", "Completed"],
    ["Aug", "JMI", "Event posters (10) & 12-page catalogue", "Completed"],
    ["Aug", "Checkpoint Diagnostic", "Re-branding", "Delayed"],
    ["Aug", "Xylemx", "Logo design", "Delayed"],
    ["Sep", "Wewin Automation", "Event panel adaptation, Bangalore (7)", "Completed"],
  ];
  const pRows = [[
    { text: "Month", options: hd }, { text: "Client", options: hd }, { text: "Scope", options: hd }, { text: "Status", options: { ...hd, align: "center" } },
  ]].concat(projs.map(p => [
    { text: p[0], options: { bold: true } }, { text: p[1], options: { bold: true } }, { text: p[2] },
    { text: p[3], options: p[3] === "Completed" ? { ...G, align: "center" } : { ...R, align: "center" } },
  ]));
  s.addTable(pRows, {
    x: 0.6, y: 1.45, w: 7.9, colW: [0.8, 2.1, 3.7, 1.3], rowH: 0.52,
    fontSize: 12, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.06,
  });
  card(s, 8.8, 1.45, 3.9, 2.55, { border: S.red, borderW: 2, name: "Slipped card" });
  s.addText("Why 2 slipped", { x: 9.05, y: 1.75, w: 2.6, h: 0.4, fontSize: 17, bold: true, color: S.dark, margin: 0, isTextBox: true });
  placeholderBox(s, 9.05, 2.25, 3.4, 1.55, "Reason per project (approvals, scope change, inputs) + new close date.", 13);
  card(s, 8.8, 4.2, 3.9, 2.5, { border: S.green, borderW: 2, name: "Pitch card" });
  s.addText("Pitch support (not in the tracker)", { x: 9.05, y: 4.5, w: 3.4, h: 0.4, fontSize: 15, bold: true, color: S.dark, margin: 0, isTextBox: true });
  s.addText("Apollo and DBS pitches: 9 master creatives", { x: 9.05, y: 4.9, w: 3.4, h: 0.4, fontSize: 13, color: S.muted, margin: 0, isTextBox: true });
  placeholderBox(s, 9.05, 5.4, 3.4, 1.1, "Outcome: won / lost / pending", 13);
  s.addNotes("~60 sec. 6 of 8 projects closed. Checkpoint Diagnostic and Xylemx started in August and are still open at the end of October. Give the reason and the new close date, not an apology. The pitch work (Apollo, DBS) used real concept capacity. Say whether it converted.");

  // ================= 9. OND PLAN =================
  pres.addSection({ title: "OND plan" });
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "OND plan" });
  s.addText("OND focus: real-estate AI videos and AI-led creative", { placeholder: "title" });
  const pillars = [
    { h: "Real-estate AI videos", t: "Turn the TVS TVC capability and 3D rendering into AI video offers for real-estate clients.", ic: I.building, c: S.orange },
    { h: "AI-led creative", t: "Use AI tools to speed up concepts and adaptations, and package them as new deliverables.", ic: I.robot, c: S.green },
    { h: "Close & protect", t: "Close Checkpoint, Xylemx and TVS Green; keep every retainer on scope.", ic: I.check, c: S.orange },
  ];
  pillars.forEach((p, i) => {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.45, 3.8, 2.3, { name: "Pillar card" });
    iconCircle(s, x + 0.25, 1.7, 0.6, p.ic, p.c);
    s.addText(p.h, { x: x + 1.0, y: 1.7, w: 2.6, h: 0.6, fontSize: 17, bold: true, color: S.dark, valign: "middle", margin: 0, isTextBox: true });
    s.addText(p.t, { x: x + 0.25, y: 2.45, w: 3.3, h: 1.15, fontSize: 13, color: S.muted, margin: 0, valign: "top", isTextBox: true });
  });
  const oh = { bold: true, color: S.white, fill: { color: S.green }, align: "center" };
  const ondRow = (k) => [{ text: k, options: { bold: true } }, { text: "[add]", options: { ...ph, align: "center" } }, { text: "[add]", options: { ...ph, align: "center" } }, { text: "[add]", options: { ...ph, align: "center" } }];
  s.addTable([
    [{ text: "Target", options: { ...oh, align: "left" } }, { text: "Oct (actual)", options: oh }, { text: "Nov", options: oh }, { text: "Dec", options: oh }],
    ondRow("Real-estate AI videos delivered"),
    ondRow("AI-led creative deliverables"),
    ondRow("Retainer delivery vs. scope"),
    ondRow("On-time project delivery"),
  ], {
    x: 0.6, y: 4.05, w: 12.1, colW: [4.6, 2.5, 2.5, 2.5], rowH: 0.52,
    fontSize: 14, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.08,
  });
  s.addNotes("~75 sec. October is almost over, so the Oct column should be actuals, not a plan. Give each AI target a number and an owner. If there's an ask (tools budget, a hire, a decision on billing TMB's over-scope work), say it here.");

  // ================= 10. THANK YOU =================
  pres.addSection({ title: "Close" });
  s = pres.addSlide({ masterName: "COVER", sectionTitle: "Close" });
  s.addText("Thank you", { x: 1.0, y: 2.2, w: 7, h: 1.4, fontSize: 60, bold: true, color: S.dark, margin: 0, isTextBox: true });
  s.addText("Questions and discussion", { x: 1.0, y: 3.6, w: 7, h: 0.6, fontSize: 22, color: S.muted, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.0, y: 4.5, w: 3.9, h: 0.55, rectRadius: 0.27, fill: { color: S.green }, line: { color: S.green, width: 0 }, objectName: "Team pill" });
  s.addText("Branding Team · JAS 2026", { x: 1.0, y: 4.5, w: 3.9, h: 0.55, fontSize: 15, bold: true, color: S.white, align: "center", valign: "middle", margin: 0, isTextBox: true });
  card(s, 8.4, 1.6, 3.9, 3.7, { border: S.orange, borderW: 3, name: "Team card" });
  iconCircle(s, 9.0, 2.05, 0.8, I.users, S.green);
  s.addText("Ezhumalai\nGowtham\nKeerthana\nNaresh", { x: 9.0, y: 3.0, w: 3.0, h: 2.0, fontSize: 18, bold: true, color: S.dark, margin: 0, valign: "top", paraSpaceAfter: 4, isTextBox: true });
  s.addImage({ data: SQ_GREEN, x: 10.9, y: 5.9, w: 1.6, h: 1.07, altText: "decorative squiggle" });
  s.addNotes("Close on the OND commitments. Supporting data is in the appendix if asked.");

  // ================= 11. APPENDIX: CLIENTS =================
  pres.addSection({ title: "Appendix" });
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "Appendix" });
  s.addText("Appendix: where the 1,109 creatives went", { placeholder: "title" });
  card(s, 0.6, 1.45, 12.1, 5.25, { name: "Client chart card" });
  const cl = ["TMB Bank", "Star Health", "VGN Homes", "TVS Credit", "SIP Academy", "Maxivision", "Wewin", "Teamware", "Pixel", "Grocers", "12 others"];
  s.addChart(pres.charts.BAR, [{ name: "Units", labels: cl, values: [491, 175, 131, 58, 42, 41, 27, 22, 16, 15, 91] }], {
    x: 0.9, y: 1.8, w: 11.5, h: 4.75, barDir: "bar",
    chartColors: [HEX.orange],
    showTitle: true, title: "Total units (masters + creatives + adaptations) by client, JAS 2026", titleFontSize: 13, titleColor: HEX.dark, titleFontFace: "+mn-lt",
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: HEX.dark, dataLabelFontSize: 11, dataLabelFontFace: "+mn-lt",
    showLegend: false, catAxisLabelColor: HEX.muted, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", catAxisOrientation: "maxMin",
    valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
  });
  s.addNotes("Backup only. 12 others: Checkpoint 10, Skylink 13, JMI 12, SBJH 12, TVS Green 12, Rakki 8, DBS pitch 8, VKS 7, Xylemx 4, Athmalaya 3, Care AKPS 1, Apollo pitch 1.");

  // ================= 12. APPENDIX: SOURCES =================
  s = pres.addSlide({ masterName: "TITLE_ONLY", sectionTitle: "Appendix" });
  s.addText("Appendix: KPI definitions and data sources", { placeholder: "title" });
  const sh = { bold: true, color: S.white, fill: { color: S.green } };
  s.addTable([
    [{ text: "KPI", options: sh }, { text: "Weight", options: { ...sh, align: "center" } }, { text: "How it is measured", options: sh }, { text: "Data source", options: sh }],
    [{ text: "On-Time Project Delivery", options: { bold: true } }, { text: "25%", options: num }, { text: "Projects delivered on time ÷ total due × 100" }, { text: "PixDo" }],
    [{ text: "Design & Creatives outcomes", options: { bold: true } }, { text: "30%", options: num }, { text: "Planned deliverables completed ÷ planned × 100" }, { text: "Branding Team Scrum Tracker" }],
    [{ text: "Attendance / Production days", options: { bold: true } }, { text: "5%", options: num }, { text: "Leave availed ÷ total working days × 100" }, { text: "PixDo Leave report" }],
    [{ text: "Retainer scope", options: { bold: true } }, { text: "n/a", options: num }, { text: "Monthly scope per retainer × 3 = JAS projection" }, { text: "Retainer & project tracker" }],
  ], {
    x: 0.6, y: 1.45, w: 12.1, colW: [3.2, 1.2, 4.7, 3.0], rowH: 0.6,
    fontSize: 14, color: S.dark, fill: { color: S.white }, valign: "middle",
    border: { type: "solid", pt: 1, color: HEX.cream }, margin: 0.08,
  });
  placeholderBox(s, 0.6, 4.75, 12.1, 1.3, "Links to the backing reports (PixDo export, Scrum Tracker, creative pivot, leave report), so every number on the KPI slides can be traced.", 14);
  s.addNotes("Covers the agenda item 'Documentation & supporting metrics'. Keep the links ready on the laptop in case someone asks to see the source.");

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("wrote", OUT);
})();
