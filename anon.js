function handleFiles() {
    const fileList = this.files; /* now you can work with the file list */
    let set = new Set();
    for (let i = 0; i < fileList.length; i++) {
        let val = getDataExtension(fileList[i]);
        if (val === "json"){
            jsonSet = (readJSON(fileList[i]));
            console.log(jsonSet);

        }
        else if (val === "sql") console.log("sql");
        else if (val === "xml") console.log("xml");
        else console.log(val + " file not supported");
    }
    console.log(set);
}

function getDataExtension(fileName){
    return fileName['name'].split('.').pop();
}

function readJSON(file) {
    temp = [];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = JSON.parse(fileLoadedEvent.target.result);
        let table_check;
        let data_array;
        for (var keys in textFromFileLoaded) {
            table_check = textFromFileLoaded[keys];
            if (table_check['type'] === "table") {
                data_array = table_check['data'];
                for (col_names in data_array[0]) {
                    temp.push(col_names)
                }
            }
        }
        console.log(temp)
        print(temp);
    //     var myDiv = document.getElementById("cboxes");
    //
    //     for (var i = 0; i < temp.length; i++) {
    //         var checkBox = document.createElement("input");
    //         var label = document.createElement("label");
    //         checkBox.type = "checkbox";
    //         checkBox.value = temp[i];
    //         checkBox.id = "id"+i;
    //         myDiv.appendChild(checkBox);
    //         myDiv.appendChild(label);
    //         label.appendChild(document.createTextNode(temp[i]));
    //     }
    //     var buttn = document.createElement("button");
    //     buttn.innerHTML = "Submit";
    //
    //     buttn.addEventListener ("click",submit());
    //     myDiv.append(buttn);
    //
    };
    console.log(fileReader.readAsText(file));

}

function print(temp){
        var myDiv = document.getElementById("cboxes");

        for (var i = 0; i < temp.length; i++) {
            var checkBox = document.createElement("input");
            var label = document.createElement("label");
            checkBox.type = "checkbox";
            checkBox.value = temp[i];
            checkBox.id = "id"+i;
            myDiv.appendChild(checkBox);
            myDiv.appendChild(label);
            label.appendChild(document.createTextNode(temp[i]));
        }
        var buttn = document.createElement("button");
        buttn.innerHTML = "Submit";

        buttn.addEventListener ("click", function(e){
            e.preventDefault();

        });
        myDiv.append(buttn);

}


function readXML(file){

}

function readSQL(file){
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = JSON.parse(JSON.stringify(fileLoadedEvent.target.result));
    };
    fileReader.readAsText(file, "UTF-8");
}

document.getElementById("uploadInput").addEventListener("change", handleFiles, false);


