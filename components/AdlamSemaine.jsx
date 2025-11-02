import React from 'react'

const AdlamEnumeration = () => {
  const header = '𞤋𞤐𞤁𞤉 𞤙𞤀𞤂𞤍𞤋 𞤍𞤋𞤐 𞤑𞤀 𞤆𞤓𞤂𞤀𞤈'
  const items = [
    '𞤈𞤫𞤬𞤦𞤭𞤪𞥆',
    '𞤖𞤮𞤪𞤦𞤭𞤪𞥆',
    '𞤃𞤢𞤱𞤲𞤣',
    '𞤐𞤢𞥄𞤧𞤢𞥄𞤲𞤣',
    '𞤐𞤶𞤫𞤧𞤤𞤢𞥄𞤪',
    '𞤃𞤢𞤱𞤦𞤢𞥄𞤪',
    '𞤀𞥄𞤩𞤵𞤲𞥋𞤣',
  ]

  return (
    <div className='bg-white py-8 md:py-12 text-center'>
      {/* Titre */}
      <h2 className='font-adlam text-2xl md:text-3xl font-extrabold text-gray-800 mb-6'>
        {header}
      </h2>

      {/* Énumération horizontale */}
      <div className='flex flex-wrap justify-center items-center gap-6 md:gap-10'>
        {items.map((item, index) => (
          <div
            key={index}
            className='font-adlam text-xl md:text-2xl font-bold text-gray-900 text-center flex flex-col items-center'
          >
            <span>{item}𞤫</span>
            {/* <span className='text-lg md:text-xl mt-1'>𞤫</span> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdlamEnumeration
