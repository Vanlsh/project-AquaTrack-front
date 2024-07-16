import css from '../AddWaterBtn/AddWaterBtn.module.css';
import WaterModal from '../../components/WaterModal/WaterModal';
import { useState } from 'react';
import clsx from 'clsx';
import Modal from '../Modal/Modal';

const AddWaterBtn = ({ isOpen }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleOpenModal = () => {
		setIsOpenModal(true);
	};

	return (
		<>
			<button
				className={clsx(css.btn, isOpen && css.btnStyle)}
				type='button'
				onClick={() => {
					handleOpenModal();
				}}
			>
				<svg
					className={clsx(css.icon, isOpen && css.iconStyle)}
					width='16'
					height='16'
				>
					<use href='../../src/assets/icons.svg#icon-plus'></use>
				</svg>
				Add water
			</button>
			{isOpenModal && (
				<Modal
					isOpen={isOpenModal}
					onClose={() => {
						setIsOpenModal(false);
					}}
				>
					<WaterModal
						operationAdd={true}
						operationType='add'
						isOpen={setIsOpenModal}
					/>
				</Modal>
			)}
		</>
	);
};

export default AddWaterBtn;
