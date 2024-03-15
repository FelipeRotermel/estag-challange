<?php

include "../config.php";
require "../vendor/autoload.php";

use \Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__FILE__, 2));
$dotenv->load();

    /* Post User */
    function postUser($myPDO) {
        $username = $_REQUEST['username'];
        $password = $_REQUEST['password'];

        $postUser = $myPDO-> prepare("INSERT INTO users (is_admin, username, password) VALUES (FALSE, :username, :password)");
        $postUser->bindParam(':username', $username);
        $postUser->bindParam(':password', $password);
        $postUser->execute();
    }

    /* Get Users */
    function getUsers($myPDO) {
        $users = $myPDO->query("SELECT username FROM users");
        $data = $users->fetchALL();
        return print_r(json_encode($data));
    }

    /* Login */
    function login($myPDO) {
        $username = strip_tags($_POST['username']);
        $password = strip_tags($_POST['password']);

        $login = $myPDO-> prepare("SELECT * FROM users WHERE username = :username AND password = :password");
        $login->bindParam(':username', $username);
        $login->bindParam(':password', $password);
        $login->execute();

        $data = $login->fetch();

        $payLoad =[ 
            "exp" => time() + 10,
            "iat" => time(),
            "username" => $username,
            "is_admin" => $data['is_admin']
        ];

        $encode = JWT::encode($payLoad, $_ENV['KEY'], 'HS256');
        echo json_encode($encode);
    }