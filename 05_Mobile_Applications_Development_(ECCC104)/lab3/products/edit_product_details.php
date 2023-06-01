<html>

<body>
  <?php 
    //check that value for pid is set in the html form 
    if (isset($_POST["pid"])) { 
        $pid = $_POST['pid']; 
        // include db connect class 
        require_once __DIR__ . '/db_connect.php'; 
        // connecting to db 
        $db= new DB_CONNECT(); 
        $db->connect(); 

        // get the selected product based on pid 
        $sqlCommand="SELECT * FROM products WHERE pid = $pid"; 
        $result =mysqli_query($db->myconn, "$sqlCommand"); 
    if (mysqli_num_rows($result) > 0) { 
        foreach($result as $row) 
        { //retrieve the values of the product details 
            $name = $row["name"]; 
            $price = $row["price"]; 
            $description=$row["description"]; 
        } 
    } else { 
        // no products found 
        echo "<h1> Not found </h1>"; 
        echo "<br> <a href='main.html'> Home </a>"; 
        return; 
        } 
        $db->close($db->myconn); 
} 
?>

  <!----------------html Codes to be added   ----------------->

  <h2>Edit Selected Product Here</h2>
  <form action="update_product_details.php" method="post">
    Product Name: <input type="text" name="name" size=50 value="<?php echo $name ?>"> <br> <br>
    Product Price: <input type="text" name="price" size=20 value="<?php echo $price ?>"> <br> <br>
    Product Description: <input type="text" name="description" size=50 value="<?php echo $description ?>"> <br> <br>
    <input hidden type='text' name='pid' value="<?php echo $pid ?>">
    <input type="submit" name="Update" value="Update">
    <input type="submit" name="Remove" value="Remove">
  </form>
</body>

</html>