<?php

class StockDB extends SQLite3
{
    private $dbFile = "stock.db"; // <-- SQLite 資料庫檔案名稱

    function __construct()
    {
        $this->open($this->dbFile);
    }
}

class DBHelper{
    private static $db = null;
    public static function getResultFromSQLString($l_sql){
        if( self::$db == null){
            self::$db = new StockDB();
        }
        return self::$db->query($l_sql);
    }

}
