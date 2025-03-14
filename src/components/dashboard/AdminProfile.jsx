import React, { useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { Camera, Mail, Phone, MapPin, Lock, Check, X } from 'lucide-react';

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@aldiner.com',
    phone: '+44 7700 123456',
    address: '123 Admin Street, London',
    role: 'System Administrator',
    joined: 'January 15, 2023',
    lastActive: 'Today at 10:45 AM'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...profileData});
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  
  const [profileSuccess, setProfileSuccess] = useState('');

  const handleProfileEdit = () => {
    setEditing(true);
    setEditedProfile({...profileData});
  };

  const handleProfileSave = () => {
    setProfileData({...editedProfile});
    setEditing(false);
    setProfileSuccess('Profile updated successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setProfileSuccess('');
    }, 3000);
  };

  const handleProfileCancel = () => {
    setEditing(false);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    
    // Clear messages when typing
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    // Success scenario
    setPasswordSuccess('Password updated successfully!');
    setPasswordError('');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setPasswordSuccess('');
    }, 3000);
  };

  return (
    <AdminLayout title="My Profile">
      <div className="container-fluid p-4">
        <div className="row g-4">
          {/* Profile Information */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Profile Information</h5>
                  {!editing ? (
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={handleProfileEdit}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-light btn-sm" 
                        onClick={handleProfileCancel}
                      >
                        Cancel
                      </button>
                      <button 
                        className="btn btn-success btn-sm" 
                        onClick={handleProfileSave}
                      >
                        <Check size={16} className="me-1" /> Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-body">
                {profileSuccess && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <Check size={18} className="me-2" />
                    <div>{profileSuccess}</div>
                  </div>
                )}
              
                <div className="d-flex mb-4">
                  <div className="position-relative me-4">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                      <span className="display-4 text-secondary">
                        {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                      </span>
                    </div>
                    
                    {editing && (
                      <button className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0">
                        <Camera size={14} />
                      </button>
                    )}
                  </div>
                  
                  <div className="d-flex flex-column justify-content-center">
                    <h4 className="mb-1">{profileData.firstName} {profileData.lastName}</h4>
                    <p className="text-muted mb-0">{profileData.role}</p>
                  </div>
                </div>
                
                {editing ? (
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editedProfile.firstName}
                        onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editedProfile.lastName}
                        onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="d-flex mb-3">
                      <Mail size={18} className="text-muted me-3 flex-shrink-0" />
                      <div>
                        <p className="mb-0 text-muted small">Email</p>
                        <p className="mb-0">{profileData.email}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex mb-3">
                      <Phone size={18} className="text-muted me-3 flex-shrink-0" />
                      <div>
                        <p className="mb-0 text-muted small">Phone</p>
                        <p className="mb-0">{profileData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="d-flex mb-3">
                      <MapPin size={18} className="text-muted me-3 flex-shrink-0" />
                      <div>
                        <p className="mb-0 text-muted small">Address</p>
                        <p className="mb-0">{profileData.address}</p>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="row g-3">
                      <div className="col-md-6">
                        <p className="text-muted small mb-1">Joined</p>
                        <p className="mb-0">{profileData.joined}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="text-muted small mb-1">Last Active</p>
                        <p className="mb-0">{profileData.lastActive}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Change Password */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header bg-white py-3">
                <h5 className="card-title mb-0">Change Password</h5>
              </div>
              <div className="card-body">
                {passwordError && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <X size={18} className="me-2" />
                    <div>{passwordError}</div>
                  </div>
                )}
                
                {passwordSuccess && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <Check size={18} className="me-2" />
                    <div>{passwordSuccess}</div>
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Current Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={16} />
                      </span>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={16} />
                      </span>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="form-text">
                      Password must be at least 8 characters long
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={16} />
                      </span>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-100">
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;