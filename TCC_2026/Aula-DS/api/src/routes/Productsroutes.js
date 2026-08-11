import { Router } from "express";

const router = Router();

console.log("Arquivo productRoutes carregado");

const products = [
    {
        id: 1,
        name: "Notebook Gamer",
        price: 5000
    },
    {
        id: 2,
        name: "Mouse Gamer",
        price: 6700
    },
    {
        id: 3,
        name: "Fone Gamer",
        price: 420
    },
    {
        id: 4,
        name: "Maximus",
        price: 100000
    }

];

router.get("/", (req, res) => {
    console.log("Entrou na rota GET /products");


    res.json(products);
});

router.post("/", (req, res) => {

    const newProduct ={
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    products.push(newProduct);

    res.status(201).json({
        message: "Produto adicionado com sucesso",
        product: newProduct
    })

});

router.delete("/:id", async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Produto não encontrado."
            });

        }

        res.json({
            message: "Produto removido com sucesso",
            product
        });

    } catch (error) {

        res.status(500).json({
            message: "Erro ao remover produto."
        });

    }

});


export default router;
