import supabase from '../config/supabase'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Cadastro de Usuário
const rUser = async (req, res) => {
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
  const sPassword = await bcrypt.compare(password, user.password);

  if (!sPassword) {
    return res.status(401).json({ message: "User or password invalid" })
  }

  // Gera o Token
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIN: "1d" }
  );

  res.json({ token });
};

// Listar todos os Usuários
const lUser = async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select(' id, name, email');

  if (error) {
    return res.status(500).json({ error: "Error", error });
  }

  // Devolve todos os usuários encontrados
  res.json(data);
};

// Atualizar dados de um registro (Usuário)
const uUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body

  const update = {
    ...(name && { name }),
    ...(email && { email }),
    ...(password && { password: await bcrypt.hash(password, 10) })
  }

  const { error } = await supabase
    .from('users')
    .update(update)
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: "Error", error});
  }

  res.json( { message: "Update Success"})
};

// Excluir um registro (Usuário)
const dUser = async (req, res) => {
  const { id } = req.params; // 1. Obtém o ID do usuário dos parâmetros da requisição

  // 2. Chama o Supabase para deletar o registro
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  // 3. Lida com possíveis erros
  if (error) {
    // Se houver um erro, envia um status 500 (Erro Interno do Servidor)
    // e o objeto de erro para o cliente.
    return res.status(500).json({ error: "Erro ao excluir usuário", error });
  }

  // 4. Envia uma resposta de sucesso para o cliente
  // Se a operação for bem-sucedida, envia um status 200 (OK)
  // e uma mensagem de sucesso.
  res.status(200).json({ message: "Usuário excluído com sucesso!" });
};