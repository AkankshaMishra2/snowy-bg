window.onload = function() {
    // Get canvas and context
    var canvas = document.getElementById("snow");
    if (!canvas) {
        console.error("Canvas element with id 'snow' not found.");
        return;
    }
    var ctx = canvas.getContext("2d");

    // Function to set canvas dimensions
    function setCanvasDimensions() {
        var W = window.innerWidth;
        var H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    }

    // Set initial canvas dimensions
    setCanvasDimensions();

    // Update canvas dimensions on window resize
    window.addEventListener('resize', setCanvasDimensions);

    // Generate the snowflakes and apply attributes
    var mf = 200; // max flakes
    var flakes = [];

    // Loop through the empty flakes and apply attributes
    for (var i = 0; i < mf; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 5 + 2, // min of 2px and max of 7px
            d: Math.random() + 1 // density of the flake
        });
    }

    // Draw flakes onto canvas
    function drawFlakes() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for (var i = 0; i < mf; i++) {
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    // Animate the flakes
    var angle = 0;
    function moveFlakes() {
        angle += 0.01;
        for (var i = 0; i < mf; i++) {
            var f = flakes[i];
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            // If the snowflake reaches the bottom, send a new one to the top
            if (f.y > canvas.height) {
                flakes[i] = { x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d };
            }
        }
    }

    setInterval(drawFlakes, 25);
};