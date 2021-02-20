var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

//New variables
var LEFT_ARROW_SELECTOR = '[data-image-role="left"]';
var RIGHT_ARROW_SELECTOR = '[data-image-role="right"]';
var CURR_INDEX; // acts as a marker that points to current thumbnail displayed

function setDetails(imageURL, titleText) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        CURR_INDEX = thumb; //saves clicked "target" image as CURR_INDEX
        showDetails();
    });
}

//This function adds functionality to the arrow buttons
function addArrowClickHandler(thumbnails) {
    'use strict';
    var leftArrow = document.querySelector(LEFT_ARROW_SELECTOR);
    var rightArrow= document.querySelector(RIGHT_ARROW_SELECTOR);
    leftArrow.addEventListener("click", function(){ 
        console.log("Left!");
        var i;
        for (i = 0; i < thumbnails.length; i++){
            if(thumbnails[i] === CURR_INDEX){
                console.log(i);
                if((i-1) < 0){
                    setDetailsFromThumb(thumbnails[thumbnails.length-1]);
                    CURR_INDEX = thumbnails[thumbnails.length-1];
                    return;
                }
                else{
                    setDetailsFromThumb(thumbnails[i-1]);
                    CURR_INDEX = thumbnails[i-1];
                    return;
                }
            }
        }
    });
    rightArrow.addEventListener("click", function(){ 
        console.log("Right!");
        var i;
        for (i = 0; i < thumbnails.length; i++){
            if(thumbnails[i] === CURR_INDEX){
                console.log(i);
                if((i+1) >= thumbnails.length){
                    setDetailsFromThumb(thumbnails[0]);
                    CURR_INDEX = thumbnails[0];
                    return;
                }
                else{
                    setDetailsFromThumb(thumbnails[i+1]);
                    CURR_INDEX = thumbnails[i+1];
                    return;
                }
            }
        }
    });  
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS)
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler () {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) { 
            hideDetails(); }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);

    //Initialize current/marker variable with index of first element in thumbnail array
    CURR_INDEX = thumbnails[0];

    addKeyPressHandler();

    //Initializes arrow button functionality
    addArrowClickHandler(thumbnails);
}

initializeEvents();

