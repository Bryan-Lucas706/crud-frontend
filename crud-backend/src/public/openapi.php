<?php

function serveJson(string $file): void
{
    header('Content-Type: application/json');
    echo file_get_contents($file);
}

function serveView(string $file): void
{
    header('Content-Type: text/html');
    echo file_get_contents($file);
}
