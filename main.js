window.addEventListener('load', ()=>{
    let completeAnimate = true;

    function animate(type, el, duration, frequency = 50){
        completeAnimate = false;
        let curHeight = type === "show"?0:type==="hide"?el.scrollHeight:null;

        if (curHeight != null) {
            let animateID = setInterval(()=>{
                let pixDelta = el.scrollHeight/(duration/(1000/frequency));
            
                if (type === "show"){
                    curHeight += pixDelta;
                } else {
                    curHeight -= pixDelta;
                };

                el.style.maxHeight = curHeight + "px";

                if (Math.round(curHeight) === (type==="show"?el.scrollHeight:0)) {
                    if (type==="hide") el.style.maxHeight = 0 + "px";
                    clearInterval(animateID);
                    completeAnimate = true;
                }
            }, 1000/frequency)
        }
    
  }
  document.querySelector('.acdn .acdn__item> .acdn__inner').style.maxHeight = document.querySelector('.acdn .acdn__item> .acdn__inner').scrollHeight + "px";
  Object
    .values(document.querySelectorAll('.acdn__toggler'))
    .forEach(el=>{
        el.addEventListener('click', e=>{
            e.preventDefault();
            let item = el.parentNode,
            items = item.parentNode.children,
            content = item.querySelector('.acdn__inner'),
            duration = 100,
            frequency = 100,
            activeEl = Object
                .values(items)
                .find(el=>el.classList.contains('active')?el:null);

            if (completeAnimate === true) {
                if (!Object.is(item, activeEl)) {
                    item.classList.add('active');
                    el.querySelector('.acdn__toggler-triangle').innerHTML = "&#9650;";
                    animate('show', content, duration, frequency);
                    if (!Object.is(activeEl, undefined)){
                        animate('hide', activeEl.querySelector('.acdn__inner'), duration, frequency);
                        activeEl.classList.remove('active')
                        activeEl.querySelector('.acdn__toggler-triangle').innerHTML = "&#9660;";
                    }
                }
            }
        })
    })
})