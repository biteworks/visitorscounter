import { useState } from 'react';
import CounterElement from './components/CounterElement';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [counters, setCounters] = useState(() => {
    const savedNumbers = localStorage.getItem('savedNumbers');
    return savedNumbers
      ? JSON.parse(savedNumbers)
      : [
          { name: 'Erwachsene', count: 0 },
          { name: 'Kinder', count: 0 },
          { name: 'Mitarbeiter', count: 0 },
        ];
  });
  const [lastUpdated, setLastUpdated] = useState(() => {
    const timeStamp = localStorage.getItem('timestamp');
    let currentTimeStamp = new Date().getTime();
    return timeStamp
      ? formateTimestamp(JSON.parse(timeStamp))
      : formateTimestamp(currentTimeStamp);
  });

  function handleIncrement(index) {
    const newCounters = [...counters];
    newCounters[index].count++;
    setCounters(newCounters);
    saveNumbersToLocalStorage();
    navigator.vibrate(100);
  }

  function handleDecrement(index) {
    const newCounters = [...counters];
    newCounters[index].count--;
    setCounters(newCounters);
    saveNumbersToLocalStorage();
    navigator.vibrate(100);
  }

  function handleReset(index) {
    const newCounters = [...counters];
    newCounters[index].count = 0;
    setCounters(newCounters);
    saveNumbersToLocalStorage();
  }

  function completeReset() {
    const length = Object.keys(counters).length;
    for (let i = 0; i < length; i++) {
      const newCounters = [...counters];
      newCounters[i].count = 0;
      setCounters(newCounters);
    }
    saveNumbersToLocalStorage();
    navigator.vibrate(200);
  }

  function handleCopyToClipboard(index) {
    navigator.clipboard.writeText(counters[index].count);
    toast.success('Anzahl in Zwischenablage kopiert!');
  }

  function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  function formateTimestamp(timeStamp) {
    const dateObject = new Date(timeStamp);

    return (
      padWithLeadingZeros(
        dateObject.toLocaleString('de-DE', { day: 'numeric' }),
        2
      ) +
      '.' +
      padWithLeadingZeros(
        dateObject.toLocaleString('de-DE', { month: 'numeric' }),
        2
      ) +
      '.' +
      dateObject.toLocaleString('de-DE', { year: '2-digit' }) +
      ', ' +
      dateObject.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      }) +
      ' Uhr'
    );
  }

  function saveNumbersToLocalStorage() {
    const timeStamp = new Date().getTime();
    localStorage.setItem('timestamp', JSON.stringify(timeStamp));
    localStorage.setItem('savedNumbers', JSON.stringify(counters));
    setLastUpdated(formateTimestamp(timeStamp));
  }

  return (
    <div className="w-screen px-5 relative">
      <h1 className="text-center my-5 font-bold text-lg">
        Besucherzähler
      </h1>
      <div className="bg-white p-5 rounded-md mb-4">
        {counters.map((counter, index) => (
          <CounterElement
            key={index}
            id={index}
            name={counter.name}
            count={counter.count}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            handleReset={handleReset}
            handleCopyToClipboard={handleCopyToClipboard}
          />
        ))}
      </div>
      <div
        onClick={completeReset}
        className="bg-white p-5 rounded-md text-center"
      >
        Alle zurücksetzen
      </div>
      <div className="text-center mt-4 opacity-50">
        Letzte Zählung {lastUpdated}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
