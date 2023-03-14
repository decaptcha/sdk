var gridRowSize = 3;
var gridColSize = 2;
var checkedBefore = false;
var listOfData = new Array();
let imageName = undefined;
let requestUrl = "https://b743-45-64-12-244.in.ngrok.io";

function refreshCaptcha() {
  let decaptchaDiv = document.getElementsByClassName("decaptcha")[0];
  let apiKey = decaptchaDiv.getAttribute("data-sitekey");
  console.log(apiKey);

  getCaptcha(apiKey);
  showNewModal();
}

function disableCaptcha() {
  document.getElementById("message").style.display = "none";
}

function getCaptcha(apiKey) {
  $.ajax({
    url: `${requestUrl}/captcha?api_key=${apiKey}`,
    crossDomain: true,
    async: false,
    success: function (result) {
      let status = result["status"];
      if (status == 200) {
        let obj = result["resp"]["images"];
        imageName = result["resp"]["label"];
        obj.forEach((element) => {
          let str = element["url"];
          element["url"] = str.replace(
            "http://localhost:3690/",
            `${requestUrl}/`
          );
        });
        listOfData = obj;
      } else {
        console.log(`We got non 200 status ${status}.`);
      }
    },
    error: function (err) {
      let status = err["status"];
      if (status == 403) {
        disableCaptcha();
      }
      console.log(`Exception for getCaptcha: ${JSON.stringify(err)} ::`);
    },
  });
}

function postCaptcha(apiKey) {
  $.ajax({
    url: `${requestUrl}/captcha/`,
    crossDomain: true,
    async: false,
    method: "POST",
    data: {
      api_key: apiKey,
      images: listOfData,
    },
    success: function (result) {
      let humanCheckPassed = result["resp"]["humanCheckPassed"];
      let status = result["status"];
      if (!humanCheckPassed || status != 200) {
        let decaptchaDiv = document.getElementsByClassName("decaptcha")[0];
        let apiKey = decaptchaDiv.getAttribute("data-sitekey");
        console.log(apiKey);

        getCaptcha(apiKey);
        showNewModal();
      }
    },
    error: function (err) {
      let status = err["status"];
      if (status == 403) {
        console.log(`We got non 200 response ${status}.`);
      }
      console.log(`Exception for postCaptcha: ${JSON.stringify(err)} ::`);
    },
  });
}
{
  /* <input type="submit" class="btn btn-success btn-send" style="color: antiquewhite; position: relative; top: 50px;" value="Send message" onClick="validate()"/>
<div id="message" style="color: antiquewhite; position: relative; top: 50px; left: 580px; top: 10px;"><input type="checkbox" id="myBtn" style="transform: scale(1.5);" onclick="checkClickFunc()"><p style="color: antiquewhite; transform: scale(1.1); position: relative; left: 30px;">Are you a Human?</p></div>

<!-- The Modal -->
<div id="myModal" class="modal">
<div id="modalContent" class="modal-content">
<div id="mheader" class="modal-header">
<span class="close">&times;</span>
</div>
<div id="innerBody" class="modal-body" style="position:relative; bottom:10%;">

</div>
<div class="modal-footer" style="position:relative; bottom:0%; height: 30%;">
<div><img src="https://cdn0.iconfinder.com/data/icons/glyphpack/41/refresh-1024.png" onclick="refreshCaptcha()" alt="haha" style="position:relative; width:auto; height:50%; right:350%; top:0px;"></div>
<input type="submit" id="close" class="btn btn-success btn-send" value="Done" onclick="closeButton()" style="position:relative; width:35%; height:50%; right:10%; top:0px;"/>
</div>
</div>
</div> */
}

window.onload = function () {
  let decaptchaDiv = document.getElementsByClassName("decaptcha")[0];
  let apiKey = decaptchaDiv.getAttribute("data-sitekey");
  console.log(apiKey);
  // let h1 = document.createElement("h1");
  // h1.appendChild("Hello World")
  // decaptchaDiv.append(h1);
  console.log("loaded");

  // ;

  // Get the modal
  // var modalContentNode = document.getElementById("modalContent");

  let modalDiv = document.createElement("div");
  modalDiv.id = "message";
  modalDiv.style =
    "color: antiquewhite; position: relative; top: 50px; left: 580px; top: 10px;";
  let inputCheckbox = document.createElement("input");
  inputCheckbox.type = "checkbox";
  inputCheckbox.id = "myBtn";
  inputCheckbox.style = "transform: scale(1.5)";
  // inputCheckbox.onclick = "checkClickFunc()";
  let labelHuman = document.createElement("label");
  labelHuman.innerHTML = "Are you human?";
  // inputCheckbox.appendChild(modalDiv)
  modalDiv.appendChild(inputCheckbox);
  modalDiv.appendChild(labelHuman);

  let myModal = document.createElement("div");
  myModal.className = "modal";
  myModal.id = "myModal";

  let myModalContent = document.createElement("div");
  myModalContent.className = "modal-content";
  myModalContent.id = "modelContent";

  let mHeader = document.createElement("div");
  mHeader.className = "modal-header";
  mHeader.id = "mHeader";
  mHeader.innerHTML = "<span class='close'>&times;</span>";

  mHeader.appendChild(myModalContent);
  myModalContent.innerHTML ="<div id='mHeader' class='modal-header'><span class='close'>&times;</span></div><div id='innerBody' class='modal-body' style='position:relative; bottom:10%;'>  </div><div class='modal-footer' style='position:relative; bottom:0%; height: 30%;'><div><img src='https://cdn0.iconfinder.com/data/icons/glyphpack/41/refresh-1024.png' onclick='refreshCaptcha()' style='position:relative; width:auto; height:50%; right:350%; top:0px;'></div><input type='submit' id='close' class='btn btn-success btn-send' value='Done' onclick='closeButton()' style='position:relative; width:35%; height:50%; right:10%; top:0px;'/>";
  myModal.appendChild(myModalContent);
  decaptchaDiv.appendChild(myModal);

  decaptchaDiv.appendChild(modalDiv);

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    let decaptchaDiv = document.getElementsByClassName("decaptcha")[0];
    let apiKey = decaptchaDiv.getAttribute("data-sitekey");
    console.log(apiKey);
    getCaptcha(apiKey);
    showNewModal();
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    myModal.style.display = "none";
  };
};

function validate() {
  if (!checkedBefore) {
    window.alert("Please check the box before proceeding.");
  } else {
    window.location.href = "https://99designs.com/inspiration/websites/food";
  }
}

function closeButton() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
  document.getElementById("myBtn").checked = false;
  listOfData.forEach((element) => {
    if (element["selected"] == undefined) element["selected"] = "false";
  });
  let decaptchaDiv = document.getElementsByClassName("decaptcha")[0];
  let apiKey = decaptchaDiv.getAttribute("data-sitekey");
  console.log(apiKey);

  postCaptcha(apiKey);
  checkedBefore = true;
}

function showNewModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
  generateGrid();
}

function clickImage(event) {
  var target = event.target || event.srcElement;
  if (target.className == "highlighted") {
    target.className = "normal";
    target.nextSibling.className = "normal";
  } else {
    target.className = "highlighted";
    target.nextSibling.className = "highlighted";
  }
}

function generateGrid() {
  var bodyNode = document.getElementById("innerBody");
  var headerNode = document.getElementById("mHeader");
  var modalContentNode = document.getElementById("modalContent");
  let cellWidth = bodyNode.clientWidth / gridColSize;
  let cellHeight = bodyNode.clientHeight / gridRowSize;
  let category = imageName;
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");
  let imageCount = 0;
  for (let i = 0; i < gridRowSize; i++) {
    const row = document.createElement("tr");
    row.style.width = "auto";
    row.style.height = `${cellHeight}px`;
    for (let j = 0; j < gridColSize; j++) {
      const cell = document.createElement("td");
      cell.style.width = `${cellWidth}px`;
      cell.style.height = "auto";
      cell.innerHTML =
        '<div id="textbox"><img src="' +
        listOfData[imageCount]["url"] +
        '" id="' +
        listOfData[imageCount]["id"] +
        '" class="normal" alt="haha" width=100% height=100%><span class="tickmark">&#10004;</span></div>';
      cell.addEventListener("click", (event) => {
        var target = event.target || event.srcElement;
        listOfData.forEach((element) => {
          if (target.id && element["id"] == target.id && target.className) {
            if (target.className == "normal") {
              element["selected"] = "true";
              target.className = "highlighted";
            } else {
              element["selected"] = "false";
              target.className = "normal";
            }
          }
        });
      });
      row.appendChild(cell);
      imageCount++;
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  document.body.appendChild(tbl);
  tbl.setAttribute("border", "2");
  bodyNode.append(tbl);
  headerNode.innerHTML =
    '<div id="rc-imageselect" aria-modal="true" role="dialog"><div class="rc-imageselect-response-field"></div><span class="rc-imageselect-tabloop-begin" tabindex="0"></span><div class="rc-imageselect-payload"><div class="rc-imageselect-instructions"><div class="rc-imageselect-desc-wrapper"><div class="rc-imageselect-desc-no-canonical" style="position: relative; bottom: 20px; width: 352px; font-size: 16px;">Select all squares with <strong style="font-size: 20px;">' +
    category +
    '</strong></div></div><div class="rc-imageselect-progress"></div></div><div class="rc-imageselect-challenge"><div id="rc-imageselect-target" class="rc-imageselect-target" dir="ltr" role="presentation" aria-hidden="true"></div>';
    headerNode
}
