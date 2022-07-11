// JavaScript Document

/*
 *  /recentposts.js
 *
 *  Copyright (c) 2020
 *
 */


function displayRecentArticles(userOp) {
 var op, maindiv = null, ul = null;
 op = {
  'maxPosts': 5,
  'containerSelector': '#recentposts',
  'loadingText': 'A carregar...',  
  'showpostthumbnails': true, 
  'displaymore': false, 
  'showcommentnum': false, 
  'showpostdate': false, 
  'showpostsummary': false, 
  'numchars': 100, 
  'nothumburl': 'https://lh3.googleusercontent.com/-aZ9hQT-uYcM/UqMLxTpK-8I/AAAAAAAACS0/hOHUdI2aEr4/s400/large%2520%25281%2529.jpg'
 };
 op = $.extend({}, op, userOp);
 
 function showRecentPosts(json, status) {  
  if (json.feed.entry) {
   var entry, posttitle, posturl, commenttext, commenturl;
   
   for (var i = 0; i < op.maxPosts && i < json.feed.entry.length; i++) {
    entry = json.feed.entry[i];
    posttitle = entry.title.$t;
    posturl;
    
    for (var k = 0; k < entry.link.length; k++) {
     if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
      commenttext = entry.link[k].title;
      commenturl = entry.link[k].href;
     }
     if (entry.link[k].rel == 'alternate') {
      posturl = entry.link[k].href;
      break;
     }
    }
     
    // wrapper div
    var div = $("<div class='item-thumbnail-only'></div>");
    
    // thumbnail
    if (op.showpostthumbnails == true) {
     var thumburl = getPostThumbUrl(entry);    
     div.append('<div class="item-thumbnail">' +
      '<a target="_blank" href="' + posturl + '">' + 
      '<img class="recent_thumb" src="' + thumburl + '"/></a></div>');
    }
    
    //url
    div.append('<div class="item-title">' +
     '<a href="' + posturl + '">'+ posttitle +
     '</a></div>');
    
    // content  
    if (op.showpostsummary == true) {
     var postcontent = getPostContent(entry); 
     div.append("<div class='item-snippet'>" + postcontent + "</div>");   
    }
      
    // date
      if (op.showpostdate == true) {
     var date = getPostDate(entry);
     
     div.append("<div class='item-date'>" + date + "</div>")
    }
    // comments
    if (op.showcommentnum == true) {
     var nComments = commenttext.split(" ")[0];
     
     // remove plural in Comments if nComments == 1
     if (nComments == 1) {
      commenttext = '1 Comment';
     }
     
     if (nComments == 0) {
      commenttext = 'No comments';
     }
     
     div.append('<div class="item-comments"><a href="' + commenturl + '" target ="_top">' + commenttext + '</a></div>');   
    }
    
    // show more link
    if (op.displaymore == true) {
     div.append('<a href="' + posturl + '" class="url" target ="_top">more...</a>');    
    }  
    div.append('<div style="clear: both;"></div>');
    ul.append($("<li></li>").append(div)); 
   } 
   
   $('#recent-loading', maindiv).remove();
  }
 }
 
 function getPostContent(entry) {
  var postcontent = "";
  
  if ("content" in entry) {
   var postcontent = entry.content.$t;
  } 
  else {
   if ("summary" in entry) {
    var postcontent = entry.summary.$t;
   } 
  }
  
  var re = /<\S[^>]*>/g;
  postcontent = postcontent.replace(re, "");
   
  // check for max nr of characters allowed
  if (postcontent.length > op.numchars) {
   postcontent = postcontent.substring(0, op.numchars);    
   var quoteEnd = postcontent.lastIndexOf(" ");
   postcontent = postcontent.substring(0, quoteEnd);
   postcontent += '...';
  }
    
  return postcontent;
 }

 function getPostThumbUrl(entry) { 
  var thumburl;
  
  try {
   thumburl = entry.media$thumbnail.url;
  } 
  catch (error) {
   var img = $(entry.content.$t).find("img").first();
   var imgsrc = img.attr("src");
   
   if (imgsrc != "") {
    thumburl = imgsrc;
   } 
   else {   
    thumburl = nothumburl; 
   }
  }
  
  return thumburl;
 }

 function getPostDate(entry) {
  var postdate = entry.published.$t;
  var cdyear = postdate.substring(0, 4);
  var cdmonth = postdate.substring(5, 7);
  var cdday = postdate.substring(8, 10);  
  var monthnames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return cdday + " " + monthnames[parseInt(cdmonth)] + " " + cdyear;   
 }
 
 function initRecentPosts() {
  // get related div
  maindiv = $(op.containerSelector); 
  
  // loading text
  $('<div id="recent-loading">' + op.loadingText + '</div>').appendTo(maindiv);
  
  // create list
  ul = $('<ul></ul>').appendTo(maindiv);
  
  // request recent articles  
  $.ajax({
   url: '/feeds/posts/default/',
   data: {
    'orderby': 'published',
    'max-results': op.maxPostsPerTag,
    'alt': 'json-in-script'
   },
   success: showRecentPosts,
   dataType: 'jsonp',
   cache: true
  });  
 } 
 initRecentPosts();
}