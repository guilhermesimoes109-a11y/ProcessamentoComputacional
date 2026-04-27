Computational Processing — Installer Site

Conteúdo:
- index.html      (página de boas-vindas ao installer)
- download.html   (página de download da app)
- style.css       (estilos)
- script.js       (lógica)

Como abrir:
1. Descomprime o ZIP.
2. Abre index.html no browser, OU faz upload destes ficheiros para qualquer
   alojamento estático (Vercel, Netlify, GitHub Pages, etc.).

Como ligar o ficheiro da app ao botão de download:
1. Cria uma pasta chamada "files" ao lado dos ficheiros HTML.
2. Coloca lá o(s) instalador(es) com estes nomes exatos:
     files/computational-processing-windows.exe
     files/computational-processing-macos.dmg
     files/computational-processing-linux.AppImage
3. O botão de download passa a entregar o ficheiro certo conforme o
   sistema do visitante. Se um sistema não tiver ficheiro, o botão
   apenas mostra a mensagem informativa.
