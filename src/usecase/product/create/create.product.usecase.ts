import { UUIDV4 } from "sequelize";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";
import { v4 as uuid } from "uuid";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const productId = uuid();
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price    
    ) 

    await this.productRepository.create(product as Product);

    return {
      id: productId,
      name: input.name,
      price: input.price,
      type: input.type,
      
    };
  }
}
