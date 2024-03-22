document.addEventListener("DOMContentLoaded", () => {
  const ball = document.getElementById("ball");
  const objects = document.querySelectorAll(".object");
  const message = document.getElementById("message");

  let collectedObjects = 0;
  let ballX = 50;
  let ballY = 50;

  function checkCollision() {
    objects.forEach((object) => {
      if (isColliding(ball, object) && !object.classList.contains("hidden")) {
        object.classList.add("hidden");
        collectedObjects++;
        if (collectedObjects === objects.length) {
          message.innerText = "Gefeliciteerd!";
          message.style.display = "block";
        }
      } else if (
        !isColliding(ball, object) &&
        collectedObjects !== objects.length
      ) {
        object.classList.remove("hidden");
      }
    });
  }

  function isColliding(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
      aRect.top + aRect.height < bRect.top ||
      aRect.top > bRect.top + bRect.height ||
      aRect.left + aRect.width < bRect.left ||
      aRect.left > bRect.left + bRect.width
    );
  }

  function updateBallPosition() {
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
    checkCollision();
  }

  document.addEventListener("keydown", (e) => {
    const speed = 10;
    switch (e.key) {
      case "ArrowUp":
        ballY -= speed;
        break;
      case "ArrowDown":
        ballY += speed;
        break;
      case "ArrowLeft":
        ballX -= speed;
        break;
      case "ArrowRight":
        ballX += speed;
        break;
    }
    updateBallPosition();
  });

  updateBallPosition();
});
