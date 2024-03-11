<?php

include "../config.php";

    /* Post Order */
    function postOrder($myPDO) {
        $total = $_REQUEST["total"];
        $tax = $_REQUEST["tax"];

        $ordersPost = $myPDO->prepare("INSERT INTO orders (total, tax) VALUES ('{$total}', '{$tax}')");
        $ordersPost->execute();
    }

    /* Get last Order */
    function getOrder($myPDO) {
        $order = $myPDO->query("SELECT MAX(code) FROM orders");
        $data = $order->fetchALL();
        return print_r(json_encode($data));
    }

    /* Get Orders */
    function getOrders($myPDO) {
        $order = $myPDO->query("SELECT * FROM orders");
        $data = $order->fetchALL();
        return print_r(json_encode($data));
    }

    /* Get Order Detail */
    function getOrderDetail($myPDO) {
        $orderCode = $_REQUEST["code"];
        $orderDetail = $myPDO->query("SELECT * FROM order_item INNER JOIN products ON products.code = order_item.product_code WHERE order_code ='{$orderCode}'");
        $data = $orderDetail->fetchALL();
        return print_r(json_encode($data));
    }

    /* Post Order Item */
    function postOrderItem($myPDO) {
        $orderCode = $_REQUEST["orderCode"];
        $productCode = $_REQUEST["productCode"];
        $quantity = $_REQUEST["amount"];
        $price = $_REQUEST["price"];
        $tax = $_REQUEST["tax"];
        
        $orderItemPost = $myPDO->prepare("INSERT INTO order_item (order_code, product_code, amount, price, tax) VALUES ('{$orderCode}', '{$productCode}', '{$quantity}', '{$price}', '{$tax}')");
        $orderItemPost->execute();
    }

    /* Delete Order */
    function delOrder($myPDO) {
        $orderCode = $myPDO->query("SELECT MAX(code) FROM orders");
        $code = $orderCode->fetchColumn();
        
        $orderDelete = $myPDO->prepare("DELETE FROM orders WHERE code = :code");
        $orderDelete->bindParam(':code', $code);
        $orderDelete->execute();
    }

    /* Update Amount Order */
    function updateOrder($myPDO) {
        $amount = $_REQUEST["amount"];

        $orderUpdate = $myPDO->prepare("UPDATE products SET amount = products.amount - $amount WHERE code =" . $_REQUEST["code"]);
        $orderUpdate->execute();
    }