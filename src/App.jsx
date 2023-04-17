import { useState, useEffect } from 'react';
import CounterElement from './components/CounterElement';
import toast, { Toaster } from 'react-hot-toast';
import { formateTimestamp } from './Helpers';

function App() {
  const [eventName, setEventName] = useState(() => {
    const eventName = localStorage.getItem('eventName');
    return eventName ? eventName : 'Gottesdienst';
  });

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

  const [completeCount, setCompleteCount] = useState(0);

  useEffect(() => {
    let tempCount = 0;
    counters.map((counter) => {
      tempCount += counter.count;
    });
    setCompleteCount(tempCount);

    localStorage.setItem('eventName', eventName);
  });

  function handleIncrement(index) {
    const newCounters = [...counters];
    newCounters[index].count++;
    setCounters(newCounters);
    saveNumbersToLocalStorage();
  }

  function handleDecrement(index) {
    const newCounters = [...counters];
    newCounters[index].count--;
    setCounters(newCounters);
    saveNumbersToLocalStorage();
  }

  function handleReset(index) {
    const newCounters = [...counters];
    newCounters[index].count = 0;
    setCounters(newCounters);
    setEventName('Gottesdienst');
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
    setEventName('Gottesdienst');
    navigator.vibrate(200);
  }

  function handleCopyToClipboard(index) {
    if (index != 'all') {
      navigator.clipboard.writeText(counters[index].count);
      toast.success('Anzahl in Zwischenablage kopiert!');
      navigator.vibrate(50);
    } else {
      if (completeCount > 0) {
        let textToCopy = eventName + '\r\n';
        counters.map((counter) => {
          textToCopy += counter.name + ': ' + counter.count + '\r\n';
        });
        navigator.clipboard.writeText(textToCopy);
        toast.success('Alles in Zwischenablage kopiert!');
        navigator.vibrate(50);
      } else {
        toast.error('Nichts zu kopieren!');
        navigator.vibrate([100, 100]);
      }
    }
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
      <div className="bg-white p-5 rounded-md mb-4 items-inline">
        <input
          type="text"
          className="mb-4 text-lg font-bold"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
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
        <div className="mt-5 font-semibold">
          Gesamt: {completeCount}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div
          onClick={() => handleCopyToClipboard('all')}
          className={
            'bg-white p-2 rounded-md text-center' +
            (completeCount == 0
              ? ' opacity-50 cursor-not-allowed'
              : '')
          }
        >
          <div className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
            Alle kopieren
          </div>
        </div>
        <div
          onClick={completeReset}
          className={
            'bg-white p-2 rounded-md text-center' +
            (completeCount == 0
              ? ' opacity-50 cursor-not-allowed'
              : '')
          }
        >
          <div className="inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1 inline-block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Alle zurücksetzen
          </div>
        </div>
      </div>
      <div className="text-center mt-4 opacity-50">
        Letzte Zählung {lastUpdated}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
