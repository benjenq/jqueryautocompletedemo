Date.prototype.yyyy_mm_dd = function() {
    var yyyy = this.getFullYear();
    var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
    var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
    return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd);
};
// https://snippetinfo.net/mobile/media/1912
Number.prototype.numberFormat = function(c, d, t){
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$.datepicker.setDefaults({
    altFormat: "yy-mm-dd",
    autoSize: true,
    dateFormat: "yy-mm-dd",
    constrainInput: true,
    showOn: "both",
    buttonText: "選擇",
    changeMonth: true,
    changeYear: true,
    showAnim: "fade",
    showWeek: false,
    firstDay: 0,
    weekHeader: "星期",
    minDate: '2012-01-01'
});

function renewInputIndex($table){
    var i = 0;
    $table.find('input[type="text"]').each(function(index,object){
        if(object.name.indexOf('date') < 0){
            $(object).attr("inputIndex",i);
            i++;
        }
    });
}

function bindDatePicker(dateText){
    var nowdt = new Date();
    nowdt.setFullYear(nowdt.getFullYear() + 1);
    $(dateText).datepicker();
    $(dateText).datepicker('change', 'maxDate', nowdt.yyyy_mm_dd());
    $(dateText).datepicker('refresh');


    //變更內容
    //dateText.datepicker('change', 'minDate', '2012-01-01');
    //dateText.datepicker('refresh');
}

let apiurl = "search.php";

function bindAutoComplete(inputObj){
    /* 改用 source: function (request,response)
    $(inputObj).autocomplete({
        source: apiurl,
        minLength: 1,
        select: function( event, ui ) {
            //console.log( "Selected: id=" +  ui.item.id + " | label="+ ui.item.label + " | value:" + ui.item.value + " | unit:" + ui.item.unit );
            //console.log( "Selected: partno=" +  ui.item.partno + " | partname=" + ui.item.partname + " | unit:" + ui.item.unit );
            bindInputTextNameValue(inputObj,ui.item);
        }
    });
    */
    var vInputname = inputObj.name;
    //console.log(vInputname);
    /**
     * Auto Complete 寫法
     * https://api.jqueryui.com/autocomplete/#option-source
     * source 有三種表達方式，使用 callback function 可深度客製化
     * source: function (request,response) 為固定的寫法
     * request.term 為固定寫法，表示為 input 欄位的輸入內容
     *
     **/
    $(inputObj).autocomplete({
        source: function (request,response) {
            $.ajax({
                url: apiurl,
                async: true,
                type: 'POST',
                data: {keyword : request.term,
                    inputname : vInputname},
                cache: false,
                dataType: 'json',
                timeout: 10000,
                success: function (data) {
                    //console.log(data);
                    response( data ); //固定寫法
                }
            });
        },
        minLength: 1,
        select: function( event, ui ) { // ui 表示為回傳的 JSON 集合元素，
            //console.log( "Selected: id=" +  ui.item.id + " | label="+ ui.item.label + " | value:" + ui.item.value + " | unit:" + ui.item.unit );
            //console.log( "Selected: partno=" +  ui.item.partno + " | partname=" + ui.item.partname + " | unit:" + ui.item.unit );
            setInputTextNameValueInTableTr(inputObj,ui.item);
        }
    });
}

function setInputTextNameValueInTableTr(dom,item){
    var keyNames = Object.keys(item);
    console.log(keyNames); //來源：https://stackoverflow.com/questions/4260308/getting-the-objects-property-name
    console.log( "Selected: partno=" +  item["partno[]"] + " | partname=" + item.partname + " | unit:" + item.unit );
    console.log( "Selected: label=" +  item.label + " | value=" + item.value ); //item.label 可以寫成 item["label"]

    var $tr = $(dom).closest('tr');
    //console.log($tr.prop('outerHTML'));
    $tr.find('input[type="text"]').each(function (index,object) {
        if(item[object.name] !== undefined){
            if(object.name === 'price[]'){
                var price = parseInt(item[object.name]);
                object.value = price.numberFormat(0, '.', ',')
            }
            else {
                object.value = item[object.name];
            }
        }
        /* 改用 item[object.name]
        if(object.name === "partno"){
            console.log(item.partno);
            object.value = item.partno;
        }
        else if(object.name === "partname"){
            console.log(item.partname);
            object.value = item.partname;
        }
        else if(object.name === "unit"){
            console.log(item.unit);
            object.value = item.unit;
        } */
    });

}