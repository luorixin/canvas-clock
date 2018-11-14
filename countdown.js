var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=600;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LIFT=30;
//小球
var balls = [];
const colors = ["#33B5E5",
                "#0099CC",
                "#AA66CC",
                "#9933CC",
                "#99CC00",
                "#669900",
                "#FFBB33",
                "#FF8800",
                "#FF4444",
                "#CC0000"]
const endTime=new Date("2018/11/15,00:00:00");
var curShowTimeSeconds=0;


window.onload=function () {

    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();
    // render(context);
    setInterval(function () {
        render(context);
        updata();
    },50)
};

function updata() {
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nextHours=parseInt(nextShowTimeSeconds/3600);
    var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
    var nextSeconds=nextShowTimeSeconds%60;

    var curHours=parseInt(curShowTimeSeconds/3600);
    var curMinutes=parseInt((curShowTimeSeconds-curHours * 3600)/60);
    var curSeconds=curShowTimeSeconds%60;

    if(nextSeconds!=curSeconds){
         //小球
         if( parseInt(curHours/10) != parseInt(nextHours/10) ){
             addBalls( MARGIN_LIFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
         }
         if( parseInt(curHours%10) != parseInt(nextHours%10) ){
             addBalls( MARGIN_LIFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours%10) );
         }
    
         if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
             addBalls( MARGIN_LIFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
         }
         if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
             addBalls( MARGIN_LIFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
         }
    
         if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
             addBalls( MARGIN_LIFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
         }
         if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
             addBalls( MARGIN_LIFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
         }
    
         //更新时间
         curShowTimeSeconds=nextShowTimeSeconds;
     }
     //更新小球的速度
     updateBalls();


}
function addBalls( x , y , num ){
    console.log("addBalls");
    for( var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                };
                balls.push(aBall);
            }
}

function updateBalls(){
    for( var i = 0 ; i < balls.length ; i ++ ){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    var cnt=[];
    for(var i=0;i<balls.length;i++){
        if(balls[i].x-RADIUS>0&&balls[i].x+RADIUS<WINDOW_WIDTH){
            cnt.push(balls[i]);
        }
    }
    balls=cnt;
}

function getCurrentShowTimeSeconds() {
    var curTime=new Date();
    //倒计时
    // var ret=endTime.getTime()-curTime.getTime();
    // ret=Math.round(ret/1000);
    // return ret>=0?ret:0;
    //当前时钟
    var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
    return ret;

}

function render(cxt) {

    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//对整个画布进行刷新，防止新画的跟以前画的叠加
    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours * 3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit(MARGIN_LIFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LIFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
    renderDigit(MARGIN_LIFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
    renderDigit(MARGIN_LIFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LIFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LIFT+69*(RADIUS+1),MARGIN_TOP,parseInt(10),cxt);
    renderDigit(MARGIN_LIFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LIFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
    
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();
    
        cxt.fill();
    }

}

function renderDigit(x,y,num,cxt) {
    cxt.fillStyle="rgb(0,102,153)";

    for(var i=0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
	            cxt.beginPath();
	            cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
	            cxt.closePath();

	            cxt.fill()
            }
}