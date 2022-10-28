draw.js

const canvas = document.getElementById("canvas");//캔버스 설정
canvas.width = window.innerWidth -0;//innerwidth는 창 틀을 뺀 내용과 스크롤을 포함한 크기로 캔버스의 넓이를 이로 설정
canvas.height =600;//캔버스의 높이는 600으로 설정

let context = canvas.getContext("2d");//2d로 설정
let start_background_color ="white";//시작 배경 색깔은 white
context.fillStyle = start_background_color;//직사각형 채우기 색깔은 white로 설정
context.fillRect(0,0,canvas.width, canvas.height);//위의 색깔로 칠해진 직사각형을 그림
 
let draw_color ="black";//초기 펜 설정은 검정
let draw_width = "2";//초기 펜 굵기는 2
let isdrawing = false;//그림 그리는 걸 제어하는 변수 isdrawing을 선언
let restore_array =[];//빈 배열을 만듬
let index = -1;//이전으로 돌리기

function change_color(element){
    draw_color = element.style.background;//컬러변경 함수, 색깔을 변경하게 되면 draw_color 변수에 바뀐 색이 들어가게 됨
}
//이벤트 리스너들
canvas.addEventListener("mousedown",start, false);//마우스를 누르고 있을 때의 이벤트 리스너, start 함수 사용
canvas.addEventListener("mousemove",draw, false);//마우스를 움직이고 있을 때의 이벤트 리스너, draw 함수 사용
canvas.addEventListener("mouseup",stop, false);//눌렀던 마우스를 뗄 때의 이벤트 리스너, stop 함수 사용
canvas.addEventListener("mouseout",stop, false);//요소 바깥으로 마우스를 움직였을 때 이벤트 리스너, 마찬가지로 stop 함수 사용
// 이미지 그리는 부분
function start(event){//그림을 그리기 시작하는 함수
    isdrawing = true;//isdrawing에 true 넣음
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                   event.clientY - canvas.offsetTop);
    event.preventDefault();//submit과 동시에 창이 다시 실행되는 것을 막아줌    
    if(event.type != 'mouseout'){// 이전것 저장해두기 
    restore_array.push(context.getImageData(0,0,canvas.width, canvas.height));
    index += 1;
    }
    console.log(restore_array);// 이벤트가 마우스아웃이 아닐때 마우스가 안에 있을때 위치값 저장.
}

function draw(event){//그림을 그리는 함수
    if(isdrawing){//isdrawing이 true인 한, isdrawing의 초기값은 false이고 true를 집어넣는 건 start 함수 내이므로 draw 함수는 무조건 start 함수 뒤에 실행됨
        context.lineTo(event.clientX - canvas.offsetLeft,//브라우저에서 사용자에게 웹페이지가 보여지는 영역을 기준으로 x좌표를 표시        
                       event.clientY - canvas.offsetTop);//위와 마찬가리로 y좌표 표시
        context.strokeStyle = draw_color;//선 색 지정
        context.lineWidth =draw_width;//선 두께 지정
        context.lineCap ="round";//선 끝 부분의 스타일을 round로 지정
        context.lineJoin ="round";//선이 꺾이는 부분의 스타일을 round로 지정
        context.stroke();//지금까지 온 곳 까지 선 그음
    }
}  
function stop(event){//그림 그리는 걸 멈추는 함수
    if (isdrawing){//is_drawing이 true인 이상 유지
        context.stroke();
        context.closePath();
        isdrawing =false;//다시 isdrawing에 false넣음
    }
    event.preventDefault();
}

function clear_canvas(){// 지우기버튼을 정의하는 함수
    context.fillStyle = start_background_color;
    context.clearRect(0,0,canvas.width, canvas.height);//배경을 지움
    context.fillRect(0,0,canvas.width, canvas.height);
    restore_array=[];
    index =-1;
}

