import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from "react";
const rowsPerPage = 2; // change to 10

const IssuesList = (props) => {
    const {
        issues,
        setIssuesCopy,
        setIssues,
        labels,
        searchedIssues,
        issuesCopy,
    } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(2);


    useEffect(() => {
        if (!searchedIssues.length) {
            if (prevPage < currentPage) {
                setIssuesCopy(issues.slice(endPoint - rowsPerPage, endPoint));
            } else {
                setIssuesCopy(issues.slice(endPoint - rowsPerPage, endPoint));
            }
        } else {
            if (prevPage < currentPage) {
                setIssuesCopy(searchedIssues.slice(endPoint-rowsPerPage, endPoint));
            } else {
                setIssuesCopy(searchedIssues.slice(endPoint-rowsPerPage, endPoint));
            }
        }
    },[startPoint, endPoint, issues, searchedIssues, prevPage, currentPage]);

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

    // pagination per page
    const onPageChange = (rowsPerPage, selectedPage) => {
        setEndPoint((rowsPerPage * selectedPage));
        setStartPoint(endPoint);
        setPrevPage(currentPage);
    }

    const handlePagination = (page) => {
        const selectedPage = page.selected + 1;
        onPageChange(rowsPerPage, selectedPage);
        setCurrentPage(selectedPage);
    };

    const CustomPagination = () => {
        let pageCount = Math.ceil(issues.length / rowsPerPage);
        return (
            <ReactPaginate
                previousLabel=""
                nextLabel=""
                pageCount={pageCount || 0}
                activeClassName="active"
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={handlePagination}
                pageClassName="page-item"
                nextLinkClassName="page-link btnNext"
                nextClassName="page-item next"
                previousClassName="page-item prev"
                previousLinkClassName="page-link btnPrev"
                pageLinkClassName="page-link"
                containerClassName="pagination react-paginate justify-content-end pt-1 pr-1"
            />
        );
    };

    return (
        <div className="container">
            {(!searchedIssues.length && !issuesCopy.length)
                ?
                <>
                    <h1 className="no-issue my-5 text-danger">No Issues</h1>
                </>
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
                                issuesCopy.map( (item, index) => (
                                    <tr key={ item.id }>
                                        <td>{ index + 1 }</td>
                                        <td>{ item.title }</td>
                                        <td>{ item.description }</td>
                                        <td className="issues-labels">
                                            { renderIssueLabels(item.labels) }
                                        </td>
                                        <td className="issues-actions">
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => deleteIssue(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                }
            <CustomPagination />
        </div>
    );
}

IssuesList.propTypes = {
    labels: PropTypes.array,
    issues: PropTypes.array,
    searchedIssues: PropTypes.array
}

export default IssuesList;
