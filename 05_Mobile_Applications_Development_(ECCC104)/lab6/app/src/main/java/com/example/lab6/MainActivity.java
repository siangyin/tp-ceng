package com.example.lab6;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    Button btnEncode, btnDecode;
    EditText etName,etPrice,etDesc;
    TextView tvShow;
    JSONObject dataJson = new JSONObject();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        tvShow = (TextView) findViewById(R.id.tvJson);
        etName = (EditText) findViewById(R.id.etName);
        etPrice = (EditText) findViewById(R.id.etPrice);
        etDesc = (EditText) findViewById(R.id.etDescription);
        btnEncode = (Button) findViewById(R.id.btnEncode);
        btnDecode = (Button) findViewById(R.id.btnDecode);

        btnEncode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String name = etName.getText().toString();
                String price = etPrice.getText().toString();
                String desc = etDesc.getText().toString();

                try {
                    dataJson.put("Name",name);
                    dataJson.put("Price",price);
                    dataJson.put("Desc",desc);

                    tvShow.setText(dataJson.toString());

                } catch (JSONException e){
                    tvShow.setText("Error in encode Json");
                }
            }
        });

        btnDecode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String name = etName.getText().toString();
                String price = etPrice.getText().toString();
                String desc = etDesc.getText().toString();
                String decodeTxt = "Name: " + name + ", Price: " + price + ", Description: " + desc;

                tvShow.setText(decodeTxt);

            }
        });
    }
}