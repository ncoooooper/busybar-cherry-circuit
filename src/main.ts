import {surface,panel,rect,read,persist,type Frame} from "@shared/surface";
const names=["Cherries","Seven","Bell","Orange","BAR"];let reels=[0,1,2],targets=reels.slice(),step=0,spins=0,wins=read("wins",0),playing=false,result="Ready";
let timer:ReturnType<typeof setTimeout>|undefined;
type Stroke=[number,number,number,number,string];
const red="#FF6276FF",leaf="#7FDE8CFF",gold="#FFD279FF",cream="#FFF0CFFF",orange="#FF9953FF";
const shapes:Stroke[][]=[
 [[3,5,4,4,red],[2,6,6,2,red],[8,6,4,4,red],[7,7,6,2,red],[5,3,1,3,leaf],[6,2,4,1,leaf],[9,3,1,3,leaf]],
 [[2,2,10,2,gold],[9,4,2,2,gold],[7,6,2,2,gold],[5,8,2,2,gold],[4,10,2,1,gold]],
 [[6,1,2,2,gold],[4,3,6,2,gold],[3,5,8,3,gold],[2,8,10,2,gold],[6,10,2,1,cream]],
 [[7,1,3,2,leaf],[4,3,6,1,orange],[2,4,10,5,orange],[4,9,6,1,orange],[3,4,2,2,cream]],
 [[1,3,12,1,cream],[1,8,12,1,cream],[2,5,2,2,red],[6,5,2,2,red],[10,5,2,2,red]]];
function draw():Frame{const f:Frame=[];
 for(let n=0;n<3;n++){const x=4+n*23;f.push(rect("base"+n,x,1,18,14,"#262731FF"));
 const offset=playing&&step<8+n*4?step%2:0;
 shapes[reels[n]].forEach(([dx,dy,w,h,color],i)=>f.push({...rect("tile"+n+"-"+i,x+2+dx,2+offset+dy,w,h,color),z_index:2}));

 if(!playing&&result!=="Ready"&&result!=="Miss")f.push(rect("win"+n,x,14,18,1,"#9DF3A6FF"));}
 return [...f,...panel("CHERRY CIRCUIT",[result,reels.map(v=>names[v]).join(" / "),"Pair: one matching pair","Triple: all three match","Spins "+spins+" / wins "+wins,"Click: spin"])];
}
function spin(){if(playing)return;playing=true;spins++;step=0;targets=reels.map(()=>Math.floor(Math.random()*names.length));result="Spinning";
 function tick(){timer=undefined;step++;for(let n=0;n<3;n++)reels[n]=step>=8+n*4?targets[n]:(reels[n]+1)%names.length;
 if(step>=16){playing=false;const size=new Set(reels).size;result=size===1?"Triple!":size===2?"Pair!":"Miss";if(size<3){wins++;persist("wins",wins);}}
 refresh();if(playing)timer=setTimeout(tick,48+step*4);}
 tick();}
const refresh=surface(draw,k=>{if(k==="ok"||k==="start")spin();},()=>{if(timer!==undefined)clearTimeout(timer);},{enabled:false});
