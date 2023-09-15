import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";



describe("Test list product use case", () => {
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

  it("should list a product", async () => {

    const repository = new ProductRepository();  
    const createProdutoUseCase = new CreateProductUseCase(repository)     
    const useCase = new ListProductUseCase(repository); 
    const product1 = await createProdutoUseCase.execute({type: "a", name: "Notebook", price: 4500});
    const product = await createProdutoUseCase.execute({type: "b", name: "Mouse", price: 200});
    const product2 = await createProdutoUseCase.execute({type: "b", name: "Teclado", price: 400});
    const output = await useCase.execute({});

    expect(output.products.length).toBe(3);
        
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);

    expect(output.products[1].id).toBe(product.id);
    expect(output.products[1].name).toBe(product.name);
    expect(output.products[1].price).toBe(product.price);

    expect(output.products[2].id).toBe(product2.id);
    expect(output.products[2].name).toBe(product2.name);
    expect(output.products[2].price).toBe(product2.price);
   
  });

});
