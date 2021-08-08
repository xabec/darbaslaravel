Clone the repository

    git clone git@github.com:xabec/darbaslaravel.git

Switch to the repo folder

    cd darbaslaravel

Install all the dependencies using composer

    npm install
   
Compile all your assets

    npm run dev

Config the env file

    cp .env.example .env

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000
