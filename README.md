API-ESP-LARAVEL-REACT

Passo a passo  - API LARAVEL 

01 - Clone Repositório:
git clone https://github.com/LoureiroBruno/API-ESP-LARAVEL-REACT.git

---------------------------------------------------------------------

02 - Acessar o Repositório Via Terminal:
respositorio baixado/API-ESP-LARAVEL-REACT/api-laravel

--------------------------------------------------------------------- 

03- Baixar as Dependências da api-laravel:
composer install

---------------------------------------------------------------------

04 - Crie o Arquivo .env:
cp .env.example .env

---------------------------------------------------------------------

05 - Atualize as variáveis de ambiente do arquivo .env:
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=nome_usuario
DB_PASSWORD=senha_aqui

---------------------------------------------------------------------

06 - Importar o Schema do Banco - api-laravel:
Dentro da pase "schema"  importar ao Serivdor mysql versão mysql:8.0.30

---------------------------------------------------------------------

07 - Importar as Migrate:
php artisan migrate

---------------------------------------------------------------------

08 - Gerar a key do projeto Laravel:
php artisan key:generate

---------------------------------------------------------------------

09 - Subir a Aplicação api-laravel:
php artisan serve

---------------------------------------------------------------------


Passo a passo  - API REACT 

01 - Acessar o Repositório Via Terminal:
respositorio baixado/API-ESP-LARAVEL-REACT/api-react

02 - Baixar as Dependências da api-react:
npm install

03 - Subir a Aplicação api-react:
npm start

Aplicação inicial no servidor:
http://localhost:3000/
