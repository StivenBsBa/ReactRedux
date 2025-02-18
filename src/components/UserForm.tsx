import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addUser } from "../redux/slices/userSlice";
import "../sass/userForm.scss"

const careers = [
    "Enfermería",
    "Ingeniería de Sistemas",
    "Especialización en Docencia",
    "Ingeniería Industrial",
    "TECNOLOGÍA EN ATENCIÓN PREHOSPITALARIA",
    "LICENCIATURA EN ESPAÑOL E INGLÉS",
    "Licenciatura en Educación Infantíl",
    "Licenciatura en Educación Religiosa",
    "Licenciatura en Música",
    "TEC. EN ATENCIÓN PREHOSPITALARIA EXTENSIÓN BUCARAMANGA",
    "TEOLOGÍA",
    "CONTADURÍA PÚBLICA",
    "ADMINISTRACIÓN DE EMPRESAS",
    "MAESTRÍA EN EDUCACIÓN",
    "MARKETING Y COMUNICACIÓN DIGITAL",
    "MAESTRÍA EN ESTUDIOS RELIGIOSOS Y TEOLOGÍA",
    "ESPECIALIZACIÓN EN ALTA GERENCIA",
    "MAESTRÍA EN ESTUDIOS RELIGIOSOS Y TEOLOGÍA VIRTUAL"
];

const UserForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState({
        name: "",
        tel: "",
        email: "",
        career: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        tel: "",
        email: "",
        career: "",
    });

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateTel = (tel: string) => /^(\+57|57)?\s?3\d{2}[-.\s]?\d{3}[-.\s]?\d{4}$/.test(tel);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: formData.name.trim() ? "" : "Campo obligatorio",
            tel: formData.tel.trim()
                ? validateTel(formData.tel)
                    ? ""
                    : "Teléfono invalido"
                : "Campo obligatorio",
            email: formData.email.trim()
                ? validateEmail(formData.email)
                    ? ""
                    : "Formato de email inválido"
                : "Campo obligatorio",
            career: formData.career.trim() ? "" : "Campo obligatorio",
        };

        if (Object.values(newErrors).some(error => error !== "")) {
            setErrors(newErrors);
            return;
        }

        dispatch(addUser({
            name: formData.name,
            tel: Number(formData.tel),
            email: formData.email,
            career: formData.career,
        }));

        setFormData({ name: "", tel: "", email: "", career: "" });
    };

    return (
        <div className="user-form">
            <h2>Agregar Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <input type="text" name="tel" placeholder="Telefono" value={formData.tel} onChange={handleChange} />
                    {errors.tel && <span className="error">{errors.tel}</span>}
                </div>

                <div className="form-group">
                    <input type="text" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <select name="career" value={formData.career} onChange={handleChange}>
                        <option value="">Selecciona una profesión</option>
                        {careers.map((prof, index) => (
                            <option key={index} value={prof}> {prof} </option>
                        ))}
                    </select>
                    {errors.career && <span className="error">{errors.career}</span>}
                </div>

                <button type="submit">Agregar</button>
            </form>

        </div>
    );
};

export default UserForm;
