import React, { useEffect, useState } from 'react'
import useQuery from '../../hooks/useQuery'
import useReport from '../../hooks/useReport';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
const PALETTE = [
  "#ffafcc",
  "#B2CEDE",
  "#8CDFD6",
  "#6DC0D5",
  "#cdb4db",
  "#d8e2dc"
]

const QuestionComponent = ({ question, status, questionId, index, expected, type, got }) => {

  const [isFlipped, setIsFlipped] = useState(false)

  return <div style={{ width: '50%', height: 100, borderRadius: 10, backgroundColor: !isFlipped ? PALETTE[index % PALETTE.length] : 'whitesmoke', marginBottom: 10, padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none', cursor: 'pointer', borderStyle: 'solid', borderColor: isFlipped ? 'black' : status ? 'green' : 'red', borderWidth: 2 }} onClick={() => setIsFlipped(prev => !prev)}>
    <div>
      <div style={{
        textDecorationLine: isFlipped ? 'line-through' : undefined, textDecorationColor
          : 'red'
      }}>{!isFlipped ? question : JSON.stringify(got)}</div>
      {isFlipped ? <div>{JSON.stringify(expected)}</div> : null}
    </div>

    <div>{!status ? <CloseIcon style={{ color: 'red' }} /> : <CheckIcon style={{ color: 'green' }} />}</div>
  </div>
}

const Report = () => {
  const query = useQuery();
  const reportService = useReport();

  const [reportId, setReportId] = useState("")
  const [report, setReport] = useState([])

  useEffect(() => {
    const reportId = query.get('id')
    setReportId(reportId);
    (async () => {
      const report = await reportService.getReport(reportId)
      setReport(report)
    })();
  }, [])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 10 }}>
      <h2 style={{ marginBottom: 10 }}>Report</h2>
      {report.map((component, indx) => <QuestionComponent key={component.questionId} id={component.questionId} index={indx} question={component.question} type={component.question} status={component.status} got={component.got} expected={component.expected} />)}</div>
  )
}

export default Report