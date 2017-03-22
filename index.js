$(document).ready(function(){
 "use strict";

 $('#keyStyle input').on("click", function(){
  $('#container').attr("data-keyStyle", $(this).val());
 });
 $('#keyRoundness input').on("click", function(){
  $('#container').attr("data-keyRoundness", $(this).val());
 });
 $('#textAlign input').on("click", function(){
  $('#container').attr("data-textAlign", $(this).val());
 });

 $('#colourPicker').on("change", function(){
  $('#colourInput').val($(this).val().replace(/^#/, ""));
 });
 $('#colourInput').on("keydown", function(e){
  if( e.keyCode === 13 ){
   $('#colourPicker').val("#" + $(this).val());
  }
 });
 $('#colourReset').on("click", function(e){
  $('kbd').css("background", "");
 });

 $('#savePNG').on("click", function(){
  domtoimage.toPng(document.getElementById("container"))
   .then(function(blob){
   fetch(blob)
    .then(res => res.blob())
    .then(blob => window.saveAs(blob, "keyboard.png"));
  });
 });
 $('#saveJPG').on("click", function(){
  domtoimage.toJpeg(document.getElementById("container"), { "quality": ($('#JPG_qual').val() / 100) })
   .then(function(blob){
   fetch(blob)
    .then(res => res.blob())
    .then(blob => window.saveAs(blob, "keyboard.jpg"));
  });
 });

 $('kbd').on("click", function(e){
  if( $('#colourToggle').prop("checked") ){
   $(e.target).css("background", $('#colourPicker').val());
  }
 });

 $('#JPG_qual').on("click", function(){
  $('#JPG_qual_num').empty().append($('#JPG_qual').val());
 });

 var keyMap ={};
 //$(document)
 // .on("keydown", function(e){
 // if( !keyMap[e.keyCode] || keyMap[e.keyCode] === undefined ){
 //
 //  /*if(event.ctrlKey){
 //      if(event.ctrlLeft){
 //
 //       console.log('ctrl-left'); 
 //      }else{
 //       console.log('ctrl-right');
 //      }
 //     }else if(event.altKey){
 //      if(event.altLeft){
 //       console.log('alt-left'); 
 //      }else{
 //       console.log('alt-right');
 //      }
 //     }else if(event.shiftKey){
 //      if(event.shiftLeft){
 //       console.log('shift-left'); 
 //      }else{
 //       console.log('shift-right');
 //      }
 //     }else{*/
 //  keyMap[e.keyCode] = true;
 //  if( $("kbd[data-keycode=\"" + e.keyCode + "\"]").attr("data-isPressed") === "true" ){
 //   $("kbd[data-keycode=\"" + e.keyCode + "\"]").attr("data-isPressed", "false");
 //  }else{
 //   $("kbd[data-keycode=\"" + e.keyCode + "\"]").attr("data-isPressed", true);
 //  }
 //  //}
 // }
 // event.preventDefault();
 // event.stopPropagation();
 // return false;
 //})
 // .on("keyup", function(e){
 // if( keyMap[e.keyCode] ){
 //  keyMap[e.keyCode] = false;
 // }
 //});

 $(window).on("contextmenu", function(e){
  return false;
 });
});
