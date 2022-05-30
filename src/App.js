import { useState } from 'react';

import './App.scss';
import IssuesList from './components/IssuesList';
import IssueModal from './components/IssueModal';
import LabelModal from './components/LabelModal';

const App = () => {
    const [show, setShow] = useState(false);
    const [showIssue, setShowIssue] = useState(false);
    const [issues, setIssues] = useState([]);
    const [labels, setLabels] = useState([]);
    const [labelItem, setLabelItem] = useState({});
    const [issueItem, setIssueItem] = useState({});
    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searched, setSearched] = useState([]);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleCloseIssue = () => {
        setShowIssue(false);
        setIssueItem({})
    }

    const handleShowIssue = () => setShowIssue(true);

    const handleSearch = ({ value }) => {
        setSearched(issues.filter(i => i.description.includes(value)))
    }

    const searchIssue = () => {console.log(searched)
        setSearchedIssues(searched)
    }

  return (
    <div className="App">
        <div className="container my-2">
            <div className="row">
                <div className="col-md-6 text-danger issues-heading">
                    <h1>Issues</h1>
                </div>
                <div className="col-md-6 create-issue-button">
                    <input
                        type="search"
                        name="search"
                        className="search-input"
                        placeholder="Search"
                        onChange={(event) => handleSearch(event.target)}
                    />
                    <button className="btn btn-primary" onClick={searchIssue}>Search</button>
                    <button className="btn btn-primary mx-2" onClick={handleShow}>
                        Create label
                    </button>
                    <button className="btn btn-primary mx-2" onClick={handleShowIssue}>
                        Create issue
                    </button>
                </div>
            </div>
        </div>
        <IssuesList
            setIssues={setIssues}
            searchedIssues={searchedIssues}
            labels={labels}
            issues={issues}
        />
        <LabelModal
            labels={labels}
            setLabels={setLabels}
            handleClose={handleClose}
            show={show}
            setShow={setShow}
            labelItem={labelItem}
            setLabelItem={setLabelItem}
        />
        <IssueModal
            show={show}
            setShow={setShow}
            issueItem={issueItem}
            setIssueItem={setIssueItem}
            issues={issues}
            setIssues={setIssues}
            labels={labels}
            setLabels={setLabels}
            handleCloseIssue={handleCloseIssue}
            showIssue={showIssue}
        />
    </div>
  );
}

export default App;
