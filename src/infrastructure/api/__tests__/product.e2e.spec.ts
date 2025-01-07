import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a products", async () => {
    const response = await request(app).post("/product").send({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      id: "2",
      name: "Product 2",
      price: 150,
    });
    expect(response2.status).toBe(200);

    const listProduct = await request(app).get("/product").send();

    expect(listProduct.status).toBe(200);
    expect(listProduct.body.products.length).toBe(2);
    expect(listProduct.body.products[0].name).toBe("Product 1");
    expect(listProduct.body.products[0].price).toBe(100);
    expect(listProduct.body.products[1].name).toBe("Product 2");
    expect(listProduct.body.products[1].price).toBe(150);
  });
});
