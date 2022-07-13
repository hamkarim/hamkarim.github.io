window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    macros : {
    RR: "{\\bf R}",
    E: "{\\bf E}",
    F: "{\\bf F}",
    G: "{\\bf G}",
    H: "{\\bf H}",
    calE: "{\\mathcal E}",
    calF: "{\\mathcal F}",
    calG: "{\\mathcal G}",
    calH: "{\\mathcal H}",
    R: "{\\mathbb R}",
    Cc: "{\\mathbb C}",
    bold: ["{\\bf #1}",1],
    bfseries: ["{\\bf{\\text{ #1 }}",1],
    fontbold: ["{\\bf{\\text{ #1 }}}",1],
    Abs: ['\\left\\lvert #2 \\right\\rvert_{\\text{#1}}', 2, ""],
    vect: ["{\\overrightarrow{#1}}",1],
    }
  },
  svg: {
  fontCache: 'global'
    },
  startup: {
    ready: function () {
      MathJax.startup.defaultReady();
      document.getElementById('render').disabled = false;
    }
  }
};
