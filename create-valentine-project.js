const fs = require('fs');
const path = require('path');

// Configuração do projeto
const projectConfig = {
  name: "valentine-app",
  structure: {
    "css": ["styles.css", "animations.css"],
    "js": ["main.js", "game.js", "utils.js"],
    "assets": {
      "images": ["favicon.ico"],
      "sounds": []
    },
    "index.html": ""
  }
};

// Conteúdos dos arquivos (versão simplificada para evitar problemas de tamanho)
const fileContents = {
  "index.html": `<!DOCTYPE html><html><head><title>Dia dos Namorados</title></head><body></body></html>`,
  "css/styles.css": `body { font-family: Arial; }`,
  "css/animations.css": `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`,
  "js/main.js": `console.log("Aplicação iniciada");`,
  "js/game.js": `console.log("Jogo iniciado");`,
  "js/utils.js": `export function hello() { return "Hello"; }`
};

// Função principal para criar o projeto
async function createValentineProject() {
  try {
    console.log('Iniciando criação do projeto...');
    
    // Criar diretório raiz
    const projectRoot = path.join(process.cwd(), projectConfig.name);
    if (!fs.existsSync(projectRoot)) {
      fs.mkdirSync(projectRoot);
      console.log(`✅ Diretório principal criado: ${projectRoot}`);
    }

    // Criar subdiretórios
    const directories = [
      'css',
      'js',
      'assets/images',
      'assets/sounds'
    ];

    for (const dir of directories) {
      const dirPath = path.join(projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Diretório criado: ${dirPath}`);
      }
    }

    // Criar arquivos
    for (const [filePath, content] of Object.entries(fileContents)) {
      const fullPath = path.join(projectRoot, filePath);
      fs.writeFileSync(fullPath, content);
      console.log(`✅ Arquivo criado: ${fullPath}`);
    }

    // Criar favicon padrão se não existir
    const faviconPath = path.join(projectRoot, 'assets/images/favicon.ico');
    if (!fs.existsSync(faviconPath)) {
      fs.writeFileSync(faviconPath, '');
      console.log(`✅ Favicon placeholder criado: ${faviconPath}`);
    }

    console.log('\n🎉 Projeto criado com sucesso!');
    console.log(`👉 Acesse o diretório: cd ${projectConfig.name}`);
    console.log('👉 Abra no VS Code: code .');

  } catch (error) {
    console.error('\n❌ Erro ao criar projeto:', error.message);
    process.exit(1);
  }
}

// Executar a criação do projeto
createValentineProject();