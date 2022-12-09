import React from 'react'
import { copyPiped, pastePiped } from '../../utils/clipboard'
import { isEditing } from '../../utils/row'

export const EditingActions = ({
  row,
  deleteRow,
  newRow,
  setRow,
  saveRow,
  showTextActions = true,
}) => (
  <div className='action-wrapper raw'>
    <div className='row-actions'>
      <SaveButton row={row} fn={saveRow} />
      <DeleteButton row={row} fn={deleteRow} />
      <NewButton fn={newRow} />
    </div>
    <TextAreaActions show={showTextActions} paste={pastePiped(setRow)} />
  </div>
)

const SaveButton = ({ row, fn }) => {
  const buttonText = isEditing(row) ? `Update Row ${row.rowId}` : 'Save Row'

  return (
    <button className='save-row' onClick={fn || undefined} disabled={!fn}>
      {buttonText}
    </button>
  )
}

const DeleteButton = ({ row, fn }) => {
  if (!isEditing(row)) return null

  return (
    <button className='delete-row' onClick={fn}>
      {`Delete Row ${row.rowId}`}
    </button>
  )
}

const NewButton = ({ fn }) => (
  <button className='new-row' onClick={fn}>
    New Row
  </button>
)

const TextAreaActions = ({ show, paste }) => {
  if (!show) return null

  return (
    <div className='textarea-actions'>
      <button className='copy-row' onClick={copyPiped}>
        Copy to Clipboard
      </button>
      <button className='paste-row' onClick={paste}>
        Paste from Clipboard
      </button>
    </div>
  )
}
