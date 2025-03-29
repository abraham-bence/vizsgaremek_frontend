import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Manufacturer { manufacturer: string }
interface Type { type: string }

interface FilterProps {
  selectedTypes: string[];
  selectedManufacturers: string[];
  toggleType: (type: string) => void;
  toggleManufacturer: (manufacturer: string) => void;
}

function Filter({ selectedTypes, selectedManufacturers, toggleType, toggleManufacturer }: FilterProps) {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products/filter/type")
      .then((response) => setTypes(response.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/products/filter/manufacturer")
      .then((response) => setManufacturers(response.data));
  }, []);

  // Filter manufacturers based on selected product types
  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredManufacturers(manufacturers);
    } else {
      setFilteredManufacturers();
    }
  }, [selectedTypes, manufacturers]);

  return (
    <div className="filter">
      <h4>Filter by Type</h4>
      {types.map((type) => (
        <div key={type.type}>
          <input
            type="checkbox"
            id={type.type}
            checked={selectedTypes.includes(type.type)}
            onChange={() => toggleType(type.type)}
          />
          <label htmlFor={type.type}>{type.type}</label>
        </div>
      ))}

      <h4>Filter by Manufacturer</h4>
      {filteredManufacturers.map((manufacturer) => (
        <div key={manufacturer.manufacturer}>
          <input
            type="checkbox"
            id={manufacturer.manufacturer}
            checked={selectedManufacturers.includes(manufacturer.manufacturer)}
            onChange={() => toggleManufacturer(manufacturer.manufacturer)}
            disabled={filteredManufacturers.length === 0} 
          />
          <label htmlFor={manufacturer.manufacturer}>{manufacturer.manufacturer}</label>
        </div>
      ))}
    </div>
  );
}

export default Filter;
