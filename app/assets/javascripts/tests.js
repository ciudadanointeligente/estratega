toolbar.saveGraph = function(){
	// assert.ok(true)
}

QUnit.test('Guardar al hacer drag', function( assert) {

	toolbar.saveGraph = function(){
		assert.ok(true)
	}

	cell = new joint.shapes.bpmn.Step()
	collection = {}
	opt = {}

	graph.trigger('add', cell, collection, opt)
})

QUnit.test('no linkear un steplink en caso de no tener un destino', function( assert) {
	var step = new joint.shapes.bpmn.Step()
	step.paper = paper
	var person  = new joint.shapes.bpmn.Person()
	person.paper = paper
	var link = new joint.shapes.bpmn.StepLink({ source: step })
		// paper.addCell(step)
		// paper.addCell(person)

	var halo = new joint.ui.Halo({ graph: graph, cellView: step });
	halo.startLinking({ })
	assert.ok(false)
	console.log(halo)
})