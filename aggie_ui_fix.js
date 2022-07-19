// ==UserScript==
// @name         aggie_ui_fix
// @namespace    https://aggie.io/
// @version      0.1
// @description  fix aggie
// @author       You
// @match        https://aggie.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aggie.io
// @grant        none
// ==/UserScript==

let neonn_notFoundList = [];

function neonn_comp(sel) {
    const elem = document.querySelector(sel);
    if (elem == null) {
        neonn_notFoundList.push(sel);
    }
    return elem;
}

function neonn_alert() {
    const l  = neonn_notFoundList.length;
    if (l > 0) {
        let message = "Time to fix aggie_ui_fix!\nCould not find the following elements:\n\n";
        for (let i = 0; i < l; i++) {
            message += neonn_notFoundList[i]+"\n\n";
        }
        alert(message);
    }
}

function neonn_run() {

    //==========================================
    // A utility to fix some minor annoyances on aggie.io and also add an artist pad.
    // Note that all variables start with neonn_ to avoid variable conflicts.
    //==========================================

    console.log("Confirming ui_fix");

    //All of our selectors to access the various buttons throughout the editor.
    const button_undo =             neonn_comp("#ag-editor-menu > div.undo-redo > button:nth-child(1)");
    //const button_brush =            neonn_comp("body > aggie-app > draw > editor-box > div.editor-right.ng-tns-c157-0 > div.container2.ng-tns-c157-0 > editor-slots > button.btn-none.ng-star-inserted.active");
    const button_hand =             neonn_comp("body > aggie-app > draw > editor-box > div.editor-right > div.container2 > editor-slots > button.btn-none");
    const button_zoomIn =           neonn_comp("#ag-editor-menu > div.view-buttons > button:nth-child(1)");
    const button_zoomOut =          neonn_comp("#ag-editor-menu > div.view-buttons > button:nth-child(2)");
    const neonn_layersWindow =      neonn_comp("body > aggie-app > draw > editor-box > div.editor-right > div.container3");
    const neonn_colorPickerWindow = neonn_comp("body > aggie-app > draw > editor-box > div.editor-right");
    let   neonn_el =                neonn_comp("body > aggie-app > draw > editor-box");
    let   neonn_fro =               neonn_comp("body > aggie-app > draw");

    neonn_alert();

    //Find the layers window and make it display a bit higher.
    neonn_layersWindow.style.top = "270px";

    //Put the color selector window in the correct place cus its stupid
    neonn_colorPickerWindow.style.right = "0%";



    //Get the entire drawing window and shrink its width a bit to make room for the artist pad.
    const neonn_padWidth = 6;
    const neonn_padOffset = 0;
    neonn_el.style.width = String(100-neonn_padWidth-neonn_padOffset)+"%";
    neonn_el.style.right = String(neonn_padWidth)+"%";

    //Get the location as to where to place the pad.
    let neonn_height = neonn_el.clientHeight;

    //Create the artist pad.
    let neonn_pad = document.createElement("div");
    neonn_pad.style.position = "absolute";
    neonn_pad.style.zIndex = "999";
    neonn_pad.style.width = String(neonn_padWidth)+"%";
    neonn_pad.style.height = String(neonn_height)+"px";
    neonn_pad.style.right = "0%";
    neonn_fro.appendChild(neonn_pad);



    //Create buttons:
    const neonn_defaultBorderRadius = "15px";

    //  Undo button
    let pad_undo = document.createElement("button");
    pad_undo.innerHTML = "Undo";
    pad_undo.style.color = "#000000";
    pad_undo.style.position = "absolute";
    pad_undo.style.borderRadius = neonn_defaultBorderRadius;

    pad_undo.style.width = "100%";
    pad_undo.style.height = "50%";
    pad_undo.style.top = "50%";
    pad_undo.style.backgroundColor = "#c9e4ff";

    pad_undo.onclick = (function() { button_undo.dispatchEvent(new Event("click")); });
    neonn_pad.appendChild(pad_undo);


    //  Brush button



    //  Hand button
    let pad_hand = document.createElement("button");
    pad_hand.innerHTML = "Hand";
    pad_hand.style.color = "#000000";
    pad_hand.style.position = "absolute";
    pad_hand.style.borderRadius = neonn_defaultBorderRadius;

    pad_hand.style.width = "100%";
    pad_hand.style.height = "15%";
    pad_hand.style.top = "0%";
    pad_hand.style.backgroundColor = "#c0c0c0";

    //pad_hand.onclick = (function() { console.log("yay"); button_hand.dispatchEvent(new Event("pointerdown")); });
    neonn_pad.appendChild(pad_hand);



    //Toggle layer window button
    let pad_setting = document.createElement("button");
    pad_setting.innerHTML = "Setting";
    pad_setting.style.color = "#000000";
    pad_setting.style.position = "absolute";
    pad_setting.style.borderRadius = neonn_defaultBorderRadius;

    pad_setting.style.top = "15%";
    pad_setting.style.width = "100%";
    pad_setting.style.height = "5%";
    pad_setting.style.backgroundColor = "#ffc0c0";

    pad_setting.onclick = (function() {
        if (neonn_layersWindow.style.top === "270px") {
            neonn_layersWindow.style.top = "450px";
        }
        else {
            neonn_layersWindow.style.top = "270px";
        }

    });
    neonn_pad.appendChild(pad_setting);





    //Zoom in button
    let pad_in = document.createElement("button");
    pad_in.innerHTML = "+";
    pad_in.style.color = "#000000";
    pad_in.style.position = "absolute";
    pad_in.style.borderRadius = neonn_defaultBorderRadius;

    pad_in.style.top = "35%";
    pad_in.style.width = "100%";
    pad_in.style.height = "15%";
    pad_in.style.backgroundColor = "#c0c0c0";

    pad_in.onclick = (function() { button_zoomIn.dispatchEvent(new Event("click")); });
    neonn_pad.appendChild(pad_in);


    //Zoom out button
    let pad_out = document.createElement("button");
    pad_out.innerHTML = "-";
    pad_out.style.color = "#000000";
    pad_out.style.position = "absolute";
    pad_out.style.borderRadius = neonn_defaultBorderRadius;

    pad_out.style.top = "20%";
    pad_out.style.width = "100%";
    pad_out.style.height = "15%";
    pad_out.style.backgroundColor = "#c0c0c0";

    pad_out.onclick = (function() { button_zoomOut.dispatchEvent(new Event("click")); });
    neonn_pad.appendChild(pad_out);


    //Toggle fullscreen button
    /*
        let pad_exit = document.createElement("button");
        pad_exit.innerHTML = "Exit";
        pad_exit.style.color = "#000000";
        pad_exit.style.position = "absolute";
        pad_exit.style.borderRadius = neonn_defaultBorderRadius;

        pad_exit.style.top = "100%";
        pad_exit.style.width = "100%";
        pad_exit.style.height = "10%";
        pad_exit.style.backgroundColor = "#c0c0c0";

        pad_exit.onclick = (function() { document.dispatchEvent(new Event("exitfullscreen")); });

        document.addEventListener("exitfullscreen", function (event) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
                    .then(() => console.log("Document Exited from Full screen mode"))
                    .catch((err) => console.error(err))
            } else {
                document.documentElement.requestFullscreen();
            }
        });
        neonn_pad.appendChild(pad_exit);
        */
}


let neonn_scriptRun = false;

function neonn_init(){
    //console.log("BOOM");
    setTimeout(() => { // wait a bit for the page to load.
        // Check that we're not on the home page.
        if (document.querySelector(".page-title") == null && !neonn_scriptRun) {
            // If we're not on the home page this means we're in the art editor page.
            // therefore run basically everything!
            neonn_run();
            document.removeEventListener('click', neonn_init);

            // only run once
            neonn_scriptRun = true;
        }
        else {
            //alert("Not on artist page");

        }
    }, 2000);
}

(function() {
    "use strict"
    document.addEventListener('click', neonn_init);
    neonn_init();
})();
