# Sistema SISEJA - Frontend

Interface de usuário para gerenciamento de polos de faculdade desenvolvida com Angular 20.

## 🚀 Tecnologias

- **Angular 20** - Framework TypeScript para desenvolvimento web
- **TypeScript** - Linguagem de programação fortemente tipada
- **SCSS** - Pré-processador CSS para estilização
- **Angular Router** - Roteamento de páginas single-page application
- **RxJS** - Biblioteca para programação reativa
- **Server-Side Rendering (SSR)** - Renderização no servidor para SEO
- **Zoneless** - Aplicação sem zone.js para melhor performance
- **Angular Material** (Planejado) - Biblioteca de componentes UI

## 📁 Estrutura do Projeto

```
sistema-siseja-frontend/
├── src/
│   ├── app/                  # Módulos da aplicação
│   │   ├── components/       # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços para comunicação com API
│   │   ├── models/          # Modelos TypeScript
│   │   ├── guards/          # Guards de rota
│   │   └── shared/          # Módulos compartilhados
│   ├── assets/              # Recursos estáticos
│   ├── environments/        # Configurações de ambiente
│   ├── styles/             # Estilos globais
│   ├── index.html          # Página principal
│   └── main.ts             # Ponto de entrada da aplicação
├── angular.json            # Configurações do Angular CLI
├── package.json           # Dependências do projeto
└── tsconfig.json         # Configurações TypeScript
```

## 🛠️ Pré-requisitos

- **Node.js** 22.x ou superior - [Download aqui](https://nodejs.org/)
- **npm** 10.x ou superior (incluso com Node.js)
- **Angular CLI** - Instalação global: `npm install -g @angular/cli`

## 🚀 Como executar

### Desenvolvimento

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd sistema-siseja-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
ng serve
```

4. Acesse no navegador: `http://localhost:4200`

### Produção

1. Build para produção:
```bash
ng build --prod
```

2. Build com SSR:
```bash
npm run build:ssr
```

3. Servir aplicação com SSR:
```bash
npm run serve:ssr
```

## 🎨 Funcionalidades

### Páginas Principais (Planejadas)

#### Dashboard
- [ ] Visão geral dos polos
- [ ] Estatísticas e gráficos
- [ ] Indicadores de performance

#### Gestão de Polos
- [ ] Listagem de polos
- [ ] Cadastro de novo polo
- [ ] Edição de informações do polo
- [ ] Visualização detalhada do polo
- [ ] Exclusão de polo

#### Gestão de Cursos
- [ ] Listagem de cursos
- [ ] Vinculação de cursos aos polos
- [ ] Gerenciamento de modalidades
- [ ] Controle de vagas por curso

#### Gestão de Alunos
- [ ] Lista de alunos por polo
- [ ] Cadastro de novos alunos
- [ ] Controle de matrículas
- [ ] Histórico acadêmico

#### Relatórios
- [ ] Relatórios de ocupação
- [ ] Relatórios de performance
- [ ] Dashboards analíticos
- [ ] Exportação de dados

## 🔧 Comandos Úteis

### Angular CLI

```bash
# Executar em modo de desenvolvimento
ng serve

# Executar com hot reload
ng serve --hmr

# Build para produção
ng build --prod

# Executar testes unitários
ng test

# Executar testes e2e
ng e2e

# Gerar novo componente
ng generate component nome-do-componente

# Gerar novo serviço
ng generate service nome-do-servico

# Gerar novo módulo
ng generate module nome-do-modulo

# Análise do bundle
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### NPM

```bash
# Instalar dependências
npm install

# Instalar nova dependência
npm install <package-name>

# Instalar dependência de desenvolvimento
npm install --save-dev <package-name>

# Atualizar dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Executar script do package.json
npm run <script-name>
```

## 🎨 Estilização

### SCSS
O projeto utiliza SCSS para estilização com a seguinte estrutura:
- `src/styles/` - Estilos globais
- `src/styles/_variables.scss` - Variáveis SCSS
- `src/styles/_mixins.scss` - Mixins reutilizáveis
- Cada componente possui seu próprio arquivo `.scss`

### Tema
- Design system personalizado
- Cores da marca institucional
- Responsividade mobile-first
- Acessibilidade (WCAG 2.1)

## 📱 Responsividade

### Breakpoints
```scss
$mobile: 480px;
$tablet: 768px;
$desktop: 1024px;
$wide: 1200px;
```

### Layout
- Mobile-first approach
- Grid system flexível
- Componentes adaptativos

## 🔐 Autenticação

### JWT (Planejado)
- Login com email/senha
- Token JWT armazenado de forma segura
- Interceptors para requisições autenticadas
- Guards de rota para proteção de páginas

## 📊 Estado da Aplicação

### Services & RxJS
- Services para comunicação com API
- BehaviorSubjects para estado compartilhado
- Observables para dados reativos
- Error handling centralizado

## 🧪 Testes

### Testes Unitários (Jasmine + Karma)
```bash
# Executar todos os testes
ng test

# Executar testes com cobertura
ng test --code-coverage

# Executar testes em modo watch
ng test --watch
```

### Testes E2E (Cypress - Planejado)
```bash
# Executar testes e2e
ng e2e

# Abrir Cypress UI
npx cypress open
```

## 🚀 Deploy

### Netlify (Recomendado)
```bash
# Build para produção
ng build --prod

# Deploy manual
# Upload da pasta dist/ para Netlify
```

### GitHub Pages
```bash
# Instalar gh-pages
npm install --save-dev angular-cli-ghpages

# Deploy
ng deploy --base-href=/nome-do-repo/
```

### Docker
```dockerfile
# Dockerfile básico
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## 🔗 Integração com Backend

### Configuração de API
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

### Services HTTP
- HttpClient para requisições
- Interceptors para headers comuns
- Error handling globalizado
- Loading states

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Minha nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código
- Seguir Angular Style Guide
- Usar TypeScript strict mode
- Componentes pequenos e focados
- Nomes descritivos e consistentes
- Comentários em código complexo

### Padrões de Commit
- `Add:` Nova funcionalidade
- `Fix:` Correção de bug
- `Update:` Atualização de funcionalidade existente
- `Style:` Alterações de estilo/CSS
- `Refactor:` Refatoração de código
- `Docs:` Alterações na documentação

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Relacionados

- [Backend API](../sistema-siseja-backend) - API RESTful em .NET 8
- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

---

🎨 **Sistema SISEJA Frontend** - Desenvolvido com Angular 20
