# Achados e Perdidos

Uma plataforma comunitária para ajudar pessoas a encontrarem seus itens perdidos.

## Funcionalidades

- **Autenticação**: Sistema completo de login e cadastro com Supabase Auth
- **Registrar Itens Perdidos**: Usuários podem criar anúncios de itens que perderam
- **Registrar Itens Encontrados**: Usuários podem registrar itens que encontraram
- **Busca e Filtros**: Navegue por categorias e busque itens específicos
- **Perfil do Usuário**: Gerencie suas informações e itens cadastrados
- **Notificações**: Sistema preparado para enviar emails de notificação

## Tecnologias

- **Next.js 16** com App Router
- **Supabase** para autenticação e banco de dados
- **TypeScript** para type safety
- **Tailwind CSS v4** para estilização
- **shadcn/ui** para componentes de interface

## Como Usar

1. **Cadastre-se** ou faça login na plataforma
2. **Registre um item perdido** com detalhes como categoria, local e data
3. **Registre um item encontrado** se você achou algo
4. **Navegue** pelos itens perdidos e encontrados
5. **Entre em contato** com os donos dos itens

## Banco de Dados

Execute os scripts SQL na pasta `scripts/` para criar as tabelas necessárias:

1. `001_create_schema.sql` - Cria todas as tabelas e políticas RLS
2. `002_create_profile_trigger.sql` - Configura criação automática de perfis

## Próximos Passos

- Implementar busca avançada com filtros
- Adicionar upload de imagens
- Sistema de mensagens diretas
- Notificações por email automáticas
- Sistema de matching automático entre itens perdidos e encontrados
- Mapa interativo de localizações

## Segurança

Todas as tabelas usam Row Level Security (RLS) do Supabase para garantir que:
- Usuários só podem editar/deletar seus próprios itens
- Todos podem visualizar itens públicos
- Dados sensíveis são protegidos
