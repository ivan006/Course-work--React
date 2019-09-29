<?php
include("login_details.php");
function query(){
  $login_details = login_details();

  $conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }




  $sql = "SELECT id, tree, result FROM expressions;";
  $SQLresult = $conn->query($sql);
  $SQLresult = mysqli_fetch_all($SQLresult,MYSQLI_ASSOC);

  $result = $SQLresult;


  $conn->close();


  return $result;
}


$query =query();

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <title></title>
  <style media="screen">
    table, th, td {
      border: 1px solid black;
      padding: 5px;
      border-collapse: collapse;
    }
  </style>
</head>
<body>
  <h1>API actions</h1>
  <ul>
    <li>
      <b>Add: </b> <a href="http://react.test/copeland/end_point_add.php">http://react.test/copeland/end_point_add.php</a>
    </li>
    <li>
      <b>Fetch: </b> <a href="http://react.test/copeland/end_point_fetch_set.php?page[offset]=0">http://react.test/copeland/end_point_fetch.php?page[offset]=0</a>
    </li>
  </ul>
  <h1>Normal actions</h1>
  <h2>Add</h2>
  <a href="action_add.php">Click</a>
  <h2>Fetch, Update and Remove</h2>
  <table>
    <tr>
      <th colspan="1">Expression</th>
      <th colspan="5">Actions</th>
    </tr>
    <tr>
      <th>id</th>
      <th>Fetch part 1</th>
      <th>Fetch part 2</th>
      <th>Fetch set</th>
      <th>Update set</th>
      <th>Remove set</th>
    </tr>

    <?php foreach ($query as $key => $value): ?>
      <tr>
        <td>
          <?php echo $value["id"]; ?>
        </td>

        <td>
          <a href="action_fetch_part_1.php">Click</a>
        </td>
        <td>
          <a href="action_fetch_part_2.php">Click</a>
        </td>
        <td>
          <a href="action_fetch_set.php">Click</a>
        </td>

        <td>
          <a href="action_update_set.php?exp[offset]=<?php echo $value["id"]; ?>">Click</a>
        </td>

        <td>
          <a href="end_point_remove_set.php?id=<?php echo $value["id"]; ?>">Click</a>
        </td>
      </tr>
    <?php endforeach; ?>
  </table>

</body>
</html>
