import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { OutputProductDto, InputProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: InputProductDto): Promise<OutputProductDto> {
    const productCreate = ProductFactory.create("a", input.name, input.price);

    const product = new Product(
      productCreate.id,
      productCreate.name,
      productCreate.price
    );

    await this.productRepository.create(product);

    return {
      id: input.id,
      name: input.name,
      price: input.price,
    };
  }
}
