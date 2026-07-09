# 📚 Sistema Escolar

Um sistema web desenvolvido com **HTML, CSS e JavaScript puro** para gerenciamento de alunos, permitindo visualizar informações acadêmicas, cadastrar estudantes, editar notas, consultar médias e controlar a situação escolar de cada aluno.

## 📖 Sobre o Projeto

O Sistema Escolar simula um ambiente de gestão acadêmica para turmas do Ensino Fundamental (6º ao 9º ano). A aplicação oferece uma interface intuitiva para consultar alunos, visualizar boletins, cadastrar novos estudantes, editar notas e acompanhar o desempenho escolar.

Todo o funcionamento ocorre no navegador utilizando JavaScript, sem necessidade de banco de dados ou servidor.

---

## ✨ Funcionalidades

* Cadastro de novos alunos.
* Exclusão de alunos com confirmação.
* Visualização da ficha completa do aluno.
* Edição das notas dos quatro trimestres.
* Cálculo automático da média por disciplina.
* Cálculo da média geral do aluno.
* Classificação automática em:

  * ✅ Aprovado
  * ❌ Reprovado
  * ⏳ Pendente
* Busca de alunos por nome.
* Filtro por turma.
* Filtro por situação.
* Filtro por disciplina.
* Contagem automática de alunos da turma.
* Interface totalmente responsiva.
* Modais para cadastro, edição, visualização e confirmação de exclusão.

---

## 🛠 Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES6)

---

## 📁 Estrutura do Projeto

```
Sistema-Escolar/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 👨‍🏫 Estrutura dos Dados

Cada aluno possui:

* Matrícula
* Nome
* Turma
* Turno
* Responsável
* Contato
* Frequência
* Notas por disciplina
* Média automática
* Situação

As disciplinas cadastradas são:

* Matemática
* Português
* Ciências
* História
* Geografia

Cada disciplina possui notas para:

* 1º Trimestre
* 2º Trimestre
* 3º Trimestre
* 4º Trimestre

---

## 📊 Regras de Negócio

O sistema calcula automaticamente:

* Média de cada disciplina
* Média geral do aluno

Critério de aprovação:

* Média maior ou igual a **6,0** → **Aprovado**
* Média menor que **6,0** → **Reprovado**
* Sem notas cadastradas → **Pendente**

---

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/sistema-escolar.git
```

2. Acesse a pasta do projeto.

3. Abra o arquivo **index.html** em qualquer navegador moderno.

Não é necessário instalar dependências ou utilizar servidor.

---

## 💻 Funcionalidades da Interface

### Painel Superior

* Seleção da turma
* Filtro por situação
* Filtro por disciplina
* Busca por nome
* Botão para adicionar aluno

### Tabela

Exibe:

* Matrícula
* Nome
* Turno
* Média
* Situação
* Ações

Ao clicar no nome do aluno é aberta sua ficha completa.

---

## 📄 Ficha do Aluno

A ficha apresenta:

* Nome
* Matrícula
* Turma
* Turno
* Responsável
* Contato
* Frequência
* Todas as disciplinas
* Notas dos quatro trimestres
* Média de cada matéria

---

## ✏️ Edição de Notas

O sistema permite alterar:

* 1º trimestre
* 2º trimestre
* 3º trimestre
* 4º trimestre

Após salvar, todas as médias e a situação do aluno são recalculadas automaticamente.

---

## ➕ Cadastro de Alunos

É possível cadastrar um novo aluno informando:

* Nome
* Turma
* Turno
* Responsável
* Contato
* Frequência

Ao cadastrar, uma matrícula é gerada automaticamente.

---

## 🗑 Exclusão

Antes de remover um aluno, o sistema solicita confirmação para evitar exclusões acidentais.

---

## 📱 Responsividade

O sistema adapta automaticamente o layout para celulares e tablets.

Entre as adaptações:

* Painel de filtros em coluna
* Tabela otimizada
* Modais responsivos
* Formulários reorganizados

---

## 🎨 Interface

O projeto utiliza uma identidade visual moderna baseada em:

* Tons de azul para ações principais
* Verde para aprovados
* Vermelho para reprovados
* Amarelo para estados pendentes
* Layout em cards e modais

---

## 🔮 Melhorias Futuras

* Login de usuários
* Banco de dados
* Persistência com Local Storage
* Exportação para PDF
* Exportação para Excel
* Cadastro de professores
* Cadastro de disciplinas
* Controle de frequência por aula
* Dashboard com gráficos
* Histórico escolar
* Impressão de boletins
* Integração com API

---

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e de aprendizado em desenvolvimento Web utilizando HTML, CSS e JavaScript.

---

## 📄 Licença

Este projeto é de uso educacional e pode ser utilizado como base para estudos e aprimoramentos.
