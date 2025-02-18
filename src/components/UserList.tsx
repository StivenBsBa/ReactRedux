import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../sass/userlist.scss";
import { removeUser } from "../redux/slices/userSlice";

const UserList = () => {
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();

    const handleDelete = (index: number) => {
        dispatch(removeUser(index));
    };
    return (
        <div className="user-list">
            {users.length === 0 ? (
                <p>No hay usuarios Registrados</p>
            ) : (
                <div>
                    <h2>Lista de Usuarios</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Profesión</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.tel}</td>
                                    <td>{user.email}</td>
                                    <td>{user.career}</td>
                                    <td><button
                                        className="delete-btn"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Eliminar
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
