# playing-with-polly-steps

# step001
## .projenrc.ts
* release true
* codecov true

## github
* Entre no site do codecov e peguei o token, crie o secret CODECOV_TOKEN no github
* No seu repository github vá em settings / developr settings / personal access token e crie um token marcando 'repo', 'workflow', 'write:packages' e 'delete:packages'
* Crie o PROJEN_GITHUB_TOKEN com o valor 

## infra
* create basic lambda