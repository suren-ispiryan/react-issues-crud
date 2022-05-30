import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const IssuesList = (props) => {
    const {
        issues,
        setIssues,
        labels,
        searchedIssues
    } = props;

    const renderIssueLabels = (issueLabels) => {
        return issueLabels.map( (label, i) =>(
            <span
                style={{ backgroundColor: labels.find(l => l.id === label).color }}
                className="mx-2 label"
                key={i}>
                {labels.find(l => l.id === label).name}
            </span>)
        )
    }

    const deleteIssue = (elementId) => {
        const removedIssue = issues.findIndex(i => i.id === elementId)
        const issuesCopy = [...issues]
        issuesCopy.splice(removedIssue, 1)
        setIssues(issuesCopy)
    }

    return (
        <div className="container">
            {(!searchedIssues.length && !issues.length)
                ?
                    <h1 className="no-issue my-5 text-danger">No Issues</h1>
                :
                    <Table striped bordered hover className="my-1">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Labels</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (!searchedIssues.length)
                                ?
                                    issues.map( (item, index) => (
                                        <tr key={ item.id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ item.title }</td>
                                            <td>{ item.description }</td>
                                            <td className="issues-labels">
                                                { renderIssueLabels(item.labels) }
                                            </td>
                                            <td className="issues-actions">
                                                <button className="btn btn-danger mx-2" onClick={() => deleteIssue(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                        )
                                    )
                                :
                                    searchedIssues.map( (item, index) => (
                                        <tr key={ item.id }>
                                            <td>{ index + 1 }</td>
                                            <td>{ item.title }</td>
                                            <td>{ item.description }</td>
                                            <td className="issues-labels">
                                                { renderIssueLabels(item.labels) }
                                            </td>
                                            <td className="issues-actions">
                                                <button className="btn btn-danger mx-2" onClick={() => deleteIssue(item.id)}>Delete</button>
                                            </td>
                                        </tr>
                                        )
                                    )
                            }
                        </tbody>
                    </Table>
                }
        </div>
    );
}

IssuesList.propTypes = {
    labels: PropTypes.array,
    issues: PropTypes.array,
    searchedIssues: PropTypes.array
}

export default IssuesList;
