var inspector;

/* GRAPH */

var graph = new joint.dia.Graph({ type: 'bpmn' }).on({

    // this is happening before the view of the model is actually added into the paper
    'add': function(cell, collection, opt) {

        var type = cell.get('type');

        // Set a low z-index on pools and groups so they always stay under all other elements.
        var z = { 'bpmn.Pool': -3, 'bpmn.Group': -2, 'bpmn.Flow': -1 }[type];
        if (z) cell.set('z', z, { silent: true });

        if (!opt.stencil) return;

        // some types of the elements need resizing after they are dropped
        var x = { 'bpmn.Pool': 5, 'bpmn.Choreography': 2 }[type];

        if (cell instanceof joint.shapes.bpmn.Step) {
            cell.set('size', {
                width: 240,
                height: 210
            }, { silent: true });
            cell.setForeignObjectSize(cell, {width: 240, height: 210});
        }

        if (cell instanceof joint.shapes.bpmn.GroupOrganization) {
            cell.set('size', {
                width: 280,
                height: 190
            }, { silent: true });
        }
    }

});

var commandManager = new joint.dia.CommandManager({ graph: this.graph });

/* PAPER + SCROLLER */

joint.ui.Tooltip = Backbone.View.extend({

    className: 'joint-tooltip',

    options: {
        // `left` allows you to set a selector (or DOM element) that
        // will be used as the left edge of the tooltip. This is useful when configuring a tooltip
        // that should be shown "after" some other element. Other sides are analogous.
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
        padding: 10,
        target: undefined,
        rootTarget: undefined
    },

    initialize: function(options) {

    this.options = _.extend({}, _.result(this, 'options'), options || {});

        _.bindAll(this, 'render', 'hide', 'position');

        if (this.options.rootTarget) {
            
            this.$rootTarget = $(this.options.rootTarget);
            
            this.$rootTarget.on('mouseover', this.options.target, this.render);
            this.$rootTarget.on('mouseout', this.options.target, this.hide);
            this.$rootTarget.on('mousedown', this.options.target, this.hide);

        } else {
        
            this.$target = $(this.options.target);
            
            this.$target.on('mouseover', this.render);
            this.$target.on('mouseout', this.hide);
            this.$target.on('mousedown', this.hide);
        }

        this.$el.addClass(this.options.direction);
    },

    remove: function() {

        this.$target.off('mouseover', this.render);
        this.$target.off('mouseout', this.hide);
        this.$target.off('mousedown', this.hide);
        
        Backbone.View.prototype.remove.apply(this, arguments);
    },

    hide: function() {

        Backbone.View.prototype.remove.apply(this, arguments);
    },
    
    render: function(evt) {

        var target;
        var isPoint = !_.isUndefined(evt.x) && !_.isUndefined(evt.y);
        
        if (isPoint) {
            
            target = evt;
            
        } else {

            this.$target = $(evt.target).closest(this.options.target);
            target = this.$target[0];
        }
        
        this.$el.html(_.isFunction(this.options.content) ? this.options.content(target) : this.options.content);
        
        // Hide the element first so that we don't get a jumping effect during the image loading.
        this.$el.hide();
        $(document.body).append(this.$el);

        // If there is an image in the `content`, wait till it's loaded as only after that
        // we know the dimension of the tooltip.
        var $images = this.$('img');
        if ($images.length) {

            $images.on('load', _.bind(function() { this.position(isPoint ? target : undefined); }, this));
            
        } else {

            this.position(isPoint ? target : undefined);
        }
    },

    getElementBBox: function(el) {

        var $el = $(el);
        var offset = $el.offset();
        var bbox;

        // Compensate for the document scroll.
        // Safari uses `document.body.scrollTop` only while Firefox uses `document.documentElement.scrollTop` only.
        // Google Chrome is the winner here as it uses both.
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        
        offset.top -= (scrollTop || 0);
        offset.left -= (scrollLeft || 0);
        
        if (el.ownerSVGElement) {

            // Use Vectorizer to get the dimensions of the element if it is an SVG element.
            bbox = V(el).bbox();

            // getBoundingClientRect() used in jQuery.fn.offset() takes into account `stroke-width`
            // in Firefox only. So clientRect width/height and getBBox width/height in FF don't match.
            // To unify this across all browsers we add the `stroke-width` (left & top) back to
            // the calculated offset.
            var crect = el.getBoundingClientRect();
            var strokeWidthX = (crect.width - bbox.width) / 2;
            var strokeWidthY = (crect.height - bbox.height) / 2;

            // The `bbox()` returns coordinates relative to the SVG viewport, therefore, use the
            // ones returned from the `offset()` method that are relative to the document.
            bbox.x = offset.left + strokeWidthX;
            bbox.y = offset.top + strokeWidthY;
            
        } else {
            
            bbox = { x: offset.left, y: offset.top, width: $el.outerWidth(), height: $el.outerHeight() };
        }

        return bbox;
    },

    position: function(p) {

        var bbox;

        if (p) {
            
            bbox = { x: p.x, y: p.y, width: 1, height: 1 };
            
        } else {

            bbox = this.getElementBBox(this.$target[0]);            
        }
        
        var padding = this.options.padding;

        // Show the tooltip. Do this before we ask for its dimension, otherwise they won't be defined yet.
        this.$el.show();
        
        var height = this.$el.outerHeight();
        var width = this.$el.outerWidth();
        
        // If `options.left` selector or DOM element is defined, we use its right coordinate
        // as a left coordinate for the tooltip. In other words, the `options.left` element
        // is on the left of the tooltip. This is useful when you want to tooltip to
        // appear "after" a certain element.
        if (this.options.left) {

            var $left = $(_.isFunction(this.options.left) ? this.options.left(this.$target[0]) : this.options.left);
            var leftBbox = this.getElementBBox($left[0]);
            this.$el.css({
                left: leftBbox.x + leftBbox.width + padding,
                top: bbox.y + bbox.height/2 - height/2
            });
            
        } else if (this.options.right) {

            var $right = $(_.isFunction(this.options.right) ? this.options.right(this.$target[0]) : this.options.right);
            var rightBbox = this.getElementBBox($right[0]);
            this.$el.css({
                left: rightBbox.x - width - padding,
                top: bbox.y + bbox.height/2 - height/2
            });

        } else if (this.options.top) {

            var $top = $(_.isFunction(this.options.top) ? this.options.top(this.$target[0]) : this.options.top);
            var topBbox = this.getElementBBox($top[0]);
            this.$el.css({
                top: topBbox.y + topBbox.height + padding,
                left: bbox.x + bbox.width/2 - width/2
            });

        } else if (this.options.bottom) {

            var $bottom = $(_.isFunction(this.options.bottom) ? this.options.bottom(this.$target[0]) : this.options.bottom);
            var bottomBbox = this.getElementBBox($bottom[0]);
            this.$el.css({
                top: bottomBbox.y - height - padding,
                left: bbox.x + bbox.width/2 - width/2
            });
            
        } else {

            this.$el.css({
                left: bbox.x + bbox.width + padding,
                top: bbox.y + bbox.height/2 - height/2
            });
        }
    }
});


joint.shapes.bpmn.StepLink = joint.dia.Link.extend({

    defaults: {

        type: "bpmn.StepLink",

        attrs: {

            '.marker-source': {
                d: 'M 0 0'
            },
            '.marker-target': {
                d: 'M 12 -2 L 0 5 L 12 12 z',
                stroke: '#4A90E2', 
                fill: '#4A90E2'
            },
            '.connection': {
                'stroke-dasharray': ' ',
                stroke: '#4A90E2', 
                'stroke-width': 1
            },
            '.connection-wrap': {
                style: '',
                onMouseOver: '',
                onMouseOut: ''
            }
        },

        description: '',

        flowType: "normal"
    },

    initialize: function() {

        joint.dia.Link.prototype.initialize.apply(this, arguments);

        this.setTooltip();

        this.listenTo(this, 'change:description', this.setTooltip);
    },

    tooltip: {},

    setTooltip: function() {
        if (this.tooltip instanceof joint.ui.Tooltip) this.removePreviousTooltip();
        this.tooltip = new joint.ui.Tooltip({
            target: ' [model-id="' + this.id + '"]',
            content: this.attributes.description,
            bottom: '.connection-wrap',
            direction: 'bottom',
            padding: 30
        });
    },

    removePreviousTooltip: function() {
        this.tooltip.remove()
    }

});

var paper = new joint.dia.Paper({
    width: 4000,
    height: 1000,
    model: graph,
    gridSize: 45,
    model: graph,
    perpendicularLinks: true,
    // defaultLink: new joint.shapes.bpmn.Flow,
    defaultLink: new joint.shapes.bpmn.StepLink,
    validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {

        // don't allow loop links
        if (cellViewS == cellViewT) return false;

        var view = (end === 'target' ? cellViewT : cellViewS);

        // don't allow link to link connection
        if (view instanceof joint.dia.LinkView) return false;

        return true;
    }

}).on({

    'blank:pointerdown': function(evt,x,y) {

        if (_.contains(KeyboardJS.activeKeys(), 'shift')) {
            selectionView.startSelecting(evt, x, y);
        } else {
            selectionView.cancelSelection();
            paperScroller.startPanning(evt, x, y);
        }
    },

    'cell:pointerdown': function(cellView, evt) {

        // Select an element if CTRL/Meta key is pressed while the element is clicked.
        if ((evt.ctrlKey || evt.metaKey) && cellView.model instanceof joint.dia.Element) {
            selection.add(cellView.model);
            selectionView.createSelectionBox(cellView);
        }

        var cell = cellView.model;

        if (cell.get('parent')) {
            graph.getCell(cell.get('parent')).unembed(cell);
        }
    },

    'cell:pointerup': function(cellView) {

        embedInPool(cellView.model);
        openIHF(cellView);
    }

});

var paperScroller = new joint.ui.PaperScroller({
    autoResizePaper: true,
    padding: 50,
    paper: paper
});

paperScroller.$el.appendTo('#paper-container');

paperScroller.center();

/* SELECTION */

var selection = (new Backbone.Collection).on({

    'reset': function(cells, opt) {

        if (opt.safe) return;

        // don't allow any pool to be selected by area selection
        var pools = cells.filter(function(cell) {
            return (cell instanceof joint.shapes.bpmn.Pool);
        });

        if (!_.isEmpty(pools)) {

            cells.reset(cells.without.apply(cells, pools), { safe: true });

            _.chain(pools).map(paper.findViewByModel, paper).filter()
                .map(selectionView.destroySelectionBox, selectionView);
        }
    }
});

var selectionView = new joint.ui.SelectionView({
    paper: paper,
    graph: graph,
    model: selection
}).on({
    'selection-box:pointerdown': function(evt) {
        // Unselect an element if the CTRL/Meta key is pressed while a selected element is clicked.
        if (evt.ctrlKey || evt.metaKey) {
            var cell = selection.get($(evt.target).data('model'));
            selection.reset(selection.without(cell));
            selectionView.destroySelectionBox(paper.findViewByModel(cell));
        }
    }
});

/* STENCIL */

var stencil = new joint.ui.Stencil({ graph: graph, paper: paper });

stencil.render().$el.appendTo('#stencil-container');



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Icons

joint.shapes.bpmn.icons = {

    none: '',

    message: 'https://googledrive.com/host/0B6QQVPLH_F8Xck14OEtVN0dTYXM/icon-org.svg',

    cross: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yMi4yNDUsNC4wMTVjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjEzOWwtNi4yNzYsNi4yN2MtMC4zMTMsMC4zMTItMC4zMTMsMC44MjYsMCwxLjE0bDYuMjczLDYuMjcyICBjMC4zMTMsMC4zMTMsMC4zMTMsMC44MjYsMCwxLjE0bC0yLjI4NSwyLjI3N2MtMC4zMTQsMC4zMTItMC44MjgsMC4zMTItMS4xNDIsMGwtNi4yNzEtNi4yNzFjLTAuMzEzLTAuMzEzLTAuODI4LTAuMzEzLTEuMTQxLDAgIGwtNi4yNzYsNi4yNjdjLTAuMzEzLDAuMzEzLTAuODI4LDAuMzEzLTEuMTQxLDBsLTIuMjgyLTIuMjhjLTAuMzEzLTAuMzEzLTAuMzEzLTAuODI2LDAtMS4xNGw2LjI3OC02LjI2OSAgYzAuMzEzLTAuMzEyLDAuMzEzLTAuODI2LDAtMS4xNEwxLjcwOSw1LjE0N2MtMC4zMTQtMC4zMTMtMC4zMTQtMC44MjcsMC0xLjE0bDIuMjg0LTIuMjc4QzQuMzA4LDEuNDE3LDQuODIxLDEuNDE3LDUuMTM1LDEuNzMgIEwxMS40MDUsOGMwLjMxNCwwLjMxNCwwLjgyOCwwLjMxNCwxLjE0MSwwLjAwMWw2LjI3Ni02LjI2N2MwLjMxMi0wLjMxMiwwLjgyNi0wLjMxMiwxLjE0MSwwTDIyLjI0NSw0LjAxNXoiLz48L3N2Zz4=',

    user: 'https://googledrive.com/host/0B6QQVPLH_F8Xck14OEtVN0dTYXM/icon-user.svg',

    circle: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gULEBE3DEP64QAAAwlJREFUaN7dmktrU0EUx38ZmmBbfEIL2hSjkYKC1EW6EDFudC+404/gE6WKSvGxERQfIH4AX1T9EOKrCrYurVrbgsZWoaBVixDbpC6ci+Fyz9ybZG478cBs7syc+Z+5c86c+c8ksCPrgW1ADtgEbARafG1+AW+AYWAIGADGWUTZAJwHxoD5GssocA7ILiTwLcADoFQHcH8pAfeB7jiBtwO3gLJF4P5S1mO02wa/C5iMEbi/TAI7bYE/Y3m5VLOs+sLAJULqrgKHIxhZBp4DT4FX2jkLGoinq1M7fg7YDmwFVATd14CjFboiy5UIs/QBOAmka/izaeCU1hE2zuVqlZ8IUfgVOAA0WViiTcBBrdM0Zm9UhTuAOYOiRzXOeJh0Ak8M484B+TAlK4BPBiU3gWSMoTqpw6g0fgFYblJww9D5dojT25IEcMeA47rUsdsQLp9FmPmURSNSOqpJS2lzUKd+ocN3IBNx5mz+oXXADwHTXX/jjMFxjy1iwtgrYJoF1lY27BMafozZaaMspYKA7XRlw7f1xt4Y5biA7bXXIGv4TW0OGNCmsQRhzCidlwTJADDlgAFTwAuhLq+AHqHyMe6IhKVHAV1C5ZBDBkhYupThPPreIQNGJTJBGXKLLw4Z8NmQu/Fb8PCkQwakBIxFRWPLvAJmhMpWh4AuFb7PKGBaqFzjkAGrhe/TSjNrQZJ1yAAJy5gCRoTKnEMGSFhGFDBoOBu7IhKWQe8wLRFLHQ6A7zCcFNNK59vvAjoqYK8DBuwTCLBhTUD8Hweahj9S2jjU297VqzrU26BVmi2yEjXRKg1PbHnpqYla7AeWxAi+GbhHHdSit2mYyN2XQQ5kQTJ6Y6qL3PUkCr2+H7v0+jcs0eueRLngGNeKa9mxY73g8JzpEtHusorAQ/7e+e7WUWIl//jSVTrK7QEu6KgW9d7tYr3B44iBWPJfkZZ8pZ4r2VngkC0HywMTLNwN5YSBcKtZWoGzernEBbyox2iJc6Np2KcGfnHisYet1CDouc2yCjbhp07MrD+3+QNxi4JkAscRswAAAABJRU5ErkJggg=='

};

joint.shapes.bpmn.Step = joint.shapes.basic.Generic.extend({
    markup: ['<g class="rotatable"><g class="scalable"><rect/></g><switch>',

             // if foreignObject supported

             // '<foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class="title">',
             // '<body xmlns="http://www.w3.org/1999/xhtml"><div/></body>',
             // '</foreignObject>',
             '<foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class="fobj">',
             '<body xmlns="http://www.w3.org/1999/xhtml"><div/></body>',
             '</foreignObject>',

             // else foreignObject is not supported (fallback for IE)
             // '<text class="content"/>',

             '</switch></g>'].join(''),

    defaults: joint.util.deepSupplement({

        size: { width: 240, height: 210 },
        type: 'bpmn.Step',

        // see joint.css for more element styles
        attrs: {
            rect: {
                fill: '#ffffff',
                stroke: '#E9E9E9',
                width: 240,
                height: 210
            },
            text: {
                fill: '#000000',
                ref: '.inner', 
                 'ref-x': .5, 'ref-dy': -25,
                'x-alignment': 'right', 'y-alignment': 'top'
            },
            '.content': {
                text: '',
                ref: 'rect',
                'ref-x': .5,
                'ref-y': .5,
                'y-alignment': 'middle',
                'x-alignment': 'middle'
            }
        },

        content: '',
        title: ''

    }, joint.shapes.basic.Generic.prototype.defaults),

    initialize: function() {

        if (typeof SVGForeignObjectElement !== 'undefined') {

            // foreignObject supported
            this.setForeignObjectSize(this, this.get('size'));
            this.setDivContent(this, this.get('content'));
            this.setDivContent(this, this.get('title'));
            this.listenTo(this, 'change:size', this.setForeignObjectSize);
            this.listenTo(this, 'change:content', this.setDivContent);
            this.listenTo(this, 'change:title', this.setDivContent);

        }

        joint.shapes.basic.Generic.prototype.initialize.apply(this, arguments);
    },

    setForeignObjectSize: function(cell, size) {

        // Selector `foreignObject' doesn't work accross all browsers, we'r using class selector instead.
        // We have to clone size as we don't want attributes.div.style to be same object as attributes.size.
        cell.attr({
            '.fobj': _.clone(size),
            div: { style: _.clone(size) }
        });
    },


    setDivContent: function(cell, content) {
        var titleDiv = document.createElement("div"); 
        var titleText = document.createTextNode(this.get("title"));
            titleDiv.appendChild(titleText);
            titleDiv.classList.add("step-title");
        
        var contentDiv = document.createElement("div"); 
        var the_content = this.get("content");
        var contentText = document.createTextNode(the_content.substring(0,150));
            contentDiv.appendChild(contentText);
            contentDiv.classList.add("step-content");

        var view_more_div = document.createElement("div"); 
        var view_more_link = '';
        var main_modal = '';
        if( the_content.length > 150 )
        {
            var view_more_link = document.createElement("a"); 
                view_more_link.innerHTML = 'ver más';
                view_more_link.setAttribute('href','#');
                view_more_link.setAttribute('data-toggle', "modal");
                view_more_link.setAttribute('data-target', "#myModal"+this.cid);
            view_more_div.appendChild(view_more_link) ;
            ///el modal
            var main_modal = document.createElement('div');
                main_modal.setAttribute('id', "myModal"+this.cid);
                main_modal.setAttribute('tabindex', "-1");
                main_modal.setAttribute('role', "dialog");
                main_modal.setAttribute('aria-labelledby', "myModalLabel");
                main_modal.setAttribute('aria-hidden', "true");
                main_modal.className = 'modal fade';

            var main_modal_dialog = document.createElement('div');
                main_modal_dialog.className = 'modal-dialog';

            var main_modal_content = document.createElement('div');
                main_modal_content.className = 'modal-content';

            var main_modal_header = document.createElement('div');
                main_modal_header.className = 'modal-header';

            var main_modal_header_button = document.createElement('button');
                main_modal_header_button.setAttribute('data-dismiss',"modal");
            var main_modal_header_button_span_one = document.createElement('span');
                main_modal_header_button_span_one.setAttribute('aria-hidden', "true");
                main_modal_header_button_span_one.innerHTML = '&times;';
            var main_modal_header_button_span_two = document.createElement('span');
                main_modal_header_button_span_two.className = 'sr-only';
                main_modal_header_button_span_two.innerHTML = 'Close;';
            var main_modal_header_h4 = document.createElement('h4');
                main_modal_header_h4.setAttribute('id','myModalLabel');
                main_modal_header_h4.className = 'modal-title';
                main_modal_header_h4.innerHTML = this.get("title");

            main_modal_header_button.appendChild(main_modal_header_button_span_one);
            main_modal_header_button.appendChild(main_modal_header_button_span_two);
            
            main_modal_header.appendChild(main_modal_header_button);
            main_modal_header.appendChild(main_modal_header_h4);


            var main_modal_body = document.createElement('div');
                main_modal_body.className = 'modal-body';
                main_modal_body.innerHTML = the_content;
            
            main_modal_content.appendChild(main_modal_header);
            main_modal_content.appendChild(main_modal_body);

            main_modal_dialog.appendChild(main_modal_content);
            main_modal.appendChild(main_modal_dialog);
            document.body.appendChild(main_modal);
            //fin del modal
        }

        //console.log( contentText.length );
        // Append the content to div as html.
        cell.attr(
            { div :
                // {html: this.get('title')+ this.get('content')}
                // {html: "<div>"+ this.get('title') +"</div>"+"<div>"+ this.get('content') +"</div>"}
                {html: titleDiv.outerHTML + contentDiv.outerHTML + view_more_div.outerHTML  }
            }
        );
    }

});

joint.shapes.bpmn.StepView = joint.shapes.basic.TextBlockView;

joint.shapes.bpmn.External = joint.shapes.bpmn.Step.extend({
    defaults: joint.util.deepSupplement({

        type: 'bpmn.External',

        // see joint.css for more element styles
        attrs: {
            rect: {
                fill: '#EAF4FD',
                stroke: '#C2DFF7',
                width: 240 ,
                height: 210
            },
            text: {
                fill: '#000000',
                'font-size': 14,
                'font-family': 'Arial, helvetica, sans-serif'
            },
            '.content': {
                text: '',
                ref: 'rect',
                'ref-x': .5,
                'ref-y': .5,
                'y-alignment': 'middle',
                'x-alignment': 'middle'
            }
        },

        content: '',
        title: ''

    }, joint.shapes.basic.Generic.prototype.defaults),
});

joint.shapes.bpmn.Intervention = joint.shapes.bpmn.Step.extend({
    defaults: joint.util.deepSupplement({

        type: 'bpmn.Intervention',

        // see joint.css for more element styles
        attrs: {
            rect: {
                fill: '#FFF6E8',
                stroke: '#FFDCA3',
                width: 240,
                height: 210
            },
            text: {
                fill: '#000000',
                'font-size': 14,
                'font-family': 'Arial, helvetica, sans-serif'
            },
            '.content': {
                text: '',
                ref: 'rect',
                'ref-x': .5,
                'ref-y': .5,
                'y-alignment': 'middle',
                'x-alignment': 'middle'
            }
        },

        content: '',
        title: ''

    }, joint.shapes.basic.Generic.prototype.defaults),
});

joint.shapes.bpmn.Person = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g><circle class="body outer"/><circle class="body inner"/><image/></g><text class="label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'bpmn.Person',
        size: { width: 60, height: 60 },
        attrs: {
            '.body': {
                fill: '#ffffff',
                stroke: '#0091EA'
            },
            '.outer': {
                'stroke-width': 1, r:20,
                transform: 'translate(30,30)'
            },
            '.inner': {
                'stroke-width': 1, r: 16,
                transform: 'translate(30,30)'
            },
            image: {
                width:  20, height: 20, 'xlink:href': '', transform: 'translate(20,20)'
            },
            '.label': {
                text: '',
                fill: '#000000',
                ref: '.outer', 'ref-x': .5, 'ref-dy': 20,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        },
        eventType: "start",
        icon: 'user'

    }, joint.dia.Element.prototype.defaults),

    initialize: function() {

        joint.dia.Element.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:name', this.setTooltip);
        this.listenTo(this, 'change:pos', this.setTooltip);
        this.listenTo(this, 'change:description', this.setTooltip);
    },

    tooltip: {},

    setTooltip: function() {
        if (this.tooltip instanceof joint.ui.Tooltip) this.removePreviousTooltip();
        var div = document.createElement("div"); 
        div.className = 'tooltip-content';
        var name = document.createElement("div");
        name.className = 'tooltip-strong';
        name.appendChild(document.createTextNode(this.get('name') || ''));
        var pos = document.createElement("div").appendChild(document.createTextNode(this.get('pos') || ''));
        var description = document.createElement("div").appendChild(document.createTextNode(this.get('description') || ''));
        description.className = 'tooltip-text';
        div.appendChild(name);
        div.appendChild(description);
        this.tooltip = new joint.ui.Tooltip({
            target: ' [model-id="' + this.id + '"]',
            content: div.innerHTML,
            bottom: ' [model-id="' + this.id + '"]',
            direction: 'bottom',
            padding: 20
        });
    },

    removePreviousTooltip: function() {
        this.tooltip.remove()
    },

}).extend(joint.shapes.bpmn.IconInterface);


joint.shapes.bpmn.Organization = joint.shapes.bpmn.Person.extend({

    defaults: joint.util.deepSupplement({

        type: 'bpmn.Organization',
        size: { width: 60, height: 60 },
        attrs: {
            '.body': {
                fill: '#ffffff',
                stroke: '#0091EA'
            },
            '.outer': {
                'stroke-width': 1, r:20,
                transform: 'translate(30,30)'
            },
            '.inner': {
                'stroke-width': 1, r: 16,
                transform: 'translate(30,30)'
            },
            image: {
                width:  20, height: 20, 'xlink:href': '', transform: 'translate(20,20)'
            },
            '.label': {
                text: '',
                fill: '#000000',
                ref: '.outer', 'ref-x': .5, 'ref-dy': 20,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        },
        eventType: "start", 
        icon: 'message'

    }, joint.dia.Element.prototype.defaults),

    initialize: function() {

        joint.dia.Element.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:name', this.setTooltip);
        this.listenTo(this, 'change:parent', this.setTooltip);
        this.listenTo(this, 'change:description', this.setTooltip);
    },

    setTooltip: function() {
        if (this.tooltip instanceof joint.ui.Tooltip) this.removePreviousTooltip();
        var div = document.createElement("div"); 
        div.className = 'tooltip-content';
        var name = document.createElement("div");
        name.className = 'tooltip-strong';
        name.appendChild(document.createTextNode(this.get('name') || ''));
        var parent = document.createElement("div").appendChild(document.createTextNode(this.get('parent') || ''));
        var description = document.createElement("div").appendChild(document.createTextNode(this.get('description') || ''));
        description.className = 'tooltip-text';
        div.appendChild(name);
        div.appendChild(description);
        this.tooltip = new joint.ui.Tooltip({
            target: ' [model-id="' + this.id + '"]',
            content: div.innerHTML,
            bottom: ' [model-id="' + this.id + '"]',
            direction: 'bottom',
            padding: 20
        });
    },

});

joint.shapes.bpmn.GroupOrganization = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect class="body"/></g><rect class="label-rect"/><g class="label-group"><svg overflow="hidden" class="label-wrap"><text class="label"/></svg></g></g>',

    defaults: joint.util.deepSupplement({

        type: 'bpmn.GroupOrganization',
        size: {
            width: 200,
            height: 200
        },
        attrs: {
            '.body': {
                width: 200,
                height: 200,
                stroke: '#000000',
                'stroke-dasharray': '6,6',
                'stroke-width': 2,
                fill: 'transparent',
                rx: 5,
                ry: 5,
                'pointer-events': 'stroke'
            },
            '.label-rect': {
                ref: '.body',
                'ref-width': 0.6,
                'ref-x': 0.38,
                'ref-y': 5,
                rx: 2,
                ry: 2,
                height: 20,
                fill: '#ffffff',
                stroke: '#000000'
            },
            '.label-group': {
                ref: '.label-rect',
                'ref-x': 0,
                'ref-y': 0
            },
            '.label-wrap': {
                ref: '.label-rect',
                'ref-width': 1,
                'ref-height': 1
            },
            '.label': {
                text: '',
                x: '50%',
                dy: 5,
                'text-anchor': 'middle',
                'font-family': 'Arial',
                'font-size': 13,
                fill: '#000000'
            }
        }

    }, joint.dia.Element.prototype.defaults)
});


stencil.load([
    new joint.shapes.bpmn.Step,
    new joint.shapes.bpmn.External,
    new joint.shapes.bpmn.Intervention,
    new joint.shapes.bpmn.Person,
    new joint.shapes.bpmn.Organization,
    // new joint.shapes.bpmn.Annotation,
    new joint.shapes.bpmn.GroupOrganization({
        attrs: {
            '.label': { text: 'Organization' }
        }
    }),
]);

joint.layout.GridLayout.layout(stencil.getGraph(), {
    columns: 5,
    columnWidth: 53,
    rowHeight: 60,
    dy: 5,
    dx: 10,
    resizeToFit: true
});

stencil.getPaper().fitToContent(0, 0, 10);

// Create tooltips for all the shapes in stencil.
stencil.getGraph().get('cells').each(function(cell) {
    new joint.ui.Tooltip({
        target: '.stencil [model-id="' + cell.id + '"]',
        //hack for getting the type without the bpmn
        content: cell.get('type').split(".")[1],
        bottom: '.stencil',
        direction: 'bottom',
        padding: 0
    });
});

/* CELL ADDED: after the view of the model was added into the paper */
graph.on('add', function(cell, collection, opt) {

    // TODO: embedding after an element is dropped from the stencil. There is a problem with
    // the command manager and wrong order of actions (embeding, parenting, adding and as it
    // must be 3,1,2) in one batch. Can't be done silently either (becoming an attribute
    // of an element being added) because redo action of `add` (=remove) won't reset the parent embeds.
    // --embedInPool(cell);

    $.ajax({
        type: "PUT",
        dataType: 'json',
        url: document.URL,
        contentType: "application/json",
        data: JSON.stringify({sandbox: {graph_data: JSON.stringify(graph.toJSON())}}),
        beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    });

    if (!opt.stencil) return;
    
    // open inspector after a new element dropped from stencil
    var view = paper.findViewByModel(cell);
    if (view) openIHF(view);
});

/* KEYBOARD */

KeyboardJS.on('delete, backspace', function(evt) {

    if (!$.contains(evt.target, paper.el)) return;

    commandManager.initBatchCommand();
    selection.invoke('remove');
    commandManager.storeBatchCommand();
    selectionView.cancelSelection();
});

// Disable context menu inside the paper.

// This prevents from context menu being shown when selecting individual elements with Ctrl in OS X.
paper.el.oncontextmenu = function(evt) { evt.preventDefault(); };


$('#toolbar-container [data-tooltip]').each(function() {

    new joint.ui.Tooltip({
        target: $(this),
        content: $(this).data('tooltip'),
        top: '#toolbar-container',
        direction: 'top'
    });
});

function openIHF(cellView) {
        // No need to re-render inspector if the cellView didn't change.
        if (!inspector || inspector.options.cellView !== cellView) {

            if (inspector) {
                // Clean up the old inspector if there was one.
                inspector.remove();
            }

            var type = cellView.model.get('type');

            inspector = new joint.ui.Inspector({
                cellView: cellView,
                inputs: inputs[type],
                groups: {
                    general: { label: type, index: 1 },
                    appearance: { index: 2 }
                }
            });

            $('#inspector-container').prepend(inspector.render().el);
        }

        if (!selection.contains(cellView.model)) {
            if (cellView.model instanceof joint.dia.Element && !( cellView.model instanceof joint.shapes.bpmn.GroupOrganization)) {

                // new joint.ui.FreeTransform({ cellView: cellView }).render();

                var halo = new joint.ui.Halo({
                    cellView: cellView,
                    boxContent: function(cellView) {
                        return cellView.model.get('type');
                    }
                });
                halo.render();
                halo.removeHandle('resize');
                halo.removeHandle('rotate');
                halo.removeHandle('clone');
                halo.removeHandle('unlink');
                halo.changeHandle('link', { position: 'se' });
                halo.changeHandle('fork', { position: 's' });

                selectionView.cancelSelection();
                selection.reset([cellView.model], { safe: true });
            }
            else if (cellView.model instanceof joint.shapes.bpmn.GroupOrganization) {

                new joint.ui.FreeTransform({ cellView: cellView }).render();

                var halo = new joint.ui.Halo({
                    cellView: cellView,
                    boxContent: function(cellView) {
                        return cellView.model.get('type');
                    }
                });
                halo.render();
                halo.removeHandle('resize');
                halo.removeHandle('rotate');
                halo.removeHandle('clone');
                halo.removeHandle('unlink');
                halo.changeHandle('link', { position: 'se' });
                halo.changeHandle('fork', { position: 's' });

                selectionView.cancelSelection();
                selection.reset([cellView.model], { safe: true });
            }
        }
}

function embedInPool(cell) {

    if (cell instanceof joint.dia.Link) return;

    var cellsBelow = graph.findModelsInArea(cell.getBBox());

    if (!_.isEmpty(cellsBelow)) {
        // Note that the findViewsFromPoint() returns the view for the `cell` itself.
        var cellBelow = _.find(cellsBelow, function(c) {
            return (c instanceof joint.shapes.bpmn.Pool) && (c.id !== cell.id);
        });

        // Prevent recursive embedding.
        if (cellBelow && cellBelow.get('parent') !== cell.id) {
            cellBelow.embed(cell);
        }
    }
}

function showStatus(message, type) {

    $('.status').removeClass('info error success').addClass(type).html(message);
    $('#statusbar-container').dequeue().addClass('active').delay(3000).queue(function() {
        $(this).removeClass('active');
    });
};

var toolbar = {

    toJSON: function() {

        var windowFeatures = 'menubar=no,location=no,resizable=yes,scrollbars=yes,status=no';
            var windowName = _.uniqueId('json_output');
            var jsonWindow = window.open('', windowName, windowFeatures);

        jsonWindow.document.write(JSON.stringify(graph.toJSON()));
    },

    loadGraph: function() {

        gd_auth(function() {

            showStatus('loading..', 'info');
            gd_load(function(name, content) {
                try {
                    var json = JSON.parse(content);
                    graph.fromJSON(json);
                    document.getElementById('fileName').value = name.replace(/.json$/, '');
                    showStatus('loaded.', 'success');
                } catch (e) {
                    showStatus('failed.', 'error');
                }
            });

        }, true);
    },

    saveGraph: function() {
        $.ajax({
            type: "PUT",
            dataType: 'json',
            url: document.URL,
            contentType: "application/json",
            data: JSON.stringify({sandbox: {graph_data: JSON.stringify(graph.toJSON())}}),
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
        });
    }
};



$(function () {

    var graph_data_json = $("#graph_data").html();
    var graph_data     = $.parseJSON(graph_data_json);

    graph.fromJSON(graph_data)

    //ugly hack for initializing tooltips
    graph.get('cells').each(function(cell) {
        if (cell instanceof joint.shapes.bpmn.StepLink || cell instanceof joint.shapes.bpmn.Person || cell instanceof joint.shapes.bpmn.Organization){
            cell.setTooltip();
        }
    });

});
