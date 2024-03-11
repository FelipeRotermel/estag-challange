<?php
include "../config.php";

    function postCategory($myPDO) {
        $name = $_POST["name"];
        $tax = $_POST["tax"];

        $categoriesPost = $myPDO->prepare("INSERT INTO categories (name, tax) VALUES ('{$name}', '{$tax}')");
        $categoriesPost->execute();
    }

    function getCategories($myPDO) {
        $categories = $myPDO->query("SELECT * FROM categories");
        $data = $categories->fetchALL();
        return print_r(json_encode($data));
    }
    function delCategory($myPDO) {
        $category = $myPDO->query("DELETE FROM categories WHERE code=" .$_REQUEST["code"]);
    }