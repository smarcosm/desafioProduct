import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.productusecase";
import Product from "../../../domain/product/entity/product";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([productModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("123", "tv", 200);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "tv",
      price: 200
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
