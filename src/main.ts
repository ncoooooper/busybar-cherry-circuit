import {surface,panel,rect,read,persist,type Frame} from "@shared/surface";
const names=["Cherries","Seven","Bell","Orange","BAR"];let reels=[0,1,2],targets=reels.slice(),step=0,spins=0,wins=read("wins",0),playing=false,result="Ready";
let finishStep=4;
let timer:ReturnType<typeof setTimeout>|undefined;
type Stroke=[number,number,number,number,string];
const red="#FF6276FF",leaf="#7FDE8CFF",gold="#FFD279FF",cream="#FFF0CFFF",orange="#FF9953FF";
const shapes:Stroke[][]=[
 [[3,5,4,4,red],[2,6,6,2,red],[8,6,4,4,red],[7,7,6,2,red],[5,3,1,3,leaf],[6,2,4,1,leaf],[9,3,1,3,leaf]],
 [[2,2,10,2,gold],[9,4,2,2,gold],[7,6,2,2,gold],[5,8,2,2,gold],[4,10,2,1,gold]],
 [[6,1,2,2,gold],[4,3,6,2,gold],[3,5,8,3,gold],[2,8,10,2,gold],[6,10,2,1,cream]],
 [[7,1,3,2,leaf],[4,3,6,1,orange],[2,4,10,5,orange],[4,9,6,1,orange],[3,4,2,2,cream]],
 [[1,3,12,1,cream],[1,8,12,1,cream],[2,5,2,2,red],[6,5,2,2,red],[10,5,2,2,red]]];
// Cache the two vertical positions of each symbol. Each window is one native image.
const paint = [red, leaf, gold, cream, orange];
const inks = ["r", "g", "y", "w", "o"];
function symbolImage(symbol: Stroke[], offset: number) {
  const pixels = Array.from({length: 14}, () => Array<string>(18).fill("."));
  for (const [x, y, width, height, color] of symbol) {
    for (let row = 1 + y + offset; row < 1 + y + offset + height && row < 14; row++) {
      for (let col = x + 2; col < x + 2 + width && col < 18; col++) {
        pixels[row][col] = inks[paint.indexOf(color)];
      }
    }
  }
  return ["! XPM2", "18 14 6 1", ". c #262731",
    ...inks.map((ink, index) => ink + " c " + paint[index].slice(0, 7)),
    ...pixels.map(row => row.join(""))].join("\n");
}
const pictures = shapes.map(symbol => [symbolImage(symbol, 0), symbolImage(symbol, 1)]);
function draw(): Frame {
 const f: Frame = [];
 for (let n = 0; n < reels.length; n++) {
   const x = 4 + n * 23;
   const offset = playing && step < 8 + n * 4 ? step % 2 : 0;
   f.push({id: "reel" + n, type: "xpmbitmap", x, y: 1, z_index: 1, data: pictures[reels[n]][offset]});
 if (!playing && result !== "Ready") {
   const matched = reels.some((symbol, index) => index !== n && symbol === reels[n]);
   if (matched) {
     const width = [4, 9, 15, 18, 18][finishStep];
     const ink = result === "Triple!" ? gold : "#9DF3A6FF";
     f.push({...rect("win" + n, x + Math.floor((18 - width) / 2), 14, width, 1, ink), z_index: 2});
     if (result === "Triple!" && finishStep < 4) {
       f.push({...rect("glint" + n, x + (finishStep * 4 + n * 3) % 15, 1, 3, 1, cream), z_index: 2});
     }
   } else if (result === "Miss" && finishStep < 3) {
     f.push({...rect("settle" + n, x + 7, 14, 4, 1, ["#C89767FF", "#856B58FF", "#504947FF"][finishStep]), z_index: 2});
   }
 }
 }

 return [...f,...panel("CHERRY CIRCUIT",[result,reels.map(v=>names[v]).join(" / "),"Pair: one matching pair","Triple: all three match","Spins "+spins+" / wins "+wins,"Click: spin"])];
}
function finish() {
  const size = new Set(reels).size;
  playing = false;
  result = size === 1 ? "Triple!" : size === 2 ? "Pair!" : "Miss";
  if (size < 3) {
    wins++;
    persist("wins", wins);
  }
  finishStep = 0;
  function settle() {
    timer = undefined;
    refresh();
    if (finishStep < 4) timer = setTimeout(() => { finishStep++; settle(); }, 80);
  }
  settle();
}
function spin() {
  if (playing) return;
  if (timer !== undefined) clearTimeout(timer);
  playing = true;
  spins++;
  step = 0;
  targets = reels.map(() => Math.floor(Math.random() * names.length));
  result = "Spinning";
  function tick() {
    timer = undefined;
    step++;
    for (let n = 0; n < 3; n++) {
      reels[n] = step >= 8 + n * 4 ? targets[n] : (reels[n] + 1) % names.length;
    }
    if (step === 16) { finish(); return; }
    refresh();
    timer = setTimeout(tick, 48 + step * 4);
  }
  tick();
}
const refresh=surface(draw,k=>{if(k==="ok"||k==="start")spin();},()=>{if(timer!==undefined)clearTimeout(timer);},{enabled:false});
