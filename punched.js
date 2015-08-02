// based on the 'quick' sample

var config = {
	NUM_ROWS: 12,
	NUM_COLS: 6
};

RPGJS.Materials = {
	"characters": {
		"1": "event1.png",
		"2": "event2.png"
	},
	"tilesets": {
		"1": "tileset.png"
	}
};

RPGJS.Database = {
	"actors": {
		"1": {
			"graphic": "1"
		}
	},
	"tilesets": {
		"1": {
			"graphic": "1"
		}
	},
	"map_infos": {
		"1": {
			"tileset_id": "1"
		}
	}
};

RPGJS.defines({
	canvas: "canvas",
	autoload: false,
	scene_path: "RPG-JS/",
}).ready(function() {

	RPGJS.Player.init({
		actor: 1,
		start: {x: 10, y: 10, id: 1}
	});

	RPGJS.Scene.map(function() {

    var e = RPGJS.Map.createEvent("EV-1", 7, 10);

    e.addPage({
        "trigger": "contact",
        "type": "fixed",
        "graphic": "2"
    }, [
        "SHOW_TEXT: {'text': 'Hello there!'}"
    ]);

    e.display();

  });

	RPGJS.Player.freeze = true;
});

var $punchcard = $('#punchcard');

for (var i = 0; i < config.NUM_ROWS; i++) {
	var prow = $punchcard
			.append('<div class="punch row"></div>').find('.row:last');
	for (var j = 0; j < config.NUM_COLS; j++) {
		prow.append('<span><input type="checkbox"></span>');
	}
}

$('#punchit').click(function() {
	var seq = [];
	$('.punch.row:has(input:checked)', $punchcard).each(function() {
		var step = [];
		$('input', this).each(function() {
			step.push(this.checked);
		});
		seq.push(step);
	}).promise().done(function() {
		var route = [];
		seq.forEach(function(step) {
			if (step[0]) route = route.concat(["turn_left", "wait_10", "left"]);
			if (step[1]) route = route.concat(["turn_right", "wait_10", "right"]);
			if (step[2]) route = route.concat(["turn_up", "wait_10", "up"]);
			if (step[3]) route = route.concat(["turn_bottom", "wait_10", "bottom"]);
			if (step[4]) route = route.concat(["turn_left", "wait_10", "turn_right", "wait_10", "turn_up", "wait_10", "turn_bottom"]);
			if (step[5]) for (var i=0;i<3;i++) route = route.concat(["opacity_100", "wait_5", "opacity_1000", "wait_5"]);
			route.push("wait_40");
		});
		// console.log(route);
		RPGJS.Player.moveRoute(route);
	});
});
