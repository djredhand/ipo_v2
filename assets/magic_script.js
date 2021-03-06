
jQuery(document).ready(function($) {
  jQuery(".magic-tabs-wrap").tabs();
  var _tabID = jQuery.getUrlVar('tab_id');
  if(typeof _tabID != 'undefined'){
    _tabID = _tabID - 1; //converts the 1,2,3,etc to 0,1,2,etc
  }else{
    _tabID = 0;
  };
  magic_jscript.initialize_tab(_tabID);
  magic_jscript.tab_hover();
  magic_jscript.set_tab();
});// end doc.ready()

/*
* Start magic_jscript Object
* - require jQuery
*/

var magic_jscript = {
  //Global
  _pos: '',
  lpos:'',

  initialize_tab: function(_tabID){

    magic_jscript._pos = $($('ul.ipv2 li')[_tabID]).position().left
    var tabs = $('ul.magic-tabs li');
    $('.magic-pane').css({display:'none'});
    $($('.magic-pane')[_tabID]).css({display:'block'})
    $($('ul.magic-tabs li')[_tabID]).addClass('ipo_v2_active');
    $($('ul.magic-tabs li')[_tabID])
      .children().trigger('click');
    $('#ipv_arrow').stop().animate({
      marginLeft: magic_jscript._pos + 20
    })
    $($($('.magic-pane')[_tabID]).children('.media-tabs')
      .children().children('a')[0]).trigger('click')
  },
  tab_hover: function(){
    var lpos;
    var offset = 30;
    $('ul.ipv2 li').mouseenter(function(){
      magic_jscript.lpos = jQuery(this).position().left
      $('#ipv_arrow').stop().animate({
        marginLeft:magic_jscript.lpos + offset
      },500, function(){
			magic_jscript.mouse_leave(offset);
		});   
    })//end mouseenter
  },
  mouse_leave: function(offset){
	$('ul.ipv2').mouseleave(function(){
      if(magic_jscript._pos !== magic_jscript.lpos){
        $('#ipv_arrow').stop().animate({
          marginLeft:magic_jscript._pos + offset
        }, {queue:true},{duration:100});
      }
    })//endmouseleave
  },
  set_tab:function(){
     $('ul.ipv2 li').click(function(){
      show_index = $(this).index();
      $($($('.magic-pane')[show_index])
        .children('.media-tabs').children()
        .children('a')[0]).trigger('click')
      $('.magic-pane').css({display:'none'});
      $($('.magic-pane')[show_index]).css({display:'block'})
        magic_jscript._pos = $(this).position().left;
        $('ul.ipv2 li').each(function(){
          $(this).removeClass('ipo_v2_active');
        })
        $(this).toggleClass('ipo_v2_active');
        $('#ipv_arrow').animate({
        marginLeft: 30 + $(this).position().left
      },{queue:true},{duration:100});
     })
  } 
}// end magic_script
