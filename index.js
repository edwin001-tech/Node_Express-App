
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = 3000;
let accounts = [{
    "id": 1,
    "username": "edwin",
    "role": "admin"
  },
  {
    "id": 2,
    "username": "onyango",
    "role": "guest"
  },
  {
    "id": 3,
    "username": "mundia",
    "role": "member"
  },
  {
    "id": 4,
    "username": "davesmith",
    "role": "admin"
}
];

  

app.get('/accounts',(req,res) => {
    res.json(accounts)
});

app.get(`/accounts/:id`, (request, response) => {
    const accountId = Number(request.params.id);
    const getAccount = accounts.find((account) => account.id === accountId);
  
    if (!getAccount) {
      response.status(500).send('Account not found.')
    } else {
      response.json(getAccount);
    }
  });
  

  app.post(`/accounts`, (request, response) => {
    const incomingAccount = request.body;
  
    accounts.push(incomingAccount);
  
    response.json(accounts);
  })

  app.put(`/accounts/:id`, (request, response) => {
    const accountId = Number(request.params.id);
    const body = request.body;
    const account = accounts.find((account) => account.id === accountId);
    const index = accounts.indexOf(account);
  
    if (!account) {
      response.status(500).send('Account not found.');
    } else {
      const updatedAccount = { ...account, ...body };
  
      accounts[index] = updatedAccount;
  
      response.send(updatedAccount);
    }
  });

  app.delete(`/accounts/:id`, (request, response) => {
    const accountId = Number(request.params.id);
    const newAccounts = accounts.filter((account) => account.id != accountId);
  
    if (!newAccounts) {
      response.status(500).send('Account not found.');
    } else {
      accounts = newAccounts;
      response.send(accounts);
    }
  });

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`));