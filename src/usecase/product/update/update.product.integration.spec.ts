import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test for product update use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(repository);

    const product = new Product("1", "product 01", 250);

    await repository.create(product);

    const input = {
      id: "1",
      name: "new product",
      price: 300,
    };

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
