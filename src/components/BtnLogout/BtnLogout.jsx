// import { useDispatch } from 'react-redux';
import css from './BtnLogout.module.css';

const BtnLogout = ({handleClose}) => {
    // const dispatch = useDispatch();

    const handleLogout = () => {
        // dispatch();
        handleClose();
    };
    
    return (
        <button type="button" onClick={handleLogout} className={css.btnLogout}>Log out</button>
    );
};

export default BtnLogout;