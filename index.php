<?php
require_once ('include/utility.php');
?>
<!DOCTYPE html>
<html lang="">

<head>
    <meta charset="utf-8">
    <title>AutoComplete Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--  JQuery-UI  CSS-->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.min.css">
    <link rel="stylesheet" href="css/style.css?<?php version();?>">
    <link rel="icon" type="image/x-icon" href="" />
</head>

<body>
<form action="<?php echo basename($_SERVER['PHP_SELF']); ?>" id="inputform" method="post">
    <table class="tableDetail">
        <thead>
        <tr>
            <td>產品編號(Product NO)</td>
            <td>產品名稱(Product Name)</td>
            <td>數量(qty)</td>
            <td>價格(NTD)</td>
            <td>單位(Unit)</td>
            <td>日期(Date)</td>
            <td>動作(Action)</td>
        </tr>
        </thead>

        <tbody>

        <tr>
            <td><input type="text" style="width: 180px" class="uppercase" name="productno[]" value="" placeholder="Product NO" autocomplete="off"></td>
            <td><input type="text" style="width: 450px" name="productname[]" value="" placeholder="Product Name" autocomplete="off"></td>
            <td><input type="text" style="width: 50px" name="qty[]" value="" placeholder="" autocomplete="off" maxlength="3"></td>
            <td><input type="text" style="width: 60px" name="price[]" value="" placeholder="" autocomplete="off" maxlength="4"></td>
            <td><input type="text" style="width: 50px" name="unit[]" value="" placeholder="" autocomplete="off" maxlength="4"></td>
            <td><input type="text" name="date[]" value="" placeholder="YYYY-MM-DD" autocomplete="off"></td>
            <td>
                <div class="detailadd"></div>
                <div class="detaildel"></div>
            </td>
        </tr>
        </tbody>
    </table>

    <div id="detailtemp">
        <table>
            <tr>
                <td><input type="text" style="width: 180px" class="uppercase" name="productno[]" value="" placeholder="" autocomplete="off"></td>
                <td><input type="text" style="width: 450px" name="productname[]" value="" placeholder="" autocomplete="off"></td>
                <td><input type="text" style="width: 50px" name="qty[]" value="" placeholder="" autocomplete="off" maxlength="3"></td>
                <td><input type="text" style="width: 60px" name="price[]" value="" placeholder="" autocomplete="off" maxlength="4"></td>
                <td><input type="text" style="width: 50px" name="unit[]" value="" placeholder="" autocomplete="off"></td>
                <td><input type="text" name="date[]" value="" placeholder="" autocomplete="off"></td>
                <td>
                    <div class="detailadd"></div>
                    <div class="detaildel"></div>
                </td>
            </tr>
        </table>
    </div>
</form>

</body>
<!--  JQuery  -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!--  JQuery-UI  -->
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/AutoCompleteAndDatePickerPage.js?<?php version();?>"></script>
<script type="text/javascript" src="js/index.js?<?php version();?>"></script>
</html>
