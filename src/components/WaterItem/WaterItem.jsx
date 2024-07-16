import { useState } from 'react';
import WaterModal from '../../components/WaterModal/WaterModal';
import Modal from '../../components/Modal/Modal';
import css from '../WaterItem/WaterItem.module.css';
import ModalDeleteEntry from '../ModalDeleteEntry/ModalDeleteEntry';

const WaterItem = () => {
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const handleDelete = () => {
		setDeleteModalOpen(true);
	};

	const handleEdit = () => {
		setEditModalOpen(true);
	};

	return (
		<>
			<ul className={css.list_water_items}>
				{Array(7)
					.fill(null)
					.map((_, index) => (
						<li key={index} className={css.water_item}>
							<div className={css.water_item_content}>
								<svg className={css.icon_water_glass} width='44' height='45'>
									<use href='../../src/assets/icons.svg#icon-water-glass'></use>
								</svg>
								<div>
									<strong>250 ml</strong>
									<p>7:00 AM</p>
								</div>
								<div className={css.container_buttons}>
									<button className={css.editButton} onClick={handleEdit}>
										<svg className={css.icon_edit} width='16' height='16'>
											<use href='../../src/assets/icons.svg#icon-edit'></use>
										</svg>
									</button>
									<button className={css.deleteButton} onClick={handleDelete}>
										<svg className={css.icon_edit} width='16' height='16'>
											<use href='../../src/assets/icons.svg#icon-trash'></use>
										</svg>
									</button>
								</div>
							</div>
						</li>
					))}
			</ul>
			{editModalOpen && (
				<Modal
					isOpen={editModalOpen}
					onClose={() => {
						setEditModalOpen(false);
					}}
				>
					<WaterModal operationType='edit' />
				</Modal>
			)}
			{deleteModalOpen && (
				<Modal
					isOpen={deleteModalOpen}
					onClose={() => {
						setDeleteModalOpen(false);
					}}
				>
					<ModalDeleteEntry />
				</Modal>
			)}
		</>
	);
};

export default WaterItem;
