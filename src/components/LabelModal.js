import uuid from 'react-uuid';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const LabelModal = (props) => {
    const {
        show,
        setShow,
        handleClose,
        labels,
        setLabels,
        labelItem,
        setLabelItem
    } = props

    const createLabel = () => {
        setLabels([
            ...labels,
            {
                id: uuid(),
                ...labelItem
            },
        ])
        setShow(false);
        handleClose();
    }

    const handleChange = ({ target }) => {
        setLabelItem({
            ...labelItem,
            [target.name]: target.value
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create label</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <input type="text" name="name" className="form-control my-2" placeholder="name" onChange={handleChange} />
                    <input type="color" name="color" className="form-control my-2" placeholder="color" onChange={handleChange} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={createLabel}>
                     Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

LabelModal.propTypes = {
    show: PropTypes.bool,
    setShow: PropTypes.func,
    handleClose: PropTypes.func,
    labels: PropTypes.array,
    setLabels: PropTypes.func,
    labelItem: PropTypes.object,
    setLabelItem: PropTypes.func
}

export default LabelModal;
