this project is a task given to me by BRENIN

Im naming it Agro_fields this is e-commerce platform for agriculture based products 
app can be switched between both B2B and B2c 

functionalities created


user registration/login:

enuiry page

view products 

add products in cart

execute order 

view past orders

contact the company


use your own credentials in /Backend/.env (if theres no .env create it yourself) for activation of app :
JWT_SECRET="create your own secret"
MONGO_URL="at mongo atlas create a cluster and copy the connection string and paste it over here"


first seed the database-(to display some data) by executing:
node Backend/seed.js

to run backend execute in terminal
cd Backend
npm run dev 

to run frontend execute
cd Frontend
npm run dev 




