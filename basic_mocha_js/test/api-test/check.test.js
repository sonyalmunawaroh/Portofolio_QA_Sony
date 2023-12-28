const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Delete Profile Feature", function () {
  it("1. Verifying Success Delete Profile", async function () {     
    let random_email = Math.random().toString(36).substring(7); 

    const responseRegister = await domain
        .post("/register")
        .send({ email: random_email + "@gmail.com", password: random_email, name: random_email });
    
    const responseLogin = await domain 
      .post("/login")
      .send({ email: random_email + "@gmail.com", password: random_email });
    
    // Memasukan accessToken dari sukses login ke const authToken  
    const authToken = responseLogin.body.credentials.access_token;    
    const response = await domain 
      .delete("/delete-user")
      .set("Authorization", `${authToken}`) // Memasukan authToken pada header payload
      .send({password: random_email})
    
    expect(response.body).to.include.keys("data", "message", "status");  
    expect(response.body.data).to.eql('Sedih melihatmu pergi ' + random_email);
    expect(response.body.message).to.eql('Berhasil Hapus User');
    expect(response.body.status).to.eql('SUCCESS_DELETE_PROFILE')
  }).timeout(10000);
});