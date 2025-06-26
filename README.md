# Saneamento SC

Saneamento SC é uma plataforma web para denúncias de problemas de saneamento básico no estado de Santa Catarina. O objetivo é facilitar a comunicação entre os cidadãos e as prefeituras, permitindo o registro de problemas de forma simples e o encaminhamento automático para as autoridades responsáveis.

## 🚀 Funcionalidades

  * **Página Inicial:** Apresentação do projeto e dados sobre o saneamento em Santa Catarina.
  * **Formulário de Denúncia:** Permite que os usuários enviem denúncias detalhadas com:
      * Informações de contato (nome e e-mail opcionais).
      * Endereço completo da ocorrência.
      * Tipo de problema (esgoto a céu aberto, vazamento, falta de água, etc.).
      * Descrição detalhada do problema.
      * Upload de fotos para evidenciar o problema.
  * **Envio de E-mail:** As denúncias são enviadas automaticamente por e-mail para a prefeitura da cidade informada.
  * **Página "Sobre":** Explica o objetivo e a importância do projeto.
  * **Página de Contato:** Informações de contato do projeto.

## 🛠️ Tecnologias Utilizadas

O projeto é dividido em duas partes principais: o frontend e o backend.

### Frontend

  * **React:** Biblioteca JavaScript para a construção da interface do usuário.
  * **Vite:** Ferramenta de build para um desenvolvimento frontend mais rápido.
  * **Tailwind CSS:** Framework CSS para estilização rápida e moderna.
  * **shadcn/ui:** Componentes de UI reutilizáveis e acessíveis.
  * **React Hook Form:** Para gerenciamento de formulários.
  * **Lucide React:** Biblioteca de ícones.

### Backend

  * **Flask:** Microframework Python para o desenvolvimento do servidor web.
  * **Flask-SQLAlchemy:** Extensão para Flask que adiciona suporte ao SQLAlchemy.
  * **SQLAlchemy:** ORM para interação com o banco de dados.
  * **PostgreSQL:** Banco de dados relacional utilizado no projeto.
  * **Flask-Cors:** Extensão para lidar com Cross-Origin Resource Sharing (CORS).
  * **smtplib:** Biblioteca padrão do Python para envio de e-mails.

## 📂 Estrutura do Projeto

```
saneamento/
├── backend/
│   ├── src/
│   │   ├── models/       # Modelos de dados (Denuncia, User)
│   │   ├── routes/       # Rotas da API (denuncia, user)
│   │   ├── static/       # Arquivos estáticos servidos pelo backend
│   │   └── main.py       # Ponto de entrada da aplicação Flask
│   ├── requirements.txt  # Dependências do backend
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── assets/       # Imagens e ícones
│   │   ├── components/   # Componentes React (incluindo UI da shadcn)
│   │   ├── hooks/        # Hooks customizados
│   │   └── App.jsx       # Componente principal da aplicação
│   ├── index.html        # Ponto de entrada do frontend
│   ├── package.json      # Dependências e scripts do frontend
│   └── ...
├── .gitignore            # Arquivos ignorados pelo Git
└── render.yaml           # Configuração de deploy para a plataforma Render
```

## ⚙️ Configuração e Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento.

### Pré-requisitos

  * Node.js e npm (ou pnpm/yarn)
  * Python 3.11 ou superior
  * PostgreSQL

### 1\. Backend

1.  **Navegue até a pasta do backend:**

    ```bash
    cd backend
    ```

2.  **Crie e ative um ambiente virtual:**

    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3.  **Instale as dependências:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure o banco de dados PostgreSQL:**

      * Crie um banco de dados com um nome do seu gosto.
      * Crie um usuário que lhe agrade com a senha que preferir.
      * Você pode alterar essas configurações no arquivo `backend/src/main.py` ou usar variáveis de ambiente.

5.  **Configure as variáveis de ambiente para envio de e-mail:**
    Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis para o envio de e-mails:

    ```
    EMAIL_USER=seu-email@gmail.com
    EMAIL_PASSWORD=sua-senha-de-app-do-gmail
    ```

### 2\. Frontend

1.  **Navegue até a pasta do frontend:**

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

## ▶️ Executando a Aplicação

1.  **Inicie o servidor backend:**
    Na pasta `backend`, com o ambiente virtual ativado, execute:

    ```bash
    flask run
    ```

    O servidor estará disponível em `http://127.0.0.1:5000`.

2.  **Inicie a aplicação frontend:**
    Na pasta `frontend`, execute:

    ```bash
    npm run dev
    ```

    A aplicação estará disponível em `http://localhost:5173`.

## 🚀 Deploy

O projeto está configurado para deploy na plataforma [Render](https://render.com/) através do arquivo `render.yaml`. Ele configura um serviço web para o backend Python e um banco de dados PostgreSQL.

## 🤝 Como Contribuir

Contribuições são bem-vindas\! Se você tiver alguma ideia para melhorar o projeto, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

-----
