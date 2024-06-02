
# WORKOAI API

### Git Clone 
git clone https://github.com/dharmikbatra/workoai.git

cd workai

npm install

### Create a .env file  (currently there in last of readme)
DATABASE \
DATABASE_PASSWORD\
JWT_SECRET\
JWT_COOKIE_EXPIRY\
JWT_EXPIRY

### Running the Application
npm run start

## API Endpoints
### Get all Users
URL: /worko/user/\
Method: GET\
Request Body:

```json
{
  "headers": "Authorization: Bearer {token}"
}
```

Response:

```json
{
    "status": "success",
    "data": {
        "docs": [
            {
                "_id": "665b5280922ddc6c022d840c",
                "email": "batradharmik@gmail.com",
                "name": "batradharmik@gmail.com",
                "zipCode": 560103,
                "password": "$2b$12$hHoBZgtiZ5e01st1zNKV3uUPh7twjHLrEkjm6G7nDtCPGpWT6TDSe",
                "city": "Bangalore South",
                "__v": 0,
                "id": "665b5280922ddc6c022d840c"
            },
            {
                "_id": "665c1a8d4ec002bd6171bf82",
                "email": "test@mail.com",
                "name": "Batra Ji",
                "zipCode": 560105,
                "password": "$2b$12$rZxgOTOE.PVzD5/aKz9hI.BV0hwXRjrHGARLAV2qZ8ucgODcueGIC",
                "city": "Anekal",
                "__v": 0,
                "id": "665c1a8d4ec002bd6171bf82"
            }
        ]
    }
}
```

### Get a User
URL: /worko/user/:id\
Method: GET\
Request Body:
```json
{
  "headers": "Authorization: Bearer {token}"
}
```
Response:
```json
{
    "status": "success",
    "data": {
        "doc": {
            "_id": "665c1a8d4ec002bd6171bf82",
            "email": "test@mail.com",
            "name": "Batra Ji",
            "zipCode": 560105,
            "password": "$2b$12$rZxgOTOE.PVzD5/aKz9hI.BV0hwXRjrHGARLAV2qZ8ucgODcueGIC",
            "city": "Anekal",
            "__v": 0,
            "id": "665c1a8d4ec002bd6171bf82"
        }
    }
}

```

### Post a user
URL: /worko/user/:id\
Method: POST\
Request Body:
```json
{
  "headers": "Authorization: Bearer {token}"
  "payload":{
        "name": "Batra Ji",
        "email": "test@mail.com",
        "password": "test1234",
        "passwordConfirm": "test1234",
        "zipCode": "560105"
    }
}
```
Response:
```json
{
    "status": "success",
    "data": {
        "email": "test@mail.com",
        "name": "Batra Ji",
        "zipCode": 560105,
        "password": "$2b$12$mS0A65hD/tsft0xkD/TMq.V3bt2JWc3v/Az9UZ6hq32iL8W9Fq75y",
        "_id": "665c2881b286c0bf7a58fcd5",
        "city": "Anekal",
        "__v": 0,
        "id": "665c2881b286c0bf7a58fcd5"
    }
}
```


### Patch a user
URL: /worko/user/:id\
Method: PATCH\
Request Body:
```json
{
  "headers": "Authorization: Bearer {token}",
  "payload":{
        "name": "Batra Dharmik"
    }
}
```
Response:
```json
{
    "status": "success",
    "data": {
        "user": {
            "_id": "665c2881b286c0bf7a58fcd5",
            "email": "test@mail.com",
            "name": "Batra Dharmik",
            "zipCode": 560105,
            "password": "$2b$12$mS0A65hD/tsft0xkD/TMq.V3bt2JWc3v/Az9UZ6hq32iL8W9Fq75y",
            "city": "Anekal",
            "__v": 0,
            "id": "665c2881b286c0bf7a58fcd5"
        }
    }
}
```


### Signin a User
URL: /worko/user/signin\
Method: POST\
Request Body:
```json
{
  "payload":{
        "email": "test@mail.com",
        "password":"test1234"
    }
}
```

Response:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWMyODgxYjI4NmMwYmY3YTU4ZmNkNSIsImlhdCI6MTcxNzMxNjQzOSwiZXhwIjoxNzE3NDAyODM5fQ.GskB_p4xq8q9Dpwi6LF6eRMyV5lMXYD0YqCQ3FZg5vU",
    "data": {
        "user": {
            "_id": "665c2881b286c0bf7a58fcd5",
            "email": "test@mail.com",
            "name": "Batra Dharmik",
            "zipCode": 560105,
            "city": "Anekal",
            "__v": 0,
            "id": "665c2881b286c0bf7a58fcd5"
        }
    }
}
```


### Signup a User
URL: /worko/user/signin\
Method: POST\
Request Body:
```json
{
  "payload":{
        "name":"test1",
        "email": "test1@mail.com",
        "password":"test1234",
        "passwordConfirm":"test1234",
        "zipCode":"560035"
    }
}
```

Response:
```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWMyZTA2ZTdkNGQ5OTgxZWZhZTYzNCIsImlhdCI6MTcxNzMxNzEyOSwiZXhwIjoxNzE3NDAzNTI5fQ.9Vw2RHYhu08z82TpsFsB_m1s-JRKyqvNOi685vcyzrk",
    "data": {
        "user": {
            "email": "test1@mail.com",
            "name": "test1",
            "zipCode": 560035,
            "_id": "665c2e06e7d4d9981efae634",
            "city": "Bangalore South",
            "__v": 0,
            "id": "665c2e06e7d4d9981efae634"
        }
    }
}
```

## .env
DATABASE=mongodb+srv://batradharmik:<PASSWORD>@cluster0.w2xbbks.mongodb.net/?retryWrites=true&w=majority&appName=WordAI\
DATABASE_PASSWORD=dharmikWordAI%24%24BB2308\
JWT_SECRET=dharmikhaimeranaamkaatdungasabkanaam\
JWT_COOKIE_EXPIRY=90\
JWT_EXPIRY=1d

