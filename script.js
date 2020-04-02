"use_strict"

// Definitions

const CELL_ID_PREFIX = 'cell-'
const WIDTH = 10
const HEIGHT = 14
const _DEBUG_ = true;

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
	forms = [];
	cssClass = 'figure';

	constructor() 
	{
		this.cssClass = this.constructor.name;
    }

    addForm(form) {
        if (Array.isArray(form)) {
            this.forms.push(form);
            return true;
		}
		return false;
    }

    getForms() {
        return this.forms;
    }

    getForm(index) {
        return this.forms[index];
    }
    
    getFormQty()
    {
        return this.forms.length;
    }
	
	stopFalling() {

	}
}

class FigureI extends AbstractFigure 
{
	constructor() 
	{
        super();
        this.addForm([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(0, 3)
		]);
		this.addForm([
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
        super();
        this.addForm([
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1),
            new Point(0, 2)
		]);
		this.addForm([
            new Point(0, 0),
            new Point(0, 1),
            new Point(1, 1),
            new Point(2, 1)
		]);
		this.addForm([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(-1, 2)
		]);
		this.addForm([
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
        super();
        this.addForm([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1),
            new Point(1, 2)
        ]);
        this.addForm([
            new Point(0, 0),
            new Point(1, 0),
            new Point(2, 0),
            new Point(0, 1)
        ]);
        this.addForm([
            new Point(0, 0),
            new Point(0, 1),
            new Point(0, 2),
            new Point(1, 2)
        ]);
        this.addForm([
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
        super();
        this.addForm([
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
        super();
        this.addForm([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(1, 1)
        ]);
        this.addForm([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(0, 2)
        ]);
        this.addForm([
            new Point(0, 0),
            new Point(-1, 1),
            new Point(0, 1),
            new Point(1, 1)
        ]);
        this.addForm([
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
        super();
        this.addForm([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, -1),
            new Point(2, -1)
        ]);
        this.addForm([
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
        super();
        this.addForm([
            new Point(0, 0),
            new Point(1, 0),
            new Point(1, 1),
            new Point(2, 1)
        ]);
        this.addForm([
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
        this.html = html;
    }

	getHtml()
	{
        return this.html;
	}
	
	setHtml(html) 
	{
		this.html = html;
    }
    
    addCssClass(cssClass)
    {
        this.html.classList.add(cssClass);
    }

    removeCssClass(cssClass)
    {
        this.html.classList.remove(cssClass);
    }
}

class Cell extends HtmlBlock 
{
	static counter = 0;
	
	/**
	 * @param {Point} point 
	 */
    constructor(point) {
		super(document.createElement('div'));
        this.id = ++Cell.counter;
        this.point = point;
        this.addCssClass('cell');
        this.getHtml().setAttribute('id', CELL_ID_PREFIX + this.id);
        if (_DEBUG_) {
            this.getHtml().setAttribute('x', this.point.X);
            this.getHtml().setAttribute('y', this.point.Y);
        }
    }
}

class Tetris extends HtmlBlock 
{
	constructor(width, height) 
	{
		if (!width || !height) throw "Size of game field not set";
		super(document.createElement('div'));
        this.addCssClass('tetris');
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
		if (!this.getHtml()) {
			alert("Sorry... An error has occured");
			throw "Main not founded";
		}
		this.tetris = new Tetris(width, height);
		this.html.appendChild(this.tetris.getHtml());
    }
}

class Game
{
	/** @property {Main} mainBlock */
	mainBlock = null;
	/** @property {int} figureFallDelay */
	figureFallDelay = 700;
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
	/** @property {int} fallTimerId */
    fallTimerId = null;
    /** @property {bool} figureChangeFlag */
    figureChangeFlag = false;

	constructor(width, height, startPoint) 
	{
		this.width = width;
		this.height = height;
		this.mainBlock = new Main(width, height);
		this.startPoint = startPoint;
		this.nextPoint = startPoint;
	}

    /**
     * Run game
     */
	run()
	{
        if (!this.mainBlock) 
            throw "Run game failed";
		this._selectFigure();
        this.drawFigure();
        // fall
        this.fallTimerId = setInterval(this._figureFall.bind(this), this.figureFallDelay);
        // timeout
		setTimeout(() => clearInterval(this.fallTimerId), 20000);
	}

    /**
     * Set speed of falling
     * 
     * @param {int} level 
     */
	setDifficultyLevel(level)
	{
		let decrement = 200;
		if (isNaN(level) || level < 1 && level > ((this.defaultFallDelay / decrement) + 1)) return;
		this.figureFallDelay = this.defaultFallDelay - decrement * level;
	}

    /**
     * Draw figure
     */
	drawFigure()
	{
        if (!this._calcCoordinates()) 
            return;
        this._clearFigure();
        if (this.currentCoordinates.find(p => p.Y == 1)) {
            this.figureChangeFlag = true;
        }

        for (let point of this.currentCoordinates)
        {
            // find in cell blocks
			let cell = this.mainBlock.tetris.findCell(point);
            if (!cell) 
                return;
			// get html-div of cell
			let cellHtml = document.querySelector('#' + CELL_ID_PREFIX + cell.id);
            if (!cellHtml) 
                return;
			// drawing
            cellHtml.classList.add(this.currentFigure.cssClass);
            cellHtml.classList.add('filled');
            if (this.figureChangeFlag) {
                cellHtml.classList.add('stopped');
            }
        }
        if (this.figureChangeFlag) {
            this._selectFigure();
            this.nextPoint = this.startPoint;
            this.figureChangeFlag = false;
        }
	}

	/**
	 * Check point on available and apply indents
	 * 
	 * @param {Point} point 
	 * @param {Array<Point>} indents
	 * @returns {Array<Point>|false}
	 */
	_applyIndentsToPoint(point, indents) 
	{
		if (!(point instanceof Point)) return null;
		if (!Array.isArray(indents)) return null;

		let coordinates = [];
		for (let indent of indents) {
			let nX = point.X + indent.X;
			let nY = point.Y + indent.Y;
			if (nX < 1 || nX > this.width || nY < 1) {
				return false;
            }
            let point = new Point(nX, nY);
			coordinates.push(point);
        }
        
		return coordinates;
    }
    
    _isFreeCell(point)
    {
        
    }
    
    /**
     * Figure fall method
     */
	_figureFall()
	{
		let newPoint = new Point(this.nextPoint.X, this.nextPoint.Y - 1);
		let coordinates = this._applyIndentsToPoint(newPoint, this.currentFigureForm);
		if (Array.isArray(coordinates)) {
			this.nextPoint = newPoint;
			this.currentCoordinates = coordinates;
			this.drawFigure();
			return;
		}
	}

    /**
     * Select random figure
     */
	_selectFigure()
	{
        switch (this._randomInt(1, 7))
        {
            case 1:
                this.currentFigure = new FigureJ();
                break;
            case 2:
                this.currentFigure = new FigureL();
                break;
            case 3:
                this.currentFigure = new FigureT();
                break;
            case 4:
                this.currentFigure = new FigureI();
                break;
            case 5:
                this.currentFigure = new FigureZ();
                break;
            case 6:
                this.currentFigure = new FigureS();
                break;
            case 7:
                this.currentFigure = new FigureO();
                break;
            default:
                this.currentFigure = null;
        }
		
        if (!this.currentFigure) 
            throw "Figure not choosen!";
        
        let maxFormIndex = this.currentFigure.getFormQty() - 1;
		this.currentFigureForm = this.currentFigure.getForm(this._randomInt(0, maxFormIndex));
		this._calcCoordinates();
	}

    /**
     * Calculate figure coordinates
     */
	_calcCoordinates()
	{
        if (!this.nextPoint) 
            return false;
        if (!Array.isArray(this.currentFigureForm)) 
            throw "Figure form wasn't corrected";
		this.currentCoordinates = [];
		this.currentFigureForm.forEach(indent => {
			this.currentCoordinates.push(new Point(this.nextPoint.X + indent.X, this.nextPoint.Y + indent.Y));
        });
        
		return true;
    }

    /**
     * Clear figure in html
     */
	_clearFigure()
	{
		let cssClass = this.currentFigure.cssClass;
		let elements = document.querySelectorAll('.' + cssClass + ':not(.stopped)');
		for (let elem of elements) {
			elem.classList.remove(cssClass);
		}
	}
    
    /**
     * Returns random integer number from min to max
     * 
     * @param {int} min 
     * @param {int} max
     * @returns {int}
     */
    _randomInt(min, max)
    {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}

class Observers
{
	static keyObserver(event)
	{
		let game = this.gameContext;
        if (!game) 
            return;
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
                newPoint = new Point(game.nextPoint.X, game.nextPoint.Y - 1);
                break;
		}
		if (newPoint !== null) {
			let coordinates = game._applyIndentsToPoint(newPoint, game.currentFigureForm);
			if (Array.isArray(coordinates)) {
				game.nextPoint = newPoint;
				game.currentCoordinates = coordinates;
				game.drawFigure();
			}
		}
	}
}

/// ---------------------- Running ---------------------- ///

game = new Game(WIDTH, HEIGHT, new Point(5, 14));
addEventListener('keydown', { handleEvent: Observers.keyObserver, gameContext: game });
game.run();

//------------------------------------------------------- ///
