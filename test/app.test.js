const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");
const User = require("../models/userModel");

require("dotenv").config();
let id = ""
let token = ''

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD));
    const response = await request(app)
            .post('/worko/user/signin')
            .send({ email: 'test@mail.com', password: 'test1234' });

    token = response.body.token;
    id = response.body.data.user._id
    console.log(token)
    console.log(id)
  });


  afterAll(async () => {
    // const user = User.findByIdAndDelete(id)
    await mongoose.connection.close();

  });


  describe("POST /worko/user/signup", () => {
    it("should return token and user", async () => {
      const res = await request(app).post("/worko/user/signup")
      .send({
        name: "Batra Ji",
        email: "test1@mail.com",
        password: "test1234",
        passwordConfirm: "test1234",
        zipCode: 560103
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.user.name).toBe("Batra Ji");
    });
  });
  describe("GET /worko/user", () => {
    it("should return all products", async () => {
      const res = await request(app).get("/worko/user").set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toBe(200);
      expect(res.body.data.docs.length).toBeGreaterThan(0);
    });
  });

  describe("POST /worko/user", () => {
    it("should create a product", async () => {
      const res = await request(app).post("/worko/user").set('Authorization', `Bearer ${token}`)
      .send({
        name: "Batra Ji",
        email: "tes@mail.com",
        password: "test1234",
        passwordConfirm: "test1234",
        zipCode:560035
      })
      expect(res.statusCode).toBe(200)
      expect(res.body.data.name).toBe("Batra Ji");
      id = res.body.data._id
    });
  });

  describe("GET /worko/user/:id", () => {
    it("should return a product", async () => {
      const res = await request(app).get(
        `/worko/user/${id}`
      ).set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toBe(200);
      expect(res.body.data.doc.name).toBe("Batra Ji");
    });
  });
  describe("PATCH /worko/user/:id", () => {
    it("should update a product", async () => {
      const res = await request(app)
        .patch(`/worko/user/${id}`)
        .send({
          name: "Hello"
        }).set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toBe(200);
    });
  });
  
  describe("DELETE /api/products/:id", () => {
    it("should delete a product", async () => {
      const res = await request(app).delete(
        `/worko/user/${id}`
      ).set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toBe(204);
    });
  });