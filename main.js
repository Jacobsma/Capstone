class Pixel {
    x;
    y;
    width;
    height;
    color;

    constructor(x = 0,y = 0,width = 1,height = 1,color = 'black') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    };

    draw(canvas,context = '2d') {
        const cnvs = canvas;
        // Add context filter
        const ctx = cnvs.getContext(context);
        // Check if color is allowed
        ctx.fillStyle = this.color;
        // Add bounds testing to make sure pixel is in canvas range
        ctx.fillRect(this.x,this.y,this.width,this.height);

    };

    clear(canvas,context = '2d'){
        const cnvs = canvas;

        const ctx = cnvs.getContext(context);

        ctx.clearRect(this.x,this.y,this.width,this.height);

    };

};

class Canvas {
    canvas;
    context;
    pixels;
    width;
    height;
    density;

    constructor(canvas,density = 10,context = '2d') {
        this.canvas = canvas;
        this.context = context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.density = density;
        this.pixels = []; 
        for (let i = 0;i < this.density;i++) {
            let tmp = [];
            for (let j = 0;j < this.density;j++) {
                tmp.push(new Pixel(i * (this.height / this.density),j * (this.width / this.density),this.width / this.density,this.width / this.density));
            };
            this.pixels.push(tmp);
        };
    };

    clear() {
        for (let i = 0;i < this.density;i++) {
            for (let j = 0;j < this.density;j++) {
                this.pixels[i][j].clear(this.canvas);
            };
        };
    };

    draw() {
        for (let i = 0;i < this.density;i++) {
            for (let j = 0;j < this.density;j++) {
                this.pixels[i][j].draw(this.canvas);
            };
        };
    };

    animate() {
        this.clear()
        this.draw()
        frame = window.requestAnimationFrame(this.draw);
    };

    _north(pixel) {
        if (pixel.y === 0) {
            return false;
        }
        else {
            return true;
        };

    };

    _south(pixel) {
        if (pixel.y === (this.height - (this.height / this.density))) {
            return false;
        }
        else {
            return true;
        };


    };

    _east(pixel) {
        if (pixel.x === (this.width - (this.width / this.density))) {
            return false;
        }
        else {
            return true;
        };


    };

    _west(pixel) {
        if (pixel.x === 0) {
            return false;
        }
        else {
            return true;
        };


    };

    _northWest(pixel) {
        if (pixel.y === 0 || pixel.x === 0) {
            return false;
        }
        else {
            return true;
        };
    };

    _northEast(pixel) {
        if (pixel.y === 0 || pixel.x === (this.width - (this.width / this.density))) {
            return false;
        }
        else {
            return true;
        };
    };

    _southEast(pixel) {
        if (pixel.y === (this.width - (this.width / this.density)) || pixel.x === (this.width - (this.width / this.density))) {
            return false;
        }
        else {
            return true;
        };
    };

    _southWest(pixel) {
        if (pixel.y === (this.width - (this.width / this.density)) || pixel.x === 0) {
            return false;
        }
        else {
            return true;
        };
    };

    randomize(type = 'black and white') {
        if (type === 'black and white') {
            for (let i = 0;i < this.density;i++) {
                for (let j = 0;j < this.density;j++) {
                    if (Math.random() >= .5) {
                        this.pixels[i][j].color = 'black';
                    }
                    else {
                        this.pixels[i][j].color = 'white';
                    };
                };
            };

        }
        else if (type === 'rgb') {
            for (let i = 0;i < this.density;i++) {
                for (let j = 0;j < this.density;j++) {
                    this.pixels[i][j].color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
                };

            };
        }
        else if (type === 'gaia') {
            for (let i = 0;i < this.density;i++) {
                for (let j = 0;j < this.density;j++) {
                    let rand = Math.random();
                    if (rand <= .33) {
                        this.pixels[i][j].color = 'blue';
                    }
                    else if (rand >= .66) {
                        this.pixels[i][j].color = 'brown';
                    }
                    else {
                        this.pixels[i][j].color = 'green';
                    }
                };

            };
        };

    };

    neighboors(pixel,color = 'black') {
        let count = 0;

        if (this._northWest(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) - 1][(pixel.y / (this.width / this.density)) - 1].color === color) {
                count++;
            };
        };

        if (this._north(pixel)) {
            if (this.pixels[pixel.x / (this.width / this.density)][(pixel.y / (this.width / this.density)) - 1].color === color) {
                count++;
            };
        };

        if (this._northEast(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) + 1][(pixel.y / (this.width / this.density)) - 1].color === color) {
                count++;
            };
        };

        if (this._east(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) + 1][pixel.y / (this.width / this.density)].color === color) {
                count++;
            };
        };
        
        if (this._southEast(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) + 1][(pixel.y / (this.width / this.density)) + 1].color === color) {
                count++;
            };
        };

        if (this._south(pixel)) {
            if (this.pixels[pixel.x / (this.width / this.density)][(pixel.y / (this.width / this.density)) + 1].color === color) {
                count++;
            };
        };

        if (this._southWest(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) - 1][(pixel.y / (this.width / this.density)) + 1].color === color) {
                count++;
            };
        };


        if (this._west(pixel)) {
            if (this.pixels[(pixel.x / (this.width / this.density)) - 1][pixel.y / (this.width / this.density)].color === color) {
                count++;
            };
        };

        return count;

    };

};

let test = new Canvas(document.getElementById('test'),100);
let frame;
let intervalId;

test.randomize();
test.draw();

function conway() {
    let testPixels = [];
    //test.randomize();

    for (let i = 0;i < test.density;i++) {
        let tmp = [];
        for (let j = 0;j < test.density;j++) {
            let neighboors = test.neighboors(test.pixels[i][j]); 
            let state = test.pixels[i][j].color;


            if (state === 'black') {
                if (neighboors < 2 || neighboors > 3) {
                    tmp.push(new Pixel(test.pixels[i][j].x, test.pixels[i][j].y, test.pixels[i][j].width, test.pixels[i][j].height, 'white'));
                }
                else {
                    tmp.push(new Pixel(test.pixels[i][j].x, test.pixels[i][j].y, test.pixels[i][j].width, test.pixels[i][j].height, 'black'));
                };
            }
            else if (state === 'white') {
                if (neighboors === 3) {
                    tmp.push(new Pixel(test.pixels[i][j].x, test.pixels[i][j].y, test.pixels[i][j].width, test.pixels[i][j].height, 'black'));
                }
                else {
                    tmp.push(new Pixel(test.pixels[i][j].x, test.pixels[i][j].y, test.pixels[i][j].width, test.pixels[i][j].height, 'white'));
                };

            }
            else {
                tmp.push(new Pixel(test.pixels[i][j].x, test.pixels[i][j].y, test.pixels[i][j].width, test.pixels[i][j].height, 'white'));
            };
        };
        testPixels.push(tmp);
    };

    test.pixels = testPixels;

    test.draw();
};


document.getElementById('resetButton').addEventListener('click', (e) => {
    window.clearInterval(intervalId);
    test.randomize();
    frame = window.requestAnimationFrame(conway);
});

document.getElementById('startButton').addEventListener('click', (e) => {
    intervalId = window.setInterval((t) => {
        frame = window.requestAnimationFrame(conway);
    },1);
});

document.getElementById('stopButton').addEventListener('click', (e) => {
    window.clearInterval(intervalId);
});

// Gaia

let gaiaTest = new Canvas(document.getElementById('gaiaTest'),100);
let gaiaFrame;
let gaiaIntervalId;

gaiaTest.randomize('gaia');
gaiaTest.draw();

function gaia() {
    let testPixels = [];

    for (let i = 0;i < gaiaTest.density;i++) {
        let tmp = [];
        for (let j = 0;j < gaiaTest.density;j++) {
            let neighboorsBlue = gaiaTest.neighboors(gaiaTest.pixels[i][j], 'blue'); 
            let neighboorsBrown = gaiaTest.neighboors(gaiaTest.pixels[i][j], 'brown'); 
            let state = gaiaTest.pixels[i][j].color;

            if (state === 'blue') {
                tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'blue'));
            }
            else if (state === 'brown') {
                if (neighboorsBrown > 4) {
                    tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'green'));
                }
                else {
                    tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'brown'));
                }
            }
            else if (state === 'green') {
                if (neighboorsBrown >= 4) {
                    tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'brown'));
                }
                else if (neighboorsBlue >= 7) {
                    tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'blue'));
                }
                else {
                    tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'green'));
                };
            }
            else {
                tmp.push(new Pixel(gaiaTest.pixels[i][j].x, gaiaTest.pixels[i][j].y, gaiaTest.pixels[i][j].width, gaiaTest.pixels[i][j].height, 'white'));
            };
        };
        testPixels.push(tmp);
    };

    gaiaTest.pixels = testPixels;

    gaiaTest.draw();

}
// Gaia buttons

document.getElementById('gaiaResetButton').addEventListener('click', (e) => {
    window.clearInterval(gaiaIntervalId);
    gaiaTest.randomize('gaia');
    gaiaFrame = window.requestAnimationFrame(gaia);
});

document.getElementById('gaiaStartButton').addEventListener('click', (e) => {
    gaiaIntervalId = window.setInterval((t) => {
        gaiaFrame = window.requestAnimationFrame(gaia);
    },1);
});

document.getElementById('gaiaStopButton').addEventListener('click', (e) => {
    window.clearInterval(gaiaIntervalId);
});

//Debug


test.canvas.addEventListener('click', (e) => {
    console.log(test.pixels[e.x][e.y]);
})

console.log(test,gaiaTest);




//test.clear();

// Draws each pixel by hue?
/*
for (let i = 0;i < test.height;i++) {
    for (let j = 0;j < test.width;j++) {
        test.pixels[i][j].color =`rgb(${i%255},${j%255},${i+j%255})`; 
        test.pixels[i][j].draw(test.canvas);
    };
};
*/

// Draws each pixel in a given canvas "test" a random color
/*
let test = new Canvas(document.getElementById('test'));

for (let i = 0;i < test.height;i++) {
    for (let j = 0;j < test.width;j++) {
        test.pixels[i][j].color =`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`; 
        test.pixels[i][j].draw(test.canvas);
    };
};
*/

// Draws 10000 randomly colored boxes randomly on the screen 
/*
for(let i = 0; i < 10000; i++ ) {
    drawPixel(document.getElementById('test'),Math.random()*1000,Math.random()*1000,10,`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`);
};
*/