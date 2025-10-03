# 🚀 Configuração CI/CD - Sistema SISEJA Frontend

Este documento explica como configurar e usar o pipeline de CI/CD para o frontend do Sistema SISEJA.

## 📋 O que foi configurado

### 1. Workflows GitHub Actions

- **`deploy.yml`**: Deploy automático para GitHub Pages quando há push/merge na branch `master`
- **`pr-check.yml`**: Validação automática de Pull Requests (testa sem fazer deploy)

### 2. Pipeline de Deploy Automático

🔄 **Trigger**: Push ou merge na branch `master`

**Etapas do Pipeline:**
1. ✅ Checkout do código
2. ✅ Setup do Node.js 20
3. ✅ Instalação das dependências (`npm ci`)
4. ✅ Execução dos testes
5. ✅ Linting (se configurado)
6. ✅ Build de produção
7. ✅ Deploy para GitHub Pages

### 3. Validação de Pull Requests

🔄 **Trigger**: Abertura, atualização ou reabertura de PRs para `master`

**Etapas da Validação:**
1. ✅ Testes
2. ✅ Build de validação
3. ✅ Verificação dos artefatos
4. ✅ Report de status

## ⚙️ Configuração Necessária no GitHub

### Passo 1: Habilitar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione **GitHub Actions**
5. Salve as configurações

### Passo 2: Verificar Permissões

As permissões necessárias já estão configuradas nos workflows:
- `contents: read` - Ler o código
- `pages: write` - Escrever no GitHub Pages
- `id-token: write` - Token de identificação

### Passo 3: Branch Protection (Recomendado)

Para garantir qualidade, configure proteção na branch master:

1. Vá em **Settings** → **Branches**
2. Clique em **Add rule**
3. Configure:
   - Branch name pattern: `master`
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Selecione: `pr-validation`

## 🔧 Como Usar

### Para Desenvolvimento Normal:

1. **Crie uma branch** a partir da master:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

2. **Desenvolva e faça commits**:
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   git push origin feature/nova-funcionalidade
   ```

3. **Abra um Pull Request**:
   - O workflow `pr-check.yml` vai executar automaticamente
   - Verifique se todos os checks passaram (✅)

4. **Merge o PR**:
   - Após aprovação, faça merge para master
   - O workflow `deploy.yml` vai executar automaticamente
   - A aplicação será deployada no GitHub Pages

### Para Deploy Manual (se necessário):

Se precisar forçar um deploy, faça um push direto para master:
```bash
git checkout master
git push origin master
```

## 📍 URLs Importantes

Após o primeiro deploy, a aplicação estará disponível em:
- **URL do GitHub Pages**: `https://feheze.github.io/sistema-siseja-frontend/`

## 🐛 Troubleshooting

### Tests Falhando?
- Verifique se todos os testes passam localmente: `npm test`
- Angular 20 requer configuração específica para headless testing

### Build Falhando?
- Teste o build localmente: `npm run build`
- Verifique se não há erros de TypeScript

### Deploy Falhando?
- Verifique se o GitHub Pages está habilitado
- Confirme que as permissões estão corretas
- Veja os logs no GitHub Actions

## 📝 Logs e Monitoramento

- **GitHub Actions**: `https://github.com/feheze/sistema-siseja-frontend/actions`
- **Deploy Status**: Visible na aba Actions após cada push
- **Page Build**: Visible em Settings → Pages

## 🔄 Workflow Status Badges (Opcional)

Adicione ao README.md principal:

```markdown
[![Deploy Status](https://github.com/feheze/sistema-siseja-frontend/workflows/Deploy%20Angular%20to%20GitHub%20Pages/badge.svg)](https://github.com/feheze/sistema-siseja-frontend/actions)
[![PR Check](https://github.com/feheze/sistema-siseja-frontend/workflows/Pull%20Request%20Check/badge.svg)](https://github.com/feheze/sistema-siseja-frontend/actions)
```

---

## 🚀 Próximos Passos

1. ✅ Commit e push das configurações
2. ✅ Habilitar GitHub Pages
3. ✅ Testar um PR
4. ✅ Verificar o deploy automático
5. 🔄 Configurar branch protection (opcional)