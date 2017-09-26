<?php
// Handling data in JSON format on the server-side using PHP
header("Content-Type: application/json");
// build a PHP variable from JSON sent using POST method
$v = json_decode(stripslashes(file_get_contents("php://input")));
$name = $v["name"];
$score = $v["score"];

$jsonString = file_get_contents('highscore.json');
$data = json_decode($jsonString, true);

$i = 0;
foreach($data as $entry){
    if($score > $entry['score']){
        array_splice($data, $i, 0, $score); 
        array_pop($data);
        break;
    }
    $i++;
}

$newJsonString = json_encode($data, JSON_PRETTY_PRINT);
file_put_contents('highscore.json', $newJsonString);

// encode the PHP variable to JSON and send it back on client-side
echo json_encode($newJsonString);
?>