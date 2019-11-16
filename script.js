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
	allowFigureFall = false;
	fallTimerId = null;

	constructor(width, height, startPoint) 
	{
		this.width = width;
		this.height = height;
		this.mainBlock = new Main(width, height);
		this.startPoint = startPoint;
		this.nextPoint = startPoint;
		this.figureFallDelay = 700;
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
		this.drawFigure();
		this.fallTimerId = setInterval(this._figureFall.bind(this), this.figureFallDelay);
		setTimeout(() => clearInterval(this.fallTimerId), 7000);
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
		for (let point of coordinates) {
			if (point.X < 1 || point.X > this.width || point.Y < 1) { 
				return false;
			}
		}
		
		return coordinates;
	}

	drawFigure()
	{
		if (!this._calcCoordinates()) return;
		this._clearFigure();

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
	
	_figureFall()
	{
		let newPoint = new Point(this.nextPoint.X, this.nextPoint.Y - 1);
		let coordinates = this.checkPoint(newPoint, this.currentFigureForm);
		if (Array.isArray(coordinates)) {
			this.nextPoint = newPoint;
			this.currentCoordinates = coordinates;
			this.drawFigure();
		}
		for (let point of this.currentCoordinates) {
			if ()
		}
	}

	_selectFigure() 
	{
		// TODO: select random figure and form
		this.currentFigure = new FigureJ();

		if (!this.currentFigure) return;
		let index = 0;
		// TODO: select random form
		this.currentFigureForm = this.currentFigure.getForm(index);
		this._calcCoordinates();
	}

	_clearFigure()
	{
		let cssClass = this.currentFigure.cssClass;
		let elements = document.querySelectorAll('.' + cssClass + ':not(.set)');
		for (let elem of elements) {
			elem.classList.remove(cssClass);
		}
	}

	_calcCoordinates()
	{
		if (!this.nextPoint) return false;
		if (!Array.isArray(this.currentFigureForm)) throw "Figure form isn't corrected";
		this.currentCoordinates = [];
		this.currentFigureForm.forEach(indent => {
			this.currentCoordinates.push(new Point(this.nextPoint.X + indent.X, this.nextPoint.Y + indent.Y));
		});
		return true;
	}
}

class Observers
{
	static keyObserver(event)
	{
		let game = this.gameContext;
		if (!game) return;
		let moveDirection = null;
		let newPoint = null;
		switch (event.keyCode) {
			case 37: // key left
				newPoint = new Point(game.nextPoint.X - 1, game.nextPoint.Y);
				break;
			case 38: // key up
				break;
			case 39: // key right
				newPoint = new Point(game.nextPoint.X + 1, game.nextPoint.Y);
				break;
			case 40: // key down
				game.allowFigureFall = true;
		}
		if (newPoint !== null) {
			let coordinates = game.checkPoint(newPoint, game.currentFigureForm);
			if (Array.isArray(coordinates)) {
				game.nextPoint = newPoint;
				game.currentCoordinates = coordinates;
				game.drawFigure();
			}
		}
		if (game.allowFigureFall) {
			newPoint = new Point(game.nextPoint.X, game.nextPoint.Y - 1)
			let coordinates = game.checkPoint(newPoint, game.currentFigureForm);
			if (Array.isArray(coordinates)) {
				game.nextPoint = newPoint;
				game.currentCoordinates = coordinates;
				game.drawFigure();
				game.allowFigureFall = false;
			}
		}
	}
}

/// ---------------------- Running ---------------------- ///

game = new Game(WIDTH, HEIGHT, new Point(5, 14));
addEventListener('keydown', { handleEvent: Observers.keyObserver, gameContext: game });
game.run();

//------------------------------------------------------- ///
