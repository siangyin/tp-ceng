<?php //Following code will list all the products
// include db connect class
require_once __DIR__ . '/db_connect.php';
// connecting to db
$db= new DB_CONNECT();
$db->connect();
// get all products from products table
$sqlCommand="SELECT * FROM products";
$result =mysqli_query($db->myconn, "$sqlCommand");
// check for empty result
if (mysqli_num_rows($result) > 0) {
// looping through all results
// products node
$response["products"] = array();
while ($row = mysqli_fetch_array($result)) {
// temporary array $product
$product = array();
$product["pid"] = $row["pid"];
$product["name"] = $row["name"];
$product["price"] = $row["price"];
// push single product into final response array
array_push($response["products"], $product);
}
// success
$response["success"] = 1;
// echoing JSON response
echo json_encode($response);
} else {
// no products found
$response["success"] = 0;
$response["message"] = "No products found";
// echo no users JSON
echo json_encode($response);
}
?>