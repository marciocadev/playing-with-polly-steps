# playing-with-polly-steps

## Texto (Dom Casmurro)
Uma noite destas, vindo da cidade para o Engenho Novo, encontrei no trem da Central um rapaz aqui do bairro, que eu conheço de vista e de chapéu. Cumprimentou-me, sentou-se ao pé de mim, falou da lua e dos ministros, e acabou recitando-me versos. A viagem era curta, e os versos pode ser que não fossem inteiramente maus. Sucedeu, porém, que, como eu estava cansado, fechei os olhos três ou quatro vezes; tanto bastou para que ele interrompesse a leitura e metesse os versos no bolso.

–  Continue, disse eu acordando.

–  Já acabei, murmurou ele.

–  São muito bonitos.

Vi-lhe fazer um gesto para tirá-los outra vez do bolso, mas não passou de gesto; estava amuado. No dia seguinte entrou a dizer de mim nomes feios, e acabou alcunhando-me Dom Casmurro. Os vizinhos, que não gostam dos meus hábitos reclusos e calados, deram curso à alcunha, que afinal pegou. Nem por isso me zanguei. Contei a anedota aos amigos da cidade, e eles, por graça, chamam-me assim, alguns em bilhetes: “Dom Casmurro, domingo vou jantar com você.” – “Vou para Petrópolis, Dom Casmurro; a casa é a mesma da Renânia; vê se deixas essa caverna do Engenho Novo, e vai lá passar uns quinze dias comigo.” – “Meu caro Dom Casmurro, não cuide que o dispenso do teatro amanhã; venha e dormirá aqui na cidade; dou-lhe camarote, dou-lhe chá, dou-lhe cama; só não lhe dou moça.”

Não consultes dicionários. Casmurro não está aqui no sentido que eles lhe dão, mas no que lhe pôs o vulgo de homem calado e metido consigo. Dom veio por ironia, para atribuir-me fumos de fildalgo. Tudo por estar cochilando! Também não achei melhor título para a minha narração; se não tiver outro daqui até o fim do livro, vai este mesmo. O meu poeta do trem ficará sabendo que não lhe guardo rancor. E com pequeno esforço, sendo o título seu, poderá cuidar que a obra é sua. Há livros que apenas terão isso dos seus autores; alguns nem tanto.

## Texto (A metamorfose - Luis Fernando Verrísimo)
Uma barata acordou um dia e viu que tinha se transformado num ser humano. Começou a mexer suas patas e viu que só tinha quatro, que eram grandes e pesadas e de articulação difícil. Não tinha mais antenas. Quis emitir um som de surpresa e sem querer deu um grunhido. As outras baratas fugiram aterrorizadas para trás do móvel. Ela quis segui-las, mas não coube atrás do móvel. O seu segundo pensamento foi: “Que horror… Preciso acabar com essas baratas…”

Pensar, para a ex-barata, era uma novidade. Antigamente ela seguia seu instinto. Agora precisava raciocinar. Fez uma espécie de manto com a cortina da sala para cobrir sua nudez. Saiu pela casa e encontrou um armário num quarto, e nele, roupa de baixo e um vestido. Olhou-se no espelho e achou-se bonita. Para uma ex-barata. Maquiou-se. Todas as baratas são iguais, mas as mulheres precisam realçar sua personalidade. Adotou um nome: Vandirene. Mais tarde descobriu que só um nome não bastava. A que classe pertencia?… Tinha educação?…. Referências?… Conseguiu a muito custo um emprego como faxineira. Sua experiência de barata lhe dava acesso a sujeiras mal suspeitadas. Era uma boa faxineira.

Difícil era ser gente… Precisava comprar comida e o dinheiro não chegava. As baratas se acasalam num roçar de antenas, mas os seres humanos não. Conhecem-se, namoram, brigam, fazem as pazes, resolvem se casar, hesitam. Será que o dinheiro vai dar ? Conseguir casa, móveis, eletrodomésticos, roupa de cama, mesa e banho. Vandirene casou-se, teve filhos. Lutou muito, coitada. Filas no Instituto Nacional de Previdência Social. Pouco leite. O marido desempregado… Finalmente acertou na loteria. Quase quatro milhões ! Entre as baratas ter ou não ter quatro milhões não faz diferença. Mas Vandirene mudou. Empregou o dinheiro. Mudou de bairro. Comprou casa. Passou a vestir bem, a comer bem, a cuidar onde põe o pronome. Subiu de classe. Contratou babás e entrou na Pontifícia Universidade Católica.

Vandirene acordou um dia e viu que tinha se transformado em barata. Seu penúltimo pensamento humano foi : “Meu Deus!… A casa foi dedetizada há dois dias!…”. Seu último pensamento humano foi para seu dinheiro rendendo na financeira e que o safado do marido, seu herdeiro legal, o usaria. Depois desceu pelo pé da cama e correu para trás de um móvel. Não pensava mais em nada. Era puro instinto. Morreu cinco minutos depois , mas foram os cinco minutos mais felizes de sua vida.

Kafka não significa nada para as baratas…

# step001 
Start the project and set the lambda function
## .projenrc.ts
* release true
* codecov true

## github
* Entre no site do codecov e peguei o token, crie o secret CODECOV_TOKEN no github
* No seu repository github vá em settings / developr settings / personal access token e crie um token marcando 'repo', 'workflow', 'write:packages' e 'delete:packages'
* Crie o PROJEN_GITHUB_TOKEN com o valor obtido

## infra
* create basic lambda

# step002 
Create lambda code and add permission to call AWS Polly

[Polly voices](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)

## .projenrc.ts
* deps: ['@aws-sdk/client-polly']

## lambda
* add login and tests

## infra
* create polly policy statement

# step003
Create the HttpApi with path and voice param and change lambda to use the voice selected

Exemplos:
pt-BR: Camila e Vitoria
pt-PT: Ines

# step004
Adding lambda error alarm and integration with slack channel

## AWS Chatbot
create a new slack client (connect with login stack)

## deploy
cdk deploy --parameters SlackWorkspaceId=T03\*\*\*\*\*H09 --parameters SlackChannelId=C03\*\*\*\*\*TCJ

# step005
Upgrade major version