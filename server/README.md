# FlowAds API
Stack: Node.js, Express.js & MongoDB

## Flowads description
The API is used to create multiple ads for social media platforms simultaneously by creating templates that are then paired with a feed of product images.

## API Endpoints

### Accounts - Work in progress

### Images

```
POST /images/upload

Parameters:
input_files: Files (Maximum 1 file)
```

```
GET /images/generate

Parameters:
productfeed: ObjectId
template: ObjectId
product: ObjectId
```


### Productfeeds

```
POST /productfeeds

Parameters:
url*: String
title*: String
```

```
GET /productfeeds/:id/generate - Work in progress
```

```
PUT /productfeeds/:id

Parameters:
products*: Array (send as array in body)
```

```
DELETE /productfeeds

Parameters:
id*: ObjectId
```

### Templates

```
GET /templates/:id

Parameters:
-
```

```
POST /templates

Parameters:
title*: String
```

```
POST /templates/:id

Parameters:
canvas*: CanvasObject (send unnamed in body)
```

```
DELETE /templates

Parameters:
id*: ObjectId
```


### Users

```
POST /users/register

Parameters:
name*: String
email*: String
password*: String
```

```
POST /users/login

Parameters:
email*: String
password*: String
```


## Commands
Run: 
- $ npm install && cd ./client
- $ npm install && cd ../ 
- $ npm run dev

