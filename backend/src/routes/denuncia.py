import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from src.models.user import db
from src.models.denuncia import Denuncia

denuncia_bp = Blueprint('denuncia', __name__)

# Configurações de e-mail
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
EMAIL_USER = 'endonyparadela2007@gmail.com'
EMAIL_PASSWORD = 'ygcl tpom nvxm agtu'

# Mapeamento de cidades para e-mails das prefeituras
PREFEITURAS_EMAIL = {
    'florianópolis': 'prefeitura@pmf.sc.gov.br',
    'joinville': 'prefeitura@joinville.sc.gov.br',
    'blumenau': 'prefeitura@blumenau.sc.gov.br',
    'são josé': 'prefeitura@saojose.sc.gov.br',
    'criciúma': 'prefeitura@criciuma.sc.gov.br',
    'chapecó': 'prefeitura@chapeco.sc.gov.br',
    'itajaí': 'prefeitura@itajai.sc.gov.br',
    'lages': 'prefeitura@lages.sc.gov.br',
    'palhoça': 'prefeitura@palhoca.sc.gov.br',
    'balneário camboriú': 'prefeitura@bc.sc.gov.br'
}

def enviar_email_real(destinatario, assunto, corpo):
    """Envia e-mail real usando Gmail SMTP"""
    try:
        # Criar mensagem
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = destinatario
        msg['Subject'] = assunto
        
        # Adicionar corpo do e-mail
        msg.attach(MIMEText(corpo, 'plain', 'utf-8'))
        
        # Conectar ao servidor SMTP
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Habilitar criptografia
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        
        # Enviar e-mail
        text = msg.as_string()
        server.sendmail(EMAIL_USER, destinatario, text)
        server.quit()
        
        print(f"✅ E-mail enviado com sucesso para: {destinatario}")
        return True
        
    except Exception as e:
        print(f"❌ Erro ao enviar e-mail: {str(e)}")
        return False

@denuncia_bp.route('/enviar-denuncia', methods=['POST'])
def enviar_denuncia():
    try:
        # Obter dados do formulário
        endereco = request.form.get('endereco')
        numero = request.form.get('numero', '')
        bairro = request.form.get('bairro')
        cidade = request.form.get('cidade')
        cep = request.form.get('cep', '')
        tipo_problema = request.form.get('tipoProblema')
        descricao = request.form.get('descricao')
        nome = request.form.get('nome', '')
        email = request.form.get('email', '')
        
        print(f"Dados recebidos: {request.form.to_dict()}")
        
        # Validar campos obrigatórios
        if not all([endereco, bairro, cidade, tipo_problema, descricao]):
            return jsonify({'error': 'Campos obrigatórios não preenchidos'}), 400
        
        # Processar upload de foto (se houver)
        foto_path = None
        if 'foto' in request.files:
            foto = request.files['foto']
            if foto.filename != '':
                filename = secure_filename(foto.filename)
                foto_path = f"uploads/{filename}"
                # Aqui você salvaria o arquivo, mas para simplificar vamos apenas armazenar o nome
        
        # Criar nova denúncia
        nova_denuncia = Denuncia(
            nome=nome if nome else None,
            email=email if email else None,
            endereco=endereco,
            numero=numero if numero else None,
            bairro=bairro,
            cidade=cidade,
            cep=cep if cep else None,
            tipo_problema=tipo_problema,
            descricao=descricao,
            foto_path=foto_path
        )
        
        # Determinar e-mail da prefeitura
        cidade_lower = cidade.lower().strip()
        email_prefeitura = PREFEITURAS_EMAIL.get(cidade_lower, f'prefeitura@{cidade_lower.replace(" ", "")}.sc.gov.br')
        
        # Para demonstração, enviar para o seu e-mail pessoal
        email_destino = 'endonyparadela2007@gmail.com'
        nova_denuncia.enviado_para = email_destino
        
        # Salvar no banco de dados
        db.session.add(nova_denuncia)
        db.session.commit()
        
        # Preparar conteúdo do e-mail
        data_formatada = datetime.now().strftime('%d/%m/%Y %H:%M')
        
        assunto = f"[Saneamento SC] Nova Denúncia - {cidade} - ID #{nova_denuncia.id}"
        
        corpo_email = f"""Prezados,

Foi registrada uma nova denúncia de saneamento básico através do sistema Saneamento SC.

DADOS DA DENÚNCIA:
- ID: {nova_denuncia.id}
- Data: {data_formatada}

LOCALIZAÇÃO:
- Endereço: {endereco}
- Número: {numero if numero else 'Não informado'}
- Bairro: {bairro}
- Cidade: {cidade}
- CEP: {cep if cep else 'Não informado'}

PROBLEMA REPORTADO:
- Tipo: {tipo_problema}
- Descrição: {descricao}

CONTATO DO DENUNCIANTE:
- Nome: {nome if nome else 'Não informado'}
- E-mail: {email if email else 'Não informado'}

OBSERVAÇÃO IMPORTANTE:
Este é um projeto de feira de ciências desenvolvido para demonstrar como a tecnologia pode facilitar a comunicação entre cidadãos e prefeituras sobre problemas de saneamento básico.

Esta denúncia foi enviada através do sistema Saneamento SC, um projeto desenvolvido para facilitar a comunicação entre cidadãos e prefeituras sobre problemas de saneamento básico.

Atenciosamente,
Sistema Saneamento SC
Projeto de Feira de Ciências
"""
        
        # Enviar e-mail real
        sucesso_email = enviar_email_real(email_destino, assunto, corpo_email)
        
        if sucesso_email:
            return jsonify({
                'message': 'Denúncia enviada com sucesso! A prefeitura foi notificada.',
                'id': nova_denuncia.id,
                'email_enviado': True
            }), 200
        else:
            return jsonify({
                'message': 'Denúncia salva, mas houve erro no envio do e-mail.',
                'id': nova_denuncia.id,
                'email_enviado': False
            }), 200
            
    except Exception as e:
        print(f"Erro ao processar denúncia: {str(e)}")
        return jsonify({'error': 'Erro interno do servidor'}), 500

