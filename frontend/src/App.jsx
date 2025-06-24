import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { Textarea } from './components/ui/textarea'
import { Button } from './components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Alert, AlertDescription } from './components/ui/alert'
import { CheckCircle, AlertCircle, Droplets, Users, MapPin } from 'lucide-react'
import saneamentoIcon from './assets/saneamento-icon.png'
import saneamentoHero from './assets/saneamento-hero.png'
import santaCatarina from './assets/santa-catarina.jpg'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
    tipoProblema: '',
    descricao: '',
    foto: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      tipoProblema: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const formDataToSend = new FormData()
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key])
        }
      })

      const response = await fetch('/api/enviar-denuncia', {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      // Corrigir a verificação da resposta - o backend agora retorna 'message' ao invés de 'success'
      if (response.ok && result.message) {
        setSubmitStatus('success')
        setFormData({
          nome: '',
          email: '',
          endereco: '',
          numero: '',
          bairro: '',
          cidade: '',
          cep: '',
          tipoProblema: '',
          descricao: '',
          foto: null
        })
        // Reset file input
        const fileInput = document.getElementById('foto')
        if (fileInput) fileInput.value = ''
      } else {
        setSubmitStatus('error')
        console.error('Erro:', result.error || result.message)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Erro de rede:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img src={saneamentoIcon} alt="Saneamento SC" className="h-10 w-10 mr-3" />
              <h1 className="text-2xl font-bold text-blue-900">Saneamento SC</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Início
              </button>
              <button 
                onClick={() => setCurrentPage('sobre')}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Sobre
              </button>
              <button 
                onClick={() => setCurrentPage('denuncia')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Fazer Denúncia
              </button>
              <button 
                onClick={() => setCurrentPage('contato')}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contato
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Saneamento Básico é um <span className="text-blue-600">Direito de Todos</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Ajude a melhorar o saneamento básico em Santa Catarina. Denuncie problemas em sua região e contribua para um estado mais saudável.
              </p>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => setCurrentPage('denuncia')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Fazer Denúncia
                </Button>
                <Button 
                  onClick={() => setCurrentPage('sobre')}
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                >
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div>
              <img src={saneamentoHero} alt="Saneamento Básico" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">A Situação em Santa Catarina</h3>
            <p className="text-xl text-blue-100">Dados sobre saneamento básico no estado</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-300 mb-2">73,9%</div>
              <p className="text-lg">da população não tem acesso à coleta de esgoto</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-300 mb-2">31,3%</div>
              <p className="text-lg">do esgoto gerado é tratado no estado</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-300 mb-2">295</div>
              <p className="text-lg">municípios em Santa Catarina</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Como Funciona</h3>
            <p className="text-xl text-gray-600">Processo simples para fazer sua denúncia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Identifique</h4>
              <p className="text-gray-600">Observe problemas de saneamento em sua região: esgoto a céu aberto, vazamentos, falta de água, etc.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Denuncie</h4>
              <p className="text-gray-600">Preencha nosso formulário com os detalhes do problema. Inclua fotos se possível.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Encaminhe</h4>
              <p className="text-gray-600">Sua denúncia é enviada automaticamente para a prefeitura responsável pela sua cidade.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderSobre = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sobre o Projeto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Nossa Missão</h3>
              <p className="text-gray-600 mb-4">
                O Saneamento SC é um projeto desenvolvido para facilitar a comunicação entre cidadãos e prefeituras sobre problemas de saneamento básico em Santa Catarina.
              </p>
              <p className="text-gray-600">
                Acreditamos que a tecnologia pode ser uma ferramenta poderosa para melhorar a qualidade de vida das pessoas e promover um ambiente mais saudável.
              </p>
            </div>
            <div>
              <img src={santaCatarina} alt="Santa Catarina" className="w-full h-48 object-cover rounded-lg" />
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Como Funciona</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium">Denúncia Simples</h4>
                  <p className="text-gray-600">Interface intuitiva para reportar problemas de saneamento</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium">Envio Automático</h4>
                  <p className="text-gray-600">Denúncias são enviadas automaticamente para a prefeitura responsável</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium">Acompanhamento</h4>
                  <p className="text-gray-600">Sistema permite acompanhar o status das denúncias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderDenuncia = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fazer Denúncia</h2>
          <p className="text-lg text-gray-600">
            Preencha o formulário abaixo para reportar problemas de saneamento básico
          </p>
        </div>

        {submitStatus === 'success' && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Denúncia enviada com sucesso! A prefeitura foi notificada.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Erro ao enviar denúncia. Tente novamente.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Formulário de Denúncia</CardTitle>
            <CardDescription>
              Todos os campos marcados com * são obrigatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome (opcional)</Label>
                  <Input
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail (opcional)</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, Avenida, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    placeholder="123"
                  />
                </div>
                <div>
                  <Label htmlFor="bairro">Bairro *</Label>
                  <Input
                    id="bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    placeholder="Nome do bairro"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    placeholder="00000-000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cidade">Cidade *</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  placeholder="Nome da cidade"
                  required
                />
              </div>

              <div>
                <Label htmlFor="tipoProblema">Tipo de Problema *</Label>
                <Select onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de problema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="esgoto-ceu-aberto">Esgoto a céu aberto</SelectItem>
                    <SelectItem value="vazamento-agua">Vazamento de água</SelectItem>
                    <SelectItem value="falta-agua">Falta de água</SelectItem>
                    <SelectItem value="entupimento-rede">Entupimento na rede</SelectItem>
                    <SelectItem value="mau-cheiro">Mau cheiro</SelectItem>
                    <SelectItem value="contaminacao-agua">Contaminação da água</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição do Problema *</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva detalhadamente o problema observado..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="foto">Foto (opcional)</Label>
                <Input
                  id="foto"
                  name="foto"
                  type="file"
                  onChange={handleInputChange}
                  accept="image/*"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Anexe uma foto do problema para ajudar na identificação
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Importante:</strong> Ao enviar esta denúncia, as informações serão encaminhadas automaticamente para o e-mail da prefeitura da cidade informada. Certifique-se de que os dados estão corretos.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Denúncia'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContato = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contato</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Sobre este Projeto</h3>
              <p className="text-gray-600">
                Este é um projeto desenvolvido para feira de ciências, demonstrando como a tecnologia pode facilitar a comunicação entre cidadãos e prefeituras sobre problemas de saneamento básico.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Desenvolvedor</h3>
              <p className="text-gray-600">
                Projeto desenvolvido como demonstração de sistema web para gestão de denúncias de saneamento básico em Santa Catarina.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tecnologias Utilizadas</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Frontend: React.js com Tailwind CSS</li>
                <li>Backend: Python Flask</li>
                <li>Banco de Dados: PostgreSQL</li>
                <li>Envio de E-mails: SMTP Gmail</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="App">
      {currentPage === 'home' && renderHome()}
      {currentPage === 'sobre' && renderSobre()}
      {currentPage === 'denuncia' && renderDenuncia()}
      {currentPage === 'contato' && renderContato()}
    </div>
  )
}

export default App

