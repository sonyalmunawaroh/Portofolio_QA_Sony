const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;
const fs = require('fs');

describe("Scenario Update Profile Feature", function () {
  it("1. Verifying Success Update Profile", async function () {     
    const responseLogin = await domain 
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", password: "jokotampan900" });
    
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .put("/update-profile")
      .set("Authorization", `${authToken}`)
      .send({name: "argavi"})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('Username Anda menjadi argavi');
    expect(response.body.message).to.eql('Berhasil Perbarui Profile');
    expect(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE')
  });

  // Dibawah ini merupakan contoh scenario yang menggunakan feature upload image
  // it("2. Verifying Success Update Profile with change the photo profile", async function () {     
  //   const responseLogin = await domain 
  //     .post("/login")
  //     .send({ email: "jokotampan900@gmail.com", password: "jokotampan900" });
    
  //   const authToken = responseLogin.body.credentials.access_token;
  //   const imagePath = "C:/Users/USER/Documents/belajar_mocha_2/data/image.jpg";  
  //   const response = await domain 
  //     .put("/update-profile")
  //     .set("Authorization", `${authToken}`)
  //     .send({name: "argavi"})
  //     .field("image_field_1", fs.createReadStream(imagePath));
  //     .field("image_field_2", fs.createReadStream(imagePath));

    
  //   expect(response.body).to.include.keys("data", "message", "status");  
  //   expect(response.body.data).to.eql('Username Anda menjadi argavi');
  //   expect(response.body.message).to.eql('Berhasil Perbarui Profile');
  //   expect(response.body.status).to.eql('SUCCESS_UPDATE_PROFILE')
  // });
});
