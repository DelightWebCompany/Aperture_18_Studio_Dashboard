import React, { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext';

export default function Dashboard() {
  const { content } = useContext(LanguageContext);

  return (
    <div className=''>
      <h3>{content?.admin?.dashboard}</h3>
    </div>
  )
}
