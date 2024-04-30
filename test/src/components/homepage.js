"use client"
import { useState, useEffect, useRef } from 'react';
import styles from "@/app/page.module.css";
import Verified from "@/svgs/verified.svg";
import Exclamation from "@/svgs/exclamation.svg";
import Disabled from "@/svgs/desabled.svg";
import Circle from "@/svgs/circle.svg";
import Arrow from "@/svgs/downarrow.svg";



function Table({ members }) {

    const defaultMember = members;
    const [filters, setFilters] = useState(members)

    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const dropdownRef = useRef(null);

    console.log(selectedStatus)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        if (status === "Status") {
            setFilters(members);
            setIsOpen(false)
        } else {
            const filteredMembers = members.filter(member => member.status === status);
            setFilters(filteredMembers);
            setIsOpen(false)
        }
    };


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
                            <div style={{ display: "flex" }}><h3 style={{ marginRight: "1rem", color: "white" }}>Filters |</h3>
                                <button style={{ display: "flex", alignItems: 'center', justifyContent: 'center', justifyContent: "space-between" }} className={styles.btnFilters}>
                                    <span style={{ marginRight: '5px' }}>Name</span>
                                    <Arrow />
                                </button></div>
                        </th>
                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Verification Status</span>
                                <Arrow />
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Email Address</span>
                                <Arrow />
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Mobile Number</span>
                                <Arrow />
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Domain</span>
                                <Arrow />
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Date Time Created</span>
                                <Arrow />
                            </button>
                        </th>

                        <th className={styles.th}>
                            <div className={styles.dropdownContainer} ref={dropdownRef}>
                                <button onClick={toggleDropdown} className={styles.btnFilters}>
                                    <span style={{ marginRight: '5px' }}>{selectedStatus}</span>
                                    <Arrow />
                                </button>
                                {isOpen && (
                                    <div className={styles.dropdownMenu}>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("ACTIVE")}>
                                            Active
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("Blacklisted")}>
                                            <p>Blacklisted</p>
                                        </div>
                                        <div className={styles.dropdownItem} onClick={() => handleSelectStatus("Disabled")}>
                                            Disabled
                                        </div>
                                    </div>
                                )}
                            </div>
                        </th>

                        <th className={styles.th}>
                            <button style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }} className={styles.btnFilters}>
                                <span style={{ marginRight: '5px' }}>Date and time Last Active</span>
                                <Arrow />
                            </button>
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
            </table>
        </div>
    );
}

export default Table;
