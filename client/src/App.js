import './App.css';
import { useEffect, useState } from 'react';


function App() {

  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions(transactions);
    })
  }, []);

  async function getTransactions() {
    const response = await fetch('http://localhost:4040/api/transactions');
    return await response.json();

  }

  function addNewTransection(ev) {
    // ev.preventDefault();
    //ev.preventDefault prevent the page from refreshing
    const price = name.split(' ')[0];
    fetch("http://localhost:4040/api/transaction", {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime,
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDescription('');
        setDatetime('');
        console.log('result', json)
      })
    });
  };

  let balance = 0;

  for (const transaction of transactions) {
    balance = balance + transaction.price
  }

  return (
    <main>
      <div className="heading">My Money Tracker</div>
      <h1>{balance}<span>.00</span></h1>
      <form onSubmit={addNewTransection}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={'+200 new TV'} />

          <input type="date"
            value={datetime}
            onChange={ev => setDatetime(ev.target.value)} />
        </div>

        <div className="description">
          <input type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={'description'} />
        </div>
        <button type="submit">Add New Transection</button>

      </form>
      <div className="transections">

        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transection">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                {transaction.price}
              </div>
              <div className="datetime">{transaction.datetime.split('T')[0]}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
