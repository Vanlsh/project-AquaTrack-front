// import { useDispatch } from 'react-redux';
import css from './BtnDelete.module.css';

// const BtnDelete = ({handleClose, id}) => {
const BtnDelete = ({handleClose}) => {
    // const dispatch = useDispatch();
    
    // const handleDelete = (waterId) => {
    const handleDelete = () => {
        // dispatch();
        // dispatch(deleteWater(waterId));
        handleClose();
    };
    
    return (
        <button type="button" onClick={handleDelete} className={css.btnDelete}>Delete</button>
        // <button type="button" onClick={() => {handleDelete(id)}} className={css.btnDelete}>Delete</button>
    );
};

export default BtnDelete;