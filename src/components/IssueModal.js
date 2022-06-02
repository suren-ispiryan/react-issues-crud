import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import uuid from 'react-uuid';
import Select from 'react-select';
import PropTypes from 'prop-types';

const IssueModal = (props) => {
    const {
        showIssue,
        handleCloseIssue,
        labels,
        issues,
        setIssues,
        issueItem,
        setIssueItem
    } = props

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = ({ target }) => {
        setIssueItem({
            ...issueItem,
            [target.name]: target.value,
        })

        validate(target.name, target.value)
    }

    const createIssue = () => {
        if (isSubmit === false) {
            setIssues([
                ...issues,
                {
                    id: uuid(),
                    ...issueItem,
                    labels: selectedOption.map(e => e.id)
                }
            ])
            handleCloseIssue();
            setSelectedOption(null);
        }
    }

    const validate = (field, value) => {
        const errors = {...formErrors }
        if (!value.trim().length || value.trim().length < 5) {
            errors[field] = 'Field is required'
        } else {
            errors[field] = ''
        }
        setFormErrors(errors)
        setIsSubmit(false);
    }
    
    return (
        <Modal show={showIssue} onHide={handleCloseIssue}>
            <Modal.Header closeButton>
                <Modal.Title>Create issue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="title"
                    onChange={handleChange}
                    value={issueItem.title}
                />
                <p className="text-danger err-msg">{ formErrors.title }</p>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="description"
                    onChange={handleChange}
                    value={issueItem.description}
                />
                <p className="text-danger err-msg">{ formErrors.description }</p>
                <Select
                    isMulti
                    isSearchable
                    name="labels"
                    placeholder="choose labels"
                    className="my-2 select-labels"
                    defaultValue={selectedOption}
                    options={labels}
                    value={ selectedOption }
                    onChange={setSelectedOption}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseIssue}>
                    Close
                </Button>
                <Button variant="primary" onClick={createIssue}>
                     Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

IssueModal.propTypes = {
    showIssue: PropTypes.bool,
    handleCloseIssue: PropTypes.func,
    labels: PropTypes.array,
    issues: PropTypes.array,
    setIssues: PropTypes.func,
    issueItem: PropTypes.object,
    setIssueItem:  PropTypes.func
}

export default IssueModal;
