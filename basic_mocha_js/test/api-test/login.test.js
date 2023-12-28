const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Login Feature", function () {
  it("1. Verifying Success Login with valid email and password", async function () { 
    const response = await domain 
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", 
            password: "jokotampan900" 
            });
      
    expect(response.body).to.include.keys("data", "message", "status", "credentials"); 
    expect(response.body.status).to.eql('SUCCESS_LOGIN');
    expect(response.body.message).to.eql('Anda Berhasil Login');
  });
})