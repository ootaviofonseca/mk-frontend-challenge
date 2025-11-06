# Moka Mind – Desafio Frontend Angular 🚀

## 🎯 Objetivo
Criar um painel simples de **monitoramento de dispositivos IoT** consumindo uma API REST.

## ⚙️ Requisitos
1. Listar dispositivos (`GET /devices`)
2. Criar novo dispositivo (`POST /devices`)
3. Editar dispositivo (`PUT /devices/:id`)
4. Remover dispositivo (`DELETE /devices/:id`)
5. Exibir contador de quantos estão ativos/inativos
6. Exibir um pequeno gráfico com os dados recentes dos dispositivos (`GET /charts`)

## 💡 Conceitos Esperados
- Componentes bem estruturados  
- Reuso e injeção de dependência  
- Uso de `HttpClient` com Observables  
- Reactive Forms e validações  
- Feedback visual (loading, sucesso, erro)

## 🧩 Rodando o Projeto
```bash
npm install
npm run mock
npm start
```

Acesse:
- App: [http://localhost:4200](http://localhost:4200)
- API: [http://localhost:3000/devices](http://localhost:3000/devices)
- API-GRÁFICO: [http://localhost:3000/devices](http://localhost:3000/charts)

## 🌟 Extra (opcional)
- Filtro por status (ativo/inativo)
- Layout responsivo
