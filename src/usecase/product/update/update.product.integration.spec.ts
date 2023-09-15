import { Sequelize } from "sequelize-typescript";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";



describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const createProdutoUseCase = new CreateProductUseCase(repository)     
    
    const productUpdateUseCase = new UpdateProductUseCase(repository);
    const product1 = await createProdutoUseCase.execute({type: "a", name: "Notebook", price: 4500});
    
    const input = {id: product1.id, type: "b", name: "Mouse", price: 200}
    const output = await productUpdateUseCase.execute(input);
    

    expect(output).toEqual(input);
  });

});
