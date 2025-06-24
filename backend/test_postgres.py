import os
import sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from src.models.user import db
from src.models.denuncia import Denuncia
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://saneamento_user:saneamento123@localhost/saneamento_sc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    try:
        db.create_all()
        print('✅ Conexão com PostgreSQL bem-sucedida!')
        print('✅ Tabelas criadas com sucesso!')
        
        # Testar inserção de dados
        nova_denuncia = Denuncia(
            endereco='Teste PostgreSQL',
            bairro='Centro',
            cidade='Florianópolis',
            tipo_problema='teste',
            descricao='Teste de migração para PostgreSQL',
            enviado_para='teste@teste.com'
        )
        db.session.add(nova_denuncia)
        db.session.commit()
        print('✅ Inserção de dados funcionando!')
        
        # Verificar se os dados foram inseridos
        denuncias = Denuncia.query.all()
        print(f'✅ Total de denúncias no banco: {len(denuncias)}')
        
        for denuncia in denuncias:
            print(f'- ID: {denuncia.id}, Cidade: {denuncia.cidade}, Problema: {denuncia.tipo_problema}')
        
    except Exception as e:
        print(f'❌ Erro na conexão: {e}')
        import traceback
        traceback.print_exc()

