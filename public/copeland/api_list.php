<?php

include("login_details.php");




function query($limit, $offset){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }




  $sql = "SELECT expression, result FROM articles LIMIT ? OFFSET ?;";
  $query = $conn->prepare($sql);
  $query->bind_param("ss", $limit, $offset);
  $query->execute();
  $SQLresult = $query->get_result();


  $result = mysqli_fetch_all($SQLresult,MYSQLI_ASSOC);

  $conn->close();


  return $result;
}



$limit = 2;
if (isset($_GET["page"]["offset"])) {
  $offset = $_GET["page"]["offset"];
} else {
  $offset = 0;
}

$nextPageOffset = $offset+$limit;
$lastPageOffset = "unknown";
$data =query($limit, $offset);
$result = array(
  "pages" => "unknown",
  "per_page" => $limit,
  "total_pages" => "unknown",
  "links" => array(
    "self" => "http://example.com/articles",
    "next" => "http://example.com/articles?page[offset]=".$nextPageOffset,
    "last" => "http://example.com/articles?page[offset]=".$lastPageOffset,
  ),
  "data" => array()
);

$data = array_values($data);
foreach ($data as $key => $value) {
  $result["data"][$key] = $data[$key];
}

echo "<pre>";
echo json_encode($result,JSON_PRETTY_PRINT);
echo "</pre>";

?>
