function adjustVertices(graph, cell) {

    // If the cell is a view, find its model.
    cell = cell.model || cell;

    if (cell instanceof joint.dia.Element) {

        _.chain(graph.getConnectedLinks(cell)).groupBy(function(link) {
            // the key of the group is the model id of the link's source or target, but not our cell id.
            return _.omit([link.get('source').id, link.get('target').id], cell.id)[0];
        }).each(function(group, key) {
            // If the member of the group has both source and target model adjust vertices.
            if (key !== 'undefined') adjustVertices(graph, _.first(group));
        });

        return;
    }

    // The cell is a link. Let's find its source and target models.
    var srcId = cell.get('source').id || cell.previous('source').id;
    var trgId = cell.get('target').id || cell.previous('target').id;

    // If one of the ends is not a model, the link has no siblings.
    if (!srcId || !trgId) return;

    var siblings = _.filter(graph.getLinks(), function(sibling) {

        var _srcId = sibling.get('source').id;
        var _trgId = sibling.get('target').id;

        return (_srcId === srcId && _trgId === trgId) || (_srcId === trgId && _trgId === srcId);
    });

    switch (siblings.length) {

    case 0:
        // The link was removed and had no siblings.
        break;

    case 1:
        // There is only one link between the source and target. No vertices needed.
        cell.unset('vertices');
        break;

    default:

        // There is more than one siblings. We need to create vertices.

        // First of all we'll find the middle point of the link.
        var srcCenter = graph.getCell(srcId).getBBox().center();
        var trgCenter = graph.getCell(trgId).getBBox().center();
        var midPoint = g.line(srcCenter, trgCenter).midpoint();

        // Then find the angle it forms.
        var theta = srcCenter.theta(trgCenter);

        // This is the maximum distance between links
        var gap = 20;

        _.each(siblings, function(sibling, index) {

            // We want the offset values to be calculated as follows 0, 20, 20, 40, 40, 60, 60 ..
            var offset = gap * Math.ceil(index / 2);

            // Now we need the vertices to be placed at points which are 'offset' pixels distant
            // from the first link and forms a perpendicular angle to it. And as index goes up
            // alternate left and right.
            //
            //  ^  odd indexes 
            //  |
            //  |---->  index 0 line (straight line between a source center and a target center.
            //  |
            //  v  even indexes
            var sign = index % 2 ? 1 : -1;
            var angle = g.toRad(theta + sign * 90);

            // We found the vertex.
            var vertex = g.point.fromPolar(offset, angle, midPoint);

            sibling.set('vertices', [{ x: vertex.x, y: vertex.y }]);
        });
    }
};



$(function(){//Document ready equivalente a decir $(document).ready(function(){  })
	var stencil_container_selector = '#stencil-container';
	var stencil_toggle_button = '.btn-toggleStencil';
	var paper_container_selector = '#paper-container';
	var inspector_container_selector = "#inspector-container";
	var inspector_toggle_button = '.btn-toggleInspector';

	var showElement = function(element, callback){
		$(element).show(400, 'linear', function(){

			callback(element);
		})
	}
	var hideElement = function(element, callback){
		$(element).hide(400, 'linear', function(){
			callback(element)
			
		})
	}

	var showStencil = function(){
		showElement(stencil_container_selector, function(element){
			$(paper_container_selector).css('bottom', "160px")
			$(stencil_toggle_button).css('bottom', "0px")
			$(stencil_toggle_button).css('height', "170px")
		})
		
	}
	var hideStencil = function(){
		hideElement(stencil_container_selector, function(element){
			$(paper_container_selector).css('bottom', "10px")
			$(stencil_toggle_button).css('bottom', "0px")
			$(stencil_toggle_button).css('height', "18px")

		})
	}
	var toggleStencil = function(){
		var is_visible = $(stencil_container_selector).is(":visible");
		if(is_visible){
			hideStencil()
		}
		else{
			showStencil()
		}
	}
	$(stencil_toggle_button).click(function(){
		toggleStencil()
	})

	var showInspector = function(){
		showElement(inspector_container_selector, function(element){
			$(paper_container_selector).css('right', "267px")
			$(stencil_container_selector).css('right', "267px")
			//
			$(inspector_toggle_button).css('width', '270px')
			$(inspector_toggle_button).css('right', '0px')
		})
		

	}
	var hideInspector = function(){
		hideElement(inspector_container_selector, function(element){
			$(paper_container_selector).css('right', "17px")
			$(stencil_container_selector).css('right', "17px")
			//
			$(inspector_toggle_button).css('width', '16px')
		})
	}
	var toggleInspector = function(){
		var is_visible = $(inspector_container_selector).is(":visible")
		if (is_visible){
			hideInspector()
		}
		else{
			showInspector()
		}
	}
	$(inspector_toggle_button).click(function(){
		toggleInspector()
	})
})
