function populateLibrary() {
  let data;
  fetch("https://raw.githubusercontent.com/Arsalan-ibrahimi/data_api/main/library.json")
    .then((response) => response.json())
    .then((json) => {
      data = json.library;
      dataLocal = [];

      console.log(data);

      Object.keys(localStorage).forEach((key) => {
        if (key != 'ORDER') {
          let parsedDetails = JSON.parse(localStorage.getItem(key));
          dataLocal.push(parsedDetails.dialLink);
        }
      });

      

      for (x in data ) {

        if(dataLocal.includes(data[x].dialLink))
          {
           
          }
          else
          {
            
       
        let dial = document.createElement("div");
        let dialText = document.createTextNode(data[x].dialName);
        dial.setAttribute(
          "class",
          data[x].dialLink + " dial-list-item " + data[x].dialName
        );

        let dialimagewrap = document.createElement("div");
        dialimagewrap.setAttribute("class", "dial-image-wrap");

        let dialFavi = document.createElement("img");
        dialFavi.setAttribute(
          "src",
          `https://www.google.com/s2/favicons?domain=${data[x].dialLink}&sz=128`
        );
        dialFavi.setAttribute("loading", "lazy");
        dial.appendChild(dialFavi);
        dialFavi.setAttribute("class", "dial-favi");

        dial.appendChild(dialText);

        let description = document.createElement("p");
        description.setAttribute("class", "dial-description");
        description.innerText = data[x].description;

        dial.appendChild(description);
        let badge = document.createElement("span");
        badge.setAttribute("class", "dial-badge");
        badge.innerText = "<" + data[x].category + ">";
        dial.appendChild(badge);

        let addDialButton = document.createElement("button");
        addDialButton.setAttribute("class", "add-dial-btn");
        addDialButton.setAttribute("id", "library-add-dial-btn");
        addDialButton.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus" pointer-events="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        addDialButton.setAttribute("class", data[x].dialName);
        addDialButton.addEventListener("click", function (e) {
          let dialLink = e.target.parentElement.classList[0];
          let dialName = e.target.parentElement.classList[2];
          // alert(e.target.parentElement.classList[0]);
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
        });
        dial.appendChild(addDialButton);

        document.querySelector(".library-tab-content").appendChild(dial);

      }
    }
    });
}

populateLibrary();

