/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function(exports) {

    // Enable strict mode
    "use strict";


    var picturefill = function() {
        var ps = document.getElementsByTagName("span"),
            mediaList,
            sources,
            matches,
            hasMatch,
            picImg,
            media;

        // Loop the pictures
        for (var i = 0, il = ps.length; i < il; i++) {
            if (ps[i].getAttribute("data-picture") !== null) {

                sources = ps[i].getElementsByTagName("span"),
                matches = [];

                // See if which sources match
                for (var j = 0, jl = sources.length; j < jl; j++) {
                    media = sources[j].getAttribute("data-media");
                    mediaList = [];

                    if (media) {
                        mediaList = media.split(',');
                        hasMatch = true;

                        for (var k = 0, kl = mediaList.length; k < kl; k++) {
                            if (window.matchMedia && !window.matchMedia(mediaList[k]).matches) {
                                hasMatch = false;
                                break;
                            }
                        }

                        if(hasMatch){
                            console.log(media);
                        }
                        //console.log(media, hasMatch);
                    }

                    // if there's no media specified, OR window.matchMedia is supported
                    if (hasMatch || !media) {
                        matches.push(sources[j]);
                    }
                }

                //console.log(matches.concat());

                // Find any existing img element in the picture element
                picImg = ps[i].getElementsByTagName("img")[0];

                if (matches.length) {

                    //console.dir(matches);
                    var matchedEl = matches.pop();
                    if (!picImg || picImg.parentNode.nodeName === "NOSCRIPT") {
                        picImg = document.createElement("img");
                        picImg.alt = ps[i].getAttribute("data-alt");
                    }
                    if (picImg.src !== matchedEl.getAttribute("data-src")) {
                        picImg.src = matchedEl.getAttribute("data-src");
                    }
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
        window.addEventListener("DOMContentLoaded", function() {
            picturefill();
            // Run once only
            window.removeEventListener("load", picturefill, false);
        }, false);
        window.addEventListener("load", picturefill, false);
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
