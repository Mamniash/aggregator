'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import SubscriptionForm from '@/components/SubscriptionForm'

const HeroSection = () => {
	const handleSuccess = (email: string) => {
		console.log(`Успешная подписка! Почта: ${email}`)
	}

	const handleError = (message: string) => {
		console.log(`Ошибка: ${message}`)
	}

	return (
		<section className='relative overflow-hidden scroll-mt-28 ' id='head'>
			<div className='container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center'>
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className='w-full md:w-1/2 relative'
				>
					<Image
						src='https://ext.same-assets.com/615867683/3055122514.webp'
						alt='Свежие овощи и здоровая еда'
						width={600}
						height={400}
						className='rounded-lg shadow-lg'
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8 }}
					className='w-full md:w-1/2 mt-8 md:mt-0 md:pl-12'
				>
					<h1 className='text-4xl md:text-5xl font-bold mb-4'>
						<span className='primary-color'>Есть что поесть</span>. Ваш
						идеальный рацион без хлопот и переплат
					</h1>

					<p className='text-lg mb-8'>
						Автоматически подбираем меню на неделю с учетом ваших
						предпочтений, разбиваем блюда на ингредиенты и сравниваем цены
						во всех магазинах. Вам остается лишь получить продукты прямо к
						двери и наслаждаться вкусной, разнообразной и сбалансированной
						едой
					</p>

					<SubscriptionForm
						onSuccess={handleSuccess}
						onError={handleError}
					/>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroSection
