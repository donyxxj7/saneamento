import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory
from flask_cors import CORS
from src.models.user import db
from src.models.denuncia import Denuncia
from src.routes.user import user_bp
from src.routes.denuncia import denuncia_bp

app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'asdf#FGSgvasgf$5$WGT'

# Habilitar CORS para permitir requisições do frontend
CORS(app)

app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(denuncia_bp, url_prefix='/api')

# Configuração do PostgreSQL
# Para desenvolvimento local, use estas configurações:
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://saneamento_user:saneamento123@localhost/saneamento_sc'

# Para produção, use variáveis de ambiente ou configuração específica
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    # Para deploy em produção (Heroku, Railway, etc.)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    # Para desenvolvimento local
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://saneamento_user:saneamento123@localhost/saneamento_sc'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder_path = app.static_folder
    if static_folder_path is None:
            return "Static folder not configured", 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            return "index.html not found", 404


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
