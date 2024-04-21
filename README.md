# Fake YouTube

Este projeto experimental se destina a integrar a API do YouTube para a criação dinâmica de playlists. Ao inserir o link de qualquer vídeo do YouTube, todas as suas informações relevantes são extraídas e armazenadas no banco de dados, incluindo descrição, tags, link do vídeo e autor. Posteriormente, o vídeo é exibido de forma fluida e organizada no site.

## Tecnologias Utilizadas:

- Front-end: Desenvolvido com Next.js, uma estrutura de aplicativo web React altamente performática, e estilizado de forma elegante e eficiente com Tailwind CSS.
- Back-end: Utilizando Node.js com Express para a construção de um servidor robusto e escalável, e Sequelize para a interação com o banco de dados MySQL. Essa combinação de tecnologias proporciona uma base sólida para manipular e armazenar os dados dos vídeos de forma eficiente.

## Funcionalidades:
- **Campo para inserir qualquer url de vídeo do YouTube, e através dela, a API retorna todos os dados do vídeo. Aluns dados como a descrição, tags e título são salvos no banco de dados.
- **Quando um vídeo é inserido é feita a verificação de tags no banco de dados, caso a tag já exista ela é atribuída para o vídeo, caso não exista é criada e depois atribuída ao vídeo.
- **A página de grid dos vídeos e de exibição de vídeo foram inspiradas totalmente no YouTube, seguindo os padrões visuais.
