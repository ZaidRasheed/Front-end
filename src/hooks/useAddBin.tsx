import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap'
import { AppData, Bin } from '../context/appContext'

const UseAddBen = () => {
    const idRef = useRef(null)
    const [level, setLevel] = useState<string>("choose")
    const [enabled, setEnabled] = useState<boolean | string>("Choose")

    const [success, setSuccess] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { addBin, refreshData } = AppData()

    const enable = () => {
        setEnabled(true)
    }

    const disable = () => {
        setEnabled(false)
    }

    function handleAddBen(event: any) {
        event.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        
        if (!idRef.current!.value || idRef.current!.value.length < 2) {
            setError("Please choose a valid name for the Ben.")
            return setLoading(false)
        }

        if (!['full', 'half', 'empty'].includes(level)) {
            setLoading(false)
            return setError('Please select a valid level.')
        }

        if (enabled === "Choose") {
            setLoading(false)
            return setError('Please select whether the bin is enabled or disabled.')
        }



        const newBin = {
            id: idRef?.current!.value,
            level: level,
            enabled: enabled
        }
        setLoading(false)
        addBin(newBin).then((res: any) => res.json()).then((response: any) => {
            if (response.status === 'success') {
                idRef.current!.value = ""
                setLevel('Choose')
                setSuccess(response.message)
                refreshData()
            }
            else
                setError(response.message)
        })
            .catch(() => {
                setError("Couldn't process request due to unresolved issue")
            })
            .finally(() => {
                setLoading(false)
            })
    }


    const ErrorAlert = <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
    </>

    const SuccessAlert = <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
    </>

    return {
        idRef,
        level,
        setLevel,
        enabled,
        enable,
        disable,
        loading,
        ErrorAlert,
        SuccessAlert,
        handleAddBen
    }
}

export default UseAddBen;
