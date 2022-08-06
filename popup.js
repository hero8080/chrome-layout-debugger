
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // 取出当前标签页的 tag_id, 发送一个消息出去, 同时带上回调函数
    chrome.tabs.sendMessage(tabs[0].id, { action: "getLocalStorage" }, function (response) {
        // 回调函数，把传回的信息渲染在popup.html上
        if(response==null){
            init(true)
        }
        if(response==1){
            init(true)
        }
        if(response==0){
            init(false)
        }
    });
});
function init(isOpen){

    // let isOpen=localStorage.getItem('isOpen')
    let switchBtn=document.getElementById('switchBtn')
    if(isOpen){
        switchBtn.setAttribute('status','open')
        switchBtn.className="switch_con open"
    }

    switchBtn.onclick=function (){
        let status=this.getAttribute('status')
        if(status=='open'){
            //关闭
            this.setAttribute('status','close')
            this.className='switch_con'
            closeSwitchBtn()
        }else{
            //开启
            this.setAttribute('status','open')
            this.className="switch_con open"
            openSwitchBtn()
        }
    }

    function openSwitchBtn(){
        chrome.tabs.executeScript(null, {code:"localStorage.setItem('isOpen','1');location.reload();"});
        setTimeout(function (){
            window.close();
        },500)
    }
    function closeSwitchBtn(){

        chrome.tabs.executeScript(null, {code:"localStorage.setItem('isOpen','');location.reload();"});
        setTimeout(function (){
            window.close();
        },500)
    }

}
