// <script type="text/x-mathjax-config"> //
  MathJax.Hub.Config({
    extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js"],
    jax: ["input/TeX","output/HTML-CSS"],
    TeX: {
        equationNumbers: { autoNumber: "AMS" },
        tagSide: "right",
        Macros: {
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
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    }
  });

MathJax.Ajax.loadComplete("https://hamkarim.github.io/MathJax/config/local/local.js");



//</script> //