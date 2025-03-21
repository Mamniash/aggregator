'use client';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import ProcessStep from '@/components/ProcessStep'

const HowItWorksSection = () => {
	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		slides: {
			perView: 1.2,
			spacing: 16
		},
		breakpoints: {
			'(min-width: 640px)': {
				slides: { perView: 2.2, spacing: 20 }
			},
			'(min-width: 1024px)': {
				slides: { perView: 3, spacing: 24 }
			}
		}
	})

	// Состояние для проверки мобильного разрешения
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		// Проверка ширины экрана после рендеринга
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640)
		}

		// Инициализация проверки
		handleResize()

		// Добавление обработчика события на изменение размера окна
		window.addEventListener('resize', handleResize)

		// Удаление обработчика при размонтировании компонента
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className='text-center mb-12'
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-2'>
						Узнайте, как{' '}
						<span className='primary-color'>Есть что поесть</span>{' '}
						упрощает вашу жизнь
					</h2>
					<p className='text-lg text-gray-600'>
						С Есть что поесть, здоровое и вкусное питание становится проще
						простого. Мы берем на себя все хлопоты, от планирования
						рациона до доставки свежих ингредиентов.
					</p>
				</motion.div>

				{/* Для мобильного устройства показываем карточки вертикально с анимацией */}
				{isMobile ? (
					<div className='flex flex-col items-center space-y-8'>
						{[
							'Выберите блюда или рацион',
							'Автоматический разбор рецептов',
							'Сравнение цен',
							'Быстрая доставка',
							'Инструкция по приготовлению'
						].map((title, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.2 }}
								className='text-center w-full'
							>
								<ProcessStep
									title={title}
									description={
										[
											'Сервис предложит меню исходя из ваших вкусов, диетических ограничений и калорийности.',
											'Сервис разобьёт блюда на конкретные ингредиенты',
											'Автоматически подберём лучшую цену среди всех магазинов и сервисов доставки.',
											'Закажите всё необходимое одним нажатием и получите продукты у себя дома в удобное время.',
											'Прямо в личном кабинете или приложении вы получите готовые пошаговые инструкции.'
										][index]
									}
									imageSrc='https://ext.same-assets.com/570987083/83775813.webp'
									imageAlt={title}
									delay={0}
								/>
							</motion.div>
						))}
					</div>
				) : (
					<div ref={sliderRef} className='keen-slider'>
						<ProcessStep
							title='Выберите блюда или рацион'
							description='Сервис предложит меню исходя из ваших вкусов, диетических ограничений и калорийности.'
							imageSrc='https://ext.same-assets.com/1266087314/4022716150.webp'
							imageAlt='Выберите блюда или рацион'
							delay={0}
						/>
						<ProcessStep
							title='Автоматический разбор рецептов'
							description='Сервис разобьёт блюда на конкретные ингредиенты'
							imageSrc='https://ext.same-assets.com/2436282666/601513818.webp'
							imageAlt='Автоматический разбор рецептов'
							delay={0.2}
						/>
						<ProcessStep
							title='Сравнение цен'
							description='Автоматически подберём лучшую цену среди всех магазинов и сервисов доставки.'
							imageSrc='https://ext.same-assets.com/570987083/83775813.webp'
							imageAlt='Сравнение цен'
							delay={0.4}
						/>
						<ProcessStep
							title='Быстрая доставка'
							description='Закажите всё необходимое одним нажатием и получите продукты у себя дома в удобное время.'
							imageSrc='https://ext.same-assets.com/570987083/83775813.webp'
							imageAlt='Быстрая доставка'
							delay={0.6}
						/>
						<ProcessStep
							title='Инструкция по приготовлению'
							description='Прямо в личном кабинете или приложении вы получите готовые пошаговые инструкции.'
							imageSrc='https://ext.same-assets.com/570987083/83775813.webp'
							imageAlt='Инструкция по приготовлению'
							delay={0.8}
						/>
					</div>
				)}
			</div>
		</section>
	)
}

export default HowItWorksSection;
