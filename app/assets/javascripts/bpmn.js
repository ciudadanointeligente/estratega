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

        // if (x) {
            var size = cell.get('size');
            cell.set('size', {
                width: 240,
                height: 210
            }, { silent: true });
        // }
    }

});

var commandManager = new joint.dia.CommandManager({ graph: this.graph });

/* PAPER + SCROLLER */

var paper = new joint.dia.Paper({
    width: 4000,
    height: 1000,
    model: graph,
    gridSize: 10,
    model: graph,
    perpendicularLinks: true,
    defaultLink: new joint.shapes.bpmn.Flow,
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

joint.shapes.bpmn.Event = joint.shapes.basic.TextBlock.extend({

    markup: ['<g class="rotatable">',
             '<g class="scalable"><rect class="body outer"/><div class="date_holder"></div><rect class="body inner"></rect><text class="date" /></g>',
             '<switch>',
             // if foreignObject supported
             '<foreignObject requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" class="fobj">',
             '<body xmlns="http://www.w3.org/1999/xhtml"><div/></body>',
             '</foreignObject>',
             // else foreignObject is not supported (fallback for IE)
             '<text class="content"/>',
             '</switch><path class="sub-process"/></g>'].join(''),

    defaults: joint.util.deepSupplement({

        size: { width: 240, height: 210 },
        type: 'bpmn.Step',
        attrs: {
            rect: {
                rx: 0,
                ry: 0,
                width: 100,
                height: 100
            },
            '.body': {
                fill: '#ffffff',
                stroke: '#000000'
            },
            '.inner': {
                transform: 'scale(0.9,0.9) translate(5,5)'
            },
            path: {
                d: 'M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15',
                ref: '.inner',
                'ref-x': 0.5,
                'ref-dy': -30,
                'x-alignment': 'middle',
                stroke: '#000000',
                fill: 'transparent'
            },
            image: {
                ref: '.inner',
                'ref-x': 5,
                width: 20,
                height: 20
            },
            '.date': {
                text: '',
                fill: '#000000',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.inner', 
                // width: 50,
                // height: 50,
                 'ref-x': .5, 'ref-dy': -25,
                //'transform': 'translate(-6, 30)',
                'x-alignment': 'right', 'y-alignment': 'top'
            },
        },
        activityType: 'task',
        subProcess: null

   }, joint.shapes.basic.TextBlock.prototype.defaults),

    initialize: function() {

        joint.shapes.basic.TextBlock.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:activityType', this.onActivityTypeChange);
        this.listenTo(this, 'change:subProcess', this.onSubProcessChange);

        this.onSubProcessChange(this, this.get('subProcess'));
        this.onActivityTypeChange(this, this.get('activityType'));
    },

    onActivityTypeChange: function(cell, type) {

        switch (type) {

        case 'task':

            cell.attr({
                '.inner': {
                    visibility: 'hidden'
                },
                '.outer': {
                    'stroke-width': 1,
                    'stroke-dasharray': 'none'
                },
                path: {
                    ref: '.outer'
                },
                image: {
                    ref: '.outer'
                }
            });

            break;

        case 'transaction':

            cell.attr({
                '.inner': {
                    visibility: 'visible'
                },
                '.outer': {
                    'stroke-width': 1,
                    'stroke-dasharray': 'none'
                },
                path: {
                    ref: '.inner'
                },
                image: {
                    ref: '.inner'
                }
            });

            break;

        case 'event-sub-process':

            cell.attr({
                '.inner': {
                    visibility: 'hidden'
                },
                '.outer': {
                    'stroke-width': 1,
                    'stroke-dasharray': '1,2'
                },
                path: {
                    ref: '.outer'
                },
                image: {
                    ref: '.outer'
                }
            });

            break;

        case 'call-activity':

            cell.attr({
                '.inner': {
                    visibility: 'hidden'
                },
                '.outer': {
                    'stroke-width': 5,
                    'stroke-dasharray': 'none'
                },
                path: {
                    ref: '.outer'
                },
                image: {
                    ref: '.outer'
                }
            });

            break;

        default:

            throw "BPMN: Unknown Activity Type: " + type;

            break;
        }
    },

    onSubProcessChange: function(cell, subProcess) {


        if (subProcess) {

            cell.attr({
                '.fobj div': {
                    style: {
                        verticalAlign: 'baseline',
                        paddingTop: 10
                    }
                },
                image: {
                    'ref-dy': -25,
                    'ref-y': ''
                },
                text: { // IE fallback only
                    'ref-y': 25
                }
            });

        } else {

            cell.attr({
                '.fobj div': {
                    style: {
                        verticalAlign: 'middle',
                        paddingTop: 0
                    }
                },
                image: {
                    'ref-dy': '',
                    'ref-y': 5
                },
                text: { // IE fallback only
                    'ref-y': .5
                }
            });
        }
    }

}).extend(joint.shapes.bpmn.IconInterface).extend(joint.shapes.bpmn.SubProcessInterface);


joint.shapes.bpmn.Step = joint.shapes.bpmn.Event.extend()

joint.shapes.bpmn.External = joint.shapes.bpmn.Step.extend({
    defaults: joint.util.deepSupplement({

        size: { width: 100, height: 100 },
        type: 'bpmn.External',
        attrs: {
            rect: {
                rx: 0,
                ry: 0,
                width: 100,
                height: 100
            },
            '.body': {
                fill: '#A5D2FF',
                stroke: '#000000'
            },
            '.inner': {
                transform: 'scale(0.9,0.9) translate(5,5)'
            },
            path: {
                d: 'M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15',
                ref: '.inner',
                'ref-x': 0.5,
                'ref-dy': -30,
                'x-alignment': 'middle',
                stroke: '#000000',
                fill: 'transparent'
            },
            image: {
                ref: '.inner',
                'ref-x': 5,
                width: 20,
                height: 20
            },
            '.date': {
                text: '',
                fill: '#000000',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 
                'ref-x': 25, 'ref-dy': -50,
                'x-alignment': 'right', 'y-alignment': 'top'
            },
        },
        activityType: 'task',
        subProcess: null

   })
})

joint.shapes.bpmn.Intervention = joint.shapes.bpmn.Step.extend({


    defaults: joint.util.deepSupplement({

        size: { width: 100, height: 100 },
        type: 'bpmn.Intervention',
        attrs: {
            rect: {
                rx: 0,
                ry: 0,
                width: 100,
                height: 100
            },
            '.body': {
                fill: '#F1F37C',
                stroke: '#000000'
            },
            '.inner': {
                transform: 'scale(0.9,0.9) translate(5,5)'
            },
            path: {
                d: 'M 0 0 L 30 0 30 30 0 30 z M 15 4 L 15 26 M 4 15 L 26 15',
                ref: '.inner',
                'ref-x': 0.5,
                'ref-dy': -30,
                'x-alignment': 'middle',
                stroke: '#000000',
                fill: 'transparent'
            },
            image: {
                ref: '.inner',
                'ref-x': 5,
                width: 20,
                height: 20
            }
        },
        activityType: 'task',
        subProcess: null

   })

})


joint.shapes.bpmn.Person = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><circle class="body outer"/><circle class="body inner"/><image/></g><text class="label"/></g>',

    defaults: joint.util.deepSupplement({

        type: 'bpmn.Person',
        size: { width: 60, height: 60 },
        attrs: {
            '.body': {
                fill: '#ffffff',
                stroke: '#000000'
            },
            '.outer': {
                'stroke-width': 1, r:30,
                transform: 'translate(30,30)'
            },
            '.inner': {
                'stroke-width': 1, r: 26,
                transform: 'translate(30,30)'
            },
            image: {
                width:  40, height: 40, 'xlink:href': '', transform: 'translate(10,10)'
            },
            '.label': {
                text: '',
                fill: '#000000',
                'font-family': 'Arial', 'font-size': 14,
                ref: '.outer', 'ref-x': .5, 'ref-dy': 20,
                'x-alignment': 'middle', 'y-alignment': 'middle'
            }
        },
        eventType: "start"

    }, joint.dia.Element.prototype.defaults),

    initialize: function() {

        joint.dia.Element.prototype.initialize.apply(this, arguments);

        this.listenTo(this, 'change:eventType', this.onEventTypeChange);

        this.onEventTypeChange(this, this.get('eventType'));
    },

    onEventTypeChange: function(cell, type) {

        switch (type) {

        case 'start':

            cell.attr({
                '.inner': {
                    visibility: 'hidden'
                },
                '.outer': {
                    'stroke-width': 1
                }
            });

            break;

        case 'end':

            cell.attr({
                '.inner': {
                    visibility: 'hidden'
                },
                '.outer': {
                    'stroke-width': 5
                }
            });

            break;

        case 'intermediate':

            cell.attr({
                '.inner': {
                    visibility: 'visible'
                },
                '.outer': {
                    'stroke-width': 1
                }
            });

            break;

        default:

            throw "BPMN: Unknown Event Type: " + type;

            break;
        }
    }

}).extend(joint.shapes.bpmn.IconInterface);

joint.shapes.bpmn.Organization = joint.dia.Element.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon class="body"/><image/></g></g><text class="label"/>',

    defaults: joint.util.deepSupplement({

        type: 'bpmn.Organization',
        size: { width: 80, height: 80 },
        attrs: {
            '.body': {
                points: '40,0 80,40 40,80 0,40',
                fill: '#ffffff',
                stroke: '#000000'
            },
            '.label': {
                text: '',
                ref: '.body',
                'ref-x': .5,
                'ref-dy': 20,
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                'font-size': 14,
                'font-family': 'Arial, helvetica, sans-serif',
                fill: '#000000'
            },
            image: {
                width:  40, height: 40, 'xlink:href': '', transform: 'translate(20,20)'
            }
        }

    }, joint.dia.Element.prototype.defaults)

}).extend(joint.shapes.bpmn.IconInterface);


stencil.load([
    new joint.shapes.bpmn.Step,
    new joint.shapes.bpmn.External,
    new joint.shapes.bpmn.Intervention,
    new joint.shapes.bpmn.Person,
    new joint.shapes.bpmn.Organization,
    new joint.shapes.bpmn.Annotation,
    new joint.shapes.bpmn.Group({
        attrs: {
            '.': { magnet: false },
            '.label': { text: 'Group' }
        }
    }),
]);

joint.layout.GridLayout.layout(stencil.getGraph(), {
    columns: 100,
    columnWidth: 110,
    rowHeight: 110,
    dy: 20,
    dx: 20,
    resizeToFit: true
});

stencil.getPaper().fitToContent(0, 0, 10);

// Create tooltips for all the shapes in stencil.
stencil.getGraph().get('cells').each(function(cell) {
    new joint.ui.Tooltip({
        target: '.stencil [model-id="' + cell.id + '"]',
        content: cell.get('type'),
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

        if (cellView.model instanceof joint.dia.Element && !selection.contains(cellView.model)) {

            new joint.ui.FreeTransform({ cellView: cellView }).render();

            new joint.ui.Halo({
                cellView: cellView,
                boxContent: function(cellView) {
                    return cellView.model.get('type');
                }
            }).render();

            selectionView.cancelSelection();
            selection.reset([cellView.model], { safe: true });
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
    // console.log(graph_data_json);
    var graph_data     = $.parseJSON(graph_data_json);

    console.log(graph_data);
    graph.fromJSON(graph_data)

});
