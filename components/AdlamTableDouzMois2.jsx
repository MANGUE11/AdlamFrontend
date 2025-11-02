import React from 'react'

const AdlamTableDouzMois = () => {
  // Les données du tableau du haut
  const header = '𞤂𞤫𞤦𞥆𞤭 𞤤𞤫𞥅𞤤𞤫𞤴𞤢𞤲𞤳𞤮𞥅𞤶𞤭 𞤯𞤭𞤲'
  const data = [
    [
      '𞤔𞤮𞤥𞤦𞤫𞤲𞤼𞤫',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤨𞤢𞤪𞤢𞤲',
      '𞤆𞤢𞤪𞤢𞤲',
      '𞤃𞤭𞤲-𞤨𞤢𞤪𞤢𞤲',
      '𞤄𞤢𞤨𞥆𞤢𞤪𞤢𞤲',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤪𞤢𞥄𞤶𞤭𞤦𞤭',
    ],
    [
      '𞤈𞤢𞥄𞤶𞤭𞤦𞤭',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤧𞤵𞥅𞤥𞤢𞤴𞤫𞥅',
      '𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅',
      '𞤔𞤵𞥅𞤤𞤣𞤢𞥄𞤲𞤣𞤵',
      '𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵 𞤣𞤮𞤲𞤳𞤭𞤲',
      '𞤁𞤮𞤲𞤳𞤭𞤲',
    ],
  ]

  return (
    <div className='bg-white py-12 md:py-16 text-gray-800'>
      <div className='container mx-auto px-4 max-w-8xl'>
        {/* Titre */}
        <h3 className='text-xl md:text-2xl font-extrabold mb-8 font-adlam text-center text-gray-700'>
          {header}
        </h3>

        {/* Tableau principal */}
        <div className='overflow-x-auto shadow-xl rounded-lg border-2 border-[#2c3e50] p-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {data.map((col, colIndex) => (
              <div
                key={colIndex}
                className='flex flex-col space-y-2 bg-blue-50 p-4 rounded-lg border border-[#2c3e50]'
              >
                {col.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className='px-4 py-2 text-center text-xl md:text-2xl font-adlam font-semibold text-[#2c3e50]-700 border border-[#2c3e50] rounded-md bg-white'
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdlamTableDouzMois
