import express, { Request, Response } from "express";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import { InputProductDto } from "../../../usecase/product/create/create.product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const request = req.body as InputProductDto;

    const output = await usecase.execute(request);
    res.send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.send(output);
});
