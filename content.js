let storedData = [];

// Add this function at the beginning of content.js
function toggleButtonsVisibility() {
    const saveButton = document.getElementById("saveButton");
    const exportButton = document.getElementById("exportButton");
    const autoButton = document.getElementById("autoButton");

    if (saveButton.style.display === "none") {
        saveButton.style.display = "block";
        exportButton.style.display = "block";
        autoButton.style.display = "block"
    } else {
        saveButton.style.display = "none";
        exportButton.style.display = "none";
        autoButton.style.display = "none"
    }
}

function savePage() {
    let thisPageStoredData = [];
    let rawPage = document.querySelectorAll(".yP[email]");
    let rawPage2 = document.querySelectorAll(".zF[email]");

    //check for duplicates

    //create new list without duplicates
    let newPage = [];
    rawPage.forEach(e => {
        //remove duplicates within itself
        // console.log('e.getAttribute("email"):',e.getAttribute("email"))
        if (newPage.includes(e.getAttribute("email"))) {
            //do nothing
        }
        else {

            newPage.push({ email: e.getAttribute("email"), name: e.getAttribute("name") });
            // console.log('pushed e.getAttribute("email"):',e.getAttribute("email"))
        }
    });
    rawPage2.forEach(e => {
        //remove duplicates within itself
        // console.log('e.getAttribute("email"):',e.getAttribute("email"))
        if (newPage.includes(e.getAttribute("email"))) {
            //do nothing
        }
        else {

            newPage.push({ email: e.getAttribute("email"), name: e.getAttribute("name") });
            // console.log('pushed e.getAttribute("email"):',e.getAttribute("email"))
        }
    });

    console.log(newPage.length + " contacts on page");
    // console.log('newPage:',newPage)

    newPage.forEach(e => {

        if (e.name !== "me") {

            if (e.name || e.email !== null || undefined || "" || " ") {

                thisPageStoredData.push({ email: e.email, name: e.name });

            }
            else {
                if (e.name !== null || undefined || "" || " ") {
                    e.name = "";
                    thisPageStoredData.push({ email: e.email, name: e.name });
                }
                else if (e.email !== null || undefined || "" || " ") {
                    e.email = "";
                    thisPageStoredData.push({ email: e.email, name: e.name });
                }
                else {
                    e.name = "";
                    e.email = "";
                    thisPageStoredData.push({ email: e.email, name: e.name });
                }

            }
        }


    });


    const newArray = thisPageStoredData.map((m) => [m.email, m]);
    const newMap = new Map(newArray);
    const iterator = newMap.values();
    const uniqueContacts = [...iterator];

    thisPageStoredData = uniqueContacts;

    //add to storedData
    storedData = storedData.concat(thisPageStoredData);


    console.log('Page saved. thisPageStoredData length:', thisPageStoredData.length)
    console.log('thisPageStoredData:', thisPageStoredData)


    //animation
    var checkmark = document.createElement("span");
    checkmark.innerHTML = "&#10004;";
    checkmark.style = "position: absolute; top: 20px; right: 420px; font-size: 2em; color: #4CAF50;";
    exportButton.appendChild(checkmark);
    setTimeout(function () {
        exportButton.removeChild(checkmark);
    }, 1000);
}
// function exportSavedPages() {


//     //log to console storedData in a format that I can paste into google sheets
//     // console.log(storedData.map((e, i) => i % 2 == 0 ? e + '\t' + storedData[i + 1] : '').join('\n'));
//     //remove empty lines
//     let finalExport = storedData.map((e, i) => i % 2 == 0 ? e + '\t' + storedData[i + 1] : '').join('\n').replace(/^\s*[\r\n]/gm, "");

//     //save to clipboard that works on all browsers
//     navigator.clipboard.writeText(finalExport).then(() => {
//         alert("successfully copied");
//       })
//       .catch(e => {
//         alert("something went wrong");
//         console.log('e:',e)
//       });

//     alert(
//     `Check the console for the data (OPTION+COMMAND+I / CTRL+SHIFT+I). 
//     Copy and paste it into a spreadsheet.`
//     )

//     //log to console storedData in csv format
//     // console.log(storedData.map((e, i) => i % 2 == 0 ? e + ',' + storedData[i + 1] : '').join('\n'));
// }

//create new saveButton
var saveButton = document.createElement("saveButton");
saveButton.id = "saveButton";
//onlick: savePage()
saveButton.onclick = savePage;
//make it look like a button
saveButton.style = "background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;";
//cursor like a button
saveButton.style.cursor = "pointer";
//text inside is "Save Page"
saveButton.appendChild(document.createTextNode("Save This Page"));
//append to selector
//make it on top of everything else
saveButton.style.position = "absolute";
saveButton.style.top = "70px";
saveButton.style.right = "250px";
//z-index 999
saveButton.style.zIndex = "999";
//make it with a progressive shadow
//border-radius: 8px;
saveButton.style.borderRadius = "8px";
saveButton.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 10px 1px, rgba(0, 0, 0, 0.3) 0px 5px 30px 10px";

document.body.appendChild(saveButton)


//create new autorunning indicator element on page
var autoRunningIndicator = document.createElement("autoRunningIndicator");
autoRunningIndicator.id = "autoRunningIndicator";
//make it invisible
autoRunningIndicator.style.display = "none";
//make it unchecked
autoRunningIndicator.checked = false;
//append to page
document.body.appendChild(autoRunningIndicator);



//do the same for exportButton
var exportButton = document.createElement("exportButton");
exportButton.id = "exportButton";
// exportButton.onclick = exportSavedPages;

exportButton.style = "background-color: #5c94ee; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;";
exportButton.style.cursor = "pointer";
exportButton.appendChild(document.createTextNode("Export Saved Pages"));


//make it on top of everything else
exportButton.style.position = "absolute";
exportButton.style.top = "70px";
exportButton.style.right = "30px";
//z-index 999
exportButton.style.zIndex = "999";
//make it with a progressive shadow
//border-radius: 8px;
exportButton.style.borderRadius = "8px";
exportButton.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 10px 1px, rgba(0, 0, 0, 0.3) 0px 5px 30px 10px";

document.body.appendChild(exportButton)


// create a third button to start going automatically through the pages
var autoButton = document.createElement("autoButton");
autoButton.id = "autoButton";
//follow the style of the others
autoButton.style = "background-color: #ff9800; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;";
autoButton.style.cursor = "pointer";
autoButton.appendChild(document.createTextNode("Auto Save Pages"));
//make it on top of everything else
autoButton.style.position = "absolute";
autoButton.style.top = "70px";
autoButton.style.right = "440px";
//z-index 999
autoButton.style.zIndex = "999";
//make it with a progressive shadow
//border-radius: 8px;
autoButton.style.borderRadius = "8px";
autoButton.style.boxShadow = "rgba(0, 0, 0, 0.3) 0px 5px 10px 1px, rgba(0, 0, 0, 0.3) 0px 5px 30px 10px";

document.body.appendChild(autoButton)





document.addEventListener("click", function () {
    if (event.target.matches("#exportButton")) {

        function arrayToGoogleSheetsTable(arr) {
            // Get the headers from the object keys
            const headers = Object.keys(arr[0]);
          
            // Convert the array of objects to a 2D array
            const data = arr.map(obj => headers.map(header => obj[header]));
          
            // Add headers to the beginning of the data array
            data.unshift(headers);
          
            // Convert the 2D array to a tab-separated string
            const tableString = data
              .map(row => row.join('\t'))
              .join('\n');
          
            return tableString;
          }

          console.log('arrayToGoogleSheetsTable(storedData):',arrayToGoogleSheetsTable(storedData))

          let finalExport = arrayToGoogleSheetsTable(storedData);




        //save to clipboard that works on all browsers
        navigator.clipboard.writeText(finalExport).then(() => {
            alert("All emails and names copied to clipboard ✅");
        })
            .catch(e => {
                alert("Something went wrong. Find the data in the console instead. (OPTION+COMMAND+I / CTRL+SHIFT+I)");
                console.log('e:', e)
            });

        // alert(
        // `Check the console for the data (OPTION+COMMAND+I / CTRL+SHIFT+I). 
        // Copy and paste it into a spreadsheet.`
        // )
    }
});




function checkIfAutoRunning() {
    //check if autoRunningIndicator is checked
    if (autoRunningIndicator.checked) {
        //if it is, return true
        return true;
    } else {
        //if it's not, return false
        return false;
    }
}
function toggleAutoRunning() {
    //check if autoRunningIndicator is checked
    if (autoRunningIndicator.checked) {
        //if it is, make it false
        autoRunningIndicator.checked = false;
    } else {
        //if it's not, make it true
        autoRunningIndicator.checked = true;
    }
}








function autoScrapePages() {


    console.log("Starting auto scrape...");
    function recursiveRunning() {

        console.log('autoRunning:', checkIfAutoRunning())

        if (checkIfAutoRunning()) {




            savePage();
            let currentPage = location.href;

            //update button export to nb of pages
            // document.getElementById("exportButton").innerHTML = "Export Saved (" + storedData.length + " elements)";

            // go to next page



            //if url contains p and a number add 1 to that number each iteration
            //use regex match
            if (location.href.match(/\/p\d+$/g)) {
                //get the number
                //get only what is after the p
                let pageNumber = location.href.match(/\/p\d+$/g)[0].replace("/p", "");
                //add 1 to the number
                pageNumber = parseInt(pageNumber) + 1;
                //go to the next page
                location.href = currentPage.replace(/\/p\d+$/g, "/p" + pageNumber);
            } else {
                //if it doesn't contain p and a number add p1 to the end of the url
                let tempUrl = currentPage + "/p2";
                location.href = tempUrl;
            }
            // wait 1 second
            setTimeout(() => {
                recursiveRunning()
            }, 3000);
        }
        else {
            console.log("Stopping")
            return;
        }


    }
    recursiveRunning() // once

}



//listen for auto button
document.addEventListener("click", function () {
    if (event.target.matches("#autoButton")) {

        console.log("Clicked on auto button");

        //check if running


        //if it's not running
        if (checkIfAutoRunning() == false) {
            toggleAutoRunning();
            // change text to "Stop Auto Save"
            autoButton.innerHTML = "Stop Auto Save";
            //color to red
            autoButton.style.backgroundColor = "#f44336";
            autoScrapePages();
        } else {
            // change text to "Auto Save Pages"
            autoButton.innerHTML = "Auto Save Pages";
            toggleAutoRunning();
        }
    }
});





toggleButtonsVisibility();

// Add this event listener at the end of content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.toggle) {
        toggleButtonsVisibility();
    }
});