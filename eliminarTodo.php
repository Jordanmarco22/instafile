<?php
$carpetaRuta = "./descarga/" . $_POST['nombre'];
$files = scandir($carpetaRuta);
foreach ($files as $file) {
    if ($file != '.' && $file != '..') {
        unlink($carpetaRuta . '/' . $file);
    }
}
header('Location: ' . $_SERVER['HTTP_REFERER']);
?>
