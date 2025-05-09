'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react' // Заменено на CurrencyRuble
import { Button } from 'antd'
import Link from 'next/link'

const pricingPlans = [
	{
		name: 'Базовый',
		description: `Бесплатный подбор меню, стандартное сравнение\u00A0цен`,
		price: '300р',
		features: [
			'Меню с быстрыми рецептами (до\u00A015\u00A0минут\u00A0готовки)',
			'Минимальный список продуктов',
			'Видеоуроки с пошаговыми\u00A0инструкциями',
			'Стандартное сравнение цен'
		]
	},
	{
		name: 'Оптимальный',
		description:
			'Персональные рекомендации, углублённый подбор и расширенный доступ\u00A0к\u00A0скидкам',
		price: '500р',
		features: [
			'Подсчет калорийности и БЖУ',
			'Автоматическое составление списка покупок\u00A0на\u00A0неделю',
			'Персональные рекомендации по питанию',
			'Полностью автоматизированное планирование\u00A0питания'
		]
	},
	{
		name: 'Премиум',
		description:
			'Полное сопровождение, приоритетная поддержка\u00A0и\u00A0доставка.',
		price: '700р',
		features: [
			'Выбор блюд по бюджету, времени готовки и вкусовым\u00A0предпочтениям',
			'Приоритетная 24/7 поддержка и помощь по вопросам\u00A0питания',
			'Приоритетная доставка'
		]
	}
]

const PricingSection = () => {
	return (
		<section className='py-20 bg-gray-50 text-black'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Тарифы и подписка
					</h2>
					<p className='text-lg max-w-2xl mx-auto'>
						Выбирайте тариф, который подходит вам и начинайте получать
						максимум от нашего&nbsp;сервиса
					</p>
				</motion.div>

				<div className='grid gap-8 md:grid-cols-3'>
					{pricingPlans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							className='bg-white text-black rounded-xl p-6 shadow-lg hover:shadow-xl transition'
						>
							<h3 className='text-2xl font-semibold mb-4'>
								{plan.name}
							</h3>
							<p className='text-gray-600 mb-4'>{plan.description}</p>
							<div className='flex items-center justify-between mb-6'>
								<span className='text-3xl font-bold'>{plan.price}</span>
								<Package className='text-yellow-500' size={30} />{' '}
								{/* Используем CurrencyRuble вместо DollarSign */}
							</div>
							<ul className='mb-6'>
								{plan.features.map((feature, index) => (
									<li
										key={index}
										className='flex items-center gap-2 mb-2'
									>
										<span className='text-green-500'>✔️</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<Link href='#order'>
								<Button className='btn-primary w-full py-3 rounded-lg'>
									Выбрать тариф
								</Button>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default PricingSection
