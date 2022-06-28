import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../../components/main_button/Button";
import "./Admin.css";
import axios from "axios";
import { API_URL } from "../../App";
import CardItem from "../../components/cards/CardItem";
import { createNotification } from "../../utils/notificationManager";

export default function Admin() {
  const [mode, setMode] = useState("");
  const [pendingPosts, setPendingPosts] = useState([]);
  const handlePendingPosts = async () => {
    setMode("pending-posts");
    const response = await axios.get(`${API_URL}/api/posts/?pending=true`);
    setPendingPosts(response.data);
    console.log(response);
    // console.log(response.data);
  };

  useEffect(() => {
    handlePendingPosts();
  }, []);
  const handleApprove = async (id) => {
    const response = await axios.post(`${API_URL}/api/posts/approve/${id}`);
    if (response.status == 200) {
      createNotification("admin_pending_approved");
    } else {
      createNotification("error_misc");
    }
  };

  const handleReject = async (id) => {
    const response = await axios.post(`${API_URL}/api/posts/reject/${id}`);
    if (response.status == 200) {
      createNotification("admin_pending_approved");
    } else {
      createNotification("admin_pending_rejected");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-menu">
        <Button
          buttonStyle="btn--black"
          buttonSize="btn--small"
          onClick={handlePendingPosts}
        >
          <i
            className="single-post-icon fa-solid fa-comment-pen"
            style={{ color: "#fff", marginRight: "5px" }}
          />
          Pending posts
        </Button>
      </div>
      <div className="admin-content">
        {mode === "pending-posts" && (
          <div className="admin-pending-posts">
            {pendingPosts.map((p, index) => (
              <ul className="cards__items" key={p._id}>
                <CardItem
                  post={p}
                  index={index}
                  isPendingMode={true}
                  handleApprove={handleApprove}
                  handleReject={handleReject}
                />
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
