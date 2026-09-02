import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            await api.post("/auth/register", {
                username,
                password
            });

            navigate("/login");
        } catch (error) {
            console.error(error);

            if (error.response?.status === 409) {
                setError("Esse nome de usuário já está cadastrado.");
            } else {
                setError("Não foi possível realizar o cadastro.");
            }
        }
    }

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="register-header">
                    <h1>Criar conta</h1>
                    <p>Cadastre um usuário para acessar o CyberGuard.</p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="register-form"
                >

                    <div className="form-group">
                        <label>Usuário</label>

                        <input
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Digite seu usuário"
                        />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Digite sua senha"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirmar senha</label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Digite novamente sua senha"
                        />
                    </div>

                    {error && (
                        <p className="register-error">
                            {error}
                        </p>
                    )}

                    <button type="submit">
                        Cadastrar
                    </button>

                </form>

                <p className="register-login-link">
                    Já possui conta?{" "}
                    <Link to="/login">
                        Entrar
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;