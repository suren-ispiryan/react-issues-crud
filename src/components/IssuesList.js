import { Table, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {useEffect, useState} from "react";
const rowsPerPage = 2;

const IssuesList = ({
    issues,
    setIssuesCopy,
    setIssues,
    labels,
    searchedIssues,
    issuesCopy,
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(0);
    const [startPoint, setStartPoint] = useState(0);
    const [endPoint, setEndPoint] = useState(2);
    const [count, setCount] = useState(0);
    const [showDelete, setShowDelete] = useState(false);
    const [deletedUserSetId, setDeletedUserSetId] = useState();

    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = (deleteUserId) => {
        setShowDelete(true);
        setDeletedUserSetId(deleteUserId);
    };

    useEffect(() => {
        if (!searchedIssues.length) {
            if (prevPage < currentPage) {
                setIssuesCopy(issues.slice(endPoint - rowsPerPage, endPoint));
            } else {
                setIssuesCopy(issues.slice(endPoint - rowsPerPage, endPoint));
            }
            setCount(issues.length);
        } else {
            if (prevPage < currentPage) {
                setIssuesCopy(searchedIssues.slice(endPoint-rowsPerPage, endPoint));
            } else {
                setIssuesCopy(searchedIssues.slice(endPoint-rowsPerPage, endPoint));
            }
            setCount(searchedIssues.length);
        }
    },[startPoint, endPoint, issues, count, searchedIssues, prevPage, currentPage]);

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

    const deleteIssue = () => {
        const removedIssue = issues.findIndex(i => i.id === deletedUserSetId)
        const issuesCopy = [...issues]
        issuesCopy.splice(removedIssue, 1)
        setIssues(issuesCopy)
        setShowDelete(false);
    }

    // pagination
    const onPageChange = (rowsPerPage, selectedPage) => {
        setEndPoint((rowsPerPage * selectedPage));
        setStartPoint(endPoint);
        setPrevPage(currentPage);
    }

    const handlePagination = (page) => {
        const selectedPage = page.selected + 1;
        onPageChange(rowsPerPage, selectedPage);
        setCurrentPage(selectedPage);
    }

    const CustomPagination = () => {
        let pageCount = Math.ceil(count / rowsPerPage);
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
                                                onClick={ () => handleShowDelete(item.id) }
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

            {/* confirm delete */}
            <Modal show={ showDelete } onHide={ handleCloseDelete }>
                <Modal.Header closeButton>
                    <Modal.Title>Delete confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want  to delete this issue?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleCloseDelete }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ deleteIssue }>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

IssuesList.propTypes = {
    labels: PropTypes.array,
    issues: PropTypes.array,
    searchedIssues: PropTypes.array
}

export default IssuesList;
