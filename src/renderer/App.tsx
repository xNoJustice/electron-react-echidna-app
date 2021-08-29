import React, { useState, useRef, useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

const types: { [key: string]: string } = {
  rock: 'Rock - Gestein',
  water: 'Water - Wasser',
  electro: 'Electro - Elektro',
  earth: 'Earth - Erd',
  ice: 'Ice - Eis',
  fire: 'Fire - Feuer',
};

const countertypes: { [key: string]: string } = {
  rock: 'Water - Wasser',
  water: 'Electro - Elektro',
  electro: 'Earth - Erd',
  earth: 'Ice - Eis',
  ice: 'Fire - Feuer',
  fire: 'Rock - Gestein',
};

const Echidna = () => {
  const [results, setResults] = useState<string[]>([]);
  const typesRef = useRef<boolean[]>([]);

  useEffect(() => {
    typesRef.current = typesRef.current.slice(0, 6);
  }, []);

  const puzzle = (type: string, index: number) => {
    if (results.length > 5) return;
    typesRef.current[index] = true;
    const counter = countertypes[type];
    const result = [...results, counter];
    setResults(result);
  };

  const reset = () => {
    setResults([]);
    typesRef.current = [];
  };

  const buttons = () => {
    return Object.keys(types).map((type: string, index: number) => (
      <button
        type="button"
        className={`${
          typesRef.current[index] && 'opacity-25 cursor-not-allowed'
        } py-2 px-4 m-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
        key={type}
        onClick={() => puzzle(type, index)}
        disabled={typesRef.current[index]}
      >
        {types[type]}
      </button>
    ));
  };
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => reset()}
        className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Reset
      </button>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="text-white">
          <span className="text-white text-2xl p-2">Select Buttons</span>
        </div>
        <div className="text-white">
          <span className="text-white text-2xl p-2">Puzzle Result</span>
        </div>
        <div className="text-white">{buttons()}</div>
        <div className="text-white">
          {results.map((result: string) => (
            <span
              className="py-2 px-4 m-1 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              key={result}
            >
              {result}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Echidna} />
      </Switch>
    </Router>
  );
}
