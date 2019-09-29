
<?php
class transaction_model{
	
 
  function create_table(){
	$login_details = core::login_details();
	
	$conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	

	// sql to create table
	$sql = "CREATE TABLE transaction (
	id INT(6) AUTO_INCREMENT PRIMARY KEY,
	wallet_link INT(6),
	INDEX (`wallet_link`),
	type CHAR(3),
	amount INT(6),
	reference CHAR(255),
	tsp TIMESTAMP,
	INDEX (`tsp`)
	)";

	if ($conn->query($sql) === TRUE) {
		echo "Table created successfully";
	} else {
		echo "Error creating table: " . $conn->error;
	}

	$conn->close();


	$out1 = ". Table being created with '".$login_details["status"]."'";
	return $out1;
  }
 }
?>