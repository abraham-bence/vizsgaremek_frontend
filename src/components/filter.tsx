import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { useProducts, useProperties, usePropertiesWhere } from '../core/hooks';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import _ from 'lodash';

interface Manufacturer { manufacturer: string }
interface Type { type: string }

interface FilterProps {
  setSearch: (value: URLSearchParams, opts?: { replace?: boolean }) => void;
  searchParams: URLSearchParams;
  selectedType: string;
  selectedManufacturers: string[];
  toggleType: (type: string) => void;
  toggleManufacturer: (manufacturer: string) => void;
  priceRange : [number, number]
  handlePriceFilter : (newRange: [number, number]) => void
  resetFilters : () => void
}

function Filter({ selectedType, selectedManufacturers, toggleType, toggleManufacturer, 
  priceRange, handlePriceFilter, resetFilters }: FilterProps) {
  const [filteredManufacturers, setFilteredManufacturers] = useState<Manufacturer[]>([]);
  const getProducts = useProducts()

  const getTypes = useProperties('type');
  const types: Type[] = useMemo(() => getTypes.data ?? [], [getTypes.data]);
  const getManufaturers = useProperties('manufacturer');
  const manufacturers: Manufacturer[] = useMemo(() => getManufaturers.data ?? [], [getManufaturers.data]);



  const getFilteredManufacturers = () => {
    axios.get('http://localhost:3000/products/filter/manufacturer/' + selectedType)
      .then((res) => {
        setFilteredManufacturers(res.data);
      });
  };

  useEffect(() => {
    if (selectedType === 'ALL') {
      setFilteredManufacturers(manufacturers);
    } else {
      getFilteredManufacturers();
    }
  }, [selectedType, manufacturers]);



  return (
    <div className="filter">
      <h4>Type</h4>
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

      <h4>Manufacturer</h4>
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

      <h4>Price</h4>
      <div className="price-slider">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={(value) => handlePriceFilter(value as [number, number])}
        />
        <div className="price-values">
          <span>{priceRange[0]} $</span>
          <span>{priceRange[1]} $</span>
        </div>
      </div>

      <button onClick={resetFilters} className="reset-filters-btn">Reset Filters</button>
    </div>
  );
}

export default Filter;
