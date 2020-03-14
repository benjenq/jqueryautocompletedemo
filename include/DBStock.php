<?php
require_once('DBHelper.php');

class DBProductInfo{
    public $productno = "";
    public $productname = "";
    public $inventory = 0;
    public $price = 0;
    public $unit = "";


    /**
     * DBProductInfo constructor.
     * @param string $productno
     */
    public function __construct($productno = ""){
        $l_sql = "SELECT productno,productname,inventory,price, unit FROM product WHERE productno = '$productno'; ";
        $result = DBHelper::getResultFromSQLString($l_sql);
        while($row = $result->fetchArray(SQLITE3_ASSOC) ){
            $this->productno = $row["productno"];
            $this->productname = $row["productname"];
            $this->inventory = intval($row["inventory"]);
            $this->price = floatval($row["price"]);
            $this->unit = $row["unit"];
        }
    }

    public static function resultsFromKeyword($keyword = ""){
        $resultsArray = array();
        if($keyword == ""){
            return $resultsArray;
        }

        $l_sql = "SELECT productno FROM product WHERE 1=1 ".
            "AND (productno LIKE '%$keyword%' OR productname LIKE '%$keyword%') ".
            "ORDER BY productno LIMIT 30 ; ";

        $result = DBHelper::getResultFromSQLString($l_sql);
        while($row = $result->fetchArray(SQLITE3_ASSOC) ){
            $productno = $row["productno"];
            $item = new DBProductInfo($productno);
            $resultsArray[] = $item;
        }
        return $resultsArray;
    }
}