var TABLE_ID = "urlsTableId";

function getTitile(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll('title')[0];
        return title.innerText;
      });
  };

function createTable(tableId) {
    var body = document.body
    tbl = document.createElement('table');
    tbl.style.width  = '500px';
    tbl.style.border = '1px solid black';
    tbl.setAttribute("id", tableId);
    body.appendChild(tbl);
}

function fillTable(tableId){
    var body = document.body
    var tbl = document.getElementById(tableId);

    chrome.storage.local.get(null, function(result) {
        for (const [key, value] of Object.entries(result)) {
            var newlink = document.createElement('a');
            newlink.innerHTML = key;
            newlink.href = value;

            var deleteBtn = document.createElement("BUTTON");
            deleteBtn.innerHTML = "Delete";
            deleteBtn.onclick = function(){
                deleteUrl(tableId, key);
            };
            
            var tr = tbl.insertRow();
            var td1 = tr.insertCell();
            var td2 = tr.insertCell();
            td1.appendChild(newlink);
            td2.appendChild(deleteBtn);
        }
    });
    body.appendChild(tbl);
}

function deleteAllRowsFromTable(tableId) {
    var tbl = document.getElementById(tableId);
    var rowCount = tbl.rows.length;
    while(rowCount--) {
        tbl.deleteRow(rowCount);
    }
}

function addUrlToStorage(){
    var queryInfo = {
        active: true, 
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0]
        var url = tab.url;
        var title = tab.title;
        
        chrome.storage.local.set({[title]: url}, function() {});
    });
}

function addUrl(tableId) {
    addUrlToStorage();
    deleteAllRowsFromTable(tableId); 
    fillTable(tableId);
}

function deleteUrlFromStorage(key){
    chrome.storage.local.remove([key], function() {});
}

function deleteUrl(tableId, key) {
    deleteUrlFromStorage(key);
    deleteAllRowsFromTable(tableId);
    fillTable(tableId);
}

createTable(TABLE_ID);
fillTable(TABLE_ID);

document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('savePage');
    checkPageButton.addEventListener('click', function() {
        addUrl(TABLE_ID);
    }, false);
  }, false);