/* =====================================================================
   Project FIZIKA — Tailwind Play CDN theme configuration
   Shared across every page. Loaded immediately after the Tailwind CDN
   script so utilities like `text-ink`, `font-display`, `bg-paper` work.
   ===================================================================== */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink:        "#16233B", // primary — deep ink navy (text + headings)
        "ink-2":    "#26344F", // softer navy for secondary surfaces
        "ink-3":    "#0F1A2E", // near-black navy for footer / inversions
        paper:      "#F3EBD9", // warm cream — page background (slightly deepened)
        sand:       "#E9DFC8", // panel / card surface
        "sand-2":   "#E1D6BD", // slightly deeper panel
        line:       "#D8CBAF", // hairline borders
        muted:      "#5B5444", // warm gray — secondary text (AA on paper)
        brass:      "#C0902B", // decorative brass / large accents
        "brass-ink":"#8A5E12", // brass dark enough for link/label text
        clay:       "#A8442A", // secondary accent — section markers, hover
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', "system-ui", "-apple-system", "sans-serif"],
        sans:    ['"Hanken Grotesk"', "system-ui", "-apple-system", "sans-serif"],
        mono:    ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        editorial: "78rem",
        prose: "42rem",
      },
      letterSpacing: {
        label: "0.2em",
        wide2: "0.12em",
      },
      boxShadow: {
        editorial: "0 1px 0 0 #E2D7C0, 0 20px 40px -28px rgba(22,35,59,0.30)",
        lift: "0 24px 50px -30px rgba(22,35,59,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
};
