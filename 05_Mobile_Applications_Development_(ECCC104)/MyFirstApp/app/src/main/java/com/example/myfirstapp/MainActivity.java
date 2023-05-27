package com.example.myfirstapp;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    Button calButton;

    TextView bmiMsgTextView;
    EditText heightEditText;
    EditText weightEditText;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        heightEditText = findViewById(R.id.heightEditText);
        weightEditText = findViewById(R.id.weightEditText);
        calButton = findViewById(R.id.calButton);
        bmiMsgTextView = findViewById(R.id.bmiMsgTextView);

        calButton.setOnClickListener(new View.OnClickListener(){
            public void onClick(View view){
                String w = weightEditText.getText().toString();
                double weight = Float.parseFloat(w);
                String h = heightEditText.getText().toString();
                double height = Float.parseFloat(h);
                double bmi = weight / (height*height);
                String text ="Your bmi is "+ String.format("%.2f",bmi);
                bmiMsgTextView.setText(text);
            }
        });
    }
}