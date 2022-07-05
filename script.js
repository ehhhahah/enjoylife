const CIRCLE_RADIUS = 100
const SHADOW_OFFSET = 30

function getPosWithinViewport(maxPos) {
    return Math.floor(Math.random() * (maxPos - CIRCLE_RADIUS - SHADOW_OFFSET));
}

function randomWidthPos() {
    var actualWidth = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth ||
                      document.body.offsetWidth;

    return getPosWithinViewport(actualWidth);
}

function randomHeightPos() {
    var actualHeight = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight ||
                       document.body.offsetHeight;


    return getPosWithinViewport(actualHeight);
}

function reorderCircles() {
    const elements = document.getElementsByClassName('shadow-circle');
    
    for (let i=0; i<elements.length; i++) {
        elements[i].style = `
        margin-left: ${randomWidthPos()}px; 
        margin-right: ${randomWidthPos()}px; 
        margin-top: ${randomHeightPos()}px; 
        margin-bottom: ${randomHeightPos()}px;`
    }
}

window.onload = reorderCircles
