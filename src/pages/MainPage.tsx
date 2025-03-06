import React, { useState } from "react";
import { Button, Card, Col, Row, message, Spin } from "antd";
import axios from "axios"; // Используем axios для запросов

interface Product {
	id: number;
	name: string;
	image: string;
}

const MainPage: React.FC = () => {
	// Продукты, которые будут отображаться на странице
	const initialProducts: Product[] = [
		{
			id: 1,
			name: "Куриная грудка",
			image: "/chicken.jpg"
		},
		{ id: 2, name: "Яйца", image: "/eggs.jpg" },
		{ id: 3, name: "Горох", image: "/peas.jpg" }
		// { id: 4, name: "Хлеб", image: "/chicken.jpg" }
		// { id: 5, name: "Бананы", image: "/peas.jpg" }
	];

	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [cart, setCart] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
	const [prices, setPrices] = useState<Map<number, number>>(new Map());

	// API ключ Яндекс Еды
	const API_KEY = "AQVN1E_-bD6P1EHUsBfEWqo7Ud4sHDp3cEpEJBVt"; // Замените на свой API ключ
	const API_URL =
		"https://cors-anywhere.herokuapp.com/https://eda.yandex/api/v2/products/get_prices";

	// Добавление продукта в корзину
	const addToCart = (product: Product) => {
		setCart((prev) => [...prev, product]);
	};

	// Получение цен из API Яндекс Еды
	const fetchPrices = async () => {
		if (cart.length === 0) {
			message.warning("Сначала добавьте продукты в корзину!");
			return;
		}

		setLoading(true);
		try {
			// Подготовка списка товаров для запроса
			const productNames = cart.map((item) => item.name);
			const response = await axios.post(
				API_URL,
				{
					product_names: productNames
				},
				{
					headers: {
						Authorization: `Bearer ${API_KEY}`,
						"Content-Type": "application/json"
					}
				}
			);

			// Пример обработки полученных данных
			const pricesFromAPI = response.data.data;
			const updatedPrices = new Map<number, number>();

			pricesFromAPI.forEach((priceData: { name: string; price: number }) => {
				const product = cart.find((p) => p.name === priceData.name);
				if (product) {
					updatedPrices.set(product.id, priceData.price);
				}
			});

			setPrices(updatedPrices);
		} catch (error) {
			console.error("Ошибка при получении цен:", error);
			message.error("Ошибка при получении цен. Попробуйте снова.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-xl font-bold text-center mb-6">
				Добро пожаловать в наш Агрегатор!
			</h1>

			{/* Список продуктов */}
			<Row gutter={16}>
				{products.map((product) => (
					<Col span={8} key={product.id} className="mb-4">
						<Card
							hoverable
							cover={
								<img
									alt={product.name}
									src={product.image}
									className="w-[360px] h-[360px]"
								/>
							}
							actions={[
								<Button
									type="primary"
									onClick={() => addToCart(product)}
								>
									Добавить в корзину
								</Button>
							]}
						>
							<Card.Meta title={product.name} />
						</Card>
					</Col>
				))}
			</Row>

			{/* Корзина */}
			<div className="mt-6">
				<h2 className="text-lg font-semibold">Ваша корзина</h2>
				{cart.length > 0 ? (
					<ul>
						{cart.map((item) => (
							<li key={item.id}>{item.name}</li>
						))}
					</ul>
				) : (
					<p>Корзина пуста</p>
				)}
			</div>

			{/* Кнопка для получения цен */}
			<div className="mt-6 text-center">
				<Button
					type="primary"
					size="large"
					onClick={fetchPrices}
					disabled={loading}
				>
					{loading ? <Spin /> : "Получить цены"}
				</Button>
			</div>

			{/* Показ цен */}
			{prices.size > 0 && (
				<div className="mt-6">
					<h2 className="text-lg font-semibold">Цены на продукты</h2>
					<ul>
						{cart.map((item) => (
							<li key={item.id}>
								{item.name}:{" "}
								{prices.get(item.id)
									? `${prices.get(item.id)} ₽`
									: "Цена не найдена"}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default MainPage;
