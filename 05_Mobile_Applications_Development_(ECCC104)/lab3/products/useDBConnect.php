<?php
// include db_connect.php file
require_once __DIR__ . '/db_connect.php';
//check if connect button is set and submitted
if(isset($_POST["submit"])) {
    // create a new instance of DB_CONNECT class
    $db= new DB_CONNECT();
    //call the function connect() in DB_CONNECT class
    $connection = $db‐>connect();
    if (!$connection)
        echo("Connection failed");
else
}
echo "Connected successfully";
?>
<h2> SQL Database Connection </h2>
<form action="useDBConnect.php" method="post">
    <input type="submit" name="submit" value="Connect">
</form>