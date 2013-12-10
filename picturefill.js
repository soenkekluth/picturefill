/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function(exports) {

    // Enable strict mode
    "use strict";


    var initCompleteListener = function(picImg, picElem){
        var onComplete = function(event) {
            event.target.removeEventListener("load", onComplete);
            try{
                var evt = document.createEvent("Event");
                evt.initEvent("load", true, true);
                picElem.dispatchEvent(evt);
            }catch(e){
                console.log("Error:", e);
            }
        };

        picImg.addEventListener("load", onComplete, false);
    }


    var picturefill = function() {

        var ps = document.getElementsByTagName("span");

        // Loop the pictures
        for (var i = 0, il = ps.length; i < il; i++) {
            if (ps[i].getAttribute("data-picture") !== null) {

                var sources = ps[i].getElementsByTagName("span"),
                matches = [];

                // See if which sources match
                for (var j = 0, jl = sources.length; j < jl; j++) {
                    var media = sources[j].getAttribute("data-media");
                    // if there's no media specified, OR window.matchMedia is supported
                    if (!media || (window.matchMedia && window.matchMedia(media).matches)) {
                        matches.push(sources[j]);
                    }
                }

                // Find any existing img element in the picture element
                var picImg = ps[i].getElementsByTagName("img")[0];

                if (matches.length) {
                    var matchedEl = matches.pop();
                    if (!picImg || picImg.parentNode.nodeName === "NOSCRIPT") {
                        picImg = document.createElement("img");
                        picImg.alt = ps[i].getAttribute("data-alt");
                    } else if (matchedEl === picImg.parentNode) {
                        // Skip further actions if the correct image is already in place
                        continue;
                    }



                    initCompleteListener(picImg,ps[i] );

                    picImg.removeAttribute("width");
                    picImg.removeAttribute("height");
                    picImg.src = matchedEl.getAttribute("data-src");

                    matchedEl.appendChild(picImg);

                } else if (picImg) {
                    picImg.parentNode.removeChild(picImg);
                }
            }
        }
    };

    // Run on resize and domready (w.load as a fallback)
    if (window.addEventListener) {
        window.addEventListener("resize", picturefill, false);
        // window.addEventListener("DOMContentLoaded", function() {
        //     picturefill();
        //     // Run once only
        //     window.removeEventListener("load", picturefill, false);
        // }, false);
        // window.addEventListener("load", picturefill, false);
    } else if (window.attachEvent) {
        window.attachEvent("onload", picturefill);
    }

    if (document.readyState == "complete" || document.readyState == "loaded") {
        picturefill();
    }

    (typeof module != "undefined" && module.exports) ? (module.exports = picturefill) : (typeof define != "undefined" ? (define(function() {
        return picturefill;
    })) : (exports.picturefill = picturefill));

})(this);
