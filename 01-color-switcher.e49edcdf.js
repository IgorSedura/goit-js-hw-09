!function(){var t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]"),body:document.querySelector("body")};console.log(t),t.stop.disabled=!0,t.start.addEventListener("click",(function(){e=setInterval((function(){t.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.start.disabled=!0,t.stop.disabled=!1})),t.stop.addEventListener("click",(function(){clearTimeout(e),t.start.disabled=!1,t.stop.disabled=!0}));var e=null}();
//# sourceMappingURL=01-color-switcher.e49edcdf.js.map
