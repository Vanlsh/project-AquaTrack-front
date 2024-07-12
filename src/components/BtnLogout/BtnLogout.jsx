import { useDispatch } from 'react-redux';
import css from './BtnLogout.module.css';

const BtnLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch();
    };
    
    return (
        <button type="button" onClick={handleLogout} className={css.btnLogout}>Log out</button>
    );
};

export default BtnLogout;