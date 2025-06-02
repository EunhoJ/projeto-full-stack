import supabase from '../config/supabase'
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Cadastro de Usuário
const registerUser = async (req, res) => {
  // Desestruturação do objeto
  const { name, email, password } = req.body;

  // Cria um Hash para a senha informada
  const pHash = await bcrypt.hash(password, 10);

  // Abre a conexão com o Supabase (Tabela Users)
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: pHash }]);

  if (error) {
    return res.status(500).json({ error: "Error:", error });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" })
};

// Login
const auth = async (req, res) => {
  // Desestruturação do objeto
  const { email, password } = req.body;

  // Abre a conexão com o Supabase (Tabela Users)
  const { data: user, error } = await supabase.from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: "User not found", error });
  }

  // Criptografa a senha enviada e compara com a que está no DB
  const sPassword = await bcrypt.compare( password, users.password);
  
  if (!sPassword) {
    return res.status(401).json({ message: "User or password invalid"})
  }

  // Gera o Token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIN: "1d"}
  );

  res.json({ token });
};

