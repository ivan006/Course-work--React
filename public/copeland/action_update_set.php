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

function style ($arg){
  ob_start();
  ?>
  <form class="" action="index.html" method="post">
    <?php foreach ($arg[0] as $key => $value): ?>
      <input type="text" name="data[<?php echo $key ?>][tree]" value="<?php echo $value["tree"] ?>"><br>

    <?php endforeach; ?>
    <input type="submit" name="" value="Submit">
  </form>

  <?php
  $out1 = ob_get_contents();
  ob_end_clean();
  return $out1;


}

if (isset($_GET["exp"]["offset"])) {
  $exp_offset = $_GET["exp"]["offset"];
  if ($exp_offset % 2 == 0) {
    $page_offset = $exp_offset/2;
  } else{
    $page_offset = ($exp_offset+1)/2;
  }
} else {
  $page_offset = 0;
}
$limit= 2;
$query =query($page_offset,$limit);


echo "<pre>";
var_dump($query);

// $result =style($query);
// echo $result;

?>
