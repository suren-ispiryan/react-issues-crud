import { useState } from 'react';
import './App.scss';
import IssuesList from './components/IssuesList';
import IssueModal from './components/IssueModal';
import LabelModal from './components/LabelModal';

const App = () => {
    const [show, setShow] = useState(false);
    const [showIssue, setShowIssue] = useState(false);
    const [issues, setIssues] = useState([
        {
            id: 1,
            title: 111111,
            description: 1111111,
            labels: [1]
        },
        {
            id: 2,
            title: 222222,
            description: 222222,
            labels: [1]
        },
        {
            id: 3,
            title: 333333,
            description: 333333,
            labels: [1]
        },
        {
            id: 4,
            title: 44444444,
            description: 44444444,
            labels: [1]
        },
        {
            id: 5,
            title: 5555555,
            description: 5555555555,
            labels: [1]
        },
        {
            id: 6,
            title: 66666666,
            description: 6666666,
            labels: [1]
        },
        {
            id: 7,
            title: 777777,
            description: 777777,
            labels: [1]
        },
        {
            id: 8,
            title: 8888888,
            description: 8888888,
            labels: [1]
        },
    ]);
    const [labels, setLabels] = useState([
        {
            id: 1,
            name: 'bug',
            color: 'red'
        }
    ]);
    const [labelItem, setLabelItem] = useState({});
    const [issueItem, setIssueItem] = useState({});
    const [searchedIssues, setSearchedIssues] = useState([]);
    const [searched, setSearched] = useState([]);
    const [issuesCopy, setIssuesCopy] = useState([]);
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleCloseIssue = () => {
        setShowIssue(false);
        setIssueItem({})
    }

    const handleShowIssue = () => setShowIssue(true);

    const handleSearch = ({ value }) => {
        // setSearched(issues.filter(i => i.description.includes(value)))
        if (value !== '') {
            setSearched(issues.filter(i => new RegExp(value, 'i').test(i.description)))
        } else {
            setSearched(issues)
        }
    }

    const searchIssue = () => {
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
                    <button className="btn btn-primary" onClick={searchIssue}>
                        Search
                    </button>
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
            setSearchedIssues={setSearchedIssues}
            issuesCopy={issuesCopy}
            setIssuesCopy={setIssuesCopy}
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


