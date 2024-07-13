import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './AddWaterBtn.module.css';

const AddWaterBtn = (isBig, selectedDate) => {
	const [modIsOpen, setModIsOpen] = useState(false);
	const [basicModIsOpen, setBasicModIsOpen] = useState(false);
	const [success, setSuccess] = useState(false);

	const dispatch = useDispatch();

	const openAddModal = () => {
		setModIsOpen(true);
		setBasicModIsOpen(true);
	};

	const closeWaterModal = () => {
		setModIsOpen(false);
		setBasicModIsOpen(false);
	};

	const handleSubmit = async data => {};

	return success ? (
		<Toaster position='top-center' />
	) : (
		<>
			<div className={css.addBtnWrap}>
				<button
					className={isBig ? css.btnBig : css.btnSmall}
					type='button'
					onClick={openAddModal}
				>
					{isBig ? (
						{
							/* icon */
						}
					) : (
						<div className={css.iconWrapper}>{/* icon */}</div>
					)}
					<span className={isBig ? css.descSmall : css.descBig}>Add water</span>
				</button>
			</div>
		</>
	);
};

export default AddWaterBtn;
