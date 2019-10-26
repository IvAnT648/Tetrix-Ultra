"use_strict"

// Definitions

const CELL_ID_MASK = 'cell-'
const WIDTH = 10
const HEIGHT = 14

class Point 
{
	constructor(x, y) 
	{
        this.X = x;
        this.Y = y;
    }
}

class AbstractFigure 
{
	constructor(form) 
	{
		this.forms = [];
        if (form !== undefined) {
            this.forms.push(form);
		}
		this.cssClass = this.constructor.name;
    }

    addForm(form) {
        if (form.isArray()) {
            this.forms.push(form);
            return true;
        } else { return false; }
    }

    getForms() {
        return this.forms;
    }

    getForm(index) {
        return this.forms[index];
    }
}

class FigureI extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(0, 3)
		]);
		this.forms.push([
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(3, 0)
		]);
    };
}

class FigureL extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1),
            new Point(0, 2)
		]);
		this.forms.push([
            new Point(0, 0),
            new Point(0, 1),
            new Point(1, 1),
            new Point(2, 1)
		]);
		this.forms.push([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(-1, 2)
		]);
		this.forms.push([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(1, 2)
		]);
    };
}

class FigureJ extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1),
            new Point(1, 2)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(1, 2)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(0, 1),
            new Point(-1, 1),
            new Point(-2, 1)
        ]);
    };
}

class FigureO extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(0, 1),
            new Point(1, 0),
            new Point(1, 1)
        ]);
    };
}

class FigureT extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(1, 1)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(0, 2)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(1, 1)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(0, -1),
            new Point(-1, -1),
            new Point(0, -2)
        ]);
    };
}

class FigureZ extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, -1),
            new Point(2, -1)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(0, -1),
            new Point(-1, -1),
            new Point(-1, -2)
        ]);
    };
}

class FigureS extends AbstractFigure 
{
	constructor() 
	{
        super([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1),
            new Point(2, 1)
        ]);
        this.forms.push([
            new Point(0, 0),
            new Point(0, -1),
            new Point(1, -1),
            new Point(1, -2)
        ]);
    };
}

class HtmlBlock 
{
	constructor(html) 
	{
        if (html !== undefined) {
            this.html = html;
        }
    }

	getHtml() 
	{
        return this.html;
	}
	
	setHtml(html) 
	{
		this.html = html;
	}
}

class Cell extends HtmlBlock 
{
	static counter = 0;
	
    constructor(point) {
		super(document.createElement('div'));
        this.id = ++Cell.counter;
        this.point = point;
        this.html.classList.add('cell');
		this.html.setAttribute('id', CELL_ID_MASK + this.id);
		//
        this.html.setAttribute('x', this.point.X);
		this.html.setAttribute('y', this.point.Y);
		//
    }
}

class Tetris extends HtmlBlock 
{
	constructor(width, height) 
	{
		if (!width || !height) throw "Size of game field not set";
		super(document.createElement('div'));
        this.html.classList.add('tetris');
        this.cells = [];
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                let cell = new Cell(new Point(j + 1, height - i));
                this.cells.push(cell);
                this.html.appendChild(cell.getHtml());
            }
        }
    }

	findCell(point) 
	{
        return this.cells.find(cell => cell.point.X == point.X && cell.point.Y == point.Y);
    }
}

class Main extends HtmlBlock 
{
	constructor(width, height) 
	{
		super(document.querySelector('#main'));
		if (!this.html) {
			alert("Sorry... An error has occured");
			throw "Main not founded";
		}
		this.tetris = new Tetris(width, height);
		this.html.appendChild(this.tetris.html);
    }
}

class Game 
{
	/** @property {Main} mainBlock */
	mainBlock = null;
	/** @property {int} figureFallDelay */
	figureFallDelay = null;
	/** @property {int} defaultFallDelay */
	defaultFallDelay = 1000;
	/** @property {bool} play */
	play = true;
	/** @property {Point} startPoint */
	startPoint = null;
	/** @property {Point} nextPoint */
	nextPoint = null;
	/** @property {AbstractFigure} currentFigure */
	currentFigure = null;
	/** @property {Array<Point>} currentFigureForm */
	currentFigureForm = null;
	/** @property {Array<Point>} currentCoordinates */
	currentCoordinates = null;

	constructor(width, height, startPoint) 
	{
		this.width = width;
		this.height = height;
		this.mainBlock = new Main(width, height);
		this.startPoint = startPoint;
		this.nextPoint = startPoint;
		this.figureFallDelay = 800;
	}

	setLevelDifficulty(level) 
	{
		let decrement = 200;
		if (isNaN(level) || level < 1 && level > ((this.defaultFallDelay / decrement) + 1)) return;
		this.figureFallDelay = this.defaultFallDelay - decrement * level;
	}

	run()
	{
		if (!this.mainBlock) throw "Run game failed";
		this._selectFigure();
		this._drawFigure();

	}

	moveFigure(event)
	{
		let moveDirection = null;
		switch (event.keyCode) {

			case 37: // key left
				moveDirection = -1;
				break;
			case 38: // key up
				break;
			case 39: // key right
				moveDirection = 1;
				break;
			case 40: // key down
				break;
		}
		if (moveDirection !== null) {
			let newPoint = new Point(this.nextPoint.X + moveDirection, this.nextPoint.Y);
			let coordinates = this.checkPoint(newPoint);
			if (Array.isArray(coordinates)) {
				this.nextPoint = newPoint;
				this.currentCoordinates = coordinates;
				this._drawFigure();
			}
		}
	}

	/**
	 * Check point on available
	 * 
	 * @param {Point} point 
	 * @param {Array<Point>} indents
	 * @returns {Arrat<Point>}
	 */
	checkPoint(point, indents) 
	{
		if (!point instanceof Point) return null;
		if (!Array.isArray(indents)) return null;

		let coordinates = [];
		indents.forEach(indent => {
			coordinates.push(new Point(point.X + indent.X, point.Y + indent.Y));
		});
		coordinates.forEach(point => {
			if (point.X < 1 || point.X > this.width || point.Y < 1) { 
				return false;
			}
		});
		
		return coordinates;
	}

	_selectFigure() 
	{
		// TODO: select random figure and form
		this.currentFigure = new FigureI();

		if (!this.currentFigure) return;
		let index = 0;
		// TODO: select random form
		this.currentFigureForm = this.currentFigure.getForm(index);
		this._calcCoordinates();
	}

	_wait() 
	{
		if (!this.figureFallDelay) {
			this.figureFallDelay = this.defaultFallDelay;
		}
		let start = new Date;
		let end = null;
		do {
			end = new Date;
		} while ((end - start) < this.figureFallDelay);
	}

	_drawFigure() 
	{
		if (!Array.isArray(this.currentCoordinates)) {
			this._calcCoordinates();
		}
		
		this.currentCoordinates.forEach(point => {
			// find in cell blocks
			let cell = this.mainBlock.tetris.findCell(point);
			if (!cell) return;
			// get html-div of cell
			let cellHtml = document.querySelector('#' + CELL_ID_MASK + cell.id);
			if (!cellHtml) return;
			// drawing
			cellHtml.classList.add(this.currentFigure.cssClass);
		});
	}

	_clearField(event)
	{
		let elements = document.querySelectorAll('.' + this.gameContext.currentFigure.cssClass + ':not(.set)');
		for (let elem of elements) {
			elem.classList.remove(this.gameContext.currentFigure.cssClass);
		}
	}

	_calcCoordinates()
	{
		if (!this.nextPoint) "Next point not defined";
		if (!Array.isArray(this.currentFigureForm)) throw "Figure form isn't corrected";
		this.currentCoordinates = [];
		this.currentFigureForm.forEach(indent => {
			this.currentCoordinates.push(new Point(this.nextPoint.X + indent.X, this.nextPoint.Y + indent.Y));
		});
	}

	_checkNextPoint() 
	{
		if (!this.currentCoordinates) return false;
		this.currentCoordinates.forEach(point => {
			if (point.X < 1 || point.X > this.width || point.Y < 1) { 
				return false;
			}
		});
		return true;
	}
}

/// ---------------------- Running ---------------------- ///

game = new Game(WIDTH, HEIGHT, new Point(5, 6));
addEventListener('click', { handleEvent: game._clearField, gameContext: game })
game.run();

//------------------------------------------------------- ///
