import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { 
  BsFillBellFill, 
  BsFillEnvelopeFill, 
  BsPersonCircle, 
  BsSearch, 
  BsJustify,
  BsBoxArrowRight 
} from 'react-icons/bs';
import './Header.css';

function Header({ OpenSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsMessagesOpen(false);
    setIsCommentsOpen(false);
    setIsProfileMenuOpen(false);
  };

  const toggleMessages = () => {
    setIsMessagesOpen(!isMessagesOpen);
    setIsNotificationsOpen(false);
    setIsCommentsOpen(false);
    setIsProfileMenuOpen(false);
  };

  const toggleComments = () => {
    setIsCommentsOpen(!isCommentsOpen);
    setIsNotificationsOpen(false);
    setIsMessagesOpen(false);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsNotificationsOpen(false);
    setIsMessagesOpen(false);
    setIsCommentsOpen(false);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      const newComment = {
        text: commentText,
        user: user.name || user.email,
        timestamp: new Date().toISOString()
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="header-left">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="header-right">
        {/* Notifications Icon */}
        <div className={`icon-container ${isNotificationsOpen ? 'active' : ''}`} onClick={toggleNotifications}>
          <BsFillBellFill className="icon" />
          <span className="notification-dot"></span>
          {isNotificationsOpen && (
            <div className="notifications-panel">
              <h4>Notifications</h4>
              <p>No new notifications</p>
            </div>
          )}
        </div>

        {/* Messages Icon */}
        <div className={`icon-container ${isMessagesOpen ? 'active' : ''}`} onClick={toggleMessages}>
          <BsFillEnvelopeFill className="icon" />
          <span className="notification-dot"></span>
          {isMessagesOpen && (
            <div className="messages-panel">
              <h4>Messages</h4>
              <p>No new messages</p>
            </div>
          )}
        </div>

        {/* User Profile Section */}
        <div className="user-profile-section">
          <div className="user-info" onClick={toggleProfileMenu}>
            <BsPersonCircle className="icon" />
            <span className="user-name">{user?.name || user?.email}</span>
          </div>
          
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <div className="profile-header">
                <BsPersonCircle className="profile-icon" />
                <div className="profile-details">
                  <span className="profile-name">{user?.name}</span>
                  <span className="profile-email">{user?.email}</span>
                </div>
              </div>
              <div className="profile-menu-items">
                <button onClick={toggleComments} className="menu-item">
                  Comments
                </button>
                <button onClick={handleLogout} className="menu-item logout">
                  <BsBoxArrowRight className="logout-icon" />
                  Logout
                </button>
              </div>
            </div>
          )}
          
          {/* Comments Panel */}
          {isCommentsOpen && (
            <div className="comments-panel" onClick={(e) => e.stopPropagation()}>
              <h4>Leave a Comment</h4>
              <textarea
                value={commentText}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
              />
              <button onClick={handleCommentSubmit}>Submit</button>

              <div className="comments-list">
                {comments.map((comment, index) => (
                  <div key={index} className="comment-bubble">
                    <div className="comment-header">
                      <span className="comment-user">{comment.user}</span>
                      <span className="comment-time">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="comment-text">{comment.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;