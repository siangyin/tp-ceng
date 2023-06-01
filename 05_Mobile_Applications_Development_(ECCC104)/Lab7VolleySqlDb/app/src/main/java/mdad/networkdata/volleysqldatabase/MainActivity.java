package mdad.networkdata.volleysqldatabase;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    public static String ipBaseAddress = "http://172.30.86.8:8080//products";

    //http://mdad.atspace.cc/products/get_all_productsJson.php
    Button btnViewProducts, btnNewProduct;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Buttons
        btnViewProducts=findViewById(R.id.btnViewProducts);
        btnNewProduct=findViewById(R.id.btnCreateProduct);

        // view products click event
        btnViewProducts.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // launching all products activity
                Intent i = new Intent(getApplicationContext(),AllProductsActivity.class);
                 startActivity(i);
            }
        });


        // new product click event
        btnNewProduct.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // create new product activity
                Intent i = new Intent(getApplicationContext(),NewProductActivity.class);
                 startActivity(i);
            }
        });
    }
}