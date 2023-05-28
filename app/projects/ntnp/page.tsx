
export default function Home() {

    fetch(`http://localhost:5085/PageData/0`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
  
    return (
      <main className='main'>
  
        
        
      </main>
    )
  }
  