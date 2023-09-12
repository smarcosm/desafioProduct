import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "../../customer/update/update.customer.dto";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
  private ProductRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.ProductRepository = ProductRepository;
  }

  async execute(
    input: InputUpdateProductDto
  ): Promise<OutputUpdateProductDto> {
    const product = await this.ProductRepository.find(input.id);
    product.changeName(input.name);
    
    await this.ProductRepository.update(product);

    return {
     id: input.id,
     name: input.name,
      price: input.price,
      type: input.type
    };
  }
}
