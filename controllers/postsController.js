const postsModel = require('../model/postsModel');
const userModel = require('../model/userModel');
const mainController = require('./mainController');
async function lista(req, res) {
  mainController.verificar_session(req, res)
  try {
    const dados = await postsModel.getAll();
    posts = dados[0]
    res.render('posts/lista', { posts})
  } catch (error) {
    console.log(error)
  }
}

async function visualizar(req, res) {
  mainController.verificar_session(req, res)
  const postsId = parseInt(req.params.id);
  try {
    const dados = await postsModel.getPosts(postsId);
    if (dados[0].length > 0) {
      post = dados[0][0]
      res.render('posts/visualizar', { post })
    } else {
      res.status(404).json({ error: 'Posts Não encontrado' });
    }
  } catch (error) {
   
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function novo(req, res) {
  mainController.verificar_session(req, res)
  const dados = await userModel.getAll();
  users = dados[0]
  res.render('posts/new', { users })
}



async function salvar(req, res) {
  mainController.verificar_session(req, res)
  const { titulo, texto, users_id } = req.body;
  if (!titulo) {
    res.status(400).json({ error: 'titulo querido' });
    return;
  }
  const newposts = {
    titulo,
    texto,
    users_id
  }
  try {
    await postsModel.save(newposts);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function edit(req, res) {
  mainController.verificar_session(req, res)
  const postsId = parseInt(req.params.id);
  try {
    const dados = await postsModel.getPosts(postsId);
    if (dados[0].length > 0) {
      post = dados[0][0]
      console.log(post)
      res.render('posts/edit', { post })
    } else {
      res.status(404).json({ error: 'Post Não encontrado' });
      
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function alterar(req, res) {
  mainController.verificar_session(req, res)
  const { titulo, texto, id } = req.body;
  if (!titulo) {
    res.status(400).json({ error: 'titulo querido' });
    return;
  }
  const updatepost = {
    titulo,
    texto,
    id
  }
  try {
    await postsModel.alterar(updatepost);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


async function excluir(req, res) {
  mainController.verificar_session(req, res)
  const postsId = parseInt(req.params.id);
  try {
    await postsModel.excluir(postsId);
    res.redirect('/posts/index')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  lista,
  visualizar,
  salvar, 
  novo, 
  edit,
  alterar,
  excluir
};
