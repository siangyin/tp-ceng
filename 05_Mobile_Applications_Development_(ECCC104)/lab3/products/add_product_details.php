<html>

<body>
  <h2>Add Product</h2>

  <?php 
/* 
* Following code will edit or remove the selected product 
* All product details are read from HTTP Post Request 
*/ 
// check for required fields from posted html form 
if (isset($_POST['name']) && isset($_POST['price']) && isset($_POST['description'])) { 
    //retrieve the values from html form 
    $name = $_POST['name']; 
    $price = $_POST['price']; 
    $description = $_POST['description']; 
    // include db connect class 
    require_once __DIR__ . '/db_connect.php'; 
    // connecting to db 
    $myConnection= new DB_CONNECT(); 
    $myConnection->connect(); 
    
    //if update button is clicked in form submission 

        $sqlCommand="INSERT INTO products (name, price, description) VALUES ('$name','$price', '$description')";
    
        //echo $sqlCommand;
        $result =mysqli_query($myConnection->myconn, "$sqlCommand"); 
    // check the result 
    if ($result) { 
        // successfully updated into database 
            echo "Product successfully added.";         
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