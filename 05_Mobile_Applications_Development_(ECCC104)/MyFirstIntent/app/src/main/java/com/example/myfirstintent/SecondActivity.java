package com.example.myfirstintent;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class SecondActivity extends AppCompatActivity {
    TextView receiveMessage;
    Button returnButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        returnButton=findViewById(R.id.bBack);
        receiveMessage=findViewById(R.id.tvMessage);
        Intent intent = getIntent();
        String Msg = intent.getStringExtra("Message"); // receiving the values from MainActivity
        receiveMessage.setText(Msg);

        // handle return button
        returnButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(SecondActivity.this,MainActivity.class);
                startActivity(i);
            }
        });
    }
}