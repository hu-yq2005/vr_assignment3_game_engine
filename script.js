"use strict";

window.onload = function () {

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    // Animation variables
    var cowX = 250;
    var cowY = 280;

    var speed = 1.2;
    var direction = 1;
    var time = 0;
    var keys = {};
    var mouthOpen = false;
    var isMoving = false;
    window.addEventListener("keydown", function (event) {
    keys[event.key] = true;

});

window.addEventListener("keyup", function (event) {
    keys[event.key] = false;
});

    // ==================================================
    // Draw one arm
    // The hand is a child of the arm
    // ==================================================

    function drawArm(side, angle) {

        context.save();

        // Move the coordinate system to the shoulder
        context.translate(side * 85, -20);

        // Rotate the arm around the shoulder
        context.rotate(angle);


        // Arm
        context.beginPath();

        context.moveTo(0, 0);

        context.quadraticCurveTo(
            side * 20, 35,
            side * 15, 80
        );

        context.strokeStyle = "#D6A23A";
        context.lineWidth = 18;
        context.lineCap = "round";

        context.stroke();


        // Hand
        // Because the hand is drawn inside the arm's
        // coordinate system, it moves with the arm.

        context.save();

        context.translate(side * 15, 80);

        context.beginPath();

        context.ellipse(
            0, 0,
            14, 14,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "#F2D28B";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();

        context.restore();


        context.restore();
    }


    // ==================================================
    // Draw one leg
    // The foot is a child of the leg
    // ==================================================

    function drawLeg(side, angle) {

        context.save();

        // Move the coordinate system to the hip
        context.translate(side * 35, 95);

        // Rotate the leg around the hip
        context.rotate(angle);


        // Leg
        context.beginPath();

        context.moveTo(0, 0);
        context.lineTo(0, 65);

        context.strokeStyle = "#D6A23A";
        context.lineWidth = 20;
        context.lineCap = "round";

        context.stroke();


        // Foot
        context.save();

        context.translate(0, 65);

        context.beginPath();

        context.ellipse(
            side * 5, 0,
            18, 10,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "#F2D28B";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();

        context.restore();


        context.restore();
    }


    // ==================================================
    // Draw the whole cow
    // ==================================================

    function drawCow(x, y) {

        

        context.save();

        // Walking cycle
        var walkCycle = 0;

        if (isMoving) {
            walkCycle = Math.sin(time * 5);
        }

        // Slight vertical bounce while walking
        var bounce = Math.abs(walkCycle) * 6;

        // Move the whole cow
        context.translate(x, y - bounce);

        // Face the walking direction
        context.scale(direction, 1);

        // Limb rotation
        var armAngle = walkCycle * 0.35;
        var legAngle = walkCycle * 0.30;

        drawLeg(-1, legAngle);
        drawLeg(1, -legAngle);

        drawArm(-1, -armAngle);
        drawArm(1, armAngle);

        // ------------------------------------------------
        // Body
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            0, 20,
            90, 140,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "#D6A23A";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Belly
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            0, 50,
            55, 85,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "#F2D28B";
        context.fill();


        // ------------------------------------------------
        // Left ear
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(-95, -155);
        context.lineTo(-140, -175);
        context.lineTo(-115, -130);

        context.closePath();

        context.fillStyle = "#D6A23A";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Right ear
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(95, -155);
        context.lineTo(140, -175);
        context.lineTo(115, -130);

        context.closePath();

        context.fillStyle = "#D6A23A";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Left horn
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(-70, -195);

        context.quadraticCurveTo(
            -70, -230,
            -50, -250
        );

        context.quadraticCurveTo(
            -35, -230,
            -35, -195
        );

        context.closePath();

        context.fillStyle = "#F5E6C8";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Right horn
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(35, -195);

        context.quadraticCurveTo(
            35, -230,
            50, -250
        );

        context.quadraticCurveTo(
            70, -230,
            70, -195
        );

        context.closePath();

        context.fillStyle = "#F5E6C8";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Head
        // ------------------------------------------------

        context.beginPath();

        // Top-left
        context.moveTo(-65, -200);

        context.lineTo(-25, -210);

        // Slightly flat top
        context.quadraticCurveTo(
            0, -215,
            25, -210
        );

        context.lineTo(65, -200);


        // Upper-right side
        context.lineTo(95, -160);


        // Right cheek
        context.quadraticCurveTo(
            110, -115,
            85, -70
        );


        // Lower-right
        context.lineTo(50, -30);


        // Bottom
        context.quadraticCurveTo(
            0, -10,
            -50, -30
        );


        // Lower-left
        context.lineTo(-85, -70);


        // Left cheek
        context.quadraticCurveTo(
            -110, -115,
            -95, -160
        );


        context.lineTo(-65, -200);

        context.closePath();

        context.fillStyle = "#D6A23A";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Inner left ear
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(-105, -155);
        context.lineTo(-130, -167);
        context.lineTo(-114, -140);

        context.closePath();

        context.fillStyle = "#F2B6B6";
        context.fill();


        // ------------------------------------------------
        // Inner right ear
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(105, -155);
        context.lineTo(130, -167);
        context.lineTo(114, -140);

        context.closePath();

        context.fillStyle = "#F2B6B6";
        context.fill();


        // ------------------------------------------------
        // Left eye
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            -40, -130,
            22, 28,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "white";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // Left pupil
        context.beginPath();

        context.ellipse(
            -40, -127,
            8, 12,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "black";
        context.fill();


        // ------------------------------------------------
        // Right eye
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            40, -130,
            22, 28,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "white";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // Right pupil
        context.beginPath();

        context.ellipse(
            40, -127,
            8, 12,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "black";
        context.fill();


        // ------------------------------------------------
        // Left eyebrow
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(-65, -165);

        context.quadraticCurveTo(
            -45, -180,
            -25, -165
        );

        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.stroke();


        // ------------------------------------------------
        // Right eyebrow
        // ------------------------------------------------

        context.beginPath();

        context.moveTo(25, -165);

        context.quadraticCurveTo(
            45, -180,
            65, -165
        );

        context.strokeStyle = "black";
        context.lineWidth = 4;
        context.stroke();


        // ------------------------------------------------
        // Muzzle
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            0, -60,
            60, 38,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "#F2B6B6";
        context.fill();

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // ------------------------------------------------
        // Left nostril
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            -20, -65,
            6, 4,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "black";
        context.fill();


        // ------------------------------------------------
        // Right nostril
        // ------------------------------------------------

        context.beginPath();

        context.ellipse(
            20, -65,
            6, 4,
            0,
            0,
            2 * Math.PI
        );

        context.fillStyle = "black";
        context.fill();


        // ------------------------------------------------
        // Mouth
        // ------------------------------------------------

        context.beginPath();

        if (mouthOpen) {

            context.ellipse(
                0, -45,
                20, 12,
                0,
                0,
                2 * Math.PI
            );

            context.fillStyle = "#8B3A3A";
            context.fill();

        } else {

            context.moveTo(-20, -45);
            context.lineTo(20, -45);
        }

        context.strokeStyle = "black";
        context.lineWidth = 2;
        context.stroke();


        // Restore the coordinate system
        context.restore();
    }


    function update() {

        // Assume the cow is not moving
        isMoving = false;

        // Move left
        if (keys["ArrowLeft"] || keys["a"]) {
            cowX -= speed;
            direction = -1;
            isMoving = true;
        }

        // Move right
        if (keys["ArrowRight"] || keys["d"]) {
            cowX += speed;
            direction = 1;
            isMoving = true;
        }

        // Move up
        if (keys["ArrowUp"] || keys["w"]) {
            cowY -= speed;
            isMoving = true;
        }

        // Move down
        if (keys["ArrowDown"] || keys["s"]) {
            cowY += speed;
            isMoving = true;
        }

        // Space controls the mouth
        mouthOpen = keys[" "] === true;

        // Keep the cow inside the canvas
        if (cowX < 140) {
            cowX = 140;
        }

        if (cowX > canvas.width - 140) {
            cowX = canvas.width - 140;
        }

        if (cowY < 250) {
            cowY = 250;
        }

        if (cowY > canvas.height - 170) {
            cowY = canvas.height - 170;
        }
}


    // ==================================================
    // Animation loop
    // ==================================================

    function animate() {

        // Remove the previous frame
        context.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Update time
        time += 0.02;


       update();

        // Draw the new frame
        drawCow(cowX, cowY);


        // Request the next frame
        requestAnimationFrame(animate);
    }


    // Start the animation
    animate();
};