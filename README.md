# 📱 Daily Habits - App de Hábitos Diários

> Aplicativo mobile desenvolvido com **React Native + Expo** como projeto de estudos. Acompanhe e construa hábitos diários, com streak, histórico e persistência local.

---

## 🎯 Funcionalidades (Roadmap v1)

- [x] Setup do projeto (Expo + TS + Navegação)
- [x] Telas e estrutura de navegação (Tabs + Stack)
- [x] Tipos do domínio + utilitários
- [ ] Criar, editar e excluir hábitos
  - Nome, ícone/cor, frequência (diário, dias específicos da semana)
- [ ] Marcar hábitos como "feito" no dia atual (toggle)
- [ ] Contador de **streak** (dias seguidos cumpridos)
- [ ] Lista de hábitos do dia (Home)
- [ ] Tela de detalhes do hábito (histórico, edição, exclusão)
- [ ] Persistência local (AsyncStorage) para salvar hábitos e completions, evitando que os dados não somem ao fechar o app
- [ ] Tela de estatísticas (resumo semanal/mensal)

---

## 🛠️ Stack Tecnológica

| Categoria      | Tecnologia                                       | Motivo                                                              |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------- |
| Mobile Framework | [Expo 57](https://expo.dev/) (React Native 0.86) | Setup zero (sem configurar Android/iOS nativo), hot reload, Expo Go |
| Linguagem      | TypeScript                                       | Tipagem estática, menos bugs, autocomplete                          |
| Navegação      | React Navigation 7 (Bottom Tabs + Native Stack)  | Navegação padrão do ecossistema RN (tabs + modal/pilha)             |
| Estado Global  | Context API + useReducer                         | Gerenciar estado sem lib extra (boa didática)                       |
| Persistência   | AsyncStorage                                     | Armazenamento chave-valor persistente, sem backend                  |
| Ícones         | `@expo/vector-icons` (Ionicons) + Emojis         | Ícones nativos e emojis para hábitos (sem lib extra)                |

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js ≥ 18
- Expo CLI (vem incluso via `npx expo`, não precisa instalar global)
- **Expo Go** instalado no celular físico ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/br/app/expo-go/id982107779))
  **OU** um emulador Android/iOS rodando.

### Passo a passo

1. Instale as dependências:
```bash
npm install
```

2. Inicie o Metro bundler:
```bash
npx expo start
```

3. No terminal aparecerá um **QR code** e opções:
   - **Celular físico**: Abra o app **Expo Go** → escaneie o QR code.
   - **Emulador Android**: Pressione `a` no terminal.
   - **Emulador iOS**: Pressione `i` no terminal (só macOS).
   - **Web (opcional)**: Pressione `w`.

---

## 📁 Estrutura de Pastas

```
src/
├── navigation/     # Configs de navegação (RootNavigator, MainTabs)
├── screens/        # Telas da app: Home, Stats, NewHabit, HabitDetail
├── context/        # Context API + Reducer (estado global)
├── types/          # Tipos TypeScript (habit.ts, navigation.ts)
├── utils/          # Funções auxiliares (dateUtils.ts, constants.ts)
└── components/     # Componentes reutilizáveis (HabitCard, etc.)
```

---

## 🧠 Conceitos Estudados em Cada Etapa

| Etapa | Arquivo(s) Alterados | Conceitos-chave |
| ----- | -------------------- | --------------- |
| 0 — Setup | `package.json`, `App.tsx` | Expo blank-typescript, instalação de dependências |
| 1 — Navegação | `navigation/*`, `screens/*` | Stack vs Tabs, tipagem de rotas, `NavigationContainer`, `SafeAreaProvider` |
| 2 — Tipos/Domínio | `types/habit.ts`, `utils/*` | Discriminated unions, normalização de dados (Habit vs Completion), funções puras de data, `as const` |

---

## 📝 Comandos Úteis

```bash
# Validar tipos TypeScript (sem gerar build)
npx tsc --noEmit

# Iniciar em Android diretamente
npx expo start --android

# Iniciar em iOS diretamente (apenas macOS)
npx expo start --ios

# Limpar cache do Metro (resolve bugs esquisitos)
npx expo start --clear
```

---

## 💡 Boas Práticas Adotadas

- **Type First**: Tipos são definidos antes da lógica.
- **Funções puras para datas**: Evita dependência de `Date.now()` global, facilitando testes.
- **Normalização**: `Habit` e `HabitCompletion` são entidades separadas (mesmo conceito de tabelas SQL).
- **Streak derivado, não salvo**: O streak é calculado das completions em tempo real. Nunca duplicamos informação.

---

## 📜 Licença

Projeto de estudos para uso livre.
