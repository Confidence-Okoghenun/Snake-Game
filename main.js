let gameGridObj,
  snakeMotion,
  snakePosition,
  moveSnakeIntervalId,
  firstPlayClickCoounter = 0,
  $ = document.querySelector.bind(document),
  motionArr = ["up", "down", "left", "right"],
  $$ = document.querySelectorAll.bind(document),
  playBtn = $(".play"),
  pauseBtn = $(".pause");

const createLocalCopyOfGameGrid = () => {
  let gridObj = {};
  $$(".play-area table tr").forEach((tr, i) => {
    i += 1;
    gridObj[`rw${i}`] = {};
    Array.from(tr.children).forEach((td, n) => {
      n += 1;
      gridObj[`rw${i}`][`cl${n}`] = td;
    });
  });
  return (gameGridObj = gridObj);
};
createLocalCopyOfGameGrid();

const randMotion = max => {
  let i = Number(Math.floor(Math.random() * Math.floor(max)));
  return motionArr[i];
};

const randPositon = () => {
  let min = Math.ceil(1);
  max1 = Math.floor(Object.keys(gameGridObj).length);
  max2 = Math.floor(Object.keys(gameGridObj.rw1).length);
  let rw = Number(Math.floor(Math.random() * (max1 - min + 1)) + min);
  let cl = Number(Math.floor(Math.random() * (max2 - min + 1)) + min);
  return [rw, cl];
};

const moveSnake = (direction, newPosition) => {
  let rwPos,
    clPos,
    prevPosition = "",
    maxRval = Object.keys(gameGridObj).length,
    maxCval = Object.keys(gameGridObj.rw1).length;

  [rwPos, clPos] = newPosition;

  const move = () => {
    let position = gameGridObj[`rw${rwPos}`][`cl${clPos}`];
    snakePosition = [rwPos, clPos];
    if (position) {
      position.classList.add("black");
      if (prevPosition) {
        prevPosition.classList.remove("black");
      }
      prevPosition = position;
      if (direction === "up") {
        rwPos > 1 ? rwPos-- : (rwPos = maxRval);
      } else if (direction === "right") {
        clPos <= maxCval - 1 ? clPos++ : (clPos = 1);
      } else if (direction === "down") {
        rwPos <= maxRval - 1 ? rwPos++ : (rwPos = 1);
      } else if (direction === "left") {
        clPos > 1 ? clPos-- : (clPos = maxCval);
      }
      console.log(direction, snakePosition);
    }
  };
  move();
  moveSnakeIntervalId = setInterval(() => {
    move();
  }, 1000);
};


$$(".control").forEach(control => {
  control.addEventListener("click", e => {
    clearInterval(moveSnakeIntervalId);
    let moveDirection = e.target.getAttribute("data-direction");
    console.log(moveDirection);

    e.target.style.border = "2px solid rgba(0, 0, 0, 0.5)";
    e.target.style.borderRadius = "50%";

    setTimeout(() => {
      e.target.style.border = "unset";
      e.target.style.borderRadius = "unset";
    }, 100);

    if (moveDirection === "up") {
      snakeMotion = "up";
      moveSnake("up", snakePosition);
      readyPauseSnakeMotion();
    } else if (moveDirection == "right") {
      snakeMotion = "right";
      moveSnake("right", snakePosition);
      readyPauseSnakeMotion();
    } else if (moveDirection === "down") {
      snakeMotion = "down";
      moveSnake("down", snakePosition);
      readyPauseSnakeMotion();
    } else if (moveDirection === "left") {
      snakeMotion = "left";
      moveSnake("left", snakePosition);
      readyPauseSnakeMotion();
    } else if (moveDirection === "play") {
      if (firstPlayClickCoounter === 0) {
        snakeMotion = randMotion(motionArr.length);
        moveSnake(snakeMotion, randPositon());
        firstPlayClickCoounter++;
      } else {
        moveSnake(snakeMotion, snakePosition);
      }
      readyPauseSnakeMotion();
    } else if (moveDirection === "pause") {
      pauseBtn.classList.add("hide");
      playBtn.classList.remove("hide");
    }

    function readyPauseSnakeMotion() {
      if (pauseBtn.classList.contains("hide")) {
        pauseBtn.classList.remove("hide");
        playBtn.classList.add("hide");
      }
    }
  });
});
