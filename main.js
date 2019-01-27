let $ = document.querySelector.bind(document),
 $$ = document.querySelectorAll.bind(document);

 let gameGridObj;
 const createLocalCopyOfGameGrid = () => {
  let gridObj = {};
   $$('.play-area table tr').forEach((tr, i) => {
     i += 1;
     gridObj[`rw${i}`] = {};
     Array.from(tr.children).forEach((td, n) => {
      n += 1;
      gridObj[`rw${i}`][`cl${n}`] = td
    })
   });
   return gameGridObj = gridObj;
 }
 createLocalCopyOfGameGrid();
 console.log(gameGridObj)

 const moveSnake =() => {

  let maxRow = Object.keys(gameGridObj).length,
  maxCol = Object.keys(gameGridObj.rw1).length;

  // console.log(maxCol, maxRow)

   setInterval(() => {
     let position = gameGridObj[`rw${maxRow}`][`cl${maxCol}`];
     if(position) {
      position.classList.add('black');
      // maxRow > 1 ?  maxRow-- : maxRow;
      maxCol > 1 ?  maxCol-- : maxCol;
     }
  
   }, 1000)
 }
 moveSnake()