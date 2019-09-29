
<?php
class wallet_model{

	function view(){
		$login_details = core::login_details();

		$conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}



		// sql to create table
		$sql = "SELECT id, name, hashkey FROM wallet WHERE id=2;";
		$result = $conn->query($sql);

		$conn->close();
		$result = (array) $result->fetch_assoc();

		return $result;
	}
	function create_table(){
		$login_details = core::login_details();

		$conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}



		// sql to create table
		$sql = "CREATE TABLE Wallet (
			id INT(6) AUTO_INCREMENT PRIMARY KEY,
			name CHAR(255),
			INDEX (`name`),
			hashkey CHAR(32)
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
	function create($arg){
		$login_details = core::login_details();

		$conn = new mysqli($login_details["servername"], $login_details["username"], $login_details["password"], $login_details["db"]);

		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}

		

		// sql to create table
		$sql = "INSERT INTO wallet (name, hashkey)
		VALUES ('".$arg['name']."', '".$arg['hashkey']."')";

		if ($conn->query($sql) === TRUE) {
			echo "query successfull".". ";
		} else {
			echo "query error: " . $conn->error.". ";
		}

		$conn->close();


		$out1 = ". table being queried with '".$login_details["status"]."'";
		return $sql;
	}
}
?>
