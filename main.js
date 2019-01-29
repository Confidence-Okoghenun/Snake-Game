let $ = document.querySelector.bind(document),
  $$ = document.querySelectorAll.bind(document),
  gameGridObj,
  snakePosition,
  moveSnakeIntervalId,
  motionArr = ["up", "down", "left", "right"];

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
  let maxRval = Object.keys(gameGridObj).length,
    maxCval = Object.keys(gameGridObj.rw1).length,
    prevPosition = "",
    rwPos,
    clPos;
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
      console.log(snakePosition);
    }
  };
  move();
  moveSnakeIntervalId = setInterval(() => {
    move();
  }, 1000);
};

createLocalCopyOfGameGrid();
moveSnake(randMotion(motionArr.length), randPositon());

$$(".control").forEach(control => {
  control.addEventListener("click", e => {
    clearInterval(moveSnakeIntervalId);
    let moveDirection = e.target.getAttribute("data-direction");
    console.log(moveDirection);
    
    if (moveDirection === "up") {
      moveSnake("up", snakePosition);
    } else if (moveDirection === "right") {
      moveSnake("right", snakePosition);
    } else if (moveDirection === "down") {
      moveSnake("down", snakePosition);
    } else if (moveDirection === "left") {
      moveSnake("left", snakePosition);
    }
  });
});
