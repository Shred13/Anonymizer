function handleFiles() {
    const fileList = this.files; /* now you can work with the file list */
    let set = new Set();
    for (let i = 0; i < fileList.length; i++) {
        let val = getDataExtension(fileList[i]);
        if (val === "json"){
            jsonSet = (readJSON(fileList[i]));


        }
        else if (val === "sql") console.log("sql");
        else if (val === "xml") console.log("xml");
        else console.log(val + " file not supported");
    }
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
        list_data = [];
        for (var keys in textFromFileLoaded) {
            table_check = textFromFileLoaded[keys];
            if (table_check['type'] === "table") {
                data_array = table_check['data'];
                list_data.push(data_array);
                for (col_names in data_array[0]) {
                    temp.push(col_names)
                }
            }
        }
        console.log(list_data);
        print(temp, list_data);
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
    fileReader.readAsText(file);

}

function print(temp, data){
        var myDiv = document.getElementById("cboxes");
        temp.sort();
        sett = new Set(temp);
        temp = Array.from(sett);
        for (var i = 0; i < temp.length; i++) {
            var checkBox = document.createElement("input");
            var label = document.createElement("label");
            checkBox.type = "checkbox";
            checkBox.value = temp[i];
            checkBox.id = "id_checks"+i;
            myDiv.appendChild(checkBox);
            myDiv.appendChild(label);
            label.appendChild(document.createTextNode(temp[i]));
            myDiv.append(document.createElement("br"))
        }
        var buttn = document.createElement("button");
        buttn.innerHTML = "Submit";

        buttn.addEventListener ("click", function(e){
            e.preventDefault();
            checked_list = [];
            for (var i = 0; i<temp.length; i++) {
                if (document.getElementById("id_checks"+i).checked === true){
                    checked_list.push(document.getElementById("id_checks"+i).value)
                }
            }
            dict_of_table = {};
            for (j = 0; j<data.length; j++){
                dict_of_val_in_table = {};
                for (k = 0; k<data[j].length; k++){
                    dict_of_few = {};
                    for (i in checked_list){
                        if (data[j][k][checked_list[i]]!==undefined){
                            dict_of_few[checked_list[i]] = data[j][k][checked_list[i]]
                        }
                    }
                    dict_of_val_in_table[k] = dict_of_few;
                }
                dict_of_table[j] = dict_of_val_in_table;
            }

            console.log(dict_of_table);

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


