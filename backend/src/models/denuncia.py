from src.models.user import db
from datetime import datetime

class Denuncia(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    endereco = db.Column(db.String(200), nullable=False)
    numero = db.Column(db.String(20), nullable=True)
    bairro = db.Column(db.String(100), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    cep = db.Column(db.String(10), nullable=True)
    tipo_problema = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    foto_path = db.Column(db.String(200), nullable=True)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    enviado_para = db.Column(db.String(120), nullable=True)
    
    def __repr__(self):
        return f'<Denuncia {self.id}: {self.cidade} - {self.tipo_problema}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'email': self.email,
            'endereco': self.endereco,
            'numero': self.numero,
            'bairro': self.bairro,
            'cidade': self.cidade,
            'cep': self.cep,
            'tipo_problema': self.tipo_problema,
            'descricao': self.descricao,
            'foto_path': self.foto_path,
            'data_criacao': self.data_criacao.isoformat() if self.data_criacao else None,
            'enviado_para': self.enviado_para
        }

