<?php
$carpetaRuta = "./descarga/" . $_GET['nombre'];
$zip = new ZipArchive();
$zipFileName = 'archivos_' . time() . '.zip';

if ($zip->open($zipFileName, ZipArchive::CREATE) === TRUE) {
    $files = scandir($carpetaRuta);
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            $zip->addFile($carpetaRuta . '/' . $file, $file);
        }
    }
    $zip->close();
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="' . $zipFileName . '"');
    readfile($zipFileName);
    unlink($zipFileName);
} else {
    echo 'No se pudo crear el archivo ZIP.';
}
?>
