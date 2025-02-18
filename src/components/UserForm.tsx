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
        age: "",
        email: "",
        career: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        age: "",
        email: "",
        career: "",
    });

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validateAge = (age: string) => Number(age) > 0 && Number(age) <= 120;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: formData.name.trim() ? "" : "Campo obligatorio",
            age: formData.age.trim()
                ? validateAge(formData.age)
                    ? ""
                    : "Edad inválida (1-120)"
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
            age: Number(formData.age),
            email: formData.email,
            career: formData.career,
        }));

        setFormData({ name: "", age: "", email: "", career: "" });
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
                    <input type="number" name="age" placeholder="Edad" value={formData.age} onChange={handleChange} />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>

                <div className="form-group">
                    <input type="text" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <select name="career" value={formData.career} onChange={handleChange}>
                        <option value="">Selecciona una profesión</option>
                        {careers.map((prof, index) => (
                            <option key={index} value={prof}>{prof}</option>
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
