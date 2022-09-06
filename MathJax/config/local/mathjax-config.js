window.MathJax = {
  loader: {
        load: ['[tex]/textmacros', '[tex]/require'],
},
  tex: {
    tags: 'ams',
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    packages: {'[+]': ['textmacros']},
    extensions: ["AMSmath.js", "AMSsymbols.js"],
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
    },
  },
  chtml: {
      scale: 0.85
        },
  /*svg: {
  fontCache: 'global'
},*/
svg: {
      scale: 1,
      linebreaks: { automatic: true },
        },
  /*CommonHTML : {
        scale: 60,
        linebreaks: { automatic: true },
  },*/
  /*startup: {
    ready: function () {
      MathJax.startup.defaultReady();
      document.getElementById('render').disabled = false;
    }
  }*/
};
/* MathJaxConfig = {
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
}; */

/* MathJax.Ajax.loadComplete("https://hamkarim.github.io/MathJax/config/local/mathjax-config.js"); */
