<?php
include "../config.php";
include "../services/products.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_REQUEST["action"]) {
    case 'post':
        postProduct($myPDO);
        echo ("<script> history.back(); </script>");
        break;

    case 'get':
        getProducts($myPDO);
        break;

    case 'delete':
        delProduct($myPDO);
        echo ("<script> history.back(); </script>");
        break;

    case 'update':
        updateProduct($myPDO);
        echo ("<script> history.back(); </script>");
        break;
}
