import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config"; // Adjust path if needed
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, Button } from "@mui/material";
import "./Member.css";


const Member = () => {
    const [users, setUsers] = useState([]);
    const [updatedUsers, setUpdatedUsers] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const userData = querySnapshot.docs.map((doc) => ({
                    id: doc.id, // Firestore document ID
                    ...doc.data(),
                }));
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }


        };

        fetchUsers();
    }, []);

    const handleRoleChange = (userId, value) => {
        setUpdatedUsers((prev) => ({
            ...prev,
            [userId]: { ...prev[userId], isAdmin: value === "Admin" },
        }));
    };

    const handleMemberChange = (userId, value) => {
        setUpdatedUsers((prev) => ({
            ...prev,
            [userId]: { ...prev[userId], members: value },
        }));
    };

    const handleUpdate = async (userId) => {
        if (!updatedUsers[userId]) return;

        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, updatedUsers[userId]);
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? { ...user, ...updatedUsers[userId] } : user
                )
            );
            setUpdatedUsers((prev) => {
                const updated = { ...prev };
                delete updated[userId]; // Clear the updated fields after update
                return updated;
            });
            alert("Update successful!");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const columns = [
        { field: "displayName", headerName: "Name", width: 200 },
        { field: "code", headerName: "Code", width: 100 },
        { field: "email", headerName: "Email", width: 250 },
        {
            field: "isAdmin",
            headerName: "Role",
            width: 150,
            renderCell: (params) => (
                <Select
                    value={params.value ? "Admin" : "User"}
                    onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
                    size="small"
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                </Select>
            ),
        },
        {
            field: "members",
            headerName: "Member",
            width: 150,
            renderCell: (params) => (
                <Select
                    value={params.value || "no"}
                    onChange={(e) => handleMemberChange(params.row.id, e.target.value)}
                    size="small"
                >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                </Select>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(params.row.id)}
                    disabled={!updatedUsers[params.row.id]} // Disable if no changes
                >
                    Update
                </Button>
            ),
        },
    ];

    return (
        <div className="member-container">
            <div className="header-container">
                <h2><span className="highlight-word-color">Trichy</span> No1 Auto</h2>
                <h2 >Members <span className="highlight-word-color">List</span></h2>
            </div>
            <div className="data-grid-container">
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    autoHeight
                    sx={{
                        "& .MuiDataGrid-root": { overflowX: "auto" },
                        "@media (max-width: 768px)": {
                            "& .MuiDataGrid-cell": { fontSize: "12px" },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Member;
