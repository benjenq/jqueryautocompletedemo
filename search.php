<?php
require_once('include/DBStock.php');
$inKeyword = "";
$inInputName = "";
if(!empty($_POST)){
    $inKeyword = $_POST["keyword"];
    $inInputName = $_POST["inputname"];
}
echo JSON::AutoCompleteJsonForMaterialsWithKeyword($inKeyword,$inInputName);

class JSON{
    public static function AutoCompleteJsonForMaterialsWithKeyword($inKeyword = "",$returnInputName = ""){
        if($returnInputName == ""){
            $returnInputName = "productname";
        }
        $result = DBProductInfo::resultsFromKeyword($inKeyword);
        $resultJson = self::resultsToAutoCompleteArray($result,$returnInputName);
        return json_encode($resultJson);
    }
    private static function resultsToAutoCompleteArray($arrays, $returnInputName){
        $returnInputName = str_replace("[]","",$returnInputName); // 將欄位值 xxx[] -> 變更為 xxx ，以符合底下 $item->xxx 的欄位名稱
        $resultsArray = array();
        foreach ($arrays as $item){
            //$item = new DBProductInfo("");
            $label = sprintf("%s - %s, %s 元, 庫存:%d %s",$item->productno,$item->productname,number_format($item->price,0,".",","), $item->inventory, $item->unit);
            $returnVal = $item->$returnInputName;
            $jsonItem = array(
                "value" =>"$returnVal", //必要欄位，內容為顯示在欄位中的值
                "label" => "$label", //必要欄位，內容為建議視窗的顯示值
                "productno[]" => $item->productno,  //對應 HTML5 端的 name 值
                "productname[]" => $item->productname, //對應 HTML5 端的 name 值
                "price[]" => "$item->price", //對應 HTML5 端的 name 值
                "unit[]" => "$item->unit", //對應 HTML5 端的 name 值
            );
            $resultsArray[] = $jsonItem;
        }
        return $resultsArray;
    }
}
