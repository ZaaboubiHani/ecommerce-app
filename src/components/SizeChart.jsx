import React from 'react'

const SizeChart = ({ language }) => {
  // Data for the size chart
  const sizeData = [
    { size: '36', hips: 90, waist: 66, chest: 84, length: 150 },
    { size: '38', hips: 94, waist: 70, chest: 88, length: 150 },
    { size: '40', hips: 98, waist: 74, chest: 92, length: 150 },
    { size: '42', hips: 102, waist: 78, chest: 96, length: 150 },
    { size: '44', hips: 106, waist: 82, chest: 100, length: 152 },
    { size: '46', hips: 110, waist: 86, chest: 104, length: 152 },
    { size: '48', hips: 116, waist: 92, chest: 110, length: 153 },
    { size: '50', hips: 122, waist: 98, chest: 116, length: 153 },
  ]

  // Translations for the column titles
  const translations = {
    en: {
      size: 'Size',
      chest: 'Chest (cm)',
      waist: 'Waist (cm)',
      hips: 'Hips (cm)',
      length: 'Length (cm)',
    },
    fr: {
      size: 'Taille',
      chest: 'Poitrine (cm)',
      waist: 'Taille (cm)',
      hips: 'Hanches (cm)',
      length: 'Longueur (cm)',
    },
    ar: {
      size: 'المقاس',
      chest: 'محيط الصدر (سم)',
      waist: 'محيط الخصر (سم)',
      hips: 'محيط الأرداف (سم)',
      length: 'الطول (سم)',
    },
  }

  // Determine the correct labels based on the current language
  const currentTranslation = translations[language] || translations.en

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border-collapse'>
        <thead>
          <tr>
            <th className='px-4 py-2 border'>{currentTranslation.size}</th>
            <th className='px-4 py-2 border'>{currentTranslation.chest}</th>
            <th className='px-4 py-2 border'>{currentTranslation.waist}</th>
            <th className='px-4 py-2 border'>{currentTranslation.hips}</th>
            <th className='px-4 py-2 border'>{currentTranslation.length}</th>
          </tr>
        </thead>
        <tbody>
          {sizeData.map((size, index) => (
            <tr key={index}>
              <td className='px-4 py-2 border text-center'>{size.size}</td>
              <td className='px-4 py-2 border text-center'>{size.chest}</td>
              <td className='px-4 py-2 border text-center'>{size.waist}</td>
              <td className='px-4 py-2 border text-center'>{size.hips}</td>
              <td className='px-4 py-2 border text-center'>{size.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SizeChart
