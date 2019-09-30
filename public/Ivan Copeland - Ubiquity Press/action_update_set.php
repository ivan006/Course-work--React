<?php

include("login_details.php");




function query($arg){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  $sql = "SELECT * FROM expressions WHERE id IN (?,?);";
  $query = $conn->prepare($sql);
  $query->bind_param("ss", $arg["id_1"], $arg["id_2"]);
  $query->execute();
  $result = $query->get_result();
  $result  = mysqli_fetch_all($result,MYSQLI_ASSOC);



  $conn->close();


  return $result;
}

function style ($arg){
  ob_start();
  ?>
  <form class="" action="./end_point_update_set.php" method="post">
    <?php foreach ($arg as $key => $value): ?>
      id: <?php echo $value["id"] ?>
      <input type="text" name="data[<?php echo $key ?>][tree]" value="<?php echo $value["tree"] ?>"><br>
      <input style="display: none;" type="text" name="data[<?php echo $key ?>][id]" value="<?php echo $value["id"] ?>">

    <?php endforeach; ?>
    <input type="submit" name="" value="Submit">
  </form>

  <?php
  $out1 = ob_get_contents();
  ob_end_clean();
  return $out1;


}

if (isset($_GET["id"])) {
  $id = $_GET["id"];
  if ($id % 2 == 0) {
    $id_1 = $id;
    $id_2 = $id-1;
  } else{
    $id_1 = $id;
    $id_2 = $id+1;

  }

  $query =  query(array(
    'id_1'=>$id_1,
    'id_2'=>$id_2,
  ));
  // echo "<pre>";
  // var_dump($query);

  $result =style($query);
  echo $result;
}



?>
