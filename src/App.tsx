import { useState, useEffect } from 'react'

interface TableRow {
  type: string;
  number: string;
  expiration: string;
  owner: string;
}

export default function App() {
  const [data, setData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakerapi.it/api/v2/creditCards?_quantity=1")
      .then((res) => res.json())
      .then((json: { data: any[] }) => {
        const records: TableRow[] = json.data.map((item) => ({
          type: item.type ?? "N/A",
          number: item.number ?? "N/A",
          expiration: item.expiration ?? "N/A",
          owner: item.owner ?? "N/A"
        }));
        setData(records);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="app">
      <header>
        <h1>Faker API Data</h1>
      </header>
      <main>
        <table className="data-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Number</th>
              <th>Expiration</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.number}</td>
                <td>{row.expiration}</td>
                <td>{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
