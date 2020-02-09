window.addEventListener('load', ()=>{
    let completeAnimate = true;

    function animate(type, el, duration, frequency = 50){
        // console.time('run_time');
        completeAnimate = false;
        let curHeight = type === "show"?0:type==="hide"?el.scrollHeight:null;
        // console.log('f:', curHeight);
        if (curHeight != null) {
            let animateID = setInterval(()=>{
                let pixDelta = el.scrollHeight/Math.floor(duration/(1000/frequency));
            
                if (type === "show"){
                    curHeight += pixDelta;
                } else {
                    curHeight -= pixDelta;
                    // console.log(curHeight, pixDelta);
                };

                el.style.maxHeight = curHeight + "px";

                if (Math.round(curHeight) === (type==="show"?el.scrollHeight:0)) {
                    if (type==="hide") el.style.maxHeight = 0 + "px";
                    clearInterval(animateID);
                    completeAnimate = true;
                    // console.timeEnd('run_time');
                }
            }, 1000/frequency)
        } 
    }

    document.querySelector('.acdn .acdn__item> .acdn__inner').style.maxHeight = document.querySelector('.acdn .acdn__item> .acdn__inner').scrollHeight + "px";
    document.querySelector('.acdn .acdn__item').classList.add('active');

    document.querySelector('.acdn').addEventListener('click', e=>{
        e.preventDefault();
        if(e.target.classList.contains('acdn__toggler') || e.target.parentNode.classList.contains('acdn__toggler')){
            let el = e.target.classList.contains('acdn__toggler')?e.target:e.target.parentNode;
            let item = el.parentNode,
            items = item.parentNode.children,
            content = item.querySelector('.acdn__inner'),
            duration = 300,
            frequency = 10,
            activeEl = Object
                .values(items)
                .find(el=>el.classList.contains('active')?el:null);

            if (completeAnimate === true) {
                if (!Object.is(item, activeEl)) {
                    if (activeEl){
                        activeEl.classList.remove('active')
                        activeEl.querySelector('.acdn__toggler-triangle').innerHTML = "&#9660;";
                        animate('hide', activeEl.querySelector('.acdn__inner'), duration, frequency);
                    }
                    animate('show', content, duration, frequency);
                    item.classList.add('active');
                    el.querySelector('.acdn__toggler-triangle').innerHTML = "&#9650;";
                }
            }
        } else {console.log(e.target);}
    })
})