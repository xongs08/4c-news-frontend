var purecookieTitle = "Cookies.";
var purecookieDesc = "By using this website, you automatically accept that we use cookies.";
var purecookieLink = '<a href="https://www.cssscript.com/privacy-policy/" target="_blank">What for?</a>';
var purecookieButton = "Understood";

function pureFadeIn(elementId, displayType) {
    var element = document.getElementById(elementId);
    element.style.opacity = 0;
    element.style.display = displayType || "block";

    function fadeIn() {
        var opacity = parseFloat(element.style.opacity);
        if ((opacity += 0.02) > 1) {
            return;
        }
        element.style.opacity = opacity;
        requestAnimationFrame(fadeIn);
    }
    fadeIn();
}

function pureFadeOut(elementId) {
    var element = document.getElementById(elementId);
    element.style.opacity = 1;

    function fadeOut() {
        if ((element.style.opacity -= 0.02) < 0) {
            element.style.display = "none";
            return;
        }
        requestAnimationFrame(fadeOut);
    }
    fadeOut();
}

function setCookie(name, value, expirationDays) {
    var expires = "";
    if (expirationDays) {
        var date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

function cookieConsent() {
    if (!getCookie("purecookieDismiss")) {
        document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer">' +
            '<div class="cookieTitle"><a>' + purecookieTitle + '</a></div>' +
            '<div class="cookieDesc"><p>' + purecookieDesc + " " + purecookieLink + '</p></div>' +
            '<div class="cookieButton"><a onClick="purecookieDismiss();">' + purecookieButton + "</a></div></div>";
        pureFadeIn("cookieConsentContainer");
    }
}

function purecookieDismiss() {
    setCookie("purecookieDismiss", "1", 7);
    pureFadeOut("cookieConsentContainer");
}

window.onload = function() {
    cookieConsent();
};
