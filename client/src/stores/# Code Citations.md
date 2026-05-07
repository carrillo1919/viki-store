# Code Citations

## License: desconocido
https://github.com/ruhstratp/SkinTerra-WebApp/blob/d9413196b8c71be9d299b9cbb9d0e081e66a43f5/auth/authMiddleware.js

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```


## License: desconocido
https://github.com/OliverMensahDev/software-engineering/blob/4b58822cce3163339e7429acdb3202e99333fae5/programming-languages/Nodejs/Express/Authentication-Users-Permissions/08-User-CRUD/middleware/auth.js

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```


## License: desconocido
https://github.com/eliavco/NodeJsJonas/blob/3da38f957c7717008a90d689c589296f71a3090d/complete-node-bootcamp-master/4-natours/starter/controllers/authController.js

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```


## License: desconocido
https://github.com/masiucd/recursive-render/blob/cf50e7233cb5587cc0e6d403de65bd1d8cce6a7a/src/api_helpers/useAuth.ts

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```


## License: desconocido
https://github.com/oluwasheeun/sendIT/blob/4a89a6b22d59fdcf39bf2117fa933e95cc522698/middleware/auth.js

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```


## License: desconocido
https://github.com/uriee/kibbutznik_app/blob/7794caf7ac747f60b00cd0e96dc958535018706a/scr/middlewares/authMiddleware.js

```
async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User
```

