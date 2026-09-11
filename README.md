# Formulário de Coleta de Efetivo

Formulário mobile para encarregados informarem o efetivo completo por matrícula e situação. A página pode ser publicada gratuitamente no GitHub Pages e os dados são gravados em uma Planilha Google privada.

## 1. Criar a planilha e o endereço de recebimento

1. Crie uma Planilha Google vazia.
2. Abra **Extensões → Apps Script**.
3. Apague o conteúdo do editor e cole o arquivo `google-apps-script/Code.gs`.
4. Clique em **Implantar → Nova implantação**.
5. Selecione **Aplicativo da Web**.
6. Em **Executar como**, escolha **Eu**.
7. Em **Quem pode acessar**, escolha **Qualquer pessoa**.
8. Autorize e copie a URL terminada em `/exec`.

## 2. Conectar o formulário

No arquivo `dist/index.html`, localize:

```js
const ENDPOINT = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
```

Substitua pelo endereço `/exec` copiado no passo anterior.

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todo o conteúdo deste projeto.
2. Em **Settings → Pages**, selecione **Deploy from a branch**.
3. Como o GitHub Pages publica a raiz ou `/docs`, copie o conteúdo de `dist` para uma pasta `docs` ou para a raiz do repositório.
4. Escolha a branch `main` e a pasta usada; salve.
5. Compartilhe apenas o endereço publicado do formulário.

## Estrutura da planilha

Cada colaborador gera uma linha com: ID do envio, data/hora do envio, data de referência, encarregado, matrícula e situação. A planilha não precisa ser compartilhada com os encarregados.

## Observações de segurança

- O link é aberto e não exige login; qualquer pessoa com o endereço poderá enviar dados.
- Não publique a planilha nem seu endereço de edição.
- Matrículas não ficam gravadas no repositório GitHub.
- Para reduzir envios indevidos, compartilhe o link apenas no grupo dos encarregados e altere o endereço da implantação se ele vazar.
