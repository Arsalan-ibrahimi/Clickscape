
let lst = document.querySelector(".tabs");

var srt = Sortable.create(lst, {
  animation: 150,
  ghostClass: "ghost-class",

  onEnd: function (evt) {
    // This function will be called each time a drag operation ends
    handleDragEnd(evt);
  },
});


//    document.querySelector("#settings_button > svg").addEventListener('click',function(){

//         document.querySelector('.controls').classList.toggle('controls-active');
//     });

function fetchDials() {
  document.querySelector(".tabs").innerHTML = "";
  let values = {};

  let keys = Object.keys(localStorage);
  // let keys = {};
  if (keys.length > 0) {
    document.querySelector(".tabs").innerHTML = "";

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] != "ORDER") {
        values[i] = JSON.parse(localStorage.getItem(keys[i]));
      }
    }

    for (x in values) {
      // console.log(values[x].dialName,values[x].dialLink);

      let dial = document.createElement("div");

      let dialText = document.createTextNode(values[x].dialName);
      let ahref = document.createElement("a");
      ahref.setAttribute("href", values[x].dialLink);
      ahref.setAttribute("target", "_self");
      ahref.setAttribute("id", keys[x]);
      dial.appendChild(dialText);
      dial.classList.add("text-label");

      let dialFavi = document.createElement("img");
      dialFavi.setAttribute(
        "src",
        `https://www.google.com/s2/favicons?domain=${values[x].dialLink}&sz=32`
      );
      dialFavi.setAttribute("class", "dial-favi-2");
      dialFavi.setAttribute("loading", "lazy");
      let dialEditButton = document.createElement("button");
      dialEditButton.setAttribute("id", keys[x]);
      dialEditButton.innerHTML = ">";
      dialEditButton.setAttribute("class", "edit-button-dial");

      ahref.appendChild(dialFavi);

      ahref.appendChild(dial);

      // ahref.appendChild(dialEditButton);

      ahref.classList.add("dial");
      let button = document.createElement("button");
      button.setAttribute("id", keys[x]);
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>';
      button.setAttribute("class", "delete-button-dial");
      button.onclick = async function (event) {
        event.stopPropagation();
        event.preventDefault();
        // alert(this.id);
        btn.click();
        document.querySelector("#dialNameValue").value = this.id;
        let details = await localStorage.getItem(this.id);
        let parsedDetails = JSON.parse(details);
        document.querySelector("#dialNameValue").value = parsedDetails.dialName;
        document.querySelector("#dialLinkValue").value = parsedDetails.dialLink;
        // document.querySelector('#addDial').click();
        try{

          submitButton.style.display = "none";
          document.querySelector(".dialId").value = this.id;
        }
        catch(err){
          console.log(err);
        }
        document.querySelector(".btn-update").style.display = "block";
        document.querySelector(".btn-delete").style.display = "block";
      };
      ahref.appendChild(button);

      document.querySelector(".tabs").appendChild(ahref);
    }

    let sortedOrder = JSON.parse(localStorage.getItem("ORDER"));
    srt.sort(sortedOrder);

    handleDragEnd();

    let buttonAddMore = document.createElement("button");
    buttonAddMore.innerText = "+";
    buttonAddMore.setAttribute("class", "buttonAddMore custom-add-btn");
    buttonAddMore.setAttribute("id", "myBtn");
    document.querySelector(".tabs").appendChild(buttonAddMore);
  } else {
    document.querySelector(".tabs").innerHTML =
      '<div class="empty-tabs"></div> ';
    document.querySelector(".empty-tabs").innerHTML =
      '<img src="../assets/images/logo/empty.svg"/><div class="text-center">You have no saved dials <br/> you can explore our <a href="#" target="_blank">dial library</a>, add them using chrome extension or type manually</div><div class="cta-div"><button class="button " id="myBtn"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>Add Dials<div class="arrow">›</div></button><button id="lib-btn" class="lib-cta button"><svg width="18" height="18"  xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0048 48h320a48.14 48.14 0 0048-48V272l-32-152c-5-27-23-40-48-40z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 272h144M320 272h144M192 272a64 64 0 00128 0M144 144h224M128 208h256"/></svg>Open Library</button></div>';
  }
}

fetchDials();

function handleAddDials() {
  if (
    !dialNameExternal ||
    !dialLinkExternal ||
    dialNameExternal.trim() === "" ||
    dialLinkExternal.trim() === ""
  ) {
   
    let dialName = document.querySelector("#dialNameValue").value;
    let dialLink = document.querySelector("#dialLinkValue").value;

    let keys = Object.keys(localStorage);
    let isLinkPresent = false;
    for (let i = 0; i < keys.length; i++) {
      let parsedDetails = JSON.parse(localStorage.getItem(keys[i]));

      if (parsedDetails.dialLink === dialLink) {
        isLinkPresent = true;
      }
    }
    if (isLinkPresent) {
      alert("Dial with this link is already present");
      return;
    } else {
      let formattedDate = `${new Date().getDate()}${new Date().toLocaleString(
        "default",
        { month: "long" }
      )}${new Date().getFullYear()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      localStorage.setItem(
        formattedDate,
        JSON.stringify({ dialName, dialLink })
      );
      handleDragEnd();
      fetchDials();
    }
  }
   else {
      let formattedDate = `${new Date().getDate()}${new Date().toLocaleString(
        "default",
        { month: "long" }
      )}${new Date().getFullYear()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      localStorage.setItem(
        formattedDate,
        JSON.stringify({ dialNameExternal, dialLinkExternal })
      );
      handleDragEnd();
      fetchDials();
}
}
let submitButton = document.querySelector("#addDial");
submitButton.addEventListener("click", handleAddDials);

let updateButton = document.querySelector(".btn-update");
updateButton.addEventListener("click", function () {
  try {
    let dialName = document.querySelector("#dialNameValue").value;
    let dialLink = document.querySelector("#dialLinkValue").value;

    let dialId = document.querySelector(".dialId").value;
    localStorage.setItem(dialId, JSON.stringify({ dialName, dialLink }));

    document.querySelector("#dialNameValue").value = "";
    document.querySelector("#dialLinkValue").value = "";

    fetchDials();
  } catch (err) {
    console.log(err);
  }
});

let deleteButton = document.querySelector(".btn-delete");
if (deleteButton) {
  deleteButton.addEventListener("click", function () {
    let dialId = document.querySelector(".dialId").value;
    localStorage.removeItem(dialId);
    fetchDials();
  });
}

//jason saving and backup

// let saveJson = document.querySelector('#saveJson');

// saveJson.addEventListener('click',function(){

//     download(JSON.stringify(localStorage), 'json.txt', 'text/plain');
// });

function handleDragEnd() {
  let order = srt.toArray();
  // console.log(order);
  localStorage.setItem("ORDER", JSON.stringify(order));
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
// download(jsonData, 'json.txt', 'text/plain');

//Modal Bottom Drawer

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  document.querySelector("#dialNameValue").value = "";
  document.querySelector("#dialLinkValue").value = "";
  submitButton.style.display = "block";
  document.querySelector(".btn-update").style.display = "none";
  document.querySelector(".btn-delete").style.display = "none";
};

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// modal drawer end
let cross = document.querySelector(".cross-btns");
if (cross) {
  cross.addEventListener("click", function () {
    document.querySelector(".library").classList.toggle("fade-out");
    document.querySelector(".library").classList.toggle("controls-active");
  });
}

function toggleClass() {
  this.classList.toggle("active");
}

function addClass() {
  this.classList.add("finished");
}

function resetButton() {
  // Reset the button back to the original state
  button.classList.remove("active", "finished");
}

let autoFetchButton = document.querySelector(".auto-fetch-btn");
if (autoFetchButton) {
  autoFetchButton.addEventListener("click", function (e) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let currentTabUrl = tabs[0].url;

      let dialLink = currentTabUrl;
      let dialName = currentTabUrl
        .split("/")[2]
        .split(":")[0]
        .replace("www.", "")
        .split(".")[0];

      // document.querySelector('#dialLinkValue').value = currentTabUrl;

      // document.querySelector('#dialNameValue').value = domainName;

      let formattedDate = `${new Date().getDate()}${new Date().toLocaleString(
        "default",
        { month: "long" }
      )}${new Date().getFullYear()}${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
      localStorage.setItem(
        formattedDate,
        JSON.stringify({ dialName, dialLink })
      );

      handleDragEnd();

      fetchDials();
    });
  });
}

let openLibButtons = document.querySelectorAll("#lib-btn");
if (openLibButtons) {
  openLibButtons.forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelector(".library").style.display = "flex";
      document.querySelector(".library").classList.toggle("controls-active");
      document.querySelector(".library").classList.toggle("fade-out");
    });
  });
}



