/* <script type="text/x-mathjax-config"> */
  MathJax.Hub.Config({
    TeX: {
          equationNumbers: {autoNumber: "AMS"},
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
    //CommonHTML: { scale: 85},
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
 //   window.MathJax = {
//                tex: {
//                          tags: 'ams'
//                } },
    tex2jax: {
             inlineMath: [ ['$','$'], ["\\(","\\)"] ],
             displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
             processEscapes: true },
             "HTML-CSS": { fonts: ["TeX"],
             linebreaks: { automatic: true } ,
     //scale:90
          },
      CommonHTML: { scale: 70, linebreaks: { automatic: true } },
      //CommonHTML: {scale: 20},
      SVG: { linebreaks: { automatic:true } },
    /*tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true,
      equationNumbers: { autoNumber: "AMS" }
    }*/
  });

MathJax.Ajax.loadComplete("https://hamkarim.github.io/MathJax/config/local/local.js");

//</script> //
