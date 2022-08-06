function once(fn){
    let caller=true
    return function (){
        if(caller){
            caller=false
            fn.apply(this,arguments)
        }
    }
}

var loadLayoutDebugger=once(function (){

    let isOpen=localStorage.getItem('isOpen')
    if(isOpen===''){
        return
    }
    //创建样式标签
    let htmlStyleElement = document.createElement('style');
    htmlStyleElement.innerHTML = `
        root_html *{
            box-shadow: 0 0 0 1px red;
        }
        #css_debugger{
            color: #979797;
            background-color: #ffffff;
            width: 50px;
            height: 50px;
            position: fixed;
            right:80px;
            bottom:80px;
            border-radius: 50px;
            z-index: 10;
            box-shadow: 0px 2px 20px 0px #bfbfbf;
            cursor: pointer;
        }
        #css_debugger[status=open]{
            color:dodgerblue
        }
        #css_debugger>div{
            position: absolute;
            background-color: currentColor;
            width: 100%;
            height: 100%;
            -webkit-mask-position: center;
            -webkit-mask-size: 26px;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-image: url("data:image/svg+xml,%3C?xml version='1.0' standalone='no'?%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg t='1621917433148' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1225' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='200'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C/style%3E%3C/defs%3E%3Cpath d='M1021.632671 584.711228c0 11.280461-4.042431 21.051002-12.127294 29.311622-8.076874 8.252632-17.64769 12.382942-28.69647 12.382942h-142.899152c0 74.265697-14.244378 137.234955-42.741123 188.899785l132.689217 136.16443c8.076874 8.260621 12.119305 18.031162 12.119305 29.319611 0 11.280461-4.042431 21.051002-12.119305 29.303633-7.653457 8.252632-17.216284 12.382942-28.704459 12.382943-11.488175 0-21.051002-4.13031-28.704459-12.382943l-126.313998-128.327225a123.749531 123.749531 0 0 1-9.554838 8.468335c-4.250145 3.467224-13.181842 9.650706-26.7871 18.550446a400.280602 400.280602 0 0 1-41.478862 23.759271c-14.044653 6.950426-31.47664 13.245754-52.295961 18.885984-20.82731 5.64023-41.454895 8.468335-61.898733 8.468334V376.206449H470.471911v583.691947c-21.69811 0-43.276386-2.931961-64.758793-8.803872-21.474418-5.863922-39.968942-13.030051-55.483569-21.506374a533.417202 533.417202 0 0 1-42.086026-25.397015c-12.550711-8.444368-21.809956-15.49865-27.769746-21.170837L270.826928 873.888877l-116.727205 134.830267c-8.516269 9.107454-18.726204 13.66917-30.621817 13.669171-10.201947 0-19.349346-3.467224-27.434209-10.41765-8.084863-7.813237-12.438865-17.471932-13.062007-28.976084-0.631131-11.504153 2.660335-21.610231 9.874398-30.310247l128.854499-147.876296c-24.662027-49.507802-36.989047-109.001847-36.989046-178.490125H41.822388c-11.04878 0-20.611607-4.13031-28.696469-12.382942S0.998624 595.911798 0.998624 584.623349c0-11.280461 4.042431-21.051002 12.127295-29.303634 8.084863-8.260621 17.655679-12.382942 28.696469-12.382942h142.899153V351.40062L74.361565 238.707857c-8.084863-8.252632-12.119305-18.023173-12.119306-29.311622 0-11.280461 4.034442-21.051002 12.119306-29.303634 8.084863-8.260621 17.655679-12.382942 28.704459-12.382942s20.611607 4.122321 28.704458 12.382942l110.351987 112.692763h538.426302l110.359976-112.692763c8.084863-8.260621 17.655679-12.382942 28.69647-12.382942 11.056769 0 20.619596 4.122321 28.704459 12.382942 8.084863 8.252632 12.127294 18.023173 12.127294 29.303634 0 11.28845-4.042431 21.058991-12.127294 29.319611l-110.359976 112.684774v191.536153h142.899152c11.04878 0 20.611607 4.122321 28.704459 12.382942 8.076874 8.252632 12.119305 18.023173 12.119305 29.303634l-0.039945 0.07989zM715.430474 209.484114H307.160877c0-57.760433 19.884608-106.940686 59.645836-147.548748C406.57593 21.327305 454.733591 1.027269 511.295675 1.027269c56.562084 0 104.719746 20.300036 144.488963 60.908097 39.761228 40.608061 59.645836 89.796303 59.645836 147.548748z' p-id='1226' data-spm-anchor-id='a313x.7781069.0.i0'%3E%3C/path%3E%3C/svg%3E");
        }
    `;
    document.head.appendChild(htmlStyleElement)


    //只执行一次

    //创建一个debugger按钮
    let htmlDivElement = document.createElement('div');
    //给按钮添加样式
    htmlDivElement.id='css_debugger'
    //设置位置
    let layoutDebuggerPosition=localStorage.getItem('layout_debugger')
    if(layoutDebuggerPosition){
        layoutDebuggerPosition=JSON.parse(layoutDebuggerPosition)
        htmlDivElement.style.left=layoutDebuggerPosition.left
        htmlDivElement.style.top=layoutDebuggerPosition.top
    }
    htmlDivElement.setAttribute('status','close')
    htmlDivElement.innerHTML='<div></div>'
    //给按钮添加事件
    let firstTime = 0;
    htmlDivElement.onclick=function (){
        let lastTime = new Date().getTime();
        if((lastTime - firstTime) > 200){
            return
        }
        //响应样式变化
        //开启状态，执行关闭
        let cssText = '*{box-shadow: 0 0 0 1px red;}'
        let cssLayoutDebugger = document.getElementById('css_layout_debugger');
        if(!cssLayoutDebugger){
            cssLayoutDebugger = document.createElement('style');
            cssLayoutDebugger.id='css_layout_debugger'
            document.head.appendChild(cssLayoutDebugger)
        }
        if(this.getAttribute('status')=='open'){
            this.setAttribute('status','close')
            cssLayoutDebugger.innerHTML=''
        }else{
            this.setAttribute('status','open')
            cssLayoutDebugger.innerHTML=cssText
        }
        //关闭状态，执行开启
    }
    document.body.appendChild(htmlDivElement)
    htmlDivElement.onmousedown=function (event){
        firstTime = new Date().getTime();

        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;
        if ( htmlDivElement.setCapture ) {
            htmlDivElement.setCapture();
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;

            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if ( L < 0 ) {
                L = 0;
            } else if ( L > document.documentElement.clientWidth - htmlDivElement.offsetWidth ) {
                L = document.documentElement.clientWidth - htmlDivElement.offsetWidth;
            }

            if ( T < 0 ) {
                T = 0;
            } else if ( T > document.documentElement.clientHeight - htmlDivElement.offsetHeight ) {
                T = document.documentElement.clientHeight - htmlDivElement.offsetHeight;
            }

            htmlDivElement.style.left = L + 'px';
            htmlDivElement.style.top = T + 'px';

        }

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if ( htmlDivElement.releaseCapture ) {
                htmlDivElement.releaseCapture();
            }

            //存储位置
            localStorage.setItem('layout_debugger',JSON.stringify({left:htmlDivElement.style.left,top:htmlDivElement.style.top}))
        }

        return false;
    }

    window.onresize=function (){
        let position={
            top:0,
            left:0,
        }
        let layoutDebuggerPosition=localStorage.getItem('layout_debugger')
        if(layoutDebuggerPosition){
            layoutDebuggerPosition=JSON.parse(layoutDebuggerPosition)
            position={
                top:parseInt(layoutDebuggerPosition.top),
                left:parseInt(layoutDebuggerPosition.left),
            }
        }
        if(position.top>0&&position.left>0){
            if(innerHeight<position.top||innerWidth<position.left){
                htmlDivElement.style.left='initial'
                htmlDivElement.style.top='initial'
                localStorage.setItem('layout_debugger','')
            }
        }
    }

    console.log('layoutDebugger has loaded.')
})
loadLayoutDebugger();
//和poput交互
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "getLocalStorage") {
            //收到search信息，获取当前页面id为 articleContentId 的元素
            sendResponse(localStorage.getItem('isOpen'));
        }
    }
);
