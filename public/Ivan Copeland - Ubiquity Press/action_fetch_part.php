<?php

include("login_details.php");




function query($id){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  $sql = "SELECT * FROM expressions WHERE id IN (?);";
  $query = $conn->prepare($sql);
  $query->bind_param("s",$id);
  $query->execute();
  $result = $query->get_result();
  $result  = mysqli_fetch_all($result,MYSQLI_ASSOC);



  $conn->close();


  return $result;
}

function style ($arg){
  ob_start();
  ?>

  id: <?php echo $arg[0]["id"]; ?>
  tree: <?php echo $arg[0]["tree"]; ?>
  result: <?php echo $arg[0]["result"]; ?>

  <?php
  $out1 = ob_get_contents();
  ob_end_clean();
  return $out1;


}

if (isset($_GET["id"])) {
  $id = $_GET["id"];


  $query =  query($id);
  // echo "<pre>";
  // var_dump($query);

  $result =style($query);
  echo $result;
}



?>
