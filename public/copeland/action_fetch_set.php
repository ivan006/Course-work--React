<?php

include("login_details.php");




function query($page_offset, $limit){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $offset = 2*$page_offset;


  $sql = "SELECT tree, result FROM expressions LIMIT ? OFFSET ?;";
  $query = $conn->prepare($sql);
  $query->bind_param("ss", $limit, $offset);
  $query->execute();
  $SQLresult[0] = $query->get_result();
  $SQLresult[0] = mysqli_fetch_all($SQLresult[0],MYSQLI_ASSOC);


  $sql = "SELECT COUNT(id) AS expressionsCount FROM expressions;";
  $SQLresult2 = $conn->query($sql);
  $SQLresult2 = mysqli_fetch_all($SQLresult2,MYSQLI_ASSOC);

  $result = array_merge($SQLresult,$SQLresult2);


  $conn->close();


  return $result;
}





$limit = 2;
if (isset($_GET["page"]["offset"])) {
  $page_offset = $_GET["page"]["offset"];
} else {
  $page_offset = 0;
}
$page = 1+$page_offset;

$nextPageOffset = $page_offset+1;
$lastPageOffset = "unknown";
$query =query($page_offset,$limit);
$data =$query[0];
$resultCount =$query[1]['expressionsCount'];
$total_pages = round($resultCount/$limit,0,PHP_ROUND_HALF_UP);
$result = array(
  "page" => $page,
  "per_page" => $limit,
  "total_pages" => $total_pages,
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
echo json_encode($result,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
echo "</pre>";

?>
