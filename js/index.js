$(document).ready(function (e) {
    $('.tableDetail tr').each(function (index,tr) {
        bindTableTrDatePickerAndAutoComplete($(tr));
    });
    renewInputIndex($('.tableDetail'));

    $("#inputform input:text,input:password").first().focus();
});

//表單按下 Return
$(document).on('keydown', 'input, button', function (event) {
    if (event.which === 13) {
        event.preventDefault();
        var $this = $(event.target);
        var index = parseFloat($this.attr('inputIndex'));
        $('[inputIndex="' + (index + 1).toString() + '"]').focus();
    }
});

//「新增」按鈕動作
$('.detailadd').on('click',function (e) {
    var index = $(this).closest('tr').index();
    //var $tr = $(this).closest('tr').clone(true);
    //var htmlstr = $('#detailtemp').prop('outerHTML');
    //var obj = $(htmlstr);
    //console.log($(htmlstr));
    //console.log($('#detailtemp'));
    //console.log(htmlstr);

    var $tr = $('#detailtemp').find('tr').clone(true);
    //$tr.each(function (index,object) {
    //console.log(object);
    //});

    bindTableTrDatePickerAndAutoComplete($tr);
    $('.tableDetail > tbody > tr ').eq(index).after($tr);
    renewInputIndex($('.tableDetail'));
    //$tr.prependTo($(this).closest('tbody'));
});

//「刪除」按鈕動作
$('.detaildel').on('click',function (e) {
    var $table = $(this).closest('table');
    var rows = $table.find('tbody tr').length;
    console.log('row count = ' + rows.toString());
    if(rows === 1){
        return;
    }
    var $tr = $(this).closest('tr');
    $tr.remove();
});

function bindTableTrDatePickerAndAutoComplete($tr){
    //$tr.find('input[type="text"]').each(function(index,object){
    $tr.find('input:text').each(function(index,object){
        if(object.name === 'date[]'){
            bindDatePicker(object);
            //$(this).datepicker();
            //$(object).datepicker();
        }
        else if(object.name === 'productno[]'){
            bindAutoComplete(object);
            //$object.datepicker();
        }
        else if(object.name === 'productname[]'){
            bindAutoComplete(object);
            //$object.datepicker();
        }
    });
}