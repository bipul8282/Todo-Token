import React, { useState } from 'react';
import Styles from './overview.module.css';
import { MdDescription, MdPlaylistAddCheck } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { RxActivityLog } from 'react-icons/rx';

export default function Overview({ taskName, cardTitle, addedTime }) {
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  const [activityLog, setActivityLog] = useState([]);

  const handleSave = () => {
    const savedTime = new Date();
    const savedMessage = `Saved description at ${savedTime.toLocaleTimeString()}`;
    setActivityLog((prevActivityLog) => [...prevActivityLog, savedMessage]);
    setDescription(tempDescription);
    setTempDescription('');
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setEditMode(false);
  };

  const handleEdit = () => {
    setTempDescription(description);
    setEditMode(true);
  };

  const handleAddComment = () => {
    const commentTime = new Date();
    const commentMessage = `Added comment at ${commentTime.toLocaleTimeString()}: ${comment}`;
    setActivityLog((prevActivityLog) => [...prevActivityLog, commentMessage]);
    setComment(''); // Clear the comment input field
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={Styles.outer}>
      <div className={Styles.header}>
        <MdPlaylistAddCheck className={Styles.icon} />
        <h3>{taskName}</h3>
      </div>
      <div className={Styles.title}>
        <span className={Styles.cardTitle}>in the {cardTitle}</span>
      </div>
      <div className={Styles.section}>
        <MdDescription className={Styles.icon1} />
        <div className={Styles.field}>
          <h3>Description</h3>
          <div className={Styles.editContainer}>
            {editMode ? (
              <textarea
                className={Styles.descriptionEdit}
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
              />
            ) : (
              <div className={Styles.description}>{description || 'Add description...'}</div>
            )}
            {!editMode && (
              <button className={Styles.editButton} onClick={handleEdit}>
                Edit
              </button>
            )}
          </div>
          {editMode && (
            <div className={Styles.buttonContainer}>
              <button className={Styles.saveButton} onClick={handleSave}>
                Save
              </button>
              <button className={Styles.cancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={Styles.section}>
        <RxActivityLog className={Styles.icon2} />
        <div className={Styles.field}>
          <h4>Activity</h4>
          <div className={Styles.text}>
            <div className={Styles.icon3}>
              <FaUserCircle />
            </div>
            <textarea
              placeholder="Add comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className={Styles.addCommentButton} onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
          <button className={Styles.showDetailsButton} onClick={handleToggleDetails}>
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {showDetails && (
            <div className={Styles.activityDetails}>
              <h4>Added Time: {new Date(addedTime).toLocaleString()}</h4>
              {activityLog.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}