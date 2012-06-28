ra = {

  handleEnterInQueryField: function (e, ingredient_title) {
    var key = e.keyCode || e.which;
    if (key === 13) {
      $(ingredient_title + "_button").click();
      return false;
    }
    return true;
  },

  removeSynonym: function(hidden_name, ingredient_title, synonym) {
    hidden_box = $(hidden_name);
    synonyms = hidden_box.value.split('|');
    hidden_box.value = synonyms.without(synonym).join('|')
  
    $(ingredient_title + "_" + synonym).style.display = "none";
  },

  addSynonym: function(ingredient_title, synonym) {
    $(ingredient_title + "_query").value = '"' + synonym + '"';
    $(ingredient_title + "_button").click();
  },

  showHideOtherYearGroupBox: function(yearGroupSelectId, otherBoxId, focus) {
    var otherBox = $(otherBoxId);
    var errorParent = ra.errorParentOfNode(otherBox);
    var selectValue = $(yearGroupSelectId).getValue();
    
    if (selectValue === "Other") {
      if (errorParent) {
        errorParent.show();
      }
      otherBox.show();
      if (focus) {
        otherBox.focus();
      }
    } 
    else if (otherBox.visible()) {
      otherBox.hide();
      otherBox.setValue("");
      if (errorParent) {
        errorParent.hide();
      }
    }
  },

  errorParentOfNode: function(node) {
    errorDiv = $(node.parentNode);
    if (errorDiv && errorDiv.hasClassName('fieldWithErrors')) {
      return errorDiv;
    }
    return null;
  },

  popUp: function(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=900,height=800,left = 510,top = 200');");
  },

  show_review_notes_form: function() {
    $('review_notes_display').hide(); 
    $('review_notes_form').show(); 
    $('ra_review_notes').focus();
  },

  hide_review_notes_form: function() {
    if ($('review_notes_text').innerHTML == '') {
      $('review_notes').hide();
      $('add_review_notes_button').show();
    } else {
      $('review_notes_form').hide(); 
      $('review_notes_display').show(); 
    }
  }
}

iFrameFullScreenSizer = function(iframe, heightOffsetRelativeToFittingInCurrentPageLayout, doOnLoad) {
  // derived from http://stackoverflow.com/questions/325273/make-iframe-to-fit-100-of-containers-remaining-height
  
  var pageY = function(elem) {
    return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
  }

  var resize = function() {
    var height = document.documentElement.clientHeight;
    height -= pageY(iframe)+ heightOffsetRelativeToFittingInCurrentPageLayout;
    height = (height < 0) ? 0 : height;
    iframe.style.height = height + 'px';
  };

  iframe.onload = function() { resize(); doOnLoad(); };
  window.onresize = resize;
}
