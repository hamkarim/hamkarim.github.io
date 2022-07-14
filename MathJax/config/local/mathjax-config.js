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
    PageIndex: ["{"+front+" #1}",1],
    test: ["{"+front+" #1}",1]
    },
    Macros: {
       PageIndex: ["{"+front+" #1}",1],
       test: ["{"+front+" #1}",1]
    },
  },
  svg: {
  fontCache: 'global'
    },
  CommonHTML : {
        /*scale: 90,*/
        linebreaks: { automatic: true },
  },
  startup: {
    ready: function () {
      MathJax.startup.defaultReady();
      document.getElementById('render').disabled = false;
    }
  }
};
window.MathJaxConfig = {
  TeX: {
     macros: {
        PageIndex: ["{"+front+" #1}",1],
        test: ["{"+front+" #1}",1]
     },
     Macros: {
        PageIndex: ["{"+front+" #1}",1],
        test: ["{"+front+" #1}",1]
     },
     SVG: {
        linebreaks: { automatic: true }
     }
  }
};
