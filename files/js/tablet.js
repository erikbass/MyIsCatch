var grid;
var elementId = 0;

$(function() {
	$('.grid-stack').gridstack({
		float: true,
		static_grid: false,
		auto: true,
		always_show_resize_handle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    	resizable: {
        	handles: 'e, se, s, sw, w'
    	},
    	cell_height: 15,
    	cell_width: 10,
    	vertical_margin: 2,
    	width: 14
	});

	grid = $('.grid-stack').data('gridstack');

	var txtLabel = "";

	$("#tools .element-icon").click(function(event){					
		var element = $(this).data("element");

		var x = 0;
		var y = 0;
		var width = 12;
		var height = 2;
		var auto_position = true;

		if (element == "input"){
			var el = "<div id='element-"+elementId+"' class='element-input'><div class='grid-stack-item-content form-control' data-element-name='Input' ></div></div>";
		} else if (element == "button"){
			var el = "<div id='element-"+elementId+"' class='element-button'><div class='grid-stack-item-content btn btn-default' data-element-name='Button'><span class='text'>Button</span></div></div>";
		} else if (element == "select"){
			var el = "<div id='element-"+elementId+"' class='element-select'><div class='grid-stack-item-content form-control' data-element-name='Select'><span class='glyphicon glyphicon-triangle-bottom pull-right' aria-hidden='true'></span></select></div></div>";
		} else if (element == "radio"){
			var el = "<div id='element-"+elementId+"' class='element-radio'><div class='grid-stack-item-content' data-element-name='Radio'><input type='radio'></div></div>";
		}
		 else if (element == "keyboard"){
			var el = "<div id='element-"+elementId+"' class='element-keyboard'><div class='grid-stack-item-content' data-element-name='Keyboard'><img id='keyboard-img' src='./files/imgs/key-board.png'></div></div>";
			width = 12; height = 10;
		} else if (element == "label") {
			var el = 	"<div id='element-"+elementId+"' class='element-label'>"+
							"<div class='grid-stack-item-content editLabel' data-element-name='Label'>"+
								"<span class='text'>My Label</span>"+
							"</div>"+
						"</div>";
		}

		grid.add_widget($(el), x, y, width, height, auto_position);

		elementId++; 
	});

	$("#elementsArea").on('click', '.grid-stack-item-content',function(event){
		if ($(this).hasClass('element-selected')){
			$(this).removeClass('element-selected');
			$("#sidebar-right #tools-options").hide();
			$("#title-opt-element").text('Select an element');
		} else {
			$("#sidebar-right #tools-options").show();
			$(".element-selected").removeClass('element-selected');
			var ttl = $(this).data('element-name');
			var ttlid = $(this).parent().attr('id');
			$("#title-opt-element").html(ttl + "<br><span id='title-element-id'>" + ttlid + "</span>");
			$(this).addClass('element-selected');	

			//// Label
			if (ttl == "Label"){
				$("#element-txt-edit").show();
				var text = $("#" + ttlid + " .text").text();
				var size = ($("#" + ttlid + " .text").css("font-size").split("p")[0]) / 14;
				$("#element-txt").val(text);
				$("#element-txt").data("lbl-id", ttlid);
				$("#element-txt-size").data("lbl-id", ttlid);
				$("#element-txt-size").val(size);
			} else if (ttl == "Button"){
				$("#element-txt-edit").show();
				var text = $("#" + ttlid + " .grid-stack-item-content").text();
				$("#element-txt").val(text);
				$("#element-txt").data("lbl-id", ttlid);
				$("#element-txt-size").data("lbl-id", ttlid);
			} else {
				$("#element-txt-edit").hide();
			}
		}

		var locked = $(".element-selected").parent().attr('data-gs-locked');

		if (locked == 'yes'){
			$("#text-lock").text("Unlock");
		} else {
			$("#text-lock").text("Lock");
		}

		event.preventDefault();
	});

	$("#sidebar-right").on('click', '#btn-delete', function() {
		var grid = $('.grid-stack').data('gridstack');
		grid.remove_widget($(".element-selected").parent(), true);
		$("#sidebar-right #tools-options").hide();
		$("#title-opt-element").text('Select an element');
	});

/*
	function editClick(){
		var text;
		var id;

		 var showPopover = function () {
        	$(this).popover('show');
    	}, hidePopover = function () {
        	$(this).popover('hide');
    	};

		$(".editLabel button").popover({
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content txtLabel"></div></div>',
			content: "<div class='input-group'>"+
						"<input type='text' class='form-control lblEditing' value=''>"+
				      	"<span class='input-group-btn'>"+
					        "<button class='btn btn-primary' type='button' id='update-label'>OK</button>"+
					    "</span>"+
				    "</div>",
			placement: 'top',
			container: 'body',
			//toggle: 'popover',
			trigger: 'focus click',
			html: true
		});

		$('.editLabel button').on('show.bs.popover', function () {
			id = $(this).parent().parent().attr('id');
			text = $("#"+id+" .text").text();

			var popover = $(this).data('bs.popover');
			var content = "<div class='input-group'>"+
								"<input type='text' id='input-element-"+id+"' class='form-control lblEditing' value='"+ text +"'>"+
						      	"<span class='input-group-btn'>"+
							        "<button class='btn btn-primary' type='button' id='btn-update-label'>OK</button>"+
							    "</span>"+
						    "</div>"
			popover.options.content = content;
		});				

		$('.editLabel button').on('hide.bs.popover', function () {
		  	var txt = $(this).data('bs.popover').$tip.find('.popover-content .lblEditing').val();
		  	$("#"+id+" .text").text(txt);
		});
	}
*/
	$("#sidebar-right").on('click', "#btn-lock", function(){
		var grid = $(".grid-stack").data('gridstack');
		var element = $(".element-selected").parent();
		var locked = $(".element-selected").parent().attr('data-gs-locked');
		
		if (locked == 'yes'){
			grid.locked(element, false);
			grid.movable(element, true);
			grid.resizable(element, true);	
			$("#text-lock").text("Lock");		
		} else {
			grid.locked(element, true);
			grid.movable(element, false);
			grid.resizable(element, false);		
			$("#text-lock").text("Unlock");	
		}	
	});

	$("#element-txt-edit").on("keyup", "#element-txt", function() {
		var lblid = $(this).data("lbl-id");
		$("#"+lblid+" .text").text($(this).val());
	});

	$("#element-txt-edit").on("change keyup", "#element-txt-size", function() {
		var lblid = $(this).data("lbl-id");
		var size = $(this).val() + "em";
		$("#"+lblid+" .text").css("font-size", size);
	});

	$("#sel-mockup").change(function(){
		var optVal = $("#sel-mockup option:selected").val();
		
		var gsw = 12;
		if (optVal == 'smartphone-2') { gsw =  14;}
		else if (optVal == 'tablet') { gsw =  28;}
		else if (optVal == 'desktop') { gsw =  38;}
		$("#elementsArea").attr('data-gs-width', gsw);
		$("#elementsArea").parent().attr('class', optVal);

		grid.grid.width = gsw;
		grid.opts.width = gsw;
		//grid.batch_update();
		//grid.commit();
		console.log(grid);
	});
});