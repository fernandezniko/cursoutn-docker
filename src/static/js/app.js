function App() {
  return (
    <React.Fragment>
      <h1>Facts App</h1>
      <ServerTest/>
      <FactsList/>
    </React.Fragment>
  );
}

function ServerTest(){

  const [serverDate, setServerDate] = React.useState('')

  const obtainServerDate = async () => {
    fetch('/api/test')
    .then(r => r.json())
    .then(data => setServerDate(data))
  }

  return (
    <div>
      <button onClick={obtainServerDate}>Obtener hora del servidor</button>
      {
        serverDate &&
        <p>hora del servidor: {serverDate}</p>
      }
    </div>
  )

}

function FactsList() {
  const [facts, setFacts] = React.useState(null);

  React.useEffect(() => {
      fetch('/api/facts')
          .then(r => r.json())
          .then(data => setFacts(data));
  }, []);

  const onNewFact = React.useCallback(
      newFact => {
        setFacts([...facts, newFact]);
      },
      [facts],
  );

  const onFactRemoval = React.useCallback(
      fact => {
          const index = facts.findIndex(i => i.id === fact.id);
          setFacts([...facts.slice(0, index), ...facts.slice(index + 1)]);
      },
      [facts],
  );

  if (facts === null) return 'Loading...';

  return (
      <React.Fragment>
          {facts.length === 0 && (
              <p >No hay FACTS! Podes agregarlos abajo</p>
          )}
          <AddFactForm onNewFact={onNewFact} />
          {facts.length != 0 && (
              <h2 >Listado de facts</h2>
          )}
          {facts.map(fact => (
              <FactsDisplay
                  fact={fact}
                  key={fact.id}
                  onFactRemoval={onFactRemoval}
              />
          ))}
      </React.Fragment>
  );
}

function AddFactForm({ onNewFact }) {
  const [newFact, setNewFact] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const submitNewFact = e => {
      e.preventDefault();
      setSubmitting(true);
      fetch('/api/facts', {
          method: 'POST',
          body: JSON.stringify({ description: newFact }),
          headers: { 'Content-Type': 'application/json' },
      })
          .then(r => r.json())
          .then(fact => {
              onNewFact(fact);
              setSubmitting(false);
              setNewFact('');
          });
  };

  return (
      <form onSubmit={submitNewFact}>
          <input type="text" value={newFact} placeholder="nuevo fact..." onChange={e => setNewFact(e.target.value)}/>
          <button type="submit" disabled={!newFact.length}>{submitting ? 'Agregando...' : 'Agregar'}</button>
      </form>
  );
}

function FactsDisplay({ fact, onFactRemoval }) {

  const removeFact = () => {
      fetch(`/api/fact/${fact.id}`, { method: 'DELETE' }).then(() =>
      onFactRemoval(fact),
      );
  };

  return (
      <div>
          <div className="container">
            <div>
              <p>{fact.description}</p>
            </div>
            <div>
              <button
                  onClick={removeFact}
                  aria-label="Remove Item">
                <i className="fas fa-trash text-danger" />
              </button>
            </div>
          </div>
      </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
