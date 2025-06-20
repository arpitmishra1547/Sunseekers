#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Arpit";
const char* password = "12345678";

const char* serverName = "https://sunseekers-9y97.vercel.app/api/sensor-data";

// Define Servo objects
Servo servoX;  // Horizontal servo
Servo servoY;  // Vertical servo

// LDR pin connections
const int ldrTopLeft = 25;
const int ldrTopRight = 33;
const int ldrBottomLeft = 34;
const int ldrBottomRight = 35;

// Threshold and servo angles
const int threshold = 10;
int angleX = 90;
int angleY = 90;

// Timer for sending data
unsigned long lastTime = 0;
const long timerDelay = 5000; // Send data every 5 seconds

void setup() {
  Serial.begin(9600);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Attach servos
  servoX.attach(23);
  servoY.attach(22);
  servoX.write(angleX);
  servoY.write(angleY);
}

void loop() {
  // Read sensor values
  int tl = analogRead(ldrTopLeft);
  int tr = analogRead(ldrTopRight);
  int bl = analogRead(ldrBottomLeft);
  int br = analogRead(ldrBottomRight);

  // Calculate average values
  int avgTop = (tl + tr) / 2;
  int avgBottom = (bl + br) / 2;
  int avgLeft = (tl + bl) / 2;
  int avgRight = (tr + br) / 2;

  // Adjust servo positions based on light intensity
  if (abs(avgLeft - avgRight) > threshold) {
    if (avgLeft > avgRight && angleX < 180) {
      angleX += 2;
    } else if (avgRight > avgLeft && angleX > 0) {
      angleX -= 2;
    }
  }

  if (abs(avgTop - avgBottom) > threshold) {
    if (avgTop > avgBottom && angleY < 180) {
      angleY += 2;
    } else if (avgBottom > avgTop && angleY > 0) {
      angleY -= 2;
    }
  }

  // Update servo positions
  servoX.write(angleX);
  servoY.write(angleY);

  // Send data to server every 5 seconds
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status() == WL_CONNECTED){
      HTTPClient http;

      // Your Domain name with URL path or IP address with path
      http.begin(serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      String httpRequestData = "{\"TL\":" + String(tl) +
                               ",\"TR\":" + String(tr) +
                               ",\"BL\":" + String(bl) +
                               ",\"BR\":" + String(br) +
                               ",\"horizontalAngle\":" + String(angleX) +
                               ",\"verticalAngle\":" + String(angleY) + "}";

      // Send HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);

      Serial.print("Sending data to server... ");

      if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
        Serial.printf("HTTP POST failed, error: %s\n", http.errorToString(httpResponseCode).c_str());
      }

      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }

  delay(100);
}