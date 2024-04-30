"use client"
import { useState, useEffect, useRef } from 'react';
import styles from "@/app/page.module.css";
import Verified from "@/svgs/verified.svg";
import Exclamation from "@/svgs/exclamation.svg";
import Disabled from "@/svgs/desabled.svg";
import Circle from "@/svgs/circle.svg";
import Arrow from "@/svgs/downarrow.svg";



function Table({ members }) {
    const [filters, setFilters] = useState(members)
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEmail, setIsOpenEmail] = useState(false);
    const [isOpenStatus, setIsOpenStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Status");
    const [emailList, setEmailList] = useState([]);
    const [selectedVerificationStatus, setSelectedVerificationStatus] = useState("Verification Status");
    const dropdownRef = useRef(null);


    console.log(members)

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownStatus = () => {
        setIsOpenStatus(!isOpenStatus);
    };

    const toggleDropdownEmail = () => {
        setIsOpenEmail(!isOpenEmail);
    };


    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsOpen(false);
    };

    const handleSelectStatusVerification = (status) => {
        setSelectedVerificationStatus(status);
        setIsOpenStatus(false);
    };

    const emailAddresses = members.map(member => member.emailAddress).filter(email => email);

    useEffect(() => {
        // Función para manejar el filtro de miembros
        const handleFilterMembers = () => {
            const isStatusSelected = selectedStatus !== "Status";
            const isVerificationStatusSelected = selectedVerificationStatus !== "Verification Status";

            // Obtener una lista de correos electrónicos seleccionados
            const selectedEmails = emailList;

            // Verificar si no se ha seleccionado ningún correo electrónico
            const noEmailSelected = selectedEmails.length === 0;

            // Filtrar los miembros basándose en el estado seleccionado, el estado de verificación seleccionado y los correos electrónicos seleccionados
            const filteredMembers = members.filter(member => {
                // Verificar si el miembro cumple con los criterios de estado seleccionado
                const statusCriteria = !isStatusSelected || member.status === selectedStatus;

                // Verificar si el miembro cumple con los criterios de estado de verificación seleccionado
                const verificationStatusCriteria = !isVerificationStatusSelected || member.verificationStatus === selectedVerificationStatus;

                // Si no hay ningún correo electrónico seleccionado, mostrar todos los miembros
                if (noEmailSelected) {
                    return statusCriteria && verificationStatusCriteria;
                }

                // Verificar si el correo electrónico del miembro está en la lista de correos electrónicos seleccionados
                const emailCriteria = selectedEmails.includes(member.emailAddress);

                // Devolver verdadero si el miembro cumple con todos los criterios
                return statusCriteria && verificationStatusCriteria && emailCriteria;
            });

            // Actualizar el estado de los filtros con los miembros filtrados
            setFilters(filteredMembers);
        };

        handleFilterMembers();
    }, [selectedStatus, selectedVerificationStatus, emailList, members]);

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

    const handleDropdownBlur = () => {
        setIsOpenEmail(false);
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
                                    <span style={{ marginRight: '5px' }}>Email Address</span>
                                    <Arrow />
                                </button>
                                {isOpenEmail && (
                                    <div className={styles.dropdownMenu}>
                                        {emailAddresses.map((email, index) => (
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
