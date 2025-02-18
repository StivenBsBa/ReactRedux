import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../sass/userlist.scss";

const UserList = () => {
    const users = useSelector((state: RootState) => state.users.users);

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
                                <th>Edad</th>
                                <th>Email</th>
                                <th>Profesión</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>{user.career}</td>
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
