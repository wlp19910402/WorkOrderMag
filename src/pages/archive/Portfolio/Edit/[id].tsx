import React, { useState, useEffect } from 'react';
import ModifyForm from '../components/ModifyForm'
import { infoProtfolio } from '../service'
import { match } from 'react-router'
interface PortfolioEditProps {
  match: match
}
const DictionaryList: React.FC<PortfolioEditProps> = ({ match }) => {
  const [ currentRow, setCurrentRow ] = useState<any>()
  useEffect(() => {
    infoProtfolio(match.params.id).then(res => {
      if (!res) return;
      setCurrentRow(res.data)
    })
  }, [])
  return (
    <>
      { currentRow && <ModifyForm currentRow={ currentRow } /> }
    </>
  );
};

export default DictionaryList;
