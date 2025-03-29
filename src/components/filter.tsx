import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useProducts, useProperties, usePropertiesWhere } from '../core/hooks';

interface Manufacturer { manufacturer: string }
interface Type { type: string }

interface FilterProps {
  selectedType: string;
  selectedManufacturers: string[];
  toggleType: (type: string) => void;
  toggleManufacturer: (manufacturer: string) => void;
}

function Filter({ selectedType, selectedManufacturers, toggleType, toggleManufacturer }: FilterProps) {
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>([]);
  const getProducts = useProducts()
  const products = useMemo(() => getProducts.data ?? [], [getProducts.data]);


  const getTypes = useProperties('type')
  const types: Type[] = useMemo(() => getTypes.data ?? [], [getTypes.data]);
  const getManufaturers = useProperties('manufacturer')
  const manufacturers: Manufacturer[] = useMemo(() => getManufaturers.data ?? [], [getManufaturers.data]);


  const getFilteredManufacturers = () => {
    axios.get('http://localhost:3000/products/filter/manufacturer/' + selectedType)
      .then((res) => {
        setFilteredManufacturers(res.data)
      })
  }

  // Filter manufacturers based on selected product types
  useEffect(() => {
    if (selectedType === 'ALL') {
      setFilteredManufacturers(manufacturers);
    } else {
      getFilteredManufacturers();
    }
  }, [selectedType, manufacturers]);

  return (
    <div className="filter">
      <h4>Filter by Type</h4>
      {types.map((type) => (
        <div key={type.type}>
          <input
            type="checkbox"
            id={type.type}
            checked={selectedType == type.type}
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
