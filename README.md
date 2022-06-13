# playing-with-polly-steps

# step001 (cria projeto e a infra do lambda)
## .projenrc.ts
* release true
* codecov true

## github
* Entre no site do codecov e peguei o token, crie o secret CODECOV_TOKEN no github
* No seu repository github vá em settings / developr settings / personal access token e crie um token marcando 'repo', 'workflow', 'write:packages' e 'delete:packages'
* Crie o PROJEN_GITHUB_TOKEN com o valor obtido

## infra
* create basic lambda

## step002 (codifica o lambda e da permissão ao lambda para chamar o AWS Polly)
## .projenrc.ts
* deps: ['@aws-sdk/client-polly']