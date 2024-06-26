"use client"
import { useState, useEffect, useRef } from 'react';
import styles from "@/app/page.module.css";
import Verified from "@/svgs/verified.svg";
import Exclamation from "@/svgs/exclamation.svg";
import Disabled from "@/svgs/desabled.svg";
import Circle from "@/svgs/circle.svg";
import Arrow from "@/svgs/downarrow.svg";
import BackIcon from "@/svgs/back.svg"
import NextIcon from "@/svgs/next.svg"



function Table({ members }) {
    const [primeros, setPrimeros] = useState([]);
    const [selectedNumPagination, setSelectedNumPagination] = useState(10);


    const [indiceInicio, setIndiceInicio] = useState(0);

    const handleNextClick = () => {
        const nuevoIndiceInicio = indiceInicio + selectedNumPagination;
        setIndiceInicio(nuevoIndiceInicio);

        const siguientesUsuarios = members.slice(nuevoIndiceInicio, nuevoIndiceInicio + selectedNumPagination);
        setPrimeros(siguientesUsuarios);

        setSelectedNumPagination(selectedNumPagination);
    };

    const handleBackClick = () => {
        const nuevoIndiceInicio = Math.max(indiceInicio - selectedNumPagination, 0);
        setIndiceInicio(nuevoIndiceInicio);

        const usuariosAnteriores = members.slice(nuevoIndiceInicio, nuevoIndiceInicio + selectedNumPagination);
        setPrimeros(usuariosAnteriores);
        setSelectedNumPagination(selectedNumPagination);
    };

    useEffect(() => {
        const primerosUsuarios = members.slice(0, selectedNumPagination);
        setPrimeros(primerosUsuarios);
    }, [members, selectedNumPagination]);


    const [filters, setFilters] = useState(primeros)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNumber, setIsOpenNumber] = useState(false);
    const [isOpenPagination, setIsOpenPagination] = useState(false);
    const [isOpenCreated, setIsOpenCreated] = useState(false);
    const [isOpenLast, setIsOpenLast] = useState(false);
    const [isOpenName, setIsOpenName] = useState(false);
    const [isOpenDomain, setIsOpenDomain] = useState(false);
    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const [emailList, setEmailList] = useState([]);
    const [numberList, setNumberList] = useState([]);
    const [domainList, setDomainList] = useState([]);
    const [nameList, setNameList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [lastList, setLastList] = useState([]);
    const [selectedVerificationStatus, setSelectedVerificationStatus] = useState("Verification Status");
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermNumber, setSearchTermNumber] = useState('');
    const [searchTermDomain, setSearchTermDomain] = useState('');
    const [searchTermName, setSearchTermName] = useState('');
    const [searchTermDate, setSearchTermDate] = useState('');
    const [searchTermLast, setSearchTermLast] = useState('');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownStatus = () => {
        setIsOpenStatus(!isOpenStatus);
    };

    const toggleDropdownEmail = () => {
        setIsOpenEmail(!isOpenEmail);
    };

    const toggleDropdownNumber = () => {
        setIsOpenNumber(!isOpenNumber);
    };

    const toggleDropdownDomain = () => {
        setIsOpenDomain(!isOpenDomain);
    };

    const toggleDropdownName = () => {
        setIsOpenName(!isOpenName);
    };

    const toggleDropdownPagination = () => {
        setIsOpenPagination(!isOpenPagination);
    };

    const toggleDropdownCreated = () => {
        setIsOpenCreated(!isOpenCreated);
    };

    const toggleDropdownLast = () => {
        setIsOpenLast(!isOpenLast);
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsOpen(false);
    };

    const handleSelectStatusVerification = (status) => {
        setSelectedVerificationStatus(status);
        setIsOpenStatus(false);
    };


    const handleSelectPagination = (num) => {
        setSelectedNumPagination(num);
        setIsOpenPagination(false);
    };

    const emailAddresses = primeros.map(member => member.emailAddress).filter(email => email);
    const numberMembers = primeros.map(member => member.mobileNumber).filter(number => number);
    const domainMembers = primeros.map(member => member.domain).filter(domain => domain);
    const nameMembers = primeros.map(member => member.name).filter(name => name);
    const dateMembers = primeros.map(member => member.dateTimeCreated).filter(date => date);
    const dateTimeLastActive = primeros.map(member => member.dateTimeLastActive).filter(last => last);

    useEffect(() => {
        // Función para manejar el filtro de miembros
        const handleFilterMembers = () => {
            const isStatusSelected = selectedStatus !== "Status";
            const isVerificationStatusSelected = selectedVerificationStatus !== "Verification Status";

            const selectedEmails = emailList;
            const selectedNumbers = numberList;
            const selectedDomains = domainList;
            const selectedNames = nameList;
            const selectedDates = dateList;
            const selectedLast = lastList;

            const noEmailSelected = selectedEmails.length === 0;
            const noNumberSelected = selectedNumbers.length === 0;
            const noDomainSelected = selectedDomains.length === 0;
            const noNamesSelected = selectedNames.length === 0;
            const noDatessSelected = selectedDates.length === 0;
            const noLastSelected = selectedLast.length === 0;

            const filteredMembers = primeros.filter(member => {

                const statusCriteria = !isStatusSelected || member.status === selectedStatus;
                const verificationStatusCriteria = !isVerificationStatusSelected || member.verificationStatus === selectedVerificationStatus;

                if (noEmailSelected && noNumberSelected && noDomainSelected && noNamesSelected && noDatessSelected && noLastSelected) {
                    return statusCriteria && verificationStatusCriteria;
                }

                const emailCriteria = noEmailSelected ? true : selectedEmails.includes(member.emailAddress);
                const numberCriteria = noNumberSelected ? true : selectedNumbers.includes(member.mobileNumber);
                const domainCriteria = noDomainSelected ? true : selectedDomains.includes(member.domain);
                const nameCriteria = noNamesSelected ? true : selectedNames.includes(member.name);
                const dateCriteria = noDatessSelected ? true : selectedDates.includes(member.dateTimeCreated);
                const lastCriteria = noLastSelected ? true : selectedLast.includes(member.dateTimeLastActive);

                return statusCriteria && verificationStatusCriteria && emailCriteria && numberCriteria && domainCriteria && nameCriteria && dateCriteria && lastCriteria;
            });
            setFilters(filteredMembers);
        };

        handleFilterMembers();
    }, [selectedStatus, selectedVerificationStatus, emailList, numberList, primeros, domainList, nameList, dateList, lastList]);

    const getVerificationStatusStyle = (verificationStatus) => {
        switch (verificationStatus) {
            case "VERIFIED":
                return styles.verified;
            case "PENDING":
                return styles.pending;
            case "UNVERIFIED":
                return styles.unverified;
            default:
                return styles.default;
        }
    };

    const getStatusStyle = (verificationStatus) => {
        switch (verificationStatus) {
            case "ACTIVE":
                return styles.verifiedStatus;
            case "BLACKLISTER":
                return styles.blacklister;
            case "DISEABLE":
                return styles.disieable;
            default:
                return styles.default;
        }
    };


    const formatStatus = (status) => {
        if (!status) return '';

        const lowerCaseStatus = status.toLowerCase();
        return lowerCaseStatus.charAt(0).toUpperCase() + lowerCaseStatus.slice(1);
    };


    const formatDate = (dateString) => {
        if (!dateString) return ''; // Manejar el caso en que dateString sea null o undefined
        const date = new Date(dateString);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();

        return `${year} ${month} ${day}`;
    };

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return ''; // Manejar el caso en que dateTimeString sea null o undefined

        const dateTime = new Date(dateTimeString);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const year = dateTime.getFullYear();
        const month = monthNames[dateTime.getMonth()];
        const day = dateTime.getDate();
        let hour = dateTime.getHours();
        const minutes = ('0' + dateTime.getMinutes()).slice(-2);

        const amPM = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return `${year} ${month} ${day} ${hour}:${minutes} ${amPM}`;
    };

    const handleEmailClick = (email) => {
        const emailIndex = emailList.indexOf(email);

        if (emailIndex !== -1) {
            setEmailList(prevList => prevList.filter(item => item !== email));
        } else {
            setEmailList(prevList => [...prevList, email]);
        }
    };

    const handleNumberClick = (number) => {
        const numberIndex = numberList.indexOf(number);

        if (numberIndex !== -1) {
            setNumberList(prevList => prevList.filter(item => item !== number));
        } else {
            setNumberList(prevList => [...prevList, number]);
        }
    };

    const handleDomainClick = (domain) => {
        const domainIndex = domainList.indexOf(domain);

        if (domainIndex !== -1) {
            setDomainList(prevList => prevList.filter(item => item !== domain));
        } else {
            setDomainList(prevList => [...prevList, domain]);
        }
    };


    const handleNameClick = (name) => {
        const nameIndex = nameList.indexOf(name);

        if (nameIndex !== -1) {
            setNameList(prevList => prevList.filter(item => item !== name));
        } else {
            setNameList(prevList => [...prevList, name]);
        }
    };

    
    const handleDateClick = (date) => {
        const dateIndex = dateList.indexOf(date);

        if (dateIndex !== -1) {
            setDateList(prevList => prevList.filter(item => item !== date));
        } else {
            setDateList(prevList => [...prevList, date]);
        }
    };

    const handleLastClick = (last) => {
        const lastIndex = lastList.indexOf(last);

        if (lastIndex !== -1) {
            setLastList(prevList => prevList.filter(item => item !== last));
        } else {
            setLastList(prevList => [...prevList, last]);
        }
    };


    const filteredEmailAddresses = emailAddresses.filter(email =>
        email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredNumber = numberMembers.filter(number =>
        number.toLowerCase().includes(searchTermNumber.toLowerCase())
    );

    const filteredDomain = domainMembers.filter(domain =>
        domain.toLowerCase().includes(searchTermDomain.toLowerCase())
    );

    const filteredName = nameMembers.filter(name =>
        name.toLowerCase().includes(searchTermName.toLowerCase())
    );

    const filteredDate = dateMembers.filter(date =>
        date.toLowerCase().includes(searchTermDate.toLowerCase())
    );

    const filteredLast = dateTimeLastActive.filter(last =>
        last.toLowerCase().includes(searchTermLast.toLowerCase())
    );

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <h1>Members</h1>
                <p>View your member here.</p>
            </div>
            <table className={styles.table}>

                <thead className={styles.filterMain}>
                    <tr>
                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <div style={{ display: "inline-flex" }}><p style={{ fontSize: "14px", marginRight: "1rem", color: "white" }}>Filters|</p>
                                    <button onClick={toggleDropdownName} style={{ display: "flex", alignItems: 'center', justifyContent: 'center', justifyContent: "space-between" }} className={styles.btnFilters}>
                                        <span style={{ marginRight: '2px' }}>Name</span>
                                        <Arrow />
                                    </button></div>

                                {isOpenName && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTermName}
                                                onChange={(e) => setSearchTermName(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredName.map((name, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleNameClick(name)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={nameList.includes(name)}
                                                    readOnly
                                                />
                                                <p>{name}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownStatus} className={styles.btnFilters}>
                                    <span style={{ marginRight: '5px' }}>{selectedVerificationStatus}</span>
                                    <Arrow />
                                </button>
                                {isOpenStatus && (
                                    <div className={styles.dropdownMenu}>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatusVerification("Verification Status")}>
                                            All
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatusVerification("VERIFIED")}>
                                            Verified
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatusVerification("UNVERIFIED")}>
                                            <p>Unverified</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatusVerification("PENDING")}>
                                            Pending
                                        </div>
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownEmail} className={styles.btnFilters}>
                                    <span style={{ marginRight: '2px' }}>Email Address</span>
                                    <Arrow />
                                </button>
                                {isOpenEmail && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredEmailAddresses.map((email, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleEmailClick(email)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={emailList.includes(email)}
                                                    readOnly
                                                />
                                                <p>{email}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownNumber} className={styles.btnFilters}>
                                    <span style={{ marginRight: '2px' }}>Mobile Number</span>
                                    <Arrow />
                                </button>
                                {isOpenNumber && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTermNumber}
                                                onChange={(e) => setSearchTermNumber(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredNumber.map((number, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleNumberClick(number)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={numberList.includes(number)}
                                                    readOnly
                                                />
                                                <p>{number}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>





                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownDomain} className={styles.btnFilters}>
                                    <span style={{ marginRight: '2px' }}>Domain</span>
                                    <Arrow />
                                </button>
                                {isOpenDomain && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTermDomain}
                                                onChange={(e) => setSearchTermDomain(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredDomain.map((domain, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleDomainClick(domain)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={domainList.includes(domain)}
                                                    readOnly
                                                />
                                                <p>{domain}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownCreated} className={styles.btnFilters}>
                                    <span style={{ marginRight: '2px' }}>Date Time Created</span>
                                    <Arrow />
                                </button>
                                {isOpenCreated && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTermDate}
                                                onChange={(e) => setSearchTermDate(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredDate.map((date, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleDateClick(date)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={dateList.includes(date)}
                                                    readOnly
                                                />
                                                <p>{formatDate(date)}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdown} className={styles.btnFilters}>
                                    <span style={{ marginRight: '5px' }}>{selectedStatus}</span>
                                    <Arrow />
                                </button>
                                {isOpen && (
                                    <div className={styles.dropdownMenu}>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("Status")}>
                                            All
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("ACTIVE")}>
                                            Active
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("BLACKLISTED")}>
                                            <p>Blacklisted</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("DISABLED")}>
                                            Disabled
                                        </div>
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdownLast} className={styles.btnFilters}>
                                    <span style={{ marginRight: '2px' }}>Date and time Last Active</span>
                                    <Arrow />
                                </button>
                                {isOpenLast && (
                                    <div className={styles.dropdownMenu}>
                                        <div style={{ justifyContent: "center" }}>
                                            <input
                                                style={{ fontWeight: "400", borderRadius: "5px", backgroundColor: "#0A1117", margin: "15px", width: "200px", height: "30px", fontSize: "13px", alignContent: "center", justifyContent: "center", justifyItems: "center" }}
                                                type="text"
                                                placeholder="Search Email Adress"
                                                value={searchTermLast}
                                                onChange={(e) => setSearchTermLast(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                        {filteredLast.map((last, index) => (
                                            <div key={index} className={styles.dropdownItemEmail} onClick={() => handleLastClick(last)}>
                                                <input
                                                    style={{ marginRight: "1rem" }}
                                                    type="checkbox"
                                                    checked={lastList.includes(last)}
                                                    readOnly
                                                />
                                                <p>{formatDateTime(last)}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>

                <thead className={styles.back}>
                    <tr>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Verification Status</th>
                        <th className={styles.th}>Email Address</th>
                        <th className={styles.th}>Mobile Number</th>
                        <th className={styles.th}>Domain</th>
                        <th className={styles.th}>Date Time Created</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Date and time Last Active</th>
                    </tr>
                </thead>

                <tbody className={styles.mainTable}>
                    {filters.map((member) => (
                        <tr key={member.id}>
                            <td className={styles.td}><p className={styles.textName}>{member.name}</p></td>

                            <td className={styles.td}>
                                <button className={`${styles.btn} ${getVerificationStatusStyle(member.verificationStatus)}`}>
                                    <p className={styles.roundButton} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyContent: "space-evenly" }}><Circle />{formatStatus(member.verificationStatus)}</p>
                                </button>
                            </td>

                            <td className={styles.td}><p className={styles.textDefault}>{member.emailAddress}</p></td>
                            <td className={styles.td}><p className={styles.textDefault}>{member.mobileNumber}</p></td>
                            <td className={styles.td}><p className={styles.textDefault}>{member.domain}</p></td>

                            <td className={styles.td}><p className={styles.textDefault}>{formatDate(member.dateTimeCreated)}</p></td>

                            <td className={styles.td}>
                                <button className={`${styles.btnStatus} ${getStatusStyle(member.status)}`}>
                                    <p className={styles.roundButton} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', justifyContent: "space-evenly" }}>
                                        {member.status === 'ACTIVE' && <Verified />}
                                        {member.status === 'BLACKLISTER' && <Exclamation />}
                                        {member.status === 'DESABLED' && <Disabled />}
                                        {formatStatus(member.status)}
                                    </p>
                                </button>
                            </td>

                            <td className={styles.td}><p className={styles.textDefault}>{formatDateTime(member.dateTimeLastActive)}</p></td>
                        </tr>
                    ))}
                </tbody>
                <thead className={styles.filterMain}>
                    <tr>


                        <th className={styles.th}>
                            <button onClick={handleBackClick} style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', color: "#FFFFFF" }} className={styles.btnFilters}>
                                <BackIcon />
                                <span style={{ marginRight: '5px', color: "#FFFFFF" }}>Back</span>
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button onClick={handleNextClick} style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', color: "#FFFFFF" }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px', color: "#FFFFFF" }}>Next</span>
                                <NextIcon />
                            </button>
                        </th>
                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button style={{ color: "#FFFFFF" }} onClick={toggleDropdownPagination} className={styles.btnFilters}>
                                    <span style={{ marginRight: '5px', color: "#FFFFFF" }}>{selectedNumPagination} Entries</span>
                                    <Arrow />
                                </button>
                                {isOpenPagination && (
                                    <div className={styles.dropdownMenu}>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectPagination(10)}>
                                            <p>10</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectPagination(20)}>
                                            <p>20</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectPagination(50)}>
                                            <p>50</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectPagination(100)}>
                                            <p>100</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default Table;
