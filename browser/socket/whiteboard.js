//EVENT EMITTER CONSTRUCTOR 
// Here is our constructor function, available globally (set to the window object!)
const EventEmitter = function() {
    this.subscribers = {};
};

(function(EE) {

    // To be used like:
    // instanceOfEE.on('touchdown', cheerFn);
    EE.prototype.on = function(eventName, eventListener) {

        // If this instance's subscribers object does not yet
        // have the key matching the given event name, create the
        // key and assign the value of an empty array.
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        // Push the given listener function into the array
        // located on the instance's subscribers object.
        this.subscribers[eventName].push(eventListener);

    };

    // To be used like:
    // instanceOfEE.emit('codec', 'Hey Snake, Otacon is calling!');
    EE.prototype.emit = function(eventName) {

        // If there are no subscribers to this event name, why even?
        if (!this.subscribers[eventName]) {
            return;
        }

        // Grab the remaining arguments to our emit function.
        var remainingArgs = [].slice.call(arguments, 1);

        // For each subscriber, call it with our arguments.
        this.subscribers[eventName].forEach(function(listener) {
            listener.apply(null, remainingArgs);
        });

    };

})(EventEmitter);

/*-------------------------------CREATING WHITEBOARD-----------------------------------------*/

export default function buildWhiteboard(canvas) {
    const whiteboard = new EventEmitter();

    var color;
    var colorElements = [].slice.call(document.querySelectorAll('.marker'));

    colorElements.forEach(function(el) {
        el.style.backgroundColor = el.id;
        el.addEventListener('click', function() {
            color = this.id;
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
        });

    });

    // var canvas = document.getElementById('paint');
    var ctx = canvas.getContext('2d')

    function resize() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        var pixelRatio = window.devicePixelRatio || 1;
        var w = canvas.clientWidth * pixelRatio,
            h = canvas.clientHeight * pixelRatio;
        if (w !== canvas.width || h !== canvas.height) {
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            canvas.width = w;
            canvas.height = h;
            ctx.putImageData(imgData, 0, 0)
        }

        ctx.scale(pixelRatio, pixelRatio);

        ctx.lineWidth = 5
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
    }

    resize();

    window.addEventListener('resize', resize);

    var currentMousePosition = {
        x: 0,
        y: 0
    };

    var lastMousePosition = {
        x: 0,
        y: 0
    };

    var drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function() {
        drawing = false;
    });

    canvas.addEventListener('mousemove', function(e) {

        if (!drawing) return;

        lastMousePosition.x = currentMousePosition.x;
        lastMousePosition.y = currentMousePosition.y;

        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;

        whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

    });

    whiteboard.draw = function(start, end, strokeColor, shouldBroadcast) {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        ctx.beginPath();
        ctx.strokeStyle = strokeColor || 'black';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();

        // If shouldBroadcast is truthy, we will emit a draw event to listeners
        // with the start, end and color data.
        if (shouldBroadcast) {
            whiteboard.emit('draw', start, end, strokeColor);
        }

    };
    return whiteboard;
}