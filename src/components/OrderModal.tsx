'use client'

import React, { useState } from 'react'
import { Modal, Typography } from 'antd'
import SubscriptionForm from './SubscriptionForm'

const { Title, Paragraph } = Typography

interface OrderModalProps {
	open: boolean
	onClose: () => void
}

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose }) => {
	const [sessionStartTime] = useState<number>(Date.now())

	return (
		<Modal
			open={open}
			onCancel={onClose}
			footer={null}
			centered
			destroyOnClose
			maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
		>
			<div className='text-center p-4'>
				<Title level={4}>Получите идеальное меню прямо&nbsp;сейчас!</Title>
				<Paragraph>
					Оставьте номер телефона — мы подберем для вас персональное меню и
					отправим в&nbsp;течение&nbsp;10&nbsp;секунд.
				</Paragraph>

				<SubscriptionForm />
			</div>
		</Modal>
	)
}

export default OrderModal
