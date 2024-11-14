import React from 'react';

const CountrySalesTable = () => {
  const countries = [
    { name: 'United States', sales: 2500, value: '$230,900', bounce: '29.9%' },
    { name: 'Germany', sales: 3900, value: '$440,000', bounce: '40.22%' },
    { name: 'Great Britain', sales: 1400, value: '$190,700', bounce: '23.44%' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Sales</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Bounce</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{country.name}</td>
              <td className="px-4 py-2">{country.sales}</td>
              <td className="px-4 py-2">{country.value}</td>
              <td className="px-4 py-2">{country.bounce}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountrySalesTable;