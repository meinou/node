void setup(){
  size(600, 400);
  background(51);
  float max = random(800, 2000);
  for (int i = 0; i < max; i++){

    float r = random (100, 250);
    float b = random (100, 250);
    noStroke();
    fill(r, 0, b, 100);
    ellipse(random(600), random(400), 16, 16);
  }
  save("output.png");
  exit();
}
