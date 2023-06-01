<html>

<body>
  <h2>Update Product</h2>

  <?php 
/* 
* Following code will edit or remove the selected product 
* All product details are read from HTTP Post Request 
*/ 
// check for required fields from posted html form 
if (isset($_POST['name']) && isset($_POST['price']) && isset($_POST['description']) && isset($_POST['pid']) ) { 
    //retrieve the values from html form 
    $pid = $_POST['pid']; 
    $name = $_POST['name']; 
    $price = $_POST['price']; 
    $description = $_POST['description']; 
    // include db connect class 
    require_once __DIR__ . '/db_connect.php'; 
    // connecting to db 
    $myConnection= new DB_CONNECT(); 
    $myConnection->connect(); 
    
    //if update button is clicked in form submission 
    if (isset($_POST['Update'])) 
        $sqlCommand="UPDATE products SET name='$name', price='$price', description='$description' WHERE pid='$pid'"; 
    //if remove button is clicekd in form submission 
    else if (isset($_POST['Remove'])) 
        $sqlCommand = "DELETE FROM products WHERE pid ='$pid'"; 
    //execute the sql command 
        $result =mysqli_query($myConnection->myconn, "$sqlCommand"); 
    // check the result 
    if ($result) { 
        // successfully updated into database 
        if (isset($_POST['Update'])) 
            echo "Product successfully updated."; 
        //successfully removed from database 
        else if (isset($_POST['Remove'])) ////
            echo "Product successfully removed"; 
    } else { 
    // failed to update database 
    echo "Oops! An error occurred." ; 
    } 

    $myConnection->close($myConnection->myconn); 
    echo "<br><br><a href='main.html'> Home</a>"; 
    } else { 
    echo "Error occurs"; 
    } 
?>

</body>

</html>