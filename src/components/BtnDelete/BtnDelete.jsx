import { useDispatch } from 'react-redux';
import css from './BtnDelete.module.css';

const BtnDelete = ({handleClose, id}) => {
    const dispatch = useDispatch();
    
    const handleDelete = (waterId) => {
        console.log(waterId);
        dispatch();
        // dispatch(deleteWater(waterId));
        handleClose();
    };
    
    return (
        <button type="button" onClick={() => {handleDelete(id)}} className={css.btnDelete}>Delete</button>
    );
};

export default BtnDelete;