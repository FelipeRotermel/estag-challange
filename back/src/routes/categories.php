<?php

include "../config.php";
include "../services/categories.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

switch ($_REQUEST["action"]) {

    case 'post':
        postCategory($myPDO);
        echo ("<script> history.back(); </script>");
        break;

    case 'get':
        getCategories($myPDO);
        break;

    case 'delete':
        delCategory($myPDO);
        echo ("<script> history.back(); </script>");
        break;

}
