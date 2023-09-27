import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product_1",
      price: 2500,
      type: "a",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product_1");
    expect(response.body.price).toBe(2500);
    expect(response.body.type).toBe("a");
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product_1",
    });
    expect(response.status).toBe(500);
  });

  it("should list all product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product_1",
      price: 2500,
      type: "a",
    });
    expect(response.status).toBe(200);
    const response2 = await request(app).post("/product").send({
      name: "Product_2",
      price: 2500,
      type: "b",
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];

    expect(product.name).toBe("Product_1");
    expect(product.price).toBe(2500);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product_2");
    expect(product2.price).toBe(2500);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Product_1</name>`);
    expect(listResponseXML.text).toContain(`<price>2500</price>`);

    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<name>Product_2</name>`);
    expect(listResponseXML.text).toContain(`<price>2500</price>`);

    expect(listResponseXML.text).toContain(`</products>`);
  });
});
